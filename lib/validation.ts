import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  occupation: z
    .string()
    .min(2, "Occupation must be at least 2 characters")
    .max(500, "Occupation must be at most 500 characters"),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters")
    .max(50, "Contact name must be at most 50 characters"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Invalid phone number"
    ),
  primaryPhysician: z.string().min(2, "Select at least one doctor"),
  insuranceProvider: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  insurancePolicyNumber: z
    .string()
    .min(2, "Policy number must be at least 2 characters")
    .max(50, "Policy number must be at most 50 characters"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to privacy in order to proceed",
    }),
});

// ADDED: Status validation schema that matches database values
export const StatusSchema = z.enum(["pending", "schedule", "cancelled"]);

// UPDATED: Added branchId, made primaryPhysician optional, added status validation
export const CreateAppointmentSchema = z.object({
  branchId: z.string().min(1, "Please select a branch"),
  primaryPhysician: z.string().optional(),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
  // ADDED: Status field with proper validation
  status: StatusSchema.optional().default("pending"),
});

// UPDATED: Added branchId, made primaryPhysician optional, added status validation
export const ScheduleAppointmentSchema = z.object({
  branchId: z.string().min(1, "Please select a branch"),
  primaryPhysician: z.string().optional(),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
  // ADDED: Status field
  status: StatusSchema.optional().default("schedule"),
});

// UPDATED: Added branchId, made primaryPhysician optional, added status validation
export const CancelAppointmentSchema = z.object({
  branchId: z.string().min(1, "Please select a branch"),
  primaryPhysician: z.string().optional(),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
  // ADDED: Status field
  status: StatusSchema.optional().default("cancelled"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

export const AppointmentFormValidation = z.union([
  CreateAppointmentSchema,
  ScheduleAppointmentSchema,
  CancelAppointmentSchema,
]);

// NEW: Simplified booking schema for Link Opticians
export const SimpleBookingSchema = z.object({
  branchId: z.string().min(1, "Please select a branch"),
  schedule: z.coerce.date(),
  patientName: z.string().min(2, "Name must be at least 2 characters"),
  patientEmail: z.string().email("Invalid email address").or(z.literal("")), // Make optional
  patientPhone: z
    .string()
    .refine((phone) => phone === "" || /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  reason: z
    .string()
    .max(200, "Reason must be at most 200 characters")
    .optional(),
});

// NEW: Branch schema validation - UPDATED to match database
export const BranchSchema = z.object({
  name: z.string().min(2, "Branch name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  phone: z.string().min(5, "Phone must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  operatingHours: z.string().min(5, "Operating hours must be provided"),
  services: z.array(z.string()).min(1, "At least one service must be provided"),
  doctors: z.array(z.string()).optional(),
  isActive: z.boolean().default(true),
});