import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schemas
const workingHoursSchema = z.object({
  opticianId: z.string().cuid("Invalid optician ID"),
  dayOfWeek: z.number().min(0).max(6, "Day of week must be 0-6"),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:MM)"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:MM)"
    ),
  isAvailable: z.boolean().default(true),
});

const bulkWorkingHoursSchema = z.object({
  opticianId: z.string().cuid("Invalid optician ID"),
  workingHours: z.array(
    z.object({
      dayOfWeek: z.number().min(0).max(6, "Day of week must be 0-6"),
      startTime: z
        .string()
        .regex(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid start time format (HH:MM)"
        ),
      endTime: z
        .string()
        .regex(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Invalid end time format (HH:MM)"
        ),
      isAvailable: z.boolean().default(true),
    })
  ),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const opticianId = searchParams.get("opticianId");

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

    const workingHours = await prisma.opticianWorkingHours.findMany({
      where: { opticianId },
      orderBy: { dayOfWeek: "asc" },
    });

    return NextResponse.json(workingHours);
  } catch (error) {
    console.error("Error fetching working hours:", error);
    return NextResponse.json(
      { error: "Failed to fetch working hours" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a bulk operation
    if (body.workingHours && Array.isArray(body.workingHours)) {
      const validationResult = bulkWorkingHoursSchema.safeParse(body);
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

      // Delete existing working hours
      await prisma.opticianWorkingHours.deleteMany({
        where: { opticianId: data.opticianId },
      });

      // Create new working hours
      const createdHours = await prisma.opticianWorkingHours.createMany({
        data: data.workingHours.map((wh) => ({
          opticianId: data.opticianId,
          dayOfWeek: wh.dayOfWeek,
          startTime: wh.startTime,
          endTime: wh.endTime,
          isAvailable: wh.isAvailable,
        })),
      });

      // Fetch the created records to return
      const workingHours = await prisma.opticianWorkingHours.findMany({
        where: { opticianId: data.opticianId },
        orderBy: { dayOfWeek: "asc" },
      });

      return NextResponse.json(workingHours, { status: 201 });
    } else {
      // Single working hour creation
      const validationResult = workingHoursSchema.safeParse(body);
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

      // Check if working hours already exist for this day
      const existingHours = await prisma.opticianWorkingHours.findUnique({
        where: {
          opticianId_dayOfWeek: {
            opticianId: data.opticianId,
            dayOfWeek: data.dayOfWeek,
          },
        },
      });

      if (existingHours) {
        return NextResponse.json(
          { error: "Working hours already exist for this day" },
          { status: 409 }
        );
      }

      const workingHours = await prisma.opticianWorkingHours.create({
        data: {
          opticianId: data.opticianId,
          dayOfWeek: data.dayOfWeek,
          startTime: data.startTime,
          endTime: data.endTime,
          isAvailable: data.isAvailable,
        },
      });

      return NextResponse.json(workingHours, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating working hours:", error);
    return NextResponse.json(
      { error: "Failed to create working hours" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = workingHoursSchema.safeParse(body);
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

    // Check if working hours exist
    const existingHours = await prisma.opticianWorkingHours.findUnique({
      where: {
        opticianId_dayOfWeek: {
          opticianId: data.opticianId,
          dayOfWeek: data.dayOfWeek,
        },
      },
    });

    if (!existingHours) {
      return NextResponse.json(
        { error: "Working hours not found for this day" },
        { status: 404 }
      );
    }

    const updatedHours = await prisma.opticianWorkingHours.update({
      where: {
        opticianId_dayOfWeek: {
          opticianId: data.opticianId,
          dayOfWeek: data.dayOfWeek,
        },
      },
      data: {
        startTime: data.startTime,
        endTime: data.endTime,
        isAvailable: data.isAvailable,
      },
    });

    return NextResponse.json(updatedHours);
  } catch (error) {
    console.error("Error updating working hours:", error);
    return NextResponse.json(
      { error: "Failed to update working hours" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const opticianId = searchParams.get("opticianId");
    const dayOfWeek = searchParams.get("dayOfWeek");

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

    if (dayOfWeek) {
      // Delete specific day
      const day = parseInt(dayOfWeek);
      if (isNaN(day) || day < 0 || day > 6) {
        return NextResponse.json(
          { error: "Invalid day of week" },
          { status: 400 }
        );
      }

      await prisma.opticianWorkingHours.delete({
        where: {
          opticianId_dayOfWeek: {
            opticianId,
            dayOfWeek: day,
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Working hours deleted successfully",
      });
    } else {
      // Delete all working hours for optician
      await prisma.opticianWorkingHours.deleteMany({
        where: { opticianId },
      });

      return NextResponse.json({
        success: true,
        message: "All working hours deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting working hours:", error);
    return NextResponse.json(
      { error: "Failed to delete working hours" },
      { status: 500 }
    );
  }
}
