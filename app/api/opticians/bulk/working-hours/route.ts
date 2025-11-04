// CREATE: app/api/opticians/bulk/working-hours/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { BulkScheduleUpdate, BulkOperationResult } from "@/types";
import { z } from "zod";

const bulkScheduleSchema = z.object({
  opticianIds: z
    .array(z.string().min(1))
    .min(1, "At least one optician ID is required"),
  schedule: z
    .array(
      z.object({
        dayOfWeek: z.number().min(0).max(6),
        startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        isAvailable: z.boolean().default(true),
      })
    )
    .min(1, "At least one schedule entry is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = bulkScheduleSchema.safeParse(body);

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

    const { opticianIds, schedule } = validation.data;
    const result: BulkOperationResult = {
      success: true,
      processed: opticianIds.length,
      succeeded: 0,
      failed: 0,
      errors: [],
    };

    const updatedOpticians: unknown[] = [];

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

        // Delete existing working hours
        await prisma.opticianWorkingHours.deleteMany({
          where: { opticianId },
        });

        // Create new working hours
        const workingHoursData = schedule.map((sched) => ({
          opticianId,
          dayOfWeek: sched.dayOfWeek,
          startTime: sched.startTime,
          endTime: sched.endTime,
          isAvailable: sched.isAvailable,
        }));

        await prisma.opticianWorkingHours.createMany({
          data: workingHoursData,
        });

        // Get updated optician with working hours
        const updatedOptician = await prisma.optician.findUnique({
          where: { id: opticianId },
          include: {
            workingHours: true,
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
          id: opticianId,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    result.data = updatedOpticians;
    result.success = result.failed === 0;

    return NextResponse.json(result);
  } catch (error) {
    console.error("Bulk working hours error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
