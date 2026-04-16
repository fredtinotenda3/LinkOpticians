// components/sections/locations/ClinicsGridSection.tsx

import { ClinicCard } from "./ClinicCard";
import { BranchDetail } from "@/constants/branches";

interface ClinicsGridSectionProps {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  clinics: BranchDetail[];
}

export const ClinicsGridSection = ({
  subtitle,
  title,
  titleHighlight,
  description,
  clinics,
}: ClinicsGridSectionProps) => {

  const getBadge = (id: string) => {
    if (id === "robinson-house") return { text: "Main Clinic", color: "sky" };
    if (id === "kensington")     return { text: "Suburban",   color: "sky" };
    if (id === "honey-dew")      return { text: "Premier Mall", color: "sky" };
    return undefined;
  };

  return (
    <section
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-y border-white/[0.05]"
      id="harare"
    >
      {/* ── BACKGROUND: LOCATION-FOCUSED (CLEAN + TRUST) ── */}

      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-[#01030a]" />

      {/* controlled glow (minimal) */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-400/8 blur-[140px] rounded-full pointer-events-none" />

      {/* subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">

          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* ⚠️ CLEAN DESCRIPTION (YOU CONTROL CONTENT PASSED) */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* ❌ REMOVED: "3 Premium Harare Clinics" */}
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              badge={getBadge(clinic.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};