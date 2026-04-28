"use client";

import Image from "next/image";
import Link from "next/link";

interface CommunityBannerSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  stats?: { value: string; label: string }[];
}

export const CommunityBannerSection = ({
  title = "Care Beyond the Clinic",
  subtitle = "COMMUNITY IMPACT",
  description = "Our vision extends to every corner of Zimbabwe. Through mobile diagnostic units and national school screening programs, we ensure that distance is never a barrier to high-standard ocular health.",
  image = "/assets/images/community-banner.png", // Suggested: A high-quality photo of the mobile unit or a school screening
  stats = [
    { value: "15+", label: "Rural Districts Reached" },
    { value: "1k+", label: "Students Screened" },
    { value: "2015", label: "Mobile Unit Launch" },
  ],
}: CommunityBannerSectionProps) => {
  return (
    <section className="relative py-24 bg-[#001a33] overflow-hidden">
      
      {/* Structural Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002b4d]/30 skew-x-[-12deg] translate-x-20 pointer-events-none border-l border-white/5" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="bg-[#002b4d] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* ── Content side ───────────────────────────────────────────────── */}
            <div className="lg:w-3/5 p-10 md:p-16 xl:p-20 space-y-10">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sky-400 text-xs font-black tracking-[0.3em] uppercase">
                    {subtitle}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                  {title}
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                  {description}
                </p>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-sky-400/60 text-[10px] font-bold uppercase tracking-widest leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/community"
                  className="group inline-flex items-center gap-4 text-white text-sm font-bold uppercase tracking-[0.2em] border-b-2 border-sky-500 pb-2 hover:text-sky-400 transition-all duration-300"
                >
                  Learn About Our Initiatives
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* ── Visual side ─────────────────────────────────────────────────── */}
            <div className="lg:w-2/5 relative min-h-[350px] lg:min-h-auto overflow-hidden">
              <Image
                src={image}
                alt="Community Outreach"
                fill
                className="object-cover"
              />
              {/* Clinical Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-l from-transparent via-[#002b4d]/20 to-[#002b4d]" />
              
              {/* Mobile Unit Badge Overlay */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-[200px]">
                <p className="text-white text-xs font-medium leading-relaxed italic">
                  &ldquo;Vision is a right, not a privilege, regardless of geography.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};