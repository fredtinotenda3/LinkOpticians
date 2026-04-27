// app/(public)/about/page.tsx
import {
  AboutHeroSection,
  FounderStorySection,
  MissionValuesSection,
  // FoundingTeamSection,
  // TeamSection,
  //PhilosophySection,
  AboutCTASection
} from "@/components/sections/about";
import { ABOUT_PAGE_CONFIG } from "@/constants/about-page";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AboutHeroSection {...ABOUT_PAGE_CONFIG.hero} />
      <FounderStorySection {...ABOUT_PAGE_CONFIG.founder} />
      <MissionValuesSection {...ABOUT_PAGE_CONFIG.missionValues} />
      {/* <FoundingTeamSection {...ABOUT_PAGE_CONFIG.foundingTeam} /> */}
      {/* <TeamSection {...ABOUT_PAGE_CONFIG.team} /> */}
      {/* /<PhilosophySection {...ABOUT_PAGE_CONFIG.philosophy} /> */}
      {/* <StatsSection stats={ABOUT_PAGE_CONFIG.stats} /> */}
      <AboutCTASection {...ABOUT_PAGE_CONFIG.cta} />
    </div>
  );
}