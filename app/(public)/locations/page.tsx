// ===== FILE: app/(public)/locations/page.tsx (UPDATED) =====

import {
  LocationsHeroSection,
  ClinicsGridSection,
  RuralClinicsSection,
  ComparisonTableSection,
  LocationsCTASection
} from "@/components/sections/locations";
import { LOCATIONS_PAGE_CONFIG, filterHarareClinics, filterRuralClinics, generateComparisonRows } from "@/constants/locations-page";
import { getAllBranches } from "@/lib/actions/branch.actions";

export default async function LocationsPage() {
  // Fetch branches dynamically from database
  const allBranches = await getAllBranches();
  
  // Filter branches for different sections
  const harareClinics = filterHarareClinics(allBranches);
  const ruralClinics = filterRuralClinics(allBranches);
  
  // Generate comparison table rows from actual branch data
  const comparisonRows = generateComparisonRows(allBranches);

  return (
    <div className="min-h-screen">
      <LocationsHeroSection {...LOCATIONS_PAGE_CONFIG.hero} />
      
      {/* Pass filtered branches dynamically */}
      <ClinicsGridSection 
        {...LOCATIONS_PAGE_CONFIG.clinicsGrid} 
        clinics={harareClinics}
      />
      
      <RuralClinicsSection 
        {...LOCATIONS_PAGE_CONFIG.ruralClinics} 
        clinics={ruralClinics}
      />
      
      {/* Pass dynamically generated rows */}
      <ComparisonTableSection 
        {...LOCATIONS_PAGE_CONFIG.comparisonTable} 
        rows={comparisonRows}
      />
      
      <LocationsCTASection {...LOCATIONS_PAGE_CONFIG.cta} />
    </div>
  );
}