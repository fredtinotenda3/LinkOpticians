import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";

const availabilitySchema = z.object({
  branchId: z.string().min(1, "Branch ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  date: z.string().datetime(),
  opticianId: z.string().optional(), // Add opticianId to schema
  includeWorkingHours: z.boolean().default(true), // New parameter for advanced availability
  includeTimeOff: z.boolean().default(true), // New parameter for advanced availability
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");
    const opticianId = searchParams.get("opticianId"); // Get opticianId from query params
    const includeWorkingHours =
      searchParams.get("includeWorkingHours") !== "false";
    const includeTimeOff = searchParams.get("includeTimeOff") !== "false";

    console.log("Availability check params:", {
      branchId,
      serviceId,
      date,
      opticianId,
      includeWorkingHours,
      includeTimeOff,
    });

    const validationResult = availabilitySchema.safeParse({
      branchId,
      serviceId,
      date,
      opticianId: opticianId || undefined, // Convert null to undefined
      includeWorkingHours,
      includeTimeOff,
    });

    if (!validationResult.success) {
      console.log("Validation error:", validationResult.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid parameters",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;
    const result = await appointmentService.checkAvailability(
      data.branchId,
      data.serviceId,
      new Date(data.date),
      data.opticianId // Pass opticianId to service
    );

    console.log("Availability result:", result);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    // Add null check for result.data
    if (!result.data) {
      return NextResponse.json(
        {
          success: false,
          error: "No availability data returned",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Availability check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// New endpoint for advanced availability checking with optician-specific constraints
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const advancedAvailabilitySchema = z.object({
      branchId: z.string().min(1, "Branch ID is required"),
      serviceId: z.string().min(1, "Service ID is required"),
      startDate: z.string().datetime("Invalid start date"),
      endDate: z.string().datetime("Invalid end date"),
      opticianId: z.string().optional(),
      includeWorkingHours: z.boolean().default(true),
      includeTimeOff: z.boolean().default(true),
    });

    const validationResult = advancedAvailabilitySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid parameters",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    // Get service duration
    const { prisma } = await import("@/lib/prisma");
    const service = await prisma.service.findUnique({
      where: { id: data.serviceId },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "Service not found",
        },
        { status: 404 }
      );
    }

    // Generate dates between start and end date
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const dates: Date[] = [];

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }

    // Check availability for each date
    const availabilityResults = await Promise.all(
      dates.map(async (date) => {
        const result = await appointmentService.checkAvailability(
          data.branchId,
          data.serviceId,
          date,
          data.opticianId
        );

        return {
          date: date.toISOString().split("T")[0],
          availableSlots: result.success && result.data ? result.data : [],
          isAvailable:
            result.success && result.data ? result.data.length > 0 : false,
        };
      })
    );

    // If optician is specified, get their working hours and time off for context
    let opticianDetails = null;
    if (data.opticianId) {
      // FIXED: Use the correct include syntax with regenerated Prisma client
      const optician = await prisma.optician.findUnique({
        where: { id: data.opticianId },
        include: {
          branch: true,
          workingHours: {
            orderBy: { dayOfWeek: "asc" },
          },
          timeOff: {
            where: {
              OR: [
                {
                  startDate: { lte: endDate },
                  endDate: { gte: startDate },
                },
              ],
            },
            orderBy: { startDate: "asc" },
          },
        },
      });

      if (optician) {
        opticianDetails = {
          id: optician.id,
          name: optician.name,
          branch: optician.branch.name,
          workingHours: optician.workingHours,
          timeOff: optician.timeOff,
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        availability: availabilityResults,
        optician: opticianDetails,
        service: {
          id: service.id,
          name: service.name,
          duration: service.duration,
        },
        dateRange: {
          start: data.startDate,
          end: data.endDate,
        },
      },
    });
  } catch (error) {
    console.error("Advanced availability check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// New endpoint to check optician-specific availability
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const opticianAvailabilitySchema = z.object({
      opticianId: z.string().min(1, "Optician ID is required"),
      dateTime: z.string().datetime("Invalid date time"),
    });

    const validationResult = opticianAvailabilitySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid parameters",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const { data } = validationResult;

    const availability = await appointmentService.checkOpticianAvailability(
      data.opticianId,
      new Date(data.dateTime)
    );

    return NextResponse.json({
      success: true,
      data: availability,
    });
  } catch (error) {
    console.error("Optician availability check error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
