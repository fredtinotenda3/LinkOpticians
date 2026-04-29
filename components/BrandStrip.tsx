"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export const BrandStrip = () => {
  const partners = [
    { name: "PSMAS", logo: "/assets/logos/psmas.svg" },
    { name: "EMERALD", logo: "/assets/logos/emerald.svg" },
    { name: "CIMAS", logo: "/assets/logos/cimas.svg" },
    { name: "ADVANTAGE HEALTH", logo: "/assets/logos/advantage-health.svg" },
    { name: "FIDELITY", logo: "/assets/logos/fidelity.svg" },
    { name: "ALLIANCE HEALTH", logo: "/assets/logos/alliance-health.svg" },
    { name: "CELLMED HEALTH", logo: "/assets/logos/cellmed-health.svg" },
    { name: "First Mutual", logo: "/assets/logos/fmh.svg" },
    { name: "FBC HEALTH", logo: "/assets/logos/fbc-health.svg" },
    { name: "EMF", logo: "/assets/logos/emf.svg" },
    { name: "MIRNEVA", logo: "/assets/logos/mirneva.svg" },
    { name: "MAISHA", logo: "/assets/logos/maisha.svg" },

  ];

  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Triple array for seamless infinite scroll
  const scrollingPartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-16 overflow-hidden bg-[#000d1a] border-y border-white/10">
      
      {/* Dotted Pattern Background - Matching TestimonialsSection */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="brand-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              {/* Deep Ocean base dot */}
              <circle cx="4" cy="4" r="1.5" fill="#0B2F6C" opacity="0.4" />
              {/* Light blue dot */}
              <circle cx="18" cy="18" r="2" fill="#38BDF8" opacity="0.15" />
              {/* Smaller light blue accent dot */}
              <circle cx="28" cy="8" r="1" fill="#7DD3FC" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brand-dots)" />
        </svg>
      </div>

      {/* Subtle top/bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header - White text for dark background */}
        <div className={`flex flex-col items-center justify-center gap-4 mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-sky-500/50" />
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sky-400 text-[11px] font-black uppercase tracking-[0.3em]">
                Trusted by leading medical aids
              </span>
            </div>
            <div className="w-8 h-px bg-sky-500/50" />
          </div>
          {/* Subtitle - White text */}
          <p className="text-white/80 text-[13px] font-bold text-center max-w-md">
            We process claims directly with all major medical aid societies
          </p>
        </div>

        {/* Marquee Container */}
        <div className={`relative transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          
          {/* Side Fades - Dark theme */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#000d1a] via-[#000d1a]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#000d1a] via-[#000d1a]/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div 
            className="flex w-max gap-16 items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              animation: `scroll 35s linear infinite`,
              animationPlayState: isPaused ? "paused" : "running"
            }}
          >
            {scrollingPartners.map((partner, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-center px-4"
              >
                {/* Logo Container - ORIGINAL COLORS immediately visible */}
                <div className="h-12 w-auto transition-all duration-500 group-hover:scale-105">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} - Medical Aid Partner`}
                    width={140}
                    height={48}
                    className="h-full w-auto object-contain"
                    priority
                  />
                </div>
                
                {/* Hover Label */}
                <span className="absolute -bottom-6 text-[9px] font-bold tracking-wider uppercase text-sky-400 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge Row - White text for dark background */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-[11px] font-bold">Direct claim submission</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-[11px] font-bold">No upfront payment required</span>
          </div>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/70 text-[11px] font-bold">All major schemes accepted</span>
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};