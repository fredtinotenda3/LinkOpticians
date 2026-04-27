// ===== FILE: components/sections/locations/ClinicsGridSection.tsx (FULL REPLACEMENT) =====

import { ClinicCard } from "./ClinicCard";
import { type AppBranch } from "@/lib/branch-adapter";

interface ClinicsGridSectionProps {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  clinics: AppBranch[];
}

export const ClinicsGridSection = ({
  subtitle,
  title,
  titleHighlight,
  description,
  clinics,
}: ClinicsGridSectionProps) => {

  const getBadge = (branch: AppBranch) => {
    const name = branch.name.toLowerCase();
    const id = branch.$id.toLowerCase();
    
    if (name.includes("robinson") || id.includes("robinson")) {
      return { text: "Main Clinic", color: "sky" };
    }
    if (name.includes("kensington") || id.includes("kensington")) {
      return { text: "Suburban", color: "sky" };
    }
    if (name.includes("honey") || id.includes("honey")) {
      return { text: "Premier Mall", color: "sky" };
    }
    return undefined;
  };

  // If no clinics, show empty state
  if (!clinics || clinics.length === 0) {
    return (
      <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-y border-white/[0.05]" id="harare">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617] to-[#01030a]" />
        <div className="relative mx-auto max-w-7xl px-[5%] text-center py-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <p className="text-white/40 text-sm">No clinics available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

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

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Optional: Location count indicator */}
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10">
            <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
              {clinics.length} {clinics.length === 1 ? "Clinic" : "Clinics"} in Harare
            </span>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinics.map((clinic) => (
            <ClinicCard
              key={clinic.$id}
              clinic={clinic}
              badge={getBadge(clinic)}
              showBooking={true}
            />
          ))}
        </div>

        {/* Mobile location count */}
        <div className="mt-8 text-center lg:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10">
            <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
              {clinics.length} {clinics.length === 1 ? "Clinic" : "Clinics"} in Harare
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};