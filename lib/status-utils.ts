// ===== FILE: lib/status-utils.ts (CREATE NEW FILE) =====

/**
 * Status normalization utility
 * Ensures database values are consistent across the app
 */

export type DatabaseStatus = "schedule" | "pending" | "cancelled";
export type DisplayStatus = "scheduled" | "pending" | "cancelled";

/**
 * Converts database status to display status
 * Database: "schedule" → Display: "scheduled"
 */
export function toDisplayStatus(status: DatabaseStatus): DisplayStatus {
  if (status === "schedule") return "scheduled";
  return status as DisplayStatus;
}

/**
 * Converts display status to database status
 * Display: "scheduled" → Database: "schedule"
 */
export function toDatabaseStatus(status: DisplayStatus | string): DatabaseStatus {
  if (status === "scheduled") return "schedule";
  if (status === "pending") return "pending";
  if (status === "cancelled") return "cancelled";
  return "pending"; // fallback
}

/**
 * Safe status check for conditional rendering
 * Accepts both "schedule" and "scheduled" as "scheduled"
 */
export function isScheduled(status: string): boolean {
  return status === "schedule" || status === "scheduled";
}

export function isPending(status: string): boolean {
  return status === "pending";
}

export function isCancelled(status: string): boolean {
  return status === "cancelled";
}