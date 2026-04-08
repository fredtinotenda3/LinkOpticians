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
    <section className="relative py-32 bg-[#001a33] overflow-hidden">
      
      {/* Professional subtle lighting accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ── Section Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-xs font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              {title}
            </h2>
            {description && (
              <p className="text-white/50 text-xl font-light leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {showViewAll && (
            <Link
              href={viewAllHref}
              className="hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-bold uppercase tracking-widest transition-all duration-300 group shrink-0"
            >
              {viewAllText}
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── Clinical Bento Grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Featured Service Card (Laboratory/Exams) */}
          {featured && (
            <Link
              href={featured.href}
              className="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#002b4d] border border-white/10 hover:border-sky-500/40 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-h-[450px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#001a33]/20 to-transparent" />

              {/* Index Number Overlay */}
              <div className="absolute top-8 left-8">
                <span className="text-white/10 text-7xl font-black leading-none select-none tracking-tighter italic">01</span>
              </div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <span className="inline-block bg-sky-600 text-white text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 shadow-lg">
                  Clinical Lead
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-white/60 text-lg font-light leading-relaxed mb-6 line-clamp-2">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-3 text-sky-400 text-sm font-bold uppercase tracking-widest">
                  Explore Service
                  <div className="w-8 h-px bg-sky-400/50 group-hover:w-12 transition-all duration-500" />
                </span>
              </div>
            </Link>
          )}

          {/* Rest of the Services */}
          {rest.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-[2rem] bg-[#002b4d]/50 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 min-h-[220px]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-[#001a33]/40 to-transparent" />

              <div className="absolute top-6 left-6 flex items-center gap-4">
                <span className="text-white/10 text-3xl font-black leading-none italic">
                  {String(index + 2).padStart(2, "0")}
                </span>
                <span className="text-sky-400/40 text-[9px] font-bold tracking-[0.2em] uppercase">
                  {service.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile-only CTA */}
        {showViewAll && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-[#001a33] text-sm font-black uppercase tracking-widest shadow-xl"
            >
              {viewAllText}
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};