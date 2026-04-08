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
    <section className="relative py-28 bg-[#000B18] overflow-hidden">
      {/* Brand accent glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500" />
              <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight">{title}</h2>
          </div>
          <Link
            href="/locations"
            className="group hidden md:inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-blue-500/50 text-xs font-black uppercase tracking-widest transition-all duration-300 shrink-0"
          >
            {viewAllText}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Locations Grid */}
        <div className="space-y-4">
          {/* Row 1: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {firstThree.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {/* Row 2: 2 Columns Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:max-w-[66.6%] mx-auto">
            {lastTwo.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>

        {/* View all — mobile */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/locations"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest"
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

// Extracted Sub-component for consistency
const LocationCard = ({ location }: { location: Location }) => (
  <Link
    href={`/locations/${location.id}`}
    className="group flex items-start gap-5 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
  >
    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 transition-all duration-500 border border-blue-500/10">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <div className="min-w-0 py-0.5">
      <h3 className="text-white text-base font-bold group-hover:text-blue-400 transition-colors duration-300 leading-tight">
        {location.name}
      </h3>
      <p className="text-blue-500/60 text-[10px] font-black uppercase tracking-widest mt-1.5">{location.area}</p>
      <p className="text-white/30 text-xs mt-2 line-clamp-1 font-light italic">{location.address}</p>
    </div>
  </Link>
);