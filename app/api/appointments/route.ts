import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSMS } from "@/lib/twilio";
import { AppointmentCreateData, AppointmentWithRelations } from "@/types";

const createAppointmentSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email().optional().or(z.literal("")),
  serviceId: z.string().cuid("Invalid service ID"),
  branchId: z.string().cuid("Invalid branch ID"),
  opticianId: z
    .string()
    .cuid("Invalid optician ID")
    .optional()
    .or(z.literal("")),
  scheduledAt: z.string().datetime("Invalid date time"),
  notes: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();

    const validationResult = createAppointmentSchema.safeParse(body);
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

    // Prepare appointment data including opticianId if provided
    const appointmentData: AppointmentCreateData = {
      ...data,
      scheduledAt: new Date(data.scheduledAt),
      opticianId: data.opticianId || undefined, // Convert empty string to undefined
    };

    const result = await appointmentService.createAppointment(appointmentData);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Send real SMS notification after successful appointment creation
    if (result.success && result.data) {
      try {
        // Get service, branch, and optician details for the SMS
        const service = await prisma.service.findUnique({
          where: { id: data.serviceId },
        });

        const branch = await prisma.branch.findUnique({
          where: { id: data.branchId },
        });

        const optician = data.opticianId
          ? await prisma.optician.findUnique({
              where: { id: data.opticianId },
            })
          : null;

        if (service && branch) {
          let smsMessage = `Hi ${data.patientName}! Your ${
            service.name
          } appointment at ${branch.name} is confirmed for ${new Date(
            data.scheduledAt
          ).toLocaleString()}.`;

          // Include optician info in SMS if available
          if (optician) {
            smsMessage += ` Your optician: ${optician.name}.`;
          }

          smsMessage += " Thank you for choosing Link Opticians!";

          await sendSMS(data.phone, smsMessage);
        }
      } catch (smsError) {
        console.error("Failed to send SMS:", smsError);
        // Don't fail the appointment creation if SMS fails
      }
    }

    return NextResponse.json(result.data, { status: 201 });
  } catch (error) {
    console.error("Appointment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const branchId = searchParams.get("branchId");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "startDate and endDate are required" },
        { status: 400 }
      );
    }

    const result = await appointmentService.getAppointmentsByDateRange(
      new Date(startDate),
      new Date(endDate),
      branchId || undefined
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Appointments fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
