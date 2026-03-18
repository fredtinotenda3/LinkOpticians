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

export default async function Home({ searchParams }: SearchParamProps) {
  const params = await searchParams;
  const isAdmin = params?.admin === "true";

  return (
    <div className="min-h-screen">
      {isAdmin && <PasskeyModal />}

      {/* Hero Section */}
      <HeroSection />

      {/* Brand Strip - Partner logos */}
      <BrandStrip />

      {/* Stories Carousel */}
      <StoriesSection />

      {/* Mission Section */}
      <MissionSection />

        {/* Services Grid */}
      <ServicesGridSection />

      {/* Community Banner */}
      <CommunityBannerSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Final CTA */}
      <FinalCTASection />

      {/* Locations Bar */}
      <LocationsBarSection />
    </div>
  );
}