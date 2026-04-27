// ===== FILE: lib/doctors.ts (CREATE NEW FILE) =====

/**
 * Doctor data management
 * Falls back to constants if database is empty
 */

import { Doctors as STATIC_DOCTORS } from "@/constants";

export interface Doctor {
  name: string;
  image: string;
  specialty?: string;
}

/**
 * Get doctors from database or fallback to static
 */
export async function getDoctors(): Promise<Doctor[]> {
  try {
    // Attempt to fetch from Appwrite (if you create a doctors collection)
    // const doctorsCollection = await databases.listDocuments(...);
    // if (doctorsCollection.documents.length > 0) {
    //   return doctorsCollection.documents;
    // }
    
    // Fallback to static doctors
    return STATIC_DOCTORS;
  } catch (error) {
    console.warn("Failed to fetch doctors, using static fallback");
    return STATIC_DOCTORS;
  }
}

/**
 * Get doctor by name
 */
export async function getDoctorByName(name: string): Promise<Doctor | undefined> {
  const doctors = await getDoctors();
  return doctors.find(d => d.name === name);
}