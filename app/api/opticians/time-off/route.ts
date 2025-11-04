// In your /api/opticians/time-off route
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Updated validation schemas to handle datetime-local format
const timeOffSchema = z.object({
  opticianId: z.string().cuid("Invalid optician ID"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().optional(),
  isAllDay: z.boolean().default(true),
});

const updateTimeOffSchema = z.object({
  startDate: z.string().min(1, "Start date is required").optional(),
  endDate: z.string().min(1, "End date is required").optional(),
  reason: z.string().optional(),
  isAllDay: z.boolean().optional(),
});

// Helper function to convert datetime-local string to Date object
function parseDateTimeLocal(dateTimeString: string): Date {
  // datetime-local format: "YYYY-MM-DDTHH:MM"
  // Convert to ISO format that JavaScript Date can parse
  return new Date(dateTimeString + ":00.000Z");
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const opticianId = searchParams.get("opticianId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!opticianId) {
      return NextResponse.json(
        { error: "Optician ID is required" },
        { status: 400 }
      );
    }

    // Check if optician exists
    const optician = await prisma.optician.findUnique({
      where: { id: opticianId },
    });

    if (!optician) {
      return NextResponse.json(
        { error: "Optician not found" },
        { status: 404 }
      );
    }

    // Build where clause
    const whereClause: any = { opticianId };

    if (startDate && endDate) {
      whereClause.OR = [
        {
          startDate: { lte: new Date(endDate) },
          endDate: { gte: new Date(startDate) },
        },
        {
          startDate: { gte: new Date(startDate), lte: new Date(endDate) },
        },
        {
          endDate: { gte: new Date(startDate), lte: new Date(endDate) },
        },
      ];
    }

    const timeOff = await prisma.opticianTimeOff.findMany({
      where: whereClause,
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(timeOff);
  } catch (error) {
    console.error("Error fetching time off:", error);
    return NextResponse.json(
      { error: "Failed to fetch time off" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log("Time-off POST request body:", body);

    const validationResult = timeOffSchema.safeParse(body);
    if (!validationResult.success) {
      console.log("Validation errors:", validationResult.error.issues);
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Check if optician exists
    const optician = await prisma.optician.findUnique({
      where: { id: data.opticianId },
    });

    if (!optician) {
      return NextResponse.json(
        { error: "Optician not found" },
        { status: 404 }
      );
    }

    // Parse dates from datetime-local format
    const startDate = parseDateTimeLocal(data.startDate);
    const endDate = parseDateTimeLocal(data.endDate);

    console.log("Parsed dates:", { startDate, endDate });

    // Validate dates
    if (endDate < startDate) {
      return NextResponse.json(
        { error: "End date cannot be before start date" },
        { status: 400 }
      );
    }

    // Check for overlapping time off
    const overlappingTimeOff = await prisma.opticianTimeOff.findFirst({
      where: {
        opticianId: data.opticianId,
        OR: [
          {
            startDate: { lte: startDate },
            endDate: { gte: startDate },
          },
          {
            startDate: { lte: endDate },
            endDate: { gte: endDate },
          },
          {
            startDate: { gte: startDate },
            endDate: { lte: endDate },
          },
        ],
      },
    });

    if (overlappingTimeOff) {
      return NextResponse.json(
        {
          error: "Time off overlaps with existing time off period",
          overlappingPeriod: {
            startDate: overlappingTimeOff.startDate,
            endDate: overlappingTimeOff.endDate,
            reason: overlappingTimeOff.reason,
          },
        },
        { status: 409 }
      );
    }

    // Check for conflicting appointments
    const conflictingAppointments = await prisma.appointment.findMany({
      where: {
        opticianId: data.opticianId,
        scheduledAt: {
          gte: startDate,
          lte: endDate,
        },
        status: {
          in: ["pending", "confirmed"],
        },
      },
    });

    if (conflictingAppointments.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot schedule time off due to conflicting appointments",
          conflictingAppointments: conflictingAppointments.map((apt) => ({
            id: apt.id,
            scheduledAt: apt.scheduledAt,
            patientName: apt.patientName,
            phone: apt.phone,
          })),
        },
        { status: 409 }
      );
    }

    const timeOff = await prisma.opticianTimeOff.create({
      data: {
        opticianId: data.opticianId,
        startDate,
        endDate,
        reason: data.reason,
        isAllDay: data.isAllDay,
      },
    });

    return NextResponse.json(timeOff, { status: 201 });
  } catch (error) {
    console.error("Error creating time off:", error);
    return NextResponse.json(
      { error: "Failed to create time off" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Time off ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validationResult = updateTimeOffSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Check if time off exists
    const existingTimeOff = await prisma.opticianTimeOff.findUnique({
      where: { id },
      include: {
        optician: true,
      },
    });

    if (!existingTimeOff) {
      return NextResponse.json(
        { error: "Time off not found" },
        { status: 404 }
      );
    }

    // Parse dates if provided
    let startDate = existingTimeOff.startDate;
    let endDate = existingTimeOff.endDate;

    if (data.startDate || data.endDate) {
      startDate = data.startDate
        ? parseDateTimeLocal(data.startDate)
        : startDate;
      endDate = data.endDate ? parseDateTimeLocal(data.endDate) : endDate;

      if (endDate < startDate) {
        return NextResponse.json(
          { error: "End date cannot be before start date" },
          { status: 400 }
        );
      }
    }

    // Check for overlapping time off (excluding current record)
    if (data.startDate || data.endDate) {
      const overlappingTimeOff = await prisma.opticianTimeOff.findFirst({
        where: {
          opticianId: existingTimeOff.opticianId,
          id: { not: id },
          OR: [
            {
              startDate: { lte: startDate },
              endDate: { gte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
            {
              startDate: { gte: startDate },
              endDate: { lte: endDate },
            },
          ],
        },
      });

      if (overlappingTimeOff) {
        return NextResponse.json(
          {
            error: "Time off overlaps with existing time off period",
            overlappingPeriod: {
              startDate: overlappingTimeOff.startDate,
              endDate: overlappingTimeOff.endDate,
              reason: overlappingTimeOff.reason,
            },
          },
          { status: 409 }
        );
      }
    }

    // Check for conflicting appointments if dates changed
    if ((data.startDate || data.endDate) && existingTimeOff.opticianId) {
      const conflictingAppointments = await prisma.appointment.findMany({
        where: {
          opticianId: existingTimeOff.opticianId,
          scheduledAt: {
            gte: startDate,
            lte: endDate,
          },
          status: {
            in: ["pending", "confirmed"],
          },
        },
      });

      if (conflictingAppointments.length > 0) {
        return NextResponse.json(
          {
            error: "Cannot update time off due to conflicting appointments",
            conflictingAppointments: conflictingAppointments.map((apt) => ({
              id: apt.id,
              scheduledAt: apt.scheduledAt,
              patientName: apt.patientName,
            })),
          },
          { status: 409 }
        );
      }
    }

    const updatedTimeOff = await prisma.opticianTimeOff.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate
          ? parseDateTimeLocal(data.startDate)
          : undefined,
        endDate: data.endDate ? parseDateTimeLocal(data.endDate) : undefined,
      },
    });

    return NextResponse.json(updatedTimeOff);
  } catch (error) {
    console.error("Error updating time off:", error);
    return NextResponse.json(
      { error: "Failed to update time off" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Time off ID is required" },
        { status: 400 }
      );
    }

    // Check if time off exists
    const timeOff = await prisma.opticianTimeOff.findUnique({
      where: { id },
    });

    if (!timeOff) {
      return NextResponse.json(
        { error: "Time off not found" },
        { status: 404 }
      );
    }

    await prisma.opticianTimeOff.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Time off deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting time off:", error);
    return NextResponse.json(
      { error: "Failed to delete time off" },
      { status: 500 }
    );
  }
}
