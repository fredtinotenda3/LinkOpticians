// ===== FILE: lib/actions/appointment.actions.ts (FIXED - remove remindersSent) =====

"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwite.types";
import { sendSMS } from '@/lib/twilio';
import { SMS_CONFIG, formatSMSDate, formatSMSTime } from "@/constants/social";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import CreateAppointmentParams, { UpdateAppointmentParams } from "@/types";
import { getPatient } from "./patient.actions";
import { getBranchById } from "./branch.actions";

// ==================== SMS FUNCTIONS ====================

export const sendAppointmentSMS = async (
  phoneNumber: string,
  type: 'confirmation' | 'reminder24h' | 'reminder3h' | 'cancelled' | 'rescheduled',
  data: {
    patientName: string;
    appointmentDate: Date;
    branchName?: string;
    oldDate?: Date;
    newDate?: Date;
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
    
    message += ` ${SMS_CONFIG.optIn.help}`;
    
    const result = await sendSMS(phoneNumber, message);
    return parseStringify(result);
    
  } catch (error) {
    console.error("Error sending appointment SMS:", error);
    return { success: false, error: "Failed to send SMS" };
  }
};

// ==================== EXISTING FUNCTIONS ====================

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
        // REMOVED: remindersSent field
      }
    );

    revalidatePath("/admin");
    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

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

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    let status: "schedule" | "pending" | "cancelled";

    switch (type) {
      case "schedule":
        status = "schedule";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    // REMOVED: Get existing appointment and remindersSent logic

    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      {
        ...appointment,
        status: status,
        // REMOVED: remindersSent field
      }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const fullAppointment = await getAppointment(appointmentId);
    const patient = await getPatient(fullAppointment.patient.$id);
    const branch = appointment.branchId ? await getBranchById(appointment.branchId) : null;

    // SMS NOTIFICATIONS
    if (patient?.phone && patient?.name) {
      if (type === "schedule") {
        // Send confirmation SMS
        await sendAppointmentSMS(patient.phone, 'confirmation', {
          patientName: patient.name,
          appointmentDate: new Date(appointment.schedule!),
          branchName: branch?.name || "our clinic"
        });
      } else if (type === "cancel") {
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