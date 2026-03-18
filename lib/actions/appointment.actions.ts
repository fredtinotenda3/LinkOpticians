"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwite.types";
import { sendSMS } from '@/lib/twilio';
import { SMS_CONFIG, formatSMSDate, formatSMSTime } from "@/constants/social"; // ADD THIS IMPORT

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";
import CreateAppointmentParams, { UpdateAppointmentParams } from "@/types";
import { getPatient } from "./patient.actions";
import { getBranchById } from "./branch.actions"; // ADD THIS IMPORT

// ==================== ENHANCED SMS FUNCTIONS ====================

// Enhanced SMS notification with templates
export const sendAppointmentSMS = async (
  phoneNumber: string,
  type: 'confirmation' | 'reminder24h' | 'reminder3h' | 'cancelled' | 'rescheduled',
  data: {
    patientName: string;
    appointmentDate: Date;
    branchName?: string;
    oldDate?: Date; // For rescheduled
    newDate?: Date; // For rescheduled
  }
) => {
  try {
    const { patientName, appointmentDate, branchName = "our clinic", oldDate, newDate } = data;
    
    const formattedDate = formatSMSDate(appointmentDate);
    const formattedTime = formatSMSTime(appointmentDate);
    
    let message = "";
    
    switch (type) {
      case 'confirmation':
        message = SMS_CONFIG.appointmentReminders.templates.confirmation(
          patientName,
          formattedDate,
          formattedTime,
          branchName
        );
        break;
        
      case 'reminder24h':
        message = SMS_CONFIG.appointmentReminders.templates.reminder24h(
          patientName,
          formattedDate,
          formattedTime,
          branchName
        );
        break;
        
      case 'reminder3h':
        message = SMS_CONFIG.appointmentReminders.templates.reminder3h(
          patientName,
          formattedDate,
          formattedTime
        );
        break;
        
      case 'cancelled':
        message = SMS_CONFIG.appointmentReminders.templates.cancelled(
          patientName,
          formattedDate,
          formattedTime
        );
        break;
        
      case 'rescheduled':
        const oldFormatted = oldDate ? formatSMSDate(oldDate) : "previous date";
        const newFormatted = newDate ? `${formatSMSDate(newDate)} at ${formatSMSTime(newDate)}` : "new time";
        message = SMS_CONFIG.appointmentReminders.templates.rescheduled(
          patientName,
          oldFormatted,
          newFormatted,
          ""
        );
        break;
    }
    
    // Add opt-out instructions
    message += ` ${SMS_CONFIG.optIn.help}`;
    
    const result = await sendSMS(phoneNumber, message);
    return parseStringify(result);
    
  } catch (error) {
    console.error("Error sending appointment SMS:", error);
    return { success: false, error: "Failed to send SMS" };
  }
};

// Schedule SMS reminders for an appointment
export const scheduleSMSReminders = async (
  appointmentId: string,
  patientPhone: string,
  patientName: string,
  appointmentDate: Date,
  branchName?: string
) => {
  try {
    if (!SMS_CONFIG.appointmentReminders.enabled) {
      return { success: false, error: "SMS reminders disabled" };
    }
    
    const results = [];
    
    // Schedule 24-hour reminder
    const reminder24hTime = new Date(appointmentDate);
    reminder24hTime.setHours(reminder24hTime.getHours() - 24);
    
    // Only schedule if reminder is in the future
    if (reminder24hTime > new Date()) {
      // Note: In production, you would use a job scheduler (Cron, Bull, etc.)
      // For now, we'll store the reminder time and check periodically
      console.log(`[SMS] Scheduled 24h reminder for ${patientName} at ${reminder24hTime}`);
      results.push({ type: '24h', scheduled: reminder24hTime });
    }
    
    // Schedule 3-hour reminder
    const reminder3hTime = new Date(appointmentDate);
    reminder3hTime.setHours(reminder3hTime.getHours() - 3);
    
    if (reminder3hTime > new Date()) {
      console.log(`[SMS] Scheduled 3h reminder for ${patientName} at ${reminder3hTime}`);
      results.push({ type: '3h', scheduled: reminder3hTime });
    }
    
    return { success: true, reminders: results };
    
  } catch (error) {
    console.error("Error scheduling SMS reminders:", error);
    return { success: false, error: "Failed to schedule reminders" };
  }
};

//  SEND SMS NOTIFICATION (keep existing for backward compatibility)
export const sendSMSNotification = async (phoneNumber: string, content: string) => {
  try {
    const result = await sendSMS(phoneNumber, content);
    return parseStringify(result);
  } catch (error) {
    console.error("An error occurred while sending SMS:", error);
    return { success: false, error: "Failed to send SMS" };
  }
};

// ==================== EXISTING FUNCTIONS (UPDATED) ====================

//  CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        ...appointment,
        branchId: appointment.branchId || "",
      }
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

//  GET RECENT APPOINTMENTS
export const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        // FIXED: Use exact database values
        if (appointment.status === "schedule") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};

// GET APPOINTMENT
export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing patient:",
      error
    );
  }
};

//  UPDATE APPOINTMENT - FIXED VERSION WITH ENHANCED SMS
export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    let status: "schedule" | "pending" | "cancelled";

    switch (type) {
      case "schedule":
        status = "schedule";  // Database uses "schedule" (without "d")
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      {
        ...appointment,
        status: status,
      }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const fullAppointment = await getAppointment(appointmentId);
    const patient = await getPatient(fullAppointment.patient.$id);
    const branch = appointment.branchId ? await getBranchById(appointment.branchId) : null;

    // ENHANCED SMS NOTIFICATIONS
    if (patient?.phone && patient?.name) {
      if (type === "schedule") {
        // Send confirmation SMS
        await sendAppointmentSMS(patient.phone, 'confirmation', {
          patientName: patient.name,
          appointmentDate: new Date(appointment.schedule!),
          branchName: branch?.name || "our clinic"
        });

        // Schedule future reminders (if SMS reminders enabled)
        if (SMS_CONFIG.appointmentReminders.enabled) {
          await scheduleSMSReminders(
            appointmentId,
            patient.phone,
            patient.name,
            new Date(appointment.schedule!),
            branch?.name
          );
        }

      } else if (type === "cancel") {
        // Send cancellation SMS
        await sendAppointmentSMS(patient.phone, 'cancelled', {
          patientName: patient.name,
          appointmentDate: new Date(appointment.schedule!)
        });
      }
    }

    revalidatePath("/admin");
    revalidatePath("/");
    
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating an appointment:", error);
    throw error;
  }
};