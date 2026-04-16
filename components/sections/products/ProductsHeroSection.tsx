// components/sections/products/ProductsHeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductsHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
}

export const ProductsHeroSection = ({
  title,
  titleHighlight,
  description,
  badge,
}: ProductsHeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center bg-[#000d1a]">
      {/* ===== BACKGROUND LAYER - CRYSTAL CLEAR ===== */}
      <div className="absolute inset-0">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
        )}

        <Image
          src="/assets/images/products-hero.jpg"
          alt="Eyewear collection at Link Opticians"
          fill
          className={`object-cover transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          priority
          quality={95}
        />

        {/* MINIMAL Overlays - Only for text readability, image stays CLEAR */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/70 via-[#000d1a]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
      </div>

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative mx-auto max-w-7xl px-6 py-32 w-full">
        <div
          className={`max-w-3xl space-y-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Headline - Deep Ocean & Sky Blue */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-lg">
              {title}
              <br />
              <span className="text-sky-400 block mt-2">{titleHighlight}</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-light drop-shadow-md">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Add keyframes animation for scroll indicator */}
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