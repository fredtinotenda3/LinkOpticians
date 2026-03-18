// app/(public)/book/page.tsx
import { getAllBranches } from "@/lib/actions/branch.actions";
import {
  BookingHeroSection,
  BookingFormSection,
  WhatToExpectSection,
  ClinicsQuickSelectSection,
  BookingFAQSection,
  BookingFinalCTASection
} from "@/components/sections/booking";
import { BOOKING_PAGE_CONFIG } from "@/constants/booking-page";

export default async function BookPage() {
  const branches = await getAllBranches();

  return (
    <div className="min-h-screen">
      <BookingHeroSection {...BOOKING_PAGE_CONFIG.hero} />
      <BookingFormSection 
        branches={branches}
        trustBadges={BOOKING_PAGE_CONFIG.trustBadges}
        privacyNotice={BOOKING_PAGE_CONFIG.privacyNotice}
        rightColumn={BOOKING_PAGE_CONFIG.rightColumn}
      />
      <WhatToExpectSection {...BOOKING_PAGE_CONFIG.whatToExpect} />
      <ClinicsQuickSelectSection 
        subtitle={BOOKING_PAGE_CONFIG.clinicsSection.subtitle}
        title={BOOKING_PAGE_CONFIG.clinicsSection.title}
        branches={branches}
      />
      <BookingFAQSection {...BOOKING_PAGE_CONFIG.faqSection} />
      <BookingFinalCTASection {...BOOKING_PAGE_CONFIG.finalCta} />
    </div>
  );
}