// components/sections/locations/LocationsHeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LocationsHeroSectionProps {
  title: string;
  titleHighlight: string;
}

export const LocationsHeroSection = ({
  title,
  titleHighlight,
}: LocationsHeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[75vh] w-full overflow-hidden flex items-center bg-[#000d1a]">
      {/* ===== BACKGROUND LAYER - CRYSTAL CLEAR ===== */}
      <div className="absolute inset-0">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
        )}

        <Image
          src="/assets/images/zimbabwe-map-detailed.png"
          alt="Map of Zimbabwe"
          fill
          className={`object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          priority
          quality={95}
        />

        {/* MINIMAL Overlays - Only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/60 via-[#000d1a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
      </div>

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        <div
          className={`max-w-3xl space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-lg">
            {title}
            <br />
            <span className="text-sky-400 block mt-2">{titleHighlight}</span>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full shadow-2xl shadow-black/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-sky-600/40"
            >
              Book Appointment
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
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

            <Link
              href="#clinics"
              className="group inline-flex items-center justify-center gap-2 border border-white/20 bg-black/30 backdrop-blur-sm text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full hover:bg-white/10 transition-all duration-500 hover:scale-[1.02]"
            >
              View All Clinics
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