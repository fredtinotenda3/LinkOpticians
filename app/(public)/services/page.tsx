// app/(public)/services/page.tsx
import { FinalCTASection } from "@/components/sections";
import {
  ServicesHeroSection,
  ServicesGridSection,
  LaboratorySection,
  CorporateSection,
  // LegalNoticeSection
} from "@/components/sections/services";
import { SERVICES_PAGE_CONFIG } from "@/constants/services-page";

export const metadata = {
  title: "Services | Link Opticians",
  description: "Comprehensive eye examinations, precision lens surfacing, and corporate wellness programs in Harare, Chipinge, and Chiredzi.",
};

/**
 * ServicesPage
 * * 1. Hero: Premium brand positioning
 * 2. Grid: Visual catalog of core clinical services
 * 3. Lab: Spotlight on the unique in-house surfacing technology
 * 4. Corporate: Specialized B2B vision wellness programs
 * 5. Legal: Regulatory disclosure and professional compliance
 * 6. Final CTA: Conversion point for appointments
 */
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#000d1a] selection:bg-sky-500/30">
      
      {/* 1. Hero Section 
          Establishes the "Deep Ocean" aesthetic and premium clinical tone.
      */}
      <ServicesHeroSection 
        badge="Clinical Excellence" 
        {...SERVICES_PAGE_CONFIG.hero} 
      />

      {/* 2. Core Services Grid 
          Uses ServiceCard components with category-based logic 
          (Exams, Emergency, Products, etc.)
      */}
      <ServicesGridSection {...SERVICES_PAGE_CONFIG.servicesGrid} />

      {/* 3. Laboratory Spotlight 
          Highlights the 0.01 precision and on-site lens surfacing USP.
      */}
      <LaboratorySection {...SERVICES_PAGE_CONFIG.laboratory} />

      {/* 4. Corporate Services 
          Focuses on workplace safety, ergonomics, and enterprise pricing.
      */}
      <CorporateSection {...SERVICES_PAGE_CONFIG.corporate} />

      {/* 5. Legal Notice 
          Quiet, professional regulatory disclosure before the final push.
      */}
      {/* <LegalNoticeSection text={SERVICES_PAGE_CONFIG.legalNotice.text} /> */}

      {/* 6. Final CTA 
          Reused globally to drive appointments to Harare, Chipinge, or Chiredzi branches.
      */}
      <div className="bg-[#000d1a] pt-10 pb-20">
        <FinalCTASection {...SERVICES_PAGE_CONFIG.cta} />
      </div>

    </div>
  );
}