// components/sections/contact/LocationsGridSection.tsx

import Link from "next/link";

interface Location {
  id: string;
  name: string;
  area: string;
  address: string;
  icon: string;
}

interface LocationsGridSectionProps {
  subtitle: string;
  title: string;
  viewAllText: string;
  locations: Location[];
}

export const LocationsGridSection = ({
  subtitle,
  title,
  viewAllText,
  locations,
}: LocationsGridSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (ROUTE / FLOW STYLE) ── */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* Horizontal route line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      {/* Soft glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-400/10 blur-[140px]" />

      {/* subtle dots */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">

          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-4">
              <span className="w-10 h-px bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              {title}
            </h2>
          </div>

          <Link
            href="/locations"
            className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition"
          >
            {viewAllText}
            <span className="text-sky-400">→</span>
          </Link>
        </div>

        {/* ── HORIZONTAL FLOW ── */}
        <div className="relative">

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">

            {locations.map((location) => (
              <div key={location.id} className="relative flex-shrink-0 w-[280px]">

                {/* Connector dot */}
                <div className="absolute -top-6 left-6 w-2 h-2 rounded-full bg-sky-400" />

                {/* Card */}
                <Link
                  href={`/locations/${location.id}`}
                  className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">

                    {/* Icon */}
                    <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-sky-400 transition">
                        {location.name}
                      </h3>

                      <p className="text-sky-400/70 text-xs mt-1">
                        {location.area}
                      </p>

                      <p className="text-white/40 text-sm mt-2 line-clamp-2">
                        {location.address}
                      </p>
                    </div>

                  </div>
                </Link>

              </div>
            ))}

          </div>

        </div>

        {/* MOBILE CTA */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-white/60 text-sm"
          >
            {viewAllText}
            <span className="text-sky-400">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
};