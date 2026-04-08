// components/sections/services/LaboratorySection.tsx
import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface LaboratorySectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  badge: string;
  stats: Stat[];
  buttonText: string;
  buttonHref: string;
}

export const LaboratorySection = ({
  title,
  titleHighlight,
  subtitle,
  description,
  image,
  imageAlt,
  badge,
  stats,
  buttonText,
  buttonHref,
}: LaboratorySectionProps) => {
  return (
    <section id="lab" className="relative py-28 bg-[#000d1a] overflow-hidden">

      {/* Background Deep Ocean Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Image side ─────────────────────────────────────────────── */}
          <div className="relative">
            {/* Main image with clinical grayscale touch */}
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

            {/* Badge — Sky Blue Pivot */}
            <div className="absolute bottom-6 left-6">
              <div className="inline-flex items-center gap-2.5 bg-sky-600 text-white px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(14,165,233,0.3)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {badge}
              </div>
            </div>

            {/* Decorative technical accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-[32px] border-2 border-sky-500/20 pointer-events-none" />
          </div>

          {/* ── Content side ───────────────────────────────────────────── */}
          <div className="space-y-10">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/40 text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Stats — Glassmorphism containers */}
            <div className="grid grid-cols-2 gap-5 py-8 border-y border-white/5">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all duration-500 group"
                >
                  <p className="text-3xl md:text-4xl font-black text-sky-400 leading-none mb-2 group-hover:scale-105 transition-transform origin-left">
                    {stat.value}
                  </p>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-[10px] uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-500 shadow-xl shadow-sky-900/20 hover:shadow-sky-900/40 hover:scale-[1.02]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};