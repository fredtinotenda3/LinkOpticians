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
    <section id="lab" className="relative py-28 bg-dark-400 overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ─────────────────────────────────────────────── */}
          <div className="relative">

            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden border border-dark-500 aspect-[4/3]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-400/40 via-transparent to-transparent" />
            </div>

            {/* Badge — anchored cleanly inside the image boundary */}
            <div className="absolute bottom-5 left-5">
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_20px_rgba(36,174,124,0.5)]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {badge}
              </div>
            </div>

            {/* Decorative corner accent */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />
          </div>

          {/* ── Content side ───────────────────────────────────────────── */}
          <div className="space-y-8">

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

            {/* Stats — with containers */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-dark-500">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/30 transition-colors duration-300"
                >
                  <p className="text-2xl md:text-3xl font-bold text-green-400 leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/45 text-xs leading-snug">{stat.label}</p>
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
        </div>
      </div>
    </section>
  );
};
