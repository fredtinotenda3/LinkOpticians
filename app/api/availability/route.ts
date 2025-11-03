import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";

const availabilitySchema = z.object({
  branchId: z.string().min(1, "Branch ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  date: z.string().datetime(),
  opticianId: z.string().optional(), // Add opticianId to schema
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");
    const opticianId = searchParams.get("opticianId"); // Get opticianId from query params

    console.log("Availability check params:", {
      branchId,
      serviceId,
      date,
      opticianId,
    });

    const validationResult = availabilitySchema.safeParse({
      branchId,
      serviceId,
      date,
      opticianId: opticianId || undefined, // Convert null to undefined
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
