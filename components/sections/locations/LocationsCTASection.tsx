// components/sections/locations/LocationsCTASection.tsx

import Link from "next/link";

interface LocationsCTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  emergencyText: string;
  emergencyPhone: string;
  emergencyNote: string;
}

export const LocationsCTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  emergencyText,
  emergencyPhone,
  emergencyNote,
}: LocationsCTASectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (CLEAN CTA STYLE) ── */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Soft gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-violet-500/10" />

      {/* Subtle radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/10 blur-[140px]" />

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-4xl px-[5%]">

        {/* ── MAIN CARD ── */}
        <div className="relative rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-md p-10 md:p-16 text-center">

          {/* HEADER */}
          <div className="mb-10 space-y-4">
            <p className="text-sky-400/80 text-xs font-semibold uppercase tracking-[0.25em]">
              Find your nearest clinic
            </p>

            <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              {title}
            </h2>

            <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

            {/* Primary */}
            <Link
              href={primaryButtonHref}
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              {primaryButtonText}
            </Link>

            {/* Secondary */}
            <Link
              href={secondaryButtonHref}
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:text-white hover:border-sky-400/60 text-sm font-semibold px-8 py-4 rounded-xl transition-all duration-300"
            >
              {secondaryButtonText}
            </Link>

          </div>

          {/* EMERGENCY */}
          <div className="pt-8 border-t border-white/10 flex flex-col items-center gap-4">

            <p className="text-white/40 text-xs uppercase tracking-wider">
              {emergencyText} (WhatsApp Support)
            </p>

            <a
              href={`https://wa.me/${emergencyPhone.replace(/\D/g, "")}`}
              className="text-white text-2xl md:text-3xl font-semibold hover:text-sky-400 transition"
            >
              {emergencyPhone}
            </a>

            <p className="text-white/40 text-xs">
              {emergencyNote}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};