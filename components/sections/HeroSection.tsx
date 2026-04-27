// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

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

// Pause Button
const PausePlayButton = ({ isPaused, onToggle }: any) => (
  <button
    onClick={onToggle}
    className="absolute bottom-8 right-8 size-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-md z-20"
  >
    {isPaused ? "▶" : "❚❚"}
  </button>
);

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    isPaused ? v.play() : v.pause();
    setIsPaused(!isPaused);
  };

  const locations = ["Harare", "Honeydew", "Kensington", "Chiredzi", "Chipinge"];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#000d1a]">

      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/assets/videos/hero-clinic.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-[#000d1a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/60 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center pt-20">
        <div className="max-w-3xl space-y-8">

          {/* HEADLINE */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-bold text-white leading-[1.05]">
              PrecisionVision.
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-xl">
              Comprehensive eye exams • In-house lens lab • 
              {" "}Locations in <RotatingLocation locations={locations} />
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              href="https://wa.me/263773407464"
              className="bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg"
            >
              WhatsApp • Book Now
            </Link>

            <Link
              href="/book"
              className="bg-white text-[#001a33] px-10 py-5 rounded-full font-bold text-lg"
            >
              Book Examination
            </Link>

          </div>

        </div>
      </div>

      <PausePlayButton isPaused={isPaused} onToggle={toggleVideo} />
    </section>
  );
};