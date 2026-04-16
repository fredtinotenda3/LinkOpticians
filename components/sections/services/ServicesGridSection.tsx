// components/sections/services/ServicesGridSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { Service } from "@/constants/services";

interface ServicesGridSectionProps {
  title: string;
  titleHighlight: string;
  subtitle: string;
  services: Service[];
}

export const ServicesGridSection = ({
  title,
  titleHighlight,
  subtitle,
  services,
}: ServicesGridSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const orderedServices = [
    services.find((s) => s.category === "exams"),
    services.find((s) => s.category === "glasses"),
    services.find((s) => s.category === "contacts"),
    services.find((s) => s.id === "pediatric"),
    services.find((s) => s.id === "dry-eye"),
    services.find((s) => s.category === "emergency"),
  ].filter(Boolean) as Service[];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden"
    >
      {/* BACKGROUND SYSTEM */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>
          </div>

          {/* ❌ Removed "6 Specialties Available" */}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedServices.map((service, index) => (
            <div
              key={service.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <ServiceCard
                service={service}
                id={
                  service.id === "pediatric"
                    ? "children"
                    : service.id === "dry-eye"
                    ? "seniors"
                    : service.category
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};