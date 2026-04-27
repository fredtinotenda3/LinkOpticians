// ===== FILE: types/branch.ts (CREATE NEW FILE) =====

export interface BranchDetail {
  $id: string;
  id?: string; // For backward compatibility with static IDs
  name: string;
  type?: 'clinic' | 'mobile' | 'satellite';
  address: string;
  phone: string;
  email: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    publicHolidays?: string;
  };
  services: string[];
  specialties?: string[];
  doctors: string[];
  facilities?: string[];
  parking?: string;
  accessibility?: string[];
  notes?: string;
  mapUrl?: string;
  image: string;
}

// Also export the AppBranch type from the adapter
export type { AppBranch } from "@/lib/branch-adapter";