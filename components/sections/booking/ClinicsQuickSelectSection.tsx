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
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      {/* Background glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {subtitle}
            </span>
            <span className="w-6 h-px bg-green-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h2>

          <p className="text-white/45 text-base max-w-lg mx-auto leading-relaxed">
            Choose the clinic closest to you — we have locations in Harare, Chipinge, and Chiredzi.
          </p>

          {/* Location count pills */}
          <div className="flex items-center justify-center gap-3 pt-2">
            {["Harare", "Chipinge", "Chiredzi"].map((city) => (
              <div
                key={city}
                className="inline-flex items-center gap-1.5 bg-dark-400 border border-dark-500 text-white/60 text-xs font-medium px-3.5 py-1.5 rounded-full"
              >
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {city}
              </div>
            ))}
          </div>
        </div>

        {/* ── Clinic Selector — untouched ──────────────────────────────── */}
        <ClinicSelector branches={branches} />

      </div>
    </section>
  );
};
