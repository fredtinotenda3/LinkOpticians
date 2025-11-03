===============================
  types\index.ts
===============================
`$lang
export interface AppointmentCreateData {
  patientName: string;
  phone: string;
  email?: string;
  serviceId: string;
  branchId: string;
  scheduledAt: Date;
  notes?: string;
}

export interface AppointmentUpdateData {
  patientName?: string;
  phone?: string;
  email?: string;
  serviceId?: string;
  branchId?: string;
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
  description?: string;
  duration: number;
  price?: number;
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

```

