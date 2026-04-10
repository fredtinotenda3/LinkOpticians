// components/sections/LocationsBarSection.tsx
"use client";

import Link from "next/link";

interface Location {
  city: string;
  areas: string;
  href?: string;
}

interface LocationsBarSectionProps {
  locations?: Location[];
  estYear?: number;
  country?: string;
  showFlag?: boolean;
}

export const LocationsBarSection = ({
  locations = [
    { city: "Harare", areas: "Kensington · Honeydew · CBD", href: "/locations#harare" },
    { city: "Chipinge", areas: "Moodie Street", href: "/locations#chipinge" },
    { city: "Chiredzi", areas: "Chiredzi Town", href: "/locations#chiredzi" },
  ],
  estYear = 2008,
  showFlag = true,
}: LocationsBarSectionProps) => {

  const currentYear = new Date().getFullYear();
  const yearsServing = currentYear - estYear;

  return (
    <div className="border-y border-white/10 bg-gradient-to-b from-[#001a33] to-[#001226]">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">

          {/* ── Heritage Badge ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-6 shrink-0 group">
            {showFlag && (
              <div className="relative overflow-hidden rounded-md h-10 w-14 shrink-0 shadow-lg ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                <div className="h-[20%] bg-[#319208]" />
                <div className="h-[20%] bg-[#FFD200]" />
                <div className="h-[20%] bg-[#D21034]" />
                <div className="h-[20%] bg-[#000000]" />
                <div className="h-[20%] bg-[#FFFFFF]" />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-white text-base md:text-lg font-black tracking-tight leading-tight">
                Est. {estYear}
              </p>
              <p className="text-sky-400/60 text-[11px] font-bold uppercase tracking-[0.2em]">
                {yearsServing} Years of Excellence
              </p>
            </div>
          </div>

          {/* ── Clinic Network ──────────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
            {locations.map((location, index) => (
              <div key={location.city} className="flex items-center gap-3 md:gap-6">
                <Link
                  href={location.href ?? "/locations"}
                  className="group relative flex items-center gap-4 px-5 py-3 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 hover:-translate-y-0.5"
                >
                  {/* Animated dot indicator */}
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1 h-1 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                  </div>
                  
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 transition-all duration-500 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-500/20">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  <div className="text-left">
                    <p className="text-white font-bold text-sm md:text-base leading-tight group-hover:text-sky-400 transition-colors duration-300">
                      {location.city}
                    </p>
                    <p className="text-white/30 text-[10px] md:text-[11px] font-medium mt-0.5 group-hover:text-white/50 transition-colors">
                      {location.areas}
                    </p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-sky-500/0 to-transparent group-hover:via-sky-500/30 transition-all duration-500" />
                </Link>

                {index < locations.length - 1 && (
                  <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* ── All Clinics CTA ────────────────────────────────────────────── */}
          <Link
            href="/locations"
            className="group hidden xl:inline-flex items-center gap-3 text-white/40 hover:text-sky-400 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 shrink-0"
          >
            <span>All Clinics</span>
            <div className="flex items-center justify-center size-7 rounded-full border border-white/10 bg-white/[0.02] group-hover:border-sky-400/50 group-hover:bg-sky-500/10 transition-all duration-500">
              <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};