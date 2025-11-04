import { NextRequest, NextResponse } from "next/server";
import { appointmentService } from "@/lib/services/appointment-service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendSMS } from "@/lib/twilio";
import {
  AppointmentUpdateData,
  AppointmentWithRelations,
  AppointmentStatus,
} from "@/types";

const updateAppointmentSchema = z.object({
  status: z
    .enum(["pending", "confirmed", "completed", "cancelled", "no_show"])
    .optional(),
  patientName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .optional(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  serviceId: z.string().cuid("Invalid service ID").optional(),
  branchId: z.string().cuid("Invalid branch ID").optional(),
  opticianId: z
    .string()
    .cuid("Invalid optician ID")
    .optional()
    .or(z.literal("")),
  scheduledAt: z.string().datetime("Invalid date time").optional(),
  notes: z.string().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    const body = await request.json();

    const validationResult = updateAppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    console.log("Updating appointment:", {
      appointmentId,
      data: validationResult.data,
    });

    // Get current appointment to compare changes
    const currentAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: true,
        branch: true,
        optician: true,
      },
    });

    if (!currentAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Prepare update data with proper type handling
    const updateData: AppointmentUpdateData = {
      ...validationResult.data,
      scheduledAt: validationResult.data.scheduledAt
        ? new Date(validationResult.data.scheduledAt)
        : undefined,
    };

    // Handle opticianId conversion properly
    if (updateData.opticianId === "") {
      updateData.opticianId = undefined; // Set to undefined to let Prisma handle as null
    }

    // FIXED: Changed from createAppointment to updateAppointment
    const result = await appointmentService.updateAppointment(
      appointmentId,
      updateData
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Send SMS if status changed - FIXED: Added null check for result.data
    if (
      validationResult.data.status &&
      currentAppointment.status !== validationResult.data.status &&
      result.data // Check that data exists
    ) {
      try {
        let smsMessage = `Hi ${result.data.patientName}! Your appointment status has been updated to: ${validationResult.data.status}.`;

        // Include optician info if available
        if (result.data.optician) {
          smsMessage += ` Your assigned optician: ${result.data.optician.name}.`;
        }

        smsMessage += ` For questions, call ${result.data.branch.phone}.`;

        await sendSMS(result.data.phone, smsMessage);
      } catch (smsError) {
        console.error("Failed to send status update SMS:", smsError);
      }
    }

    // FIXED: Check that data exists before returning
    if (!result.data) {
      return NextResponse.json(
        { error: "Appointment data not returned from service" },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data);
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    // Get appointment details before deletion for SMS
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        branch: true,
        optician: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    // Send cancellation SMS
    try {
      let smsMessage = `Hi ${appointment.patientName}! Your appointment has been cancelled.`;

      // Include optician info if available
      if (appointment.optician) {
        smsMessage += ` Your assigned optician was: ${appointment.optician.name}.`;
      }

      smsMessage += ` If this was a mistake, please call ${appointment.branch.phone}.`;

      await sendSMS(appointment.phone, smsMessage);
    } catch (smsError) {
      console.error("Failed to send cancellation SMS:", smsError);
    }

    return NextResponse.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const { id: appointmentId } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        service: true,
        branch: true,
        optician: {
          include: {
            branch: true,
          },
        },
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment as AppointmentWithRelations);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}
