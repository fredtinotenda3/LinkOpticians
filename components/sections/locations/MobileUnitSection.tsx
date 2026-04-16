// components/sections/locations/MobileUnitSection.tsx

import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  text: string;
  icon: string;
}

interface ButtonItem {
  text: string;
  href: string;
  primary: boolean;
}

interface Stop {
  name: string;
  icon: string;
  frequency: string;
}

interface MobileUnitSectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: Stat[];
  features: Feature[];
  buttons: ButtonItem[];
  schedulePreview: {
    stops: Stop[];
    nextOutreach: {
      date: string;
      location: string;
      time: string;
    };
    contact: string;
  };
}

export const MobileUnitSection = ({
  badge,
  title,
  titleHighlight,
  description,
  stats,
  features,
  buttons,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  schedulePreview,
}: MobileUnitSectionProps) => {
  return (
    <>
      {/* ── HERO ── */}
      <section id="mobile-unit" className="relative min-h-[85vh] w-full overflow-hidden flex items-center">

        {/* ── UNIQUE BACKGROUND ── */}

        {/* Diagonal gradient (movement feel) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#031226] to-[#020617]" />

        {/* Moving light layers */}
        <div className="absolute -top-40 left-0 w-[600px] h-[400px] bg-sky-400/10 blur-[160px] rotate-12" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-violet-500/10 blur-[160px] -rotate-12" />

        {/* Grid overlay (logistics feel) */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* Route line */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
        </div>

        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/images/mobile-unit-hero.jpg"
            alt="Mobile Unit"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="relative mx-auto max-w-7xl px-[5%] py-32 w-full">
          <div className="max-w-3xl space-y-10">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/[0.04] backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
              <span className="size-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">{badge}</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              {stats.map((stat, index) => (
                <div key={index} className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-xl font-semibold text-white">{stat.value}</p>
                  <p className="text-white/40 text-xs uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.map((button, index) =>
                button.primary ? (
                  <Link
                    key={index}
                    href={button.href}
                    className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-8 py-4 rounded-xl transition"
                  >
                    {button.text}
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={button.href}
                    className="inline-flex items-center justify-center border border-white/10 text-white/70 hover:text-white px-8 py-4 rounded-xl transition"
                  >
                    {button.text}
                  </Link>
                )
              )}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {features.map((f, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/50">
                  {f.text}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* KEEP YOUR SECOND SECTION SAME (just background tweak optional) */}
    </>
  );
};