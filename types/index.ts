export interface AppointmentCreateData {
  patientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  branchId: string;
  opticianId?: string;
  scheduledAt: Date;
  notes?: string;
}

export interface AppointmentUpdateData {
  patientName?: string;
  phone?: string;
  email?: string;
  serviceId?: string;
  branchId?: string;
  opticianId?: string;
  scheduledAt?: Date;
  status?: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Service {
  id: string;
  name: string;
  description?: string | null; // Changed from string | undefined to string | null
  duration: number;
  price?: number | null; // Changed from number | undefined to number | null
  isActive: boolean;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
}

export interface Optician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty?: string | null; // Changed from string | undefined to string | null
  isActive: boolean;
  branchId: string;
  branch: Branch;
}
