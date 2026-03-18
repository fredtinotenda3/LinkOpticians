// components/sections/LocationsBarSection.tsx
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
  backgroundColor?: string;
  borderColor?: string;
}

export const LocationsBarSection = ({
  locations = [
    { city: "Harare", areas: "CBD · Kensington · Greendale", href: "/locations#harare" },
    { city: "Chipinge", areas: "Moodie Street", href: "/locations#chipinge" },
    { city: "Chiredzi", areas: "Mopani Drive", href: "/locations#chiredzi" },
  ],
  estYear = 2008,
  country = "Zimbabwe",
  showFlag = true,
}: LocationsBarSectionProps) => {

  const yearsServing = new Date().getFullYear() - estYear;

  return (
    <div className="border-t border-dark-500 bg-dark-400">
      <div className="mx-auto max-w-7xl px-[5%] py-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* ── Est. badge ──────────────────────────────────────────────── */}
          <div className="flex items-center gap-4 shrink-0">
            {showFlag && (
              /* SVG Zimbabwe flag colours as a refined stripe pill */
              <div className="flex overflow-hidden rounded-md h-7 w-11 shrink-0 border border-dark-500">
                <div className="flex-1 bg-[#006400]" />
                <div className="flex-1 bg-[#FFD200]" />
                <div className="flex-1 bg-[#D21034]" />
                <div className="flex-1 bg-[#000000]" />
              </div>
            )}
            <div>
              <p className="text-white text-sm font-bold leading-tight">
                Est. {estYear}
              </p>
              <p className="text-white/40 text-xs mt-0.5">
                Serving {country} for {yearsServing}+ years
              </p>
            </div>
          </div>

          {/* ── Locations ───────────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center items-center gap-1">
            {locations.map((location, index) => (
              <div key={location.city} className="flex items-center">
                <Link
                  href={location.href ?? "/locations"}
                  className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-dark-300 transition-all duration-300"
                >
                  {/* Pin icon */}
                  <svg
                    className="w-3.5 h-3.5 text-green-500 shrink-0"
                    fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight group-hover:text-green-400 transition-colors duration-300">
                      {location.city}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5">{location.areas}</p>
                  </div>
                </Link>

                {/* Divider */}
                {index < locations.length - 1 && (
                  <div className="w-px h-8 bg-dark-500 mx-1 hidden md:block" />
                )}
              </div>
            ))}
          </div>

          {/* ── "All locations" link ─────────────────────────────────────── */}
          <Link
            href="/locations"
            className="group hidden lg:inline-flex items-center gap-2 text-white/40 hover:text-green-400 text-xs font-medium transition-colors duration-300 shrink-0"
          >
            All locations
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>

        </div>
      </div>
    </div>
  );
};
