"use client";

import Link from "next/link";

interface CommunityBannerSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  stats?: { value: string; label: string }[];
}

export const CommunityBannerSection = ({
  title = "Care Beyond the Clinic",

  subtitle = "COMMUNITY IMPACT",

  description = "Our outreach initiatives extend access to eye care services across Zimbabwe through school screening programs, mobile diagnostic support, and community vision awareness campaigns.",

  stats = [
    { value: "15+", label: "Districts Reached" },
    { value: "1k+", label: "Students Screened" },
    { value: "2015", label: "Mobile Unit Launch" },
  ],
}: CommunityBannerSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-[#001a33] py-16 sm:py-20 md:py-24">

      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_40%)]" />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]
        bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]
        [background-size:60px_60px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#00213d]">

          <div className="p-8 sm:p-10 md:p-14 lg:p-16">

            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="max-w-3xl">

              {/* Subtitle */}
              <div className="mb-5 flex items-center gap-3">

                <div className="h-[2px] w-10 bg-sky-400" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400">
                  {subtitle}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>

              {/* Description */}
              <p className="mt-6 text-base leading-relaxed text-white/65 sm:text-lg">
                {description}
              </p>
            </div>

            {/* ========================================= */}
            {/* STATS */}
            {/* ========================================= */}

            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">

              {stats.map((stat, i) => (
                <div key={i}>

                  <p className="text-3xl font-semibold text-white md:text-4xl">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ========================================= */}
            {/* CTA */}
            {/* ========================================= */}

            <div className="mt-12">

              <Link
                href="/community"
                className="inline-flex items-center gap-3 rounded-full bg-sky-500 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400"
              >
                Learn About Our Initiatives

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};