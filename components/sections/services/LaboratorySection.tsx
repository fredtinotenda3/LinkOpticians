// components/sections/services/LaboratorySection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface LaboratorySectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
  buttonText: string;
  buttonHref: string;
}

export const LaboratorySection = ({
  title,
  titleHighlight,
  subtitle,
  image,
  imageAlt,
  stats,
  buttonText,
  buttonHref,
}: LaboratorySectionProps) => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative py-28 bg-[#000d1a] overflow-hidden"
    >
      {/* Deep Ocean Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* ── IMAGE SIDE ─────────────────────────────────────────────── */}
          <div
            className={`relative transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative rounded-[32px] overflow-hidden border border-white/10 aspect-[4/3] shadow-2xl group">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#001a33] animate-pulse" />
              )}

              <Image
                src={image}
                alt={imageAlt}
                fill
                className={`object-cover transition-all duration-1000 group-hover:scale-105 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={95}
                priority={false}
              />

              {/* Minimal bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Decorative accents */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-[32px] border border-sky-500/20 pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-[24px] border border-sky-500/10 pointer-events-none" />
          </div>

          {/* ── CONTENT SIDE ───────────────────────────────────────────── */}
          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tighter">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-sky-500/30 transition-all duration-500 hover:-translate-y-1 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <p className="text-2xl md:text-3xl font-black text-sky-400 leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link
                href={buttonHref}
                className="group inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-[11px] uppercase tracking-[0.2em] px-8 py-4 rounded-full transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5"
              >
                {buttonText}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};