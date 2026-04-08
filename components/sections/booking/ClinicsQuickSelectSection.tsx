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
    <section className="relative py-32 bg-[#000B18] overflow-hidden">

      {/* Background glow — subtle atmospheric depth */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-600/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-blue-500/30" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-blue-500/30" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1]">
            {title}
          </h2>

          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
            Select a facility to view availability. We provide world-class eye care across Harare, Chipinge, and Chiredzi.
          </p>

          {/* Location count pills — Cinematic Styling */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {["Harare", "Chipinge", "Chiredzi"].map((city) => (
              <div
                key={city}
                className="inline-flex items-center gap-2.5 bg-white/[0.02] border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:border-blue-500/30 transition-all duration-500"
              >
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clinic Selector container ────────────────────────────────── */}
        <div className="relative z-10">
            {/* Note: ClinicSelector should internally use the same 
               Deep Ocean / Glassmorphism styles for consistency.
            */}
            <ClinicSelector branches={branches} />
        </div>

      </div>
    </section>
  );
};