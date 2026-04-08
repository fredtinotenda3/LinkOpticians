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
    <section className="relative py-32 bg-[#000d1a] overflow-hidden" id="harare">

      {/* Deep Ocean Ambient Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
                {subtitle}
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
              {title}
              <br />
              <span className="text-sky-500 not-italic">{titleHighlight}</span>
            </h2>
            
            <p className="text-white/40 text-lg md:text-xl font-medium italic max-w-xl">
              {description}
            </p>
          </div>

          {/* Status Indicator Pill */}
          <div className="shrink-0 inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
            </span>
            <span className="text-white/60 text-[11px] font-black uppercase tracking-widest">
              {clinics.length} Premium Harare Clinics
            </span>
          </div>
        </div>

        {/* ── Clinics Grid ─────────────────────────────────────────────── */}
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