// components/sections/home/MissionSection.tsx
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
  foregroundImage = "/assets/images/dr-richard.png",
  foregroundAlt = "Lead Optometrist",
  reverse = false,
}: MissionSectionProps) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">

      {/* ───────────────────────────────────────── */}
      {/* BACKGROUND */}
      {/* ───────────────────────────────────────── */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* Primary Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)]
        [background-size:80px_80px]"
      />

      {/* Secondary Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]
        bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(56,189,248,0.2)_1px,transparent_1px)]
        [background-size:160px_160px]"
      />

      {/* Micro Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:100px_100px]"
      />

      {/* Ambient Glow */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] bg-sky-400/8 blur-[140px]" />

      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] bg-violet-500/8 blur-[120px]" />

      {/* Focus Band */}
      <div
        className="absolute left-0 right-0 top-1/2 h-[120px] -translate-y-1/2
        bg-gradient-to-r from-transparent via-sky-400/15 to-transparent blur-3xl"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]"
      />

      {/* ───────────────────────────────────────── */}
      {/* CONTENT */}
      {/* ───────────────────────────────────────── */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div
          className={`flex flex-col items-center gap-12 md:gap-16 xl:gap-24 lg:flex-row ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >

          {/* ───────────────────────────────────────── */}
          {/* VISUAL SIDE */}
          {/* ───────────────────────────────────────── */}

          <div className="w-full lg:w-1/2">

            <div className="relative">

              {/* Main Image */}
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/10 sm:rounded-[2rem] lg:mx-0">

                <Image
                  src={backgroundImage}
                  alt="Clinical Facility"
                  fill
                  className="object-cover transition-all duration-700"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
              </div>

              {/* Practitioner Card */}
              <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#020617]/80 px-4 py-3 backdrop-blur-md">

                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10">

                  <Image
                    src={foregroundImage}
                    alt={foregroundAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {foregroundAlt}
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.18em] text-sky-400/80">
                    Registered Optometrist
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────────────────────────────────── */}
          {/* CONTENT SIDE */}
          {/* ───────────────────────────────────────── */}

          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:w-1/2">

            {/* Header */}
            <div className="space-y-4">

              <div className="inline-flex items-center gap-3">

                <div className="h-[2px] w-8 bg-sky-400 sm:w-10" />

                <span className="text-[10px] uppercase tracking-[0.2em] text-sky-400 sm:text-xs sm:tracking-[0.3em]">
                  Institutional Profile
                </span>
              </div>

              <h2 className="text-3xl font-semibold leading-[1.2] text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-white/65 sm:text-lg">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-3 sm:gap-8 sm:py-8">

              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center sm:text-left"
                >
                  <p className="text-2xl font-semibold text-white sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>

              <Link
                href={buttonHref}
                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#020617] transition hover:bg-sky-100 sm:px-8 sm:py-4 sm:text-sm"
              >
                {buttonText}

                <span className="text-base sm:text-lg">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};