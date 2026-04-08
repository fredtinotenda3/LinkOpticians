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

const featureIcons: Record<string, JSX.Element> = {
  "🏢": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  "👓": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "📊": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const FallbackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
    <section id="corporate" className="relative py-28 bg-[#000d1a] overflow-hidden">
      
      {/* Background Deep Ocean Accents */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Content side ─────────────────────────────────────── */}
          <div className="order-2 lg:order-1 space-y-10">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {title} <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Feature cards */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-500 group"
                >
                  <div className="size-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shrink-0">
                    {featureIcons[feature.icon] ?? <FallbackIcon />}
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white text-lg font-bold mb-1">{feature.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-500 shadow-xl shadow-sky-900/20"
            >
              {buttonText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>

          {/* ── Image side ───────────────────────────────────────── */}
          <div className="relative order-1 lg:order-2">
            
            <div className="relative rounded-[40px] overflow-hidden border border-white/5 aspect-[4/3] shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/60 via-transparent to-transparent" />
            </div>

            {/* Floating Corporate Badge */}
            <div className="absolute -bottom-6 -left-4 md:-left-10 flex items-center gap-4 bg-[#001a33]/95 backdrop-blur-xl border border-white/10 rounded-[24px] px-6 py-5 shadow-2xl">
              <div className="size-12 rounded-2xl bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 border border-sky-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-[11px] font-black uppercase tracking-widest leading-tight">10+ Team Members?</p>
                <p className="text-sky-400 text-[10px] font-bold mt-1 uppercase tracking-wider">Enterprise Pricing Available</p>
              </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-[32px] border-2 border-sky-500/20 pointer-events-none" />

          </div>
        </div>
      </div>
    </section>
  );
};