===============================
  lib\prisma.ts
===============================
`$lang
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```

===============================
  lib\services\appointment-service.ts
===============================
`$lang
import { prisma } from "@/lib/prisma";
import { AppointmentCreateData, AppointmentUpdateData } from "@/types";

export class AppointmentService {
  // Create new appointment
  async createAppointment(data: AppointmentCreateData) {
    try {
      const appointment = await prisma.appointment.create({
        data: {
          patientName: data.patientName,
          phone: data.phone,
          email: data.email,
          serviceId: data.serviceId,
          branchId: data.branchId,
          scheduledAt: data.scheduledAt,
          notes: data.notes,
          status: "pending",
        },
        include: {
          service: true,
          branch: true,
        },
      });

      return { success: true, data: appointment };
    } catch (error) {
      console.error("Error creating appointment:", error);
      return { success: false, error: "Failed to create appointment" };
    }
  }

  // Get appointment by ID
  async getAppointment(id: string) {
    try {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: {
          service: true,
          branch: true,
        },
      });

      if (!appointment) {
        return { success: false, error: "Appointment not found" };
      }

      return { success: true, data: appointment };
    } catch (error) {
      console.error("Error fetching appointment:", error);
      return { success: false, error: "Failed to fetch appointment" };
    }
  }

  // Update appointment
  async updateAppointment(id: string, data: AppointmentUpdateData) {
    try {
      const appointment = await prisma.appointment.update({
        where: { id },
        data,
        include: {
          service: true,
          branch: true,
        },
      });

      return { success: true, data: appointment };
    } catch (error) {
      console.error("Error updating appointment:", error);
      return { success: false, error: "Failed to update appointment" };
    }
  }

  // Get appointments by date range
  async getAppointmentsByDateRange(
    startDate: Date,
    endDate: Date,
    branchId?: string
  ) {
    try {
      // Use a type-safe approach without Prisma namespace
      const whereClause = {
        scheduledAt: {
          gte: startDate,
          lte: endDate,
        },
        ...(branchId && { branchId }),
      };

      const appointments = await prisma.appointment.findMany({
        where: whereClause,
        include: {
          service: true,
          branch: true,
        },
        orderBy: {
          scheduledAt: "asc",
        },
      });

      return { success: true, data: appointments };
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return { success: false, error: "Failed to fetch appointments" };
    }
  }

  // Check availability
  // Check availability
  async checkAvailability(branchId: string, serviceId: string, date: Date) {
    try {
      console.log("Checking availability for:", { branchId, serviceId, date });

      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        console.log("Service not found:", serviceId);
        return { success: false, error: "Service not found" };
      }

      console.log("Found service:", service);

      // Get start and end of the day
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      console.log("Date range:", { startOfDay, endOfDay });

      // Get existing appointments for that day
      const existingAppointments = await prisma.appointment.findMany({
        where: {
          branchId,
          scheduledAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
          status: {
            in: ["pending", "confirmed"],
          },
        },
        select: {
          scheduledAt: true,
          service: {
            select: {
              duration: true,
            },
          },
        },
      });

      console.log("Existing appointments:", existingAppointments.length);

      // Generate available time slots
      const availableSlots = this.generateTimeSlots(
        date,
        service.duration,
        existingAppointments
      );

      console.log("Available slots:", availableSlots.length);

      return { success: true, data: availableSlots };
    } catch (error) {
      console.error("Error checking availability:", error);
      return { success: false, error: "Failed to check availability" };
    }
  }

  private generateTimeSlots(
    date: Date,
    duration: number,
    existingAppointments: Array<{
      scheduledAt: Date;
      service: { duration: number };
    }>
  ) {
    const slots: Date[] = [];
    const startTime = 8 * 60; // 8:00 AM in minutes
    const endTime = 17 * 60; // 5:00 PM in minutes
    const slotDuration = 30; // 30-minute intervals

    for (
      let time = startTime;
      time <= endTime - duration;
      time += slotDuration
    ) {
      const slotStart = new Date(date);
      slotStart.setHours(Math.floor(time / 60), time % 60, 0, 0);

      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + duration);

      // Check if slot conflicts with existing appointments
      const hasConflict = existingAppointments.some((appointment) => {
        const appointmentStart = new Date(appointment.scheduledAt);
        const appointmentEnd = new Date(appointmentStart);
        appointmentEnd.setMinutes(
          appointmentEnd.getMinutes() + appointment.service.duration
        );

        return slotStart < appointmentEnd && slotEnd > appointmentStart;
      });

      if (!hasConflict) {
        slots.push(slotStart);
      }
    }

    return slots;
  }
}

export const appointmentService = new AppointmentService();

```

===============================
  lib\twilio.ts
===============================
`$lang
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function sendSMS(to: string, message: string) {
  try {
    // Format Zimbabwe numbers properly
    let formattedTo = to.trim();

    // Remove any spaces, dashes, etc.
    formattedTo = formattedTo.replace(/[\s\-\(\)]/g, "");

    // Ensure it starts with +263 for Zimbabwe numbers
    if (formattedTo.startsWith("0")) {
      // Convert 078... to +26378...
      formattedTo = "+263" + formattedTo.slice(1);
    } else if (!formattedTo.startsWith("+")) {
      // Add + if missing
      formattedTo = "+" + formattedTo;
    }

    // Ensure it's a valid Zimbabwe number format
    if (!formattedTo.startsWith("+263")) {
      console.warn("⚠️  Number may not be Zimbabwe format:", formattedTo);
    }

    console.log(`📱 Attempting to send SMS to: ${formattedTo}`);
    console.log(`💬 Message: ${message}`);

    const result = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: formattedTo,
    });

    console.log("✅ SMS sent successfully:", result.sid);
    return { success: true, messageId: result.sid };
  } catch (error: unknown) {
    console.error("❌ SMS error:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send SMS";
    if (error instanceof Error) {
      if ("code" in error) {
        const errorCode = (error as { code?: number }).code;
        if (errorCode === 21211) {
          errorMessage = "Invalid phone number format";
        } else if (errorCode === 21408) {
          errorMessage = "Twilio account not authorized to send to this region";
        } else if (errorCode === 21610) {
          errorMessage = "Phone number is not SMS capable";
        }
      }
    }

    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

```

