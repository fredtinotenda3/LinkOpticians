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
    <section className="relative py-32 bg-[#001a33] overflow-hidden">
      
      {/* Deep Ocean subtle glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className={`flex flex-col lg:flex-row items-center gap-16 xl:gap-28 ${reverse ? "lg:flex-row-reverse" : ""}`}>

          {/* ── Visual Side ─────────────────────────────────────────────────── */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              
              {/* Main Clinical Environment Image */}
              <div className="relative w-full aspect-[4/5] max-w-[500px] mx-auto lg:mx-0 rounded-[2rem] overflow-hidden shadow-2xl border border-white/5">
                <Image
                  src={backgroundImage}
                  alt="Clinical Facility"
                  fill
                  className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/80 via-transparent to-transparent" />
              </div>

              {/* Professional Practitioner Card */}
              <div className="absolute -bottom-8 -right-4 md:right-4 lg:-right-10 flex items-center gap-5 bg-[#002b4d]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-[280px]">
                <div className="relative size-16 rounded-xl overflow-hidden shrink-0 border border-sky-500/30">
                  <Image
                    src={foregroundImage}
                    alt={foregroundAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">{foregroundAlt}</p>
                  <p className="text-sky-400 text-[11px] font-bold uppercase tracking-wider mt-1">Lead Practitioner</p>
                  <p className="text-white/30 text-[10px] mt-1 font-medium">Link Opticians HQ</p>
                </div>
              </div>

              {/* Decorative clinical accent */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-3xl border border-sky-500/10 pointer-events-none" />
            </div>
          </div>

          {/* ── Content Side ───────────────────────────────────────────────── */}
          <div className="lg:w-1/2 space-y-10">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-[2px] bg-sky-500" />
                <span className="text-sky-500 text-xs font-black tracking-[0.3em] uppercase">
                  Institutional Profile
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {title}
              </h2>
            </div>

            <p className="text-white/60 text-xl leading-relaxed font-light">
              {description}
            </p>

            {/* Key Clinical Stats */}
            <div className="grid grid-cols-3 gap-8 py-8 border-y border-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <p className="text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.1em] leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Professional CTA */}
            <div className="pt-4">
              <Link
                href={buttonHref}
                className="group inline-flex items-center gap-4 bg-white text-[#001a33] font-bold text-base px-10 py-5 rounded-full transition-all duration-300 hover:bg-sky-50 hover:scale-[1.02] shadow-xl shadow-white/5"
              >
                {buttonText}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};