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
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "3 clinic locations",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Open 6 days a week",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
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
    <section className="relative min-h-[75vh] w-full overflow-hidden flex items-center bg-[#000d1a]">

      {/* ── Background: Cinematic Map Treatment ────────────────────── */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/zimbabwe-map-detailed.png"
          alt="Map of Zimbabwe"
          fill
          className="object-cover opacity-40 grayscale contrast-125"
          priority
          quality={95}
        />
        {/* Deep Ocean Wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a] via-[#000d1a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,13,26,0.8)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
        <div className="max-w-3xl space-y-10">

          {/* ── Navigation ────────────────────────────────────────── */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <Link href="/" className="hover:text-sky-500 transition-colors duration-300">Home</Link>
            <svg className="w-2.5 h-2.5 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sky-500 italic">Locations</span>
          </nav>

          {/* ── Status Badge ──────────────────────────────────────── */}
          <div className="inline-flex items-center gap-4 bg-white/[0.03] backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
            </span>
            <span className="text-[11px] font-black tracking-[0.2em] text-white/90 uppercase">
              {badge}
            </span>
          </div>

          {/* ── Headline ──────────────────────────────────────────── */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-[ -0.04em] uppercase italic">
              {title}
              <br />
              <span className="text-sky-500 not-italic">{titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/40 max-w-xl leading-relaxed font-medium italic">
              {description}
            </p>
          </div>

          {/* ── Trust Indicators ───────────────────────────────────── */}
          <div className="flex flex-wrap gap-3">
            {trustPills.map((pill) => (
              <div
                key={pill.text}
                className="inline-flex items-center gap-3 bg-white/[0.02] backdrop-blur-md border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors duration-500 hover:bg-white/[0.05]"
              >
                <span className="text-sky-500">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

          {/* ── Clinic Navigation Pills ───────────────────────────── */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-white/[0.05]">
            {quickLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white/[0.03] backdrop-blur-md hover:bg-sky-500 border border-white/10 hover:border-sky-400 text-white/40 hover:text-white transition-all duration-500 text-[11px] font-black uppercase tracking-widest hover:-translate-y-1 shadow-lg"
              >
                {link.isMobile ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                )}
                {link.name}
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────── */}
      <div className="absolute bottom-12 left-[5%] hidden md:flex flex-col items-start gap-4 text-white/20 text-[10px] font-black tracking-[0.4em] uppercase">
        <div className="w-px h-16 bg-gradient-to-b from-sky-500 to-transparent" />
        <span className="[writing-mode:vertical-lr]">Scroll Exploration</span>
      </div>

    </section>
  );
};