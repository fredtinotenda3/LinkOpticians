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
    <div className="border-t border-white/5 bg-[#001a33]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">

          {/* ── Heritage Badge ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-5 shrink-0">
            {showFlag && (
              <div className="flex flex-col overflow-hidden rounded-sm h-8 w-12 shrink-0 border border-white/10">
                {/* Clean representation of Zim flag colors */}
                <div className="h-[20%] bg-[#319208]" />
                <div className="h-[20%] bg-[#FFD200]" />
                <div className="h-[20%] bg-[#D21034]" />
                <div className="h-[20%] bg-[#000000]" />
                <div className="h-[20%] bg-[#FFFFFF]" />
              </div>
            )}
            <div>
              <p className="text-white text-sm font-black tracking-tight leading-tight">
                Est. {estYear}
              </p>
              <p className="text-sky-400/50 text-[10px] font-bold uppercase tracking-widest mt-1">
                {yearsServing} Years of Excellence
              </p>
            </div>
          </div>

          {/* ── Clinic Network ──────────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {locations.map((location, index) => (
              <div key={location.city} className="flex items-center gap-2 md:gap-4">
                <Link
                  href={location.href ?? "/locations"}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-[#002b4d] transition-all duration-500"
                >
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-500 transition-colors duration-500 group-hover:bg-sky-500 group-hover:text-white">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">
                      {location.city}
                    </p>
                    <p className="text-white/30 text-[10px] font-medium mt-0.5 group-hover:text-white/50 transition-colors">
                      {location.areas}
                    </p>
                  </div>
                </Link>

                {index < locations.length - 1 && (
                  <div className="w-px h-6 bg-white/5 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* ── All Clinics CTA ────────────────────────────────────────────── */}
          <Link
            href="/locations"
            className="group hidden xl:inline-flex items-center gap-3 text-sky-400/60 hover:text-sky-400 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shrink-0"
          >
            All Clinics
            <div className="flex items-center justify-center size-6 rounded-full border border-sky-400/20 group-hover:border-sky-400/40 transition-all">
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};