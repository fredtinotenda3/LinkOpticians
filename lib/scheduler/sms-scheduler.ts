// ===== FILE: lib/scheduler/sms-scheduler.ts (CREATE NEW) =====
import { databases } from "@/lib/appwrite.config";
import { DATABASE_ID, APPOINTMENT_COLLECTION_ID } from "@/lib/appwrite.config";
import { Query } from "node-appwrite";
import { sendAppointmentSMS } from "@/lib/actions/appointment.actions";

export interface AppointmentWithPatient {
  $id: string;
  schedule: Date;
  status: string;
  patient: {
    $id: string;
    name: string;
    phone: string;
    smsOptIn?: boolean;
  };
  branchName?: string;
  remindersSent: {
    reminder24h: boolean;
    reminder3h: boolean;
  };
}

export async function getAppointmentsNeedingReminders() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59, 999);
  
  try {
    const appointments = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [
        Query.equal("status", ["schedule"]),
        Query.greaterThan("schedule", now.toISOString()),
        Query.lessThan("schedule", tomorrow.toISOString()),
      ]
    );
    
    return appointments.documents as unknown as AppointmentWithPatient[];
  } catch (error) {
    console.error("Error fetching appointments for reminders:", error);
    return [];
  }
}

export async function process24HourReminders() {
  const appointments = await getAppointmentsNeedingReminders();
  const now = new Date();
  const results = [];
  
  for (const apt of appointments) {
    const appointmentDate = new Date(apt.schedule);
    const hoursUntilAppointment = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    // Send 24-hour reminder (between 24-25 hours before)
    if (hoursUntilAppointment <= 24.5 && hoursUntilAppointment >= 23.5 && !apt.remindersSent?.reminder24h) {
      const result = await sendAppointmentSMS(
        apt.patient.phone,
        "reminder24h",
        {
          patientName: apt.patient.name,
          appointmentDate: appointmentDate,
          branchName: apt.branchName,
        }
      );
      
      if (result.success) {
        await markReminderSent(apt.$id, "reminder24h");
      }
      results.push({ appointmentId: apt.$id, type: "24h", success: result.success });
    }
    
    // Send 3-hour reminder (between 3-4 hours before)
    if (hoursUntilAppointment <= 4 && hoursUntilAppointment >= 2.5 && !apt.remindersSent?.reminder3h) {
      const result = await sendAppointmentSMS(
        apt.patient.phone,
        "reminder3h",
        {
          patientName: apt.patient.name,
          appointmentDate: appointmentDate,
        }
      );
      
      if (result.success) {
        await markReminderSent(apt.$id, "reminder3h");
      }
      results.push({ appointmentId: apt.$id, type: "3h", success: result.success });
    }
  }
  
  return results;
}

export async function markReminderSent(appointmentId: string, reminderType: "reminder24h" | "reminder3h") {
  try {
    const current = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );
    
    const remindersSent = current.remindersSent || { reminder24h: false, reminder3h: false };
    remindersSent[reminderType] = true;
    
    await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      { remindersSent }
    );
  } catch (error) {
    console.error(`Error marking ${reminderType} as sent:`, error);
  }
}