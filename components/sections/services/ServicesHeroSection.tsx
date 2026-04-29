"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ServicesHeroSectionProps {
  title: string;
  titleHighlight: string;
}

export const ServicesHeroSection = ({
  title,
  titleHighlight,
}: ServicesHeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-screen w-full overflow-hidden flex items-center justify-center bg-[#000d1a]">
      
      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
        )}

        <Image
          src="/assets/images/services-hero.png"
          alt="Optometry clinic examination"
          fill
          priority
          quality={100}
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 100vw,
                 100vw"
          className={`object-cover object-[center_right] transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/80 via-[#000d1a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
        <div
          className={`max-w-4xl mx-auto space-y-6 sm:space-y-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* HEADLINE */}
          <h1 className="font-black text-white leading-[1.05] tracking-tight drop-shadow-lg">
            
            {/* Fluid text scaling */}
            <span className="block text-[clamp(2.2rem,5vw,4rem)] lg:text-[clamp(4rem,6vw,6rem)]">
              {title}
            </span>

            <span className="block text-sky-400 text-[clamp(2.2rem,5vw,4rem)] lg:text-[clamp(4rem,6vw,6rem)]">
              {titleHighlight}
            </span>
          </h1>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-4">
            
            {/* PRIMARY CTA */}
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 
              bg-sky-600 hover:bg-sky-500 text-white font-bold 
              text-[10px] sm:text-xs uppercase tracking-[0.18em] 
              px-6 sm:px-8 lg:px-10 py-4 sm:py-5 
              rounded-full shadow-xl transition-all duration-300 
              hover:scale-[1.03] hover:shadow-sky-600/40"
            >
              Book Appointment
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            {/* SECONDARY CTA */}
            <Link
              href="#services"
              className="group inline-flex items-center justify-center gap-2 
              border border-white/20 bg-black/30 backdrop-blur-sm 
              text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] 
              px-6 sm:px-8 lg:px-10 py-4 sm:py-5 
              rounded-full hover:bg-white/10 transition-all duration-300 
              hover:scale-[1.03]"
            >
              View Specialties
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};