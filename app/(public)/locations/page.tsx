// app/(public)/locations/page.tsx
import {
  LocationsHeroSection,
  ClinicsGridSection,
  RuralClinicsSection,
  MobileUnitSection,
  ComparisonTableSection,
  LocationsCTASection
} from "@/components/sections/locations";
import { LOCATIONS_PAGE_CONFIG } from "@/constants/locations-page";

export default function LocationsPage() {
  return (
    <div className="min-h-screen">
      <LocationsHeroSection {...LOCATIONS_PAGE_CONFIG.hero} />
      <ClinicsGridSection {...LOCATIONS_PAGE_CONFIG.clinicsGrid} />
      <RuralClinicsSection {...LOCATIONS_PAGE_CONFIG.ruralClinics} />
      <MobileUnitSection {...LOCATIONS_PAGE_CONFIG.mobileUnit} />
      <ComparisonTableSection {...LOCATIONS_PAGE_CONFIG.comparisonTable} />
      <LocationsCTASection {...LOCATIONS_PAGE_CONFIG.cta} />
    </div>
  );
}