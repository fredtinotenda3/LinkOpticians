===============================
C:\Users\fredt\Desktop\LinkOpticians\types\index.ts
===============================
`$lang
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
description?: string | null;
duration: number;
price?: number | null;
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
specialty?: string | null;
isActive: boolean;
branchId: string;
branch: Branch;
}

// New types for appointment service
export interface AppointmentWithRelations {
id: string;
patientName: string;
phone: string;
email: string | null;
serviceId: string;
branchId: string;
opticianId: string | null;
scheduledAt: Date;
status: AppointmentStatus;
notes: string | null;
createdAt: Date;
updatedAt: Date;
service: Service;
branch: Branch;
optician: Optician | null;
}

// Add this new type for the admin table
export interface AppointmentForAdmin {
id: string;
patientName: string;
phone: string;
email: string | null;
service: { name: string };
branch: { name: string; id: string };
optician: {
id: string;
name: string;
email: string;
phone: string;
specialty: string | null;
isActive: boolean;
branchId: string;
} | null;
scheduledAt: Date;
status: AppointmentStatus;
notes: string | null;
createdAt: Date;
updatedAt: Date;
}

export interface ServiceResult<T> {
success: boolean;
data?: T;
error?: string;
}

export interface OperatingHours {
start: string;
end: string;
}

```

```
