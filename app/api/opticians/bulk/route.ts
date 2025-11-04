// FIXED: app/api/opticians/bulk/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  BulkOpticianCreateData,
  BulkOpticianUpdateData,
  BulkOperationResult,
  BulkStatusUpdate,
} from "@/types";
import { z } from "zod";

// Validation schemas for bulk operations
const bulkCreateSchema = z.object({
  opticians: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email format"),
        phone: z.string().min(1, "Phone is required"),
        specialty: z.string().optional(),
        branchId: z.string().min(1, "Branch ID is required"),
      })
    )
    .min(1, "At least one optician is required"),
});

const bulkUpdateSchema = z.object({
  updates: z
    .array(
      z.object({
        id: z.string().min(1, "Optician ID is required"),
        data: z.object({
          name: z.string().min(1).optional(),
          email: z.string().email().optional(),
          phone: z.string().min(1).optional(),
          specialty: z.string().optional(),
          branchId: z.string().min(1).optional(),
          isActive: z.boolean().optional(),
        }),
      })
    )
    .min(1, "At least one update is required"),
});

const bulkStatusSchema = z.object({
  opticianIds: z
    .array(z.string().min(1))
    .min(1, "At least one optician ID is required"),
  isActive: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    switch (action) {
      case "create":
        return await handleBulkCreate(body);
      case "update":
        return await handleBulkUpdate(body);
      case "status":
        return await handleBulkStatus(body);
      default:
        return NextResponse.json(
          { error: "Invalid action. Use 'create', 'update', or 'status'" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Bulk operation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleBulkCreate(body: unknown): Promise<NextResponse> {
  const validation = bulkCreateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Invalid data",
        details: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { opticians } = validation.data;
  const result: BulkOperationResult = {
    success: true,
    processed: opticians.length,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  const createdOpticians: unknown[] = [];

  for (let i = 0; i < opticians.length; i++) {
    const opticianData = opticians[i];

    try {
      // Check if branch exists
      const branch = await prisma.branch.findUnique({
        where: { id: opticianData.branchId },
      });

      if (!branch) {
        result.failed++;
        result.errors?.push({
          index: i,
          error: `Branch not found: ${opticianData.branchId}`,
        });
        continue;
      }

      // Check for duplicate email - FIXED: Use findFirst with where clause
      const existingOptician = await prisma.optician.findFirst({
        where: {
          email: opticianData.email,
        },
      });

      if (existingOptician) {
        result.failed++;
        result.errors?.push({
          index: i,
          error: `Email already exists: ${opticianData.email}`,
        });
        continue;
      }

      // Create optician
      const optician = await prisma.optician.create({
        data: {
          ...opticianData,
          isActive: true,
        },
        include: {
          branch: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });

      createdOpticians.push(optician);
      result.succeeded++;
    } catch (error) {
      result.failed++;
      result.errors?.push({
        index: i,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  result.data = createdOpticians;
  result.success = result.failed === 0;

  return NextResponse.json(result);
}

async function handleBulkUpdate(body: unknown): Promise<NextResponse> {
  const validation = bulkUpdateSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Invalid data",
        details: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { updates } = validation.data;
  const result: BulkOperationResult = {
    success: true,
    processed: updates.length,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  const updatedOpticians: unknown[] = [];

  for (const update of updates) {
    try {
      // Verify optician exists
      const existingOptician = await prisma.optician.findUnique({
        where: { id: update.id },
      });

      if (!existingOptician) {
        result.failed++;
        result.errors?.push({
          id: update.id,
          error: "Optician not found",
        });
        continue;
      }

      // If branchId is being updated, verify the branch exists
      if (update.data.branchId) {
        const branch = await prisma.branch.findUnique({
          where: { id: update.data.branchId },
        });

        if (!branch) {
          result.failed++;
          result.errors?.push({
            id: update.id,
            error: `Branch not found: ${update.data.branchId}`,
          });
          continue;
        }
      }

      // If email is being updated, check for duplicates - FIXED: Use findFirst
      if (update.data.email && update.data.email !== existingOptician.email) {
        const emailExists = await prisma.optician.findFirst({
          where: {
            email: update.data.email,
            id: { not: update.id }, // Exclude current optician
          },
        });

        if (emailExists) {
          result.failed++;
          result.errors?.push({
            id: update.id,
            error: `Email already exists: ${update.data.email}`,
          });
          continue;
        }
      }

      // Update optician
      const updatedOptician = await prisma.optician.update({
        where: { id: update.id },
        data: update.data,
        include: {
          branch: {
            select: {
              id: true,
              name: true,
              address: true,
            },
          },
        },
      });

      updatedOpticians.push(updatedOptician);
      result.succeeded++;
    } catch (error) {
      result.failed++;
      result.errors?.push({
        id: update.id,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  result.data = updatedOpticians;
  result.success = result.failed === 0;

  return NextResponse.json(result);
}

async function handleBulkStatus(body: unknown): Promise<NextResponse> {
  const validation = bulkStatusSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Invalid data",
        details: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  const { opticianIds, isActive } = validation.data;
  const result: BulkOperationResult = {
    success: true,
    processed: opticianIds.length,
    succeeded: 0,
    failed: 0,
    errors: [],
  };

  try {
    // Update all opticians in a single transaction
    const updateResult = await prisma.optician.updateMany({
      where: {
        id: {
          in: opticianIds,
        },
      },
      data: {
        isActive,
        updatedAt: new Date(),
      },
    });

    result.succeeded = updateResult.count;
    result.data = { updated: updateResult.count };
  } catch (error) {
    result.success = false;
    result.failed = opticianIds.length;
    result.errors?.push({
      error: error instanceof Error ? error.message : "Failed to update status",
    });
  }

  return NextResponse.json(result);
}

// Export endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format"); // 'csv' or 'json'

  try {
    const opticians = await prisma.optician.findMany({
      include: {
        branch: {
          select: {
            name: true,
            address: true,
          },
        },
        workingHours: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (format === "csv") {
      // Convert to CSV format
      const csvData = convertToCSV(opticians);
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
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}

function convertToCSV(opticians: unknown[]): string {
  const headers = ["Name", "Email", "Phone", "Specialty", "Branch", "Status"];

  const rows = opticians.map((optician) => {
    // Type assertion for CSV conversion
    const opt = optician as {
      name: string;
      email: string;
      phone: string;
      specialty?: string;
      branch: { name: string };
      isActive: boolean;
    };

    return [
      opt.name,
      opt.email,
      opt.phone,
      opt.specialty || "General",
      opt.branch.name,
      opt.isActive ? "Active" : "Inactive",
    ];
  });

  return [headers, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");
}
