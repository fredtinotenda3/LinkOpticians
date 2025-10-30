import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";

const availabilitySchema = z.object({
  branchId: z.string().min(1, "Branch ID is required"),
  serviceId: z.string().min(1, "Service ID is required"),
  date: z.string().datetime(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const branchId = searchParams.get("branchId");
    const serviceId = searchParams.get("serviceId");
    const date = searchParams.get("date");

    console.log("Availability check params:", { branchId, serviceId, date });

    const validationResult = availabilitySchema.safeParse({
      branchId,
      serviceId,
      date,
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
      new Date(data.date)
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
