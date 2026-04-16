// components/sections/booking/ClinicsQuickSelectSection.tsx

import { ClinicSelector } from "@/components/ClinicSelector";
import { Branch } from "@/types";

interface ClinicsQuickSelectSectionProps {
  subtitle: string;
  title: string;
  branches: Branch[];
}

export const ClinicsQuickSelectSection = ({
  subtitle,
  title,
  branches,
}: ClinicsQuickSelectSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── PRIMARY GRID (VISIBLE) ── */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── SECONDARY GRID (DEPTH COLOR) ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(168,85,247,0.2)_1px,transparent_1px)]
        [background-size:140px_140px]" 
      />

      {/* ── SCAN LINES (TECH FEEL) ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:100%_6px]" 
      />

      {/* ── WHITE MICRO STARS ── */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── COLORED MICRO STARS ── */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none 
        bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.6)_1px,transparent_1px),
             radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.6)_1px,transparent_1px),
             radial-gradient(circle_at_60%_80%,rgba(56,189,248,0.4)_1px,transparent_1px)]
        [background-size:110px_110px]" 
      />

      {/* ── NEBULA (PRIMARY) ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[800px] h-[350px] bg-sky-400/15 blur-[180px]" 
      />

      {/* ── NEBULA (SECONDARY) ── */}
      <div className="absolute bottom-0 right-0 
        w-[700px] h-[350px] bg-violet-500/15 blur-[180px]" 
      />

      {/* ── FOCUS LIGHT BAND ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[160px] 
        -translate-y-1/2 
        bg-gradient-to-r from-transparent via-sky-400/25 to-transparent 
        blur-3xl pointer-events-none"
      />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 space-y-4">

          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-400/40" />
            <span className="text-sky-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-400/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            {title}
          </h2>

          {/* LOCATION INDICATORS */}
          <div className="flex items-center justify-center gap-6 pt-4 text-sm text-white/50">
            {["Harare", "Chipinge", "Chiredzi"].map((city) => (
              <span key={city} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                {city}
              </span>
            ))}
          </div>

        </div>

        {/* ── SELECTOR ── */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <ClinicSelector branches={branches} />
        </div>

      </div>
    </section>
  );
};