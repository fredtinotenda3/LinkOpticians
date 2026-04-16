// components/sections/services/CorporateSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface CorporateSectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  features: Feature[];
  buttonText: string;
  buttonHref: string;
}

export const CorporateSection = ({
  title,
  titleHighlight,
  subtitle,
  description,
  image,
  imageAlt,
  features,
  buttonText,
  buttonHref,
}: CorporateSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="corporate"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-y border-white/[0.05]"
    >
      {/* ── BACKGROUND: MORE CORPORATE (LESS GLOWY, MORE STRUCTURED) ── */}
      
      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#01030a]" />

      {/* controlled glow (less playful) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-400/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-500/8 blur-[120px] rounded-full pointer-events-none" />

      {/* subtle dot grid (professional texture) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── CONTENT SIDE ── */}
          <div
            className={`order-2 lg:order-1 space-y-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title (cleaned, more corporate) */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Features (clean cards, less flashy) */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
                >
                  <div className="size-11 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0 border border-sky-400/20">
                    {/* icon stays same */}
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="text-white text-sm md:text-base font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA (more professional, less flashy) */}
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-sky-400/40 text-white text-xs font-semibold uppercase tracking-wider hover:bg-sky-400 hover:text-black transition-all duration-300"
            >
              {buttonText}
            </Link>
          </div>

          {/* ── IMAGE SIDE ── */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/3]">
              
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
              )}

              <Image
                src={image}
                alt={imageAlt}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                quality={100}
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/50 via-transparent to-transparent" />
            </div>

            {/* Floating card (cleaned) */}
            <div className="absolute -bottom-5 left-4 md:left-8 bg-[#020617]/95 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 shadow-xl">
              <p className="text-white/60 text-[10px] uppercase tracking-wider">
                Group bookings
              </p>
              <p className="text-sky-400 text-sm font-semibold">
                Enterprise rates available
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};