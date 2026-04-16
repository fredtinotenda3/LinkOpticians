"use client";

import Image from "next/image";
import Link from "next/link";

interface MissionSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  foregroundImage?: string;
  foregroundAlt?: string;
  reverse?: boolean;
}

const stats = [
  { value: "18", label: "Years of Practice" },
  { value: "5", label: "Strategic Branches" },
  { value: "Direct", label: "Medical Aid Claims" },
];

export const MissionSection = ({
  title = "Our Clinical Mission",
  description = "Since 2008, Link Opticians has focused on delivering accessible, high-standard eye care across Zimbabwe. We combine clinical precision with in-house lens manufacturing to ensure every patient receives optimal vision solutions.",
  buttonText = "View Clinical History",
  buttonHref = "/about",
  backgroundImage = "/assets/images/mission-bg.png",
  foregroundImage = "/assets/images/dr-richard.jpg",
  foregroundAlt = "Lead Optometrist",
  reverse = false,
}: MissionSectionProps) => {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── PRIMARY GRID (VISIBLE) ── */}
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)]
        [background-size:80px_80px]" 
      />

      {/* ── SECONDARY GRID (SOFT COLOR) ── */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)]
        [background-size:160px_160px]" 
      />

      {/* ── MICRO STARS (VERY SUBTLE) ── */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:100px_100px]" 
      />

      {/* ── NEBULA (SOFT DEPTH) ── */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-400/8 blur-[140px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-500/8 blur-[120px]" />

      {/* ── FOCUS LIGHT BAND ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[120px] -translate-y-1/2 
        bg-gradient-to-r from-transparent via-sky-400/15 to-transparent blur-3xl"
      />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-16 xl:gap-28 ${reverse ? "lg:flex-row-reverse" : ""}`}>

          {/* ── VISUAL SIDE ── */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">

              <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-white/10">
                <Image
                  src={backgroundImage}
                  alt="Clinical Facility"
                  fill
                  className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent" />
              </div>

              <div className="absolute -bottom-8 -right-4 md:right-4 lg:-right-10 flex items-center gap-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 max-w-[280px]">
                <div className="relative size-16 rounded-xl overflow-hidden border border-sky-400/30">
                  <Image
                    src={foregroundImage}
                    alt={foregroundAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{foregroundAlt}</p>
                  <p className="text-sky-400 text-[11px] uppercase mt-1">Lead Practitioner</p>
                </div>
              </div>

            </div>
          </div>

          {/* ── CONTENT SIDE ── */}
          <div className="lg:w-1/2 space-y-10">

            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-[2px] bg-sky-400" />
                <span className="text-sky-400 text-xs uppercase tracking-[0.3em]">
                  Institutional Profile
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl font-semibold text-white">
                {title}
              </h2>
            </div>

            <p className="text-white/60 text-lg leading-relaxed">
              {description}
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Link
                href={buttonHref}
                className="inline-flex items-center gap-3 bg-white text-[#020617] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-sky-100 transition"
              >
                {buttonText}
                <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};