import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schemas
const timeOffSchema = z.object({
  opticianId: z.string().cuid("Invalid optician ID"),
  startDate: z.string().datetime("Invalid start date"),
  endDate: z.string().datetime("Invalid end date"),
  reason: z.string().optional(),
  isAllDay: z.boolean().default(true),
});

const updateTimeOffSchema = z.object({
  startDate: z.string().datetime("Invalid start date").optional(),
  endDate: z.string().datetime("Invalid end date").optional(),
  reason: z.string().optional(),
  isAllDay: z.boolean().optional(),
});

// Interface for appointment in conflicting appointments
interface ConflictingAppointment {
  id: string;
  scheduledAt: Date;
  patientName: string;
  phone: string;
}

// Interface for Prisma appointment result
interface AppointmentResult {
  id: string;
  scheduledAt: Date;
  patientName: string;
  phone: string;
}

// Interface for time off where clause
interface TimeOffWhereClause {
  opticianId: string;
  OR?: Array<
    | {
        startDate: { lte: Date };
        endDate: { gte: Date };
      }
    | {
        startDate: { gte: Date; lte: Date };
      }
    | {
        endDate: { gte: Date; lte: Date };
      }
  >;
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
    const whereClause: TimeOffWhereClause = { opticianId };

    if (startDate && endDate) {
      whereClause.OR = [
        // Time off that overlaps with the date range
        {
          startDate: { lte: new Date(endDate) },
          endDate: { gte: new Date(startDate) },
        },
        // Time off that starts within the date range
        {
          startDate: { gte: new Date(startDate), lte: new Date(endDate) },
        },
        // Time off that ends within the date range
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

    const validationResult = timeOffSchema.safeParse(body);
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

    // Validate dates
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

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
          // New time off starts during existing time off
          {
            startDate: { lte: startDate },
            endDate: { gte: startDate },
          },
          // New time off ends during existing time off
          {
            startDate: { lte: endDate },
            endDate: { gte: endDate },
          },
          // New time off completely contains existing time off
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

    // Check for conflicting appointments - FIXED: Remove patient include
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
      // REMOVED: patient include since patient data is directly on appointment
    });

    if (conflictingAppointments.length > 0) {
      return NextResponse.json(
        {
          error: "Cannot schedule time off due to conflicting appointments",
          conflictingAppointments: conflictingAppointments.map(
            (apt: AppointmentResult) => ({
              id: apt.id,
              scheduledAt: apt.scheduledAt,
              patientName: apt.patientName, // Directly from appointment
              phone: apt.phone, // Directly from appointment
            })
          ),
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

    // Validate dates if provided
    let startDate = existingTimeOff.startDate;
    let endDate = existingTimeOff.endDate;

    if (data.startDate || data.endDate) {
      startDate = data.startDate ? new Date(data.startDate) : startDate;
      endDate = data.endDate ? new Date(data.endDate) : endDate;

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

    // Check for conflicting appointments if dates changed - FIXED: Remove patient include
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
        // REMOVED: patient include since patient data is directly on appointment
      });

      if (conflictingAppointments.length > 0) {
        return NextResponse.json(
          {
            error: "Cannot update time off due to conflicting appointments",
            conflictingAppointments: conflictingAppointments.map(
              (apt: AppointmentResult) => ({
                id: apt.id,
                scheduledAt: apt.scheduledAt,
                patientName: apt.patientName, // Directly from appointment
              })
            ),
          },
          { status: 409 }
        );
      }
    }

    const updatedTimeOff = await prisma.opticianTimeOff.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
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
