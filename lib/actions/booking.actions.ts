// ===== FILE: lib/actions/booking.actions.ts (FIXED - with proper return) =====

"use server";

import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { databases, users } from "../appwrite.config";
import { DATABASE_ID, APPOINTMENT_COLLECTION_ID, PATIENT_COLLECTION_ID } from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { sendAppointmentSMS } from "./appointment.actions";

interface CreateSimpleAppointmentParams {
  branchId: string;
  schedule: Date;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason?: string;
  smsOptIn?: boolean;
}

export const createSimpleAppointment = async (
  params: CreateSimpleAppointmentParams
) => {
  try {
    // Ensure phone number has proper format for Appwrite
    const formattedPhone = params.patientPhone.startsWith('+') 
      ? params.patientPhone 
      : `+${params.patientPhone.replace(/\D/g, '')}`;

    let user;
    try {
      user = await users.create(
        ID.unique(),
        params.patientEmail || `user_${Date.now()}@temp.com`,
        formattedPhone,
        undefined,
        params.patientName
      );
    } catch (error: any) {
      if (error?.code === 409) {
        const existingUsers = await users.list([
          Query.equal("email", [params.patientEmail || `user_${Date.now()}@temp.com`])
        ]);
        user = existingUsers.users[0];
      } else {
        user = { 
          $id: ID.unique(), 
          email: params.patientEmail || `user_${Date.now()}@temp.com`, 
          phone: formattedPhone, 
          name: params.patientName 
        };
      }
    }

    if (!user?.$id) {
      user = { 
        $id: ID.unique(), 
        email: params.patientEmail || `user_${Date.now()}@temp.com`, 
        phone: formattedPhone, 
        name: params.patientName 
      };
    }

    let patient;
    try {
      const existingPatients = await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        [Query.equal("userId", [user.$id])]
      );

      if (existingPatients.documents.length > 0) {
        patient = existingPatients.documents[0];
      } else {
        patient = await databases.createDocument(
          DATABASE_ID!,
          PATIENT_COLLECTION_ID!,
          ID.unique(),
          {
            userId: user.$id,
            name: params.patientName,
            email: params.patientEmail || `user_${Date.now()}@temp.com`,
            phone: formattedPhone,
            privacyConsent: true,
            identificationDocumentUrl: "simplified-booking-placeholder",
            address: "To be provided",
            emergencyContactName: params.patientName,
            emergencyContactNumber: formattedPhone,
            primaryPhysician: "To be assigned",
            insuranceProvider: "Not provided",
            insurancePolicyNumber: "Not provided",
            birthDate: "1900-01-01",
            gender: "other",
          }
        );
      }
    } catch (error) {
      console.error("Error creating/finding patient:", error);
      throw error;
    }

    const appointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      {
        userId: user.$id,
        patient: patient.$id,
        branchId: params.branchId,
        schedule: params.schedule,
        status: "pending",
        reason: params.reason || "General appointment",
        note: `Created via simplified booking. SMS Opt-in: ${params.smsOptIn !== false ? 'Yes' : 'No'}`,
        primaryPhysician: "To be assigned",
      }
    );

    // Send SMS only if opted in (default is true)
    if (params.patientPhone && params.smsOptIn !== false) {
      await sendAppointmentSMS(
        formattedPhone,
        'confirmation',
        {
          patientName: params.patientName,
          appointmentDate: params.schedule,
          branchName: "our clinic",
        }
      );
    }

    revalidatePath("/admin");
    
    // IMPORTANT: Return the booking ID for redirect
    // Use $id (Appwrite's document ID) which is what the confirmation page expects
    return parseStringify({
      success: true,
      bookingId: appointment.$id,  // This is the document ID
      appointmentId: appointment.$id,  // Also return as appointmentId for clarity
      appointment,
    });
  } catch (error) {
    console.error("Appointment scheduling failed:", error);
    return { success: false, error: "Appointment scheduling failed" };
  }
};