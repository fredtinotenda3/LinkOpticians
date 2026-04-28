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
    <span className={`inline-block transition-all duration-500 ${styles[phase]} text-sky-300 font-semibold`}>
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
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black">

      {/* BACKGROUND IMAGE - NO BLUR, NO BLUE TINT */}
      <div className="absolute inset-0">
        {/* Loading skeleton while image loads */}
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
          sizes="(max-width: 768px) 100vw, 100vw"
        />

        {/* CLEAN DARK GRADIENTS - NO BLUE, JUST BLACK */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className={`relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center pt-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}>
        <div className="max-w-3xl space-y-8">

          {/* HEADLINE */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-bold text-white leading-[1.05]">
              PrecisionVision.
            </h1>

            <p className="text-xl md:text-2xl text-white max-w-xl">
              Comprehensive eye exams • In-house lens lab • 
              {" "}Locations in <RotatingLocation locations={locations} />
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://wa.me/263773407464"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20b859] text-white px-10 py-5 rounded-full font-bold text-lg text-center transition-all duration-300"
            >
              WhatsApp • Book Now
            </Link>

            <Link
              href="/book"
              className="bg-white hover:bg-gray-100 text-black px-10 py-5 rounded-full font-bold text-lg text-center transition-all duration-300"
            >
              Book Examination
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};