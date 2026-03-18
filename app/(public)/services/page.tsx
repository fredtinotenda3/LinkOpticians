// app/(public)/services/page.tsx
import { FinalCTASection } from "@/components/sections";
import {
  ServicesHeroSection,
  // QuickServiceNav,
  ServicesGridSection,
  LaboratorySection,
  CorporateSection,
  LegalNoticeSection
} from "@/components/sections/services";
import { SERVICES_PAGE_CONFIG } from "@/constants/services-page";

export const metadata = {
  title: "Services | Link Opticians",
  description: "Eye examinations, glasses, contact lenses, and on-site laboratory services in Harare, Chipinge, and Chiredzi.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ServicesHeroSection badge={""} {...SERVICES_PAGE_CONFIG.hero} />

      {/* Quick Service Navigation */}
      {/* <QuickServiceNav items={SERVICES_PAGE_CONFIG.quickNav.items} /> */}

      {/* Services Grid */}
      <ServicesGridSection {...SERVICES_PAGE_CONFIG.servicesGrid} />

      {/* Laboratory Spotlight */}
      <LaboratorySection {...SERVICES_PAGE_CONFIG.laboratory} />

      {/* Corporate Services */}
      <CorporateSection {...SERVICES_PAGE_CONFIG.corporate} />

      {/* Legal Notice */}
      <LegalNoticeSection text={SERVICES_PAGE_CONFIG.legalNotice.text} />

      {/* Final CTA - Reused from homepage */}
      <FinalCTASection {...SERVICES_PAGE_CONFIG.cta} />
    </div>
  );
}