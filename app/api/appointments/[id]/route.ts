import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendSMS } from "@/lib/twilio";
import { AppointmentUpdateData } from "@/types";

const updateAppointmentSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
  patientName: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  email: z.string().email().optional().or(z.literal("")),
  opticianId: z.string().cuid().optional().or(z.literal("")), // Add opticianId to schema
  notes: z.string().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    const body = await request.json();

    const validationResult = updateAppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid data", details: validationResult.error.issues },
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
        optician: true, // Include optician data
      },
    });

    // Prepare update data with proper type handling for opticianId
    const updateData: AppointmentUpdateData = { ...validationResult.data };

    // Handle opticianId conversion properly
    if (updateData.opticianId === "") {
      delete updateData.opticianId; // Remove the field to let Prisma handle it as null
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        service: true,
        branch: true,
        optician: true, // Include optician in response
      },
    });

    // Send SMS if status changed
    if (
      validationResult.data.status &&
      currentAppointment &&
      currentAppointment.status !== validationResult.data.status
    ) {
      try {
        let smsMessage = `Hi ${updatedAppointment.patientName}! Your appointment status has been updated to: ${validationResult.data.status}.`;

        // Include optician info if available
        if (updatedAppointment.optician) {
          smsMessage += ` Your assigned optician: ${updatedAppointment.optician.name}.`;
        }

        smsMessage += ` For questions, call ${updatedAppointment.branch.phone}.`;

        await sendSMS(updatedAppointment.phone, smsMessage);
      } catch (smsError) {
        console.error("Failed to send status update SMS:", smsError);
      }
    }

    return NextResponse.json(updatedAppointment);
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params Promise
    const { id: appointmentId } = await params;

    // Get appointment details before deletion for SMS
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        branch: true,
        optician: true, // Include optician data
      },
    });

    await prisma.appointment.delete({
      where: { id: appointmentId },
    });

    // Send cancellation SMS
    if (appointment) {
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
