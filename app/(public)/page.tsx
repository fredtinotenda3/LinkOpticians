// app/(public)/page.tsx
import PasskeyModal from "@/components/PasskeyModal";
import { SearchParamProps } from "@/types";
import StoriesSection from "@/components/StoriesSection";
import { BrandStrip } from "@/components/BrandStrip";
import {
  HeroSection,
  MissionSection,
  CommunityBannerSection,
  ServicesGridSection,
  TestimonialsSection,
  FinalCTASection,
  LocationsBarSection
} from "@/components/sections";

// REMOVED: export const dynamic = "force-dynamic";
// REMOVED: export const revalidate = 0;
// This is a Server Component by default (no "use client"), so revalidate works,
// but removing it to avoid confusion. Default behavior is fine.

export default async function Home({ searchParams }: SearchParamProps) {
  const params = await searchParams;
  const isAdmin = params?.admin === "true";

  return (
    <div className="min-h-screen">
      {isAdmin && <PasskeyModal />}

      {/* 1. Impact: Immediate visual hook */}
      <HeroSection />

      {/* 2. Convenience: Vital info immediately for returning patients */}
      <LocationsBarSection />

      {/* 3. Authority: Global brands you carry build immediate medical trust */}
      <BrandStrip />

      {/* 4. Practicality: "Can you solve my problem?" */}
      <ServicesGridSection />

      {/* 5. Values: Why choose Link over a generic shop? */}
      <MissionSection />

      {/* 6. Human Connection: Emotional engagement */}
      <StoriesSection />

      {/* 7. Social Proof: Real Zimbabwean voices */}
      <TestimonialsSection />

      {/* 8. Scale: Your impact in Harare, Chiredzi, etc. */}
      <CommunityBannerSection />

      {/* 9. Conversion: The final push */}
      <FinalCTASection />
    </div>
  );
}