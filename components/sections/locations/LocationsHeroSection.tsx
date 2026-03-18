// components/sections/locations/LocationsHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface QuickLink {
  id: string;
  label: string;
  name: string;
  isMobile?: boolean;
}

interface LocationsHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
  quickLinks: QuickLink[];
}

const trustPills = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "3 clinic locations",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Open 6 days a week",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    text: "Mobile outreach units",
  },
];

export const LocationsHeroSection = ({
  title,
  titleHighlight,
  description,
  badge,
  quickLinks,
}: LocationsHeroSectionProps) => {
  return (
    <section className="relative min-h-[65vh] w-full overflow-hidden flex items-center">

      {/* Background — map image with lighter gradient so it's visible */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/zimbabwe-map-detailed.png"
          alt="Map of Zimbabwe showing clinic locations"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Lighter gradient — map breathes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
        <div className="max-w-2xl space-y-7">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/70">Locations</span>
          </nav>

          {/* Badge — with ping */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90">
              {badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            {title}
            <br />
            <span className="text-green-400">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/65 max-w-lg leading-relaxed">
            {description}
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2">
            {trustPills.map((pill) => (
              <div
                key={pill.text}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full"
              >
                <span className="text-green-400">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

          {/* Quick links — clinic anchor pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {quickLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/8 backdrop-blur-sm hover:bg-green-500 border border-white/15 hover:border-green-500 text-white/70 hover:text-white transition-all duration-300 text-xs font-semibold"
              >
                {link.isMobile ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                )}
                {link.name}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.2em] uppercase">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-scroll-line" />
      </div>

    </section>
  );
};
