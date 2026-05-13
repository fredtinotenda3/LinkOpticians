// components/sections/products/ProductsHeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductsHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge?: string;
}

export const ProductsHeroSection = ({
  title,
  titleHighlight,
  badge,
}: ProductsHeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-[#000d1a]">
      {/* ========================================= */}
      {/* BACKGROUND IMAGE */}
      {/* ========================================= */}
      <div className="absolute inset-0">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[#001a33]" />
        )}

        <Image
          src="/assets/images/products/products-hero.png"
          alt="Eyewear collection at Link Opticians"
          fill
          priority
          quality={95}
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/80 via-[#000d1a]/40 to-[#000d1a]/20" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
      </div>

      {/* ========================================= */}
      {/* CONTENT */}
      {/* ========================================= */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Small top label */}
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">
              Eyewear collection at Link Opticians
            </p>
          </div>

          {/* Optional badge */}
          {badge && (
            <div className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-400 backdrop-blur-md">
              {badge}
            </div>
          )}

          {/* Main heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-lg md:text-7xl lg:text-8xl">
              {title}

              {titleHighlight && (
                <>
                  <br />

                  <span className="text-sky-400">
                    {titleHighlight}
                  </span>
                </>
              )}
            </h1>
          </div>

          {/* CTA Button */}
          <div className="mt-12 flex items-center justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* KEYFRAMES */}
      {/* ========================================= */}
      <style jsx global>{`
        @keyframes scroll-down {
          0% {
            transform: translateY(-100%);
          }

          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
};