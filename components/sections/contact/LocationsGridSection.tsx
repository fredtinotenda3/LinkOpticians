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
  const firstThree = locations.slice(0, 3);
  const lastTwo = locations.slice(3, 5);

  return (
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
          </div>
          <Link
            href="/locations"
            className="group hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300 shrink-0"
          >
            {viewAllText}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* First 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {firstThree.map((location) => (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(36,174,124,0.08)]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center text-green-400 shrink-0 transition-colors duration-300">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white text-sm font-bold group-hover:text-green-400 transition-colors duration-300 leading-tight">
                  {location.name}
                </h3>
                <p className="text-white/40 text-xs mt-0.5">{location.area}</p>
                <p className="text-white/30 text-xs mt-1 line-clamp-1">{location.address}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Last 2 — centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-[66%] mx-auto">
          {lastTwo.map((location) => (
            <Link
              key={location.id}
              href={`/locations/${location.id}`}
              className="group flex items-start gap-4 p-5 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(36,174,124,0.08)]"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center text-green-400 shrink-0 transition-colors duration-300">
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-white text-sm font-bold group-hover:text-green-400 transition-colors duration-300 leading-tight">
                  {location.name}
                </h3>
                <p className="text-white/40 text-xs mt-0.5">{location.area}</p>
                <p className="text-white/30 text-xs mt-1 line-clamp-1">{location.address}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all — mobile */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
          >
            {viewAllText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};
