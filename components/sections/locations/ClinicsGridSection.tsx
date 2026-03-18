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
    if (id === "robinson-house") return { text: "Main Clinic", color: "" };
    if (id === "kensington")     return { text: "Suburban",   color: "" };
    if (id === "honey-dew")      return { text: "Mall Location", color: "" };
    return undefined;
  };

  return (
    <section className="relative py-28 bg-dark-300 overflow-hidden" id="harare">

      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-green-500/4 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Clinic count pill */}
          <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-dark-400 border border-dark-500 rounded-full">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/60 text-xs font-medium">
              {clinics.length} clinics in Harare
            </span>
          </div>
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
