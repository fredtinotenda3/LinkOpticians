// ===== FILE: lib/branch-adapter.ts (UPDATE - add image field) =====

/**
 * Branch data adapter - converts database format to application format
 */

export interface AppBranch {
  $id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    publicHolidays?: string;
  };
  doctors: string[];
  services: string[];
  image: string; // ADD THIS - URL to branch image
  parking?: string; // ADD THIS
  $createdAt: string;
  $updatedAt: string;
}

export interface DatabaseBranch {
  $id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  operatingHours: string;
  doctors: string[];
  services: string[];
  image?: string; // ADD THIS - optional in DB
  parking?: string; // ADD THIS
  $createdAt: string;
  $updatedAt: string;
}

/**
 * Parse operating hours string into structured object
 */
export function parseOperatingHours(hoursString: string): AppBranch["operatingHours"] {
  const defaultHours = {
    weekdays: "8:00 AM - 5:00 PM",
    saturday: "8:00 AM - 1:00 PM",
    sunday: "Closed",
    publicHolidays: "Closed",
  };

  if (!hoursString || typeof hoursString !== "string") {
    return defaultHours;
  }

  try {
    if (hoursString.includes(",")) {
      const parts = hoursString.split(",").map(p => p.trim());
      
      const weekdayPart = parts[0];
      const saturdayPart = parts[1] || "";
      
      const weekdays = weekdayPart
        .replace(/mon[-–]fri/i, "")
        .replace(/weekdays:/i, "")
        .trim()
        .replace(/am|pm/g, (m) => m.toUpperCase());
      
      let saturday = saturdayPart
        .replace(/sat(urday)?:/i, "")
        .trim()
        .replace(/am|pm/g, (m) => m.toUpperCase());
      
      saturday = saturday.replace(/pma$/, "PM").replace(/ama$/, "AM");
      
      return {
        weekdays: weekdays || defaultHours.weekdays,
        saturday: saturday || defaultHours.saturday,
        sunday: defaultHours.sunday,
        publicHolidays: defaultHours.publicHolidays,
      };
    }
    
    return {
      weekdays: hoursString.replace(/am|pm/g, (m) => m.toUpperCase()),
      saturday: defaultHours.saturday,
      sunday: defaultHours.sunday,
      publicHolidays: defaultHours.publicHolidays,
    };
  } catch (error) {
    console.error("Failed to parse operating hours:", hoursString, error);
    return defaultHours;
  }
}

/**
 * Get branch image URL with fallback
 */
export function getBranchImage(branchName: string, customImage?: string): string {
  if (customImage) return customImage;
  
  // Map branch names to images
  const imageMap: Record<string, string> = {
    "robinson": "/assets/images/branches/robinson-house.png",
    "kensington": "/assets/images/branches/kensington.jpeg",
    "honey": "/assets/images/branches/honey-dew.jpeg",
    "chipinge": "/assets/images/branches/chipinge.jpeg",
    "chiredzi": "/assets/images/branches/chiredzi.jpeg",
  };
  
  const lowerName = branchName.toLowerCase();
  for (const [key, path] of Object.entries(imageMap)) {
    if (lowerName.includes(key)) {
      return path;
    }
  }
  
  return "/assets/images/branches/fallback.jpg";
}

/**
 * Convert database branch to application branch
 */
export function adaptBranch(dbBranch: DatabaseBranch): AppBranch {
  return {
    ...dbBranch,
    operatingHours: parseOperatingHours(dbBranch.operatingHours),
    doctors: Array.isArray(dbBranch.doctors) ? dbBranch.doctors : [],
    services: Array.isArray(dbBranch.services) ? dbBranch.services : [],
    image: getBranchImage(dbBranch.name, dbBranch.image),
    parking: dbBranch.parking || "Available",
  };
}

/**
 * Convert array of database branches to application branches
 */
export function adaptBranches(dbBranches: DatabaseBranch[]): AppBranch[] {
  return dbBranches.map(adaptBranch);
}