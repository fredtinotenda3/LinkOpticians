import { prisma } from "@/lib/prisma";
import {
  AppointmentCreateData,
  AppointmentWithRelations,
  ServiceResult,
  OperatingHours,
  AppointmentStatus,
} from "@/types";

export const appointmentService = {
  async createAppointment(
    data: AppointmentCreateData
  ): Promise<ServiceResult<AppointmentWithRelations>> {
    try {
      // Check for existing appointments at the same time
      const existingAppointment = await prisma.appointment.findFirst({
        where: {
          scheduledAt: data.scheduledAt,
          OR: [
            { branchId: data.branchId },
            ...(data.opticianId ? [{ opticianId: data.opticianId }] : []),
          ],
          status: {
            in: ["pending", "confirmed"] as AppointmentStatus[],
          },
        },
      });

      if (existingAppointment) {
        return {
          success: false,
          error: "Time slot is already booked",
        };
      }

      // Create the appointment with optician data if provided
      const appointment = await prisma.appointment.create({
        data: {
          patientName: data.patientName,
          phone: data.phone,
          email: data.email,
          serviceId: data.serviceId,
          branchId: data.branchId,
          opticianId: data.opticianId, // Include opticianId
          scheduledAt: data.scheduledAt,
          notes: data.notes,
          status: "pending" as AppointmentStatus,
        },
        include: {
          service: true,
          branch: true,
          optician: true, // Include optician in response
        },
      });

      return {
        success: true,
        data: appointment as AppointmentWithRelations,
      };
    } catch (error) {
      console.error("Appointment creation service error:", error);
      return {
        success: false,
        error: "Failed to create appointment",
      };
    }
  },

  async checkAvailability(
    branchId: string,
    serviceId: string,
    date: Date,
    opticianId?: string
  ): Promise<ServiceResult<string[]>> {
    try {
      // Get service duration
      const service = await prisma.service.findUnique({
        where: { id: serviceId },
      });

      if (!service) {
        return {
          success: false,
          error: "Service not found",
        };
      }

      // Get branch operating hours
      const branch = await prisma.branch.findUnique({
        where: { id: branchId },
      });

      if (!branch) {
        return {
          success: false,
          error: "Branch not found",
        };
      }

      // Parse operating hours (assuming format like "Mon-Fri: 08:00-17:00")
      const operatingHours = this.parseOperatingHours(branch.operatingHours);
      const serviceDuration = service.duration;

      // Generate available time slots
      const availableSlots = this.generateTimeSlots(
        date,
        operatingHours,
        serviceDuration
      );

      // Get existing appointments for the date
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const whereClause: {
        scheduledAt: { gte: Date; lte: Date };
        status: { in: AppointmentStatus[] };
        branchId?: string;
        opticianId?: string;
      } = {
        scheduledAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          in: ["pending", "confirmed"] as AppointmentStatus[],
        },
      };

      // Filter by branch and optionally by optician
      if (opticianId) {
        whereClause.opticianId = opticianId;
      } else {
        whereClause.branchId = branchId;
      }

      const existingAppointments = await prisma.appointment.findMany({
        where: whereClause,
        select: {
          scheduledAt: true,
          service: {
            select: {
              duration: true,
            },
          },
        },
      });

      // Filter out booked slots
      const bookedSlots = new Set<string>();
      existingAppointments.forEach((apt) => {
        const slotTime = new Date(apt.scheduledAt);
        bookedSlots.add(slotTime.toISOString());
      });

      const filteredSlots = availableSlots.filter(
        (slot) => !bookedSlots.has(new Date(slot).toISOString())
      );

      return {
        success: true,
        data: filteredSlots,
      };
    } catch (error) {
      console.error("Availability check error:", error);
      return {
        success: false,
        error: "Failed to check availability",
      };
    }
  },

  async getAppointmentsByDateRange(
    startDate: Date,
    endDate: Date,
    branchId?: string
  ): Promise<ServiceResult<AppointmentWithRelations[]>> {
    try {
      const whereClause: {
        scheduledAt: { gte: Date; lte: Date };
        branchId?: string;
      } = {
        scheduledAt: {
          gte: startDate,
          lte: endDate,
        },
      };

      if (branchId) {
        whereClause.branchId = branchId;
      }

      const appointments = await prisma.appointment.findMany({
        where: whereClause,
        include: {
          service: true,
          branch: true,
          optician: true, // Include optician data
        },
        orderBy: {
          scheduledAt: "asc",
        },
      });

      return {
        success: true,
        data: appointments as AppointmentWithRelations[],
      };
    } catch (error) {
      console.error("Get appointments error:", error);
      return {
        success: false,
        error: "Failed to fetch appointments",
      };
    }
  },

  // Helper methods
  parseOperatingHours(hoursString: string): OperatingHours {
    // Simple parser for operating hours format like "Mon-Fri: 08:00-17:00"
    const timeMatch = hoursString.match(/(\d{1,2}:\d{2})-(\d{1,2}:\d{2})/);
    if (timeMatch) {
      return {
        start: timeMatch[1],
        end: timeMatch[2],
      };
    }
    // Default fallback
    return {
      start: "08:00",
      end: "17:00",
    };
  },

  generateTimeSlots(
    date: Date,
    operatingHours: OperatingHours,
    duration: number
  ): string[] {
    const slots: string[] = [];
    const [startHour, startMinute] = operatingHours.start
      .split(":")
      .map(Number);
    const [endHour, endMinute] = operatingHours.end.split(":").map(Number);

    const startTime = new Date(date);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);

    const currentTime = new Date(startTime);

    while (currentTime < endTime) {
      slots.push(currentTime.toISOString());
      currentTime.setMinutes(currentTime.getMinutes() + duration);
    }

    return slots;
  },
};
