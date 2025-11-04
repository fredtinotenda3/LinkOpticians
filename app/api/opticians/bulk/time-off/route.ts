// CREATE: app/api/opticians/bulk/time-off/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BulkTimeOffCreate, BulkOperationResult } from "@/types";
import { z } from "zod";

const bulkTimeOffSchema = z.object({
  opticianIds: z
    .array(z.string().min(1))
    .min(1, "At least one optician ID is required"),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  reason: z.string().optional(),
  isAllDay: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = bulkTimeOffSchema.safeParse(body);

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

    const { opticianIds, startDate, endDate, reason, isAllDay } =
      validation.data;
    const result: BulkOperationResult = {
      success: true,
      processed: opticianIds.length,
      succeeded: 0,
      failed: 0,
      errors: [],
    };

    const createdTimeOffEntries: unknown[] = [];

    for (const opticianId of opticianIds) {
      try {
        // Verify optician exists
        const optician = await prisma.optician.findUnique({
          where: { id: opticianId },
        });

        if (!optician) {
          result.failed++;
          result.errors?.push({
            id: opticianId,
            error: "Optician not found",
          });
          continue;
        }

        // Check for conflicting appointments
        const conflictingAppointments = await prisma.appointment.findMany({
          where: {
            opticianId,
            scheduledAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
            status: {
              in: ["pending", "confirmed"],
            },
          },
        });

        if (conflictingAppointments.length > 0) {
          result.failed++;
          result.errors?.push({
            id: opticianId,
            error: `Cannot schedule time off: ${conflictingAppointments.length} conflicting appointment(s) found`,
          });
          continue;
        }

        // Create time off entry
        const timeOff = await prisma.opticianTimeOff.create({
          data: {
            opticianId,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            isAllDay,
          },
        });

        createdTimeOffEntries.push(timeOff);
        result.succeeded++;
      } catch (error) {
        result.failed++;
        result.errors?.push({
          id: opticianId,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    result.data = createdTimeOffEntries;
    result.success = result.failed === 0;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Bulk time off error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
