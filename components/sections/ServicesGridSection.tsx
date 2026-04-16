"use client";

import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES, SERVICES_PAGE_INTRO, ServiceItem } from "@/constants/services";

interface ServicesGridSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: ServiceItem[];
  viewAllText?: string;
  viewAllHref?: string;
  showViewAll?: boolean;
}

export const ServicesGridSection = ({
  title = SERVICES_PAGE_INTRO.title,
  subtitle = SERVICES_PAGE_INTRO.subtitle,
  description = SERVICES_PAGE_INTRO.description,
  services = HOME_SERVICES,
  viewAllText = "View all clinical services",
  viewAllHref = "/services",
  showViewAll = true,
}: ServicesGridSectionProps) => {

  const [featured, ...rest] = services;

  return (
    <section className="relative py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── PRIMARY GRID (VISIBLE STRUCTURE) ── */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── SECONDARY GRID (DEPTH COLOR) ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(56,189,248,0.2)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(168,85,247,0.2)_1px,transparent_1px)]
        [background-size:140px_140px]" 
      />

      {/* ── MICRO STARS ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:80px_80px]" 
      />

      {/* ── COLORED STAR ACCENTS ── */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
        bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.6)_1px,transparent_1px),
             radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.6)_1px,transparent_1px)]
        [background-size:120px_120px]" 
      />

      {/* ── NEBULA ── */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-sky-400/10 blur-[160px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-violet-500/10 blur-[140px]" />

      {/* ── FOCUS BAND ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[160px] -translate-y-1/2 
        bg-gradient-to-r from-transparent via-sky-400/20 to-transparent blur-3xl" 
      />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400 text-xs font-semibold tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-semibold text-white leading-[1.1]">
              {title}
            </h2>

            {description && (
              <p className="text-white/50 text-lg">
                {description}
              </p>
            )}
          </div>

          {showViewAll && (
            <Link
              href={viewAllHref}
              className="hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-semibold uppercase tracking-widest transition-all group"
            >
              {viewAllText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* FEATURED */}
          {featured && (
            <Link
              href={featured.href}
              className="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-sky-400/40 transition-all duration-700 min-h-[450px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 p-10">
                <h3 className="text-3xl font-semibold text-white mb-4 group-hover:text-sky-300 transition">
                  {featured.title}
                </h3>
                <p className="text-white/70">{featured.description}</p>
              </div>
            </Link>
          )}

          {/* REST */}
          {rest.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-[2rem] border border-white/5 hover:border-white/20 transition-all duration-500 min-h-[220px]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 p-6">
                <h3 className="text-lg font-semibold text-white group-hover:text-sky-300 transition">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE CTA */}
        {showViewAll && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#020617] text-sm font-semibold uppercase tracking-widest"
            >
              {viewAllText}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};