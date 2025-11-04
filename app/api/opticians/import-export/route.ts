// FIXED: app/api/opticians/import-export/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ImportResult } from "@/types";
import { z } from "zod";

const importSchema = z.object({
  fileName: z.string(),
  fileType: z.enum(["csv", "json"]),
  data: z
    .array(z.record(z.string(), z.unknown()))
    .min(1, "Import data cannot be empty"),
});

interface ImportRequestBody {
  fileName: string;
  fileType: "csv" | "json";
  data: Record<string, unknown>[];
}

interface ValidatedOpticianData {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  branchId: string;
}

interface BranchMapItem {
  id: string;
  name: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ImportRequestBody;
    const validation = importSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid import data",
          details: validation.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const { data, fileType } = validation.data;
    const result: ImportResult = {
      total: data.length,
      created: 0,
      updated: 0,
      errors: [],
    };

    // Get all branches for name resolution
    const branches = await prisma.branch.findMany();
    const branchMap = new Map<string, BranchMapItem>();
    branches.forEach((b: BranchMapItem) => {
      branchMap.set(b.name.toLowerCase(), b);
    });

    for (let i = 0; i < data.length; i++) {
      const row = data[i];

      try {
        // Validate and transform import data
        const opticianData = await validateAndTransformImportData(
          row,
          branchMap
        );

        // Check if optician exists (by email) - FIXED: Use findFirst instead of findUnique
        const existingOptician = await prisma.optician.findFirst({
          where: { email: opticianData.email },
        });

        if (existingOptician) {
          // Update existing optician
          await prisma.optician.update({
            where: { id: existingOptician.id },
            data: {
              name: opticianData.name,
              phone: opticianData.phone,
              specialty: opticianData.specialty,
              branchId: opticianData.branchId,
            },
          });
          result.updated++;
        } else {
          // Create new optician
          await prisma.optician.create({
            data: {
              name: opticianData.name,
              email: opticianData.email,
              phone: opticianData.phone,
              specialty: opticianData.specialty,
              branchId: opticianData.branchId,
              isActive: true,
            },
          });
          result.created++;
        }
      } catch (error) {
        result.errors.push({
          row: i + 1,
          error: error instanceof Error ? error.message : "Unknown error",
          data: row,
        });
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Import error:", error);
    return NextResponse.json(
      { error: "Failed to import data" },
      { status: 500 }
    );
  }
}

async function validateAndTransformImportData(
  row: Record<string, unknown>,
  branchMap: Map<string, BranchMapItem>
): Promise<ValidatedOpticianData> {
  // Basic validation
  if (!row.name || !row.email || !row.phone || !row.branchName) {
    throw new Error(
      "Missing required fields: name, email, phone, or branchName"
    );
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(String(row.email))) {
    throw new Error("Invalid email format");
  }

  // Find branch by name (case insensitive)
  const branchName = String(row.branchName).toLowerCase();
  const branch = branchMap.get(branchName);

  if (!branch) {
    throw new Error(`Branch not found: ${row.branchName}`);
  }

  return {
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone),
    specialty: row.specialty ? String(row.specialty) : undefined,
    branchId: branch.id,
  };
}

// Export endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "json";
  const includeSchedules = searchParams.get("includeSchedules") === "true";

  try {
    const opticians = await prisma.optician.findMany({
      include: {
        branch: {
          select: {
            name: true,
            address: true,
            phone: true,
            email: true,
          },
        },
        workingHours: includeSchedules,
        timeOff: includeSchedules
          ? {
              where: {
                endDate: {
                  gte: new Date(), // Only future time off
                },
              },
            }
          : false,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (format === "csv") {
      const csvData = convertOpticiansToCSV(opticians, includeSchedules);
      return new NextResponse(csvData, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="opticians-export.csv"',
        },
      });
    }

    return NextResponse.json(opticians);
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ error: "Failed to export data", status: 500 });
  }
}

function convertOpticiansToCSV(
  opticians: unknown[],
  includeSchedules: boolean
): string {
  const headers = [
    "Name",
    "Email",
    "Phone",
    "Specialty",
    "Branch",
    "Status",
    "Created At",
  ];

  if (includeSchedules) {
    headers.push("Working Hours", "Upcoming Time Off");
  }

  const rows = opticians.map((optician) => {
    const opt = optician as {
      name: string;
      email: string;
      phone: string;
      specialty?: string;
      branch: { name: string };
      isActive: boolean;
      createdAt: string;
      workingHours?: Array<{
        dayOfWeek: number;
        startTime: string;
        endTime: string;
      }>;
      timeOff?: Array<{ startDate: string; endDate: string }>;
    };

    const baseRow = [
      opt.name,
      opt.email,
      opt.phone,
      opt.specialty || "General",
      opt.branch.name,
      opt.isActive ? "Active" : "Inactive",
      new Date(opt.createdAt).toLocaleDateString(),
    ];

    if (includeSchedules) {
      const workingHours =
        opt.workingHours
          ?.map(
            (wh) => `${getDayName(wh.dayOfWeek)}: ${wh.startTime}-${wh.endTime}`
          )
          .join("; ") || "";

      const timeOff =
        opt.timeOff
          ?.map(
            (to) =>
              `${new Date(to.startDate).toLocaleDateString()} - ${new Date(
                to.endDate
              ).toLocaleDateString()}`
          )
          .join("; ") || "";

      baseRow.push(workingHours, timeOff);
    }

    return baseRow;
  });

  return [headers, ...rows]
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
}

function getDayName(dayOfWeek: number): string {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayOfWeek] || `Day ${dayOfWeek}`;
}
