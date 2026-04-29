// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

// Rotating Location
const RotatingLocation = ({ locations, interval = 3000 }: { locations: string[]; interval?: number }) => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("exiting");
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % locations.length);
        setPhase("entering");
      }, 350);
      setTimeout(() => setPhase("visible"), 700);
    }, interval);
    return () => clearInterval(timer);
  }, [locations.length, interval]);

  const styles = {
    visible: "opacity-100 translate-y-0",
    exiting: "opacity-0 -translate-y-2",
    entering: "opacity-0 translate-y-2",
  };

  return (
    <span
      className={`inline-block transition-all duration-500 ${styles[phase]} text-sky-300 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl`}
    >
      {locations[current]}
    </span>
  );
};

export const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const locations = ["Harare", "Honeydew", "Kensington", "Chiredzi", "Chipinge"];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-black animate-pulse" />
        )}

        <Image
          src="/assets/images/hero-clinic-bg.png"
          alt="Link Opticians modern clinic interior"
          fill
          priority
          quality={100}
          className={`object-cover transition-opacity duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* CONTENT */}
      <div
        className={`relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20 sm:pt-24 md:pt-28 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-full max-w-3xl space-y-6 sm:space-y-8">

          {/* HEADLINE */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[85px] font-bold text-white leading-tight sm:leading-[1.1] md:leading-[1.05]">
              PrecisionVision.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-xl leading-relaxed">
              Comprehensive eye exams • In-house lens lab •{" "}
              Locations in <RotatingLocation locations={locations} />
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link
              href="https://wa.me/263737683090"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b859] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg text-center transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              WhatsApp • Book Now
            </Link>

            <Link
              href="/book"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg text-center transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Book Examination
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};