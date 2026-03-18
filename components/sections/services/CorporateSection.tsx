// components/sections/services/CorporateSection.tsx
import Image from "next/image";
import Link from "next/link";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface CorporateSectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  features: Feature[];
  buttonText: string;
  buttonHref: string;
}

// SVG icon map — replaces emoji
const featureIcons: Record<string, JSX.Element> = {
  "🏢": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "👓": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "📊": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

// Fallback SVG for unknown icons
const FallbackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
  </svg>
);

export const CorporateSection = ({
  title,
  titleHighlight,
  subtitle,
  description,
  image,
  imageAlt,
  features,
  buttonText,
  buttonHref,
}: CorporateSectionProps) => {
  return (
    <section id="corporate" className="relative py-28 bg-dark-300 overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Content side ─────────────────────────────────────── */}
          <div className="order-2 lg:order-1 space-y-8">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed">
              {description}
            </p>

            {/* Feature cards */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(36,174,124,0.06)]"
                >
                  {/* SVG icon container */}
                  <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    {featureIcons[feature.icon] ?? <FallbackIcon />}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-white text-sm font-bold mb-0.5">{feature.title}</h3>
                    <p className="text-white/45 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,174,124,0.4)] hover:scale-[1.02]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>

          {/* ── Image side ───────────────────────────────────────── */}
          <div className="relative order-1 lg:order-2">

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-dark-500 aspect-[4/3]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/40 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-4 md:-left-8 flex items-center gap-3 bg-dark-400/95 backdrop-blur-md border border-dark-500 rounded-2xl px-5 py-4 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-tight">10+ employees?</p>
                <p className="text-green-400 text-xs mt-0.5">Bulk discounts available</p>
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />

          </div>
        </div>
      </div>
    </section>
  );
};
