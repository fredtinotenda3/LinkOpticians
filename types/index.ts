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

// Add these to your existing types/index.ts file

export interface OpticianForAdmin {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string | null;
  isActive: boolean;
  branchId: string;
  branch: {
    id: string;
    name: string;
    address: string;
  };
}

export interface BranchForSelect {
  id: string;
  name: string;
  address: string;
}

export interface EditOpticianForm {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  branchId: string;
  isActive: boolean;
}

// New types for advanced optician availability
export interface OpticianWorkingHours {
  id: string;
  opticianId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  startTime: string; // Format: "HH:MM" (24-hour)
  endTime: string; // Format: "HH:MM" (24-hour)
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpticianTimeOff {
  id: string;
  opticianId: string;
  startDate: Date;
  endDate: Date;
  reason?: string | null;
  isAllDay: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkingHoursData {
  opticianId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface CreateTimeOffData {
  opticianId: string;
  startDate: Date;
  endDate: Date;
  reason?: string;
  isAllDay?: boolean;
}

export interface AvailabilityCheckParams {
  branchId: string;
  serviceId: string;
  date: Date;
  opticianId?: string;
  includeWorkingHours?: boolean;
  includeTimeOff?: boolean;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  isAvailable: boolean;
  reason?: string;
}

export interface DayAvailability {
  date: Date;
  timeSlots: TimeSlot[];
  isAvailable: boolean;
}

// ADD TO: types/index.ts

// Bulk operation types
export interface BulkOpticianCreateData {
  opticians: Omit<EditOpticianForm, "isActive">[]; // Multiple opticians to create
}

export interface BulkOpticianUpdateData {
  updates: Array<{
    id: string;
    data: Partial<EditOpticianForm>;
  }>;
}

export interface BulkWorkingHoursUpdate {
  opticianId: string;
  workingHours: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }>;
}

export interface BulkTimeOffCreate {
  opticianIds: string[]; // Multiple opticians
  startDate: Date;
  endDate: Date;
  reason?: string;
  isAllDay?: boolean;
}

export interface BulkOperationError {
  index?: number;
  id?: string;
  error: string;
}

export interface BulkOperationResult {
  success: boolean;
  processed: number;
  succeeded: number;
  failed: number;
  errors?: BulkOperationError[];
  data?: unknown;
}

export interface ImportOpticianData {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  branchName: string; // Reference by name instead of ID for imports
  branchId?: string; // Will be resolved during import
}

export interface ImportError {
  row: number;
  error: string;
  data: Record<string, unknown>;
}

export interface ImportResult {
  total: number;
  created: number;
  updated: number;
  errors: ImportError[];
}

// CSV/Excel import types
export interface CsvImportRow {
  name: string;
  email: string;
  phone: string;
  specialty?: string;
  branchName: string;
  [key: string]: unknown;
}

export interface FileImportData {
  fileName: string;
  fileType: "csv" | "json";
  data: CsvImportRow[];
}

// Bulk schedule management
export interface ScheduleEntry {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface BulkScheduleUpdate {
  opticianIds: string[];
  schedule: ScheduleEntry[];
}

// Mass status update
export interface BulkStatusUpdate {
  opticianIds: string[];
  isActive: boolean;
}

// Bulk deletion
export interface BulkDeleteData {
  opticianIds: string[];
  permanent?: boolean;
}

// Template types for download
export interface ImportTemplate {
  headers: string[];
  sampleData: Record<string, string>[];
}

// Batch operation progress
export interface BatchOperationProgress {
  total: number;
  completed: number;
  current?: string;
  status: "idle" | "processing" | "completed" | "error";
}
