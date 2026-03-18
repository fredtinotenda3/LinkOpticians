/* eslint-disable @typescript-eslint/no-unused-vars */
// components/sections/ServicesGridSection.tsx
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
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
}

export const ServicesGridSection = ({
  title = SERVICES_PAGE_INTRO.title,
  subtitle = SERVICES_PAGE_INTRO.subtitle,
  description = SERVICES_PAGE_INTRO.description,
  services = HOME_SERVICES,
  viewAllText = "View all services",
  viewAllHref = "/services",
  columns = 4,
  showViewAll = true,
}: ServicesGridSectionProps) => {

  const [featured, ...rest] = services;

  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      {/* Background glow accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-500/4 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-white/50 text-base leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* View all — desktop */}
          {showViewAll && (
            <Link
              href={viewAllHref}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300 group shrink-0"
            >
              {viewAllText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── Bento grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Featured card — spans 2 cols + 2 rows */}
          {featured && (
            <Link
              href={featured.href}
              className="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(36,174,124,0.12)] min-h-[380px]"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Lighter gradient — image breathes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              {/* Service number */}
              <div className="absolute top-5 left-5">
                <span className="text-white/20 text-5xl font-bold leading-none select-none">01</span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <span className="inline-block bg-green-500 text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4">
                  Featured
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-white/65 text-sm leading-relaxed mb-5 line-clamp-2">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold">
                  Learn more
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          {/* Remaining cards */}
          {rest.map((service, index) => (
            <Link
              key={service.id}
              href={service.href}
              className="group relative overflow-hidden rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] min-h-[180px]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Lighter overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Service number */}
              <div className="absolute top-4 left-4">
                <span className="text-white/15 text-3xl font-bold leading-none select-none">
                  {String(index + 2).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                  {service.title}
                </h3>
                <p className="text-white/55 text-xs leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all — mobile */}
        {showViewAll && (
          <div className="mt-10 text-center md:hidden">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
            >
              {viewAllText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
