// components/sections/locations/RuralClinicsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { BranchDetail } from "@/constants/branches";

interface RuralClinicsSectionProps {
  subtitle: string;
  title: string;
  description: string;
  clinics: BranchDetail[];
}

const getRegionLabel = (id: string) => {
  if (id === "chipinge") return "Eastern Highlands";
  if (id === "chiredzi") return "Lowveld";
  return "Zimbabwe";
};

const getSpecialtyBadge = (id: string) => {
  if (id === "chipinge") return { text: "Mobile Unit Base", icon: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  )};
  if (id === "chiredzi") return { text: "Industrial Care", icon: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  )};
  return { text: "Rural Clinic", icon: null };
};

export const RuralClinicsSection = ({
  subtitle,
  title,
  description,
  clinics,
}: RuralClinicsSectionProps) => {
  return (
    <section className="relative py-28 bg-dark-400 overflow-hidden" id="rural">

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/4 blur-[140px] pointer-events-none" />

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
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Clinic count */}
          <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-dark-300 border border-dark-500 rounded-full">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-white/60 text-xs font-medium">
              {clinics.length} regional clinics
            </span>
          </div>
        </div>

        {/* ── Cards ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clinics.map((clinic) => {
            const badge = getSpecialtyBadge(clinic.id);
            return (
              <div
                key={clinic.id}
                id={clinic.id}
                className="group relative overflow-hidden rounded-3xl bg-dark-300 border border-dark-500 hover:border-green-500/40 transition-all duration-500 scroll-mt-32 hover:shadow-[0_8px_40px_rgba(36,174,124,0.10)] flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/70 via-transparent to-transparent" />

                  {/* Specialty badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-[0.15em]">
                      <span className="text-green-400">{badge.icon}</span>
                      {badge.text}
                    </span>
                  </div>

                  {/* Region label */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-medium text-white/60">
                      {getRegionLabel(clinic.id)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-1">
                    {clinic.name}
                  </h3>
                  <p className="text-white/40 text-xs mb-5 line-clamp-2 leading-relaxed">
                    {clinic.address}
                  </p>

                  {/* Hours + Contact grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-dark-400 border border-dark-500">
                      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">Weekdays</p>
                      <p className="text-white text-xs font-medium leading-snug">{clinic.operatingHours.weekdays}</p>
                      <p className="text-white/40 text-[10px] mt-1">Sat: {clinic.operatingHours.saturday}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-dark-400 border border-dark-500">
                      <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">Phone</p>
                      <a
                        href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                        className="text-white text-xs font-medium hover:text-green-400 transition-colors duration-200 leading-snug block"
                      >
                        {clinic.phone}
                      </a>
                      <p className="text-white/40 text-[10px] mt-1">Emergency available</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
                    {clinic.specialties.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] px-2.5 py-1 bg-dark-400 border border-dark-500 rounded-full text-white/50">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-2">
                    <Link
                      href={`/book?branch=${clinic.id}`}
                      className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-xs py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.35)]"
                    >
                      Book
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <a
                      href={clinic.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 border border-dark-500 hover:border-green-500/50 text-white/60 hover:text-white text-xs font-semibold py-3 rounded-full transition-all duration-300"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Directions
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
