"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ─── Rotating Location Text Component ────────────────────────────────────────
interface RotatingLocationProps {
  locations: string[];
  interval?: number;
}

const RotatingLocation = ({ locations, interval = 3000 }: RotatingLocationProps) => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase("exiting");
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % locations.length);
        setPhase("entering");
      }, 350);
      setTimeout(() => {
        setPhase("visible");
      }, 700);
    }, interval);
    return () => clearInterval(timer);
  }, [locations.length, interval]);

  const phaseStyles: Record<typeof phase, string> = {
    visible:  "opacity-100 translate-y-0 blur-0",
    exiting:  "opacity-0 -translate-y-3 blur-sm",
    entering: "opacity-0 translate-y-3 blur-sm",
  };

  return (
    <span
      className={`
        inline-block transition-all duration-500 ease-in-out font-semibold
        ${phaseStyles[phase]}
        text-sky-300
      `}
    >
      {locations[current]}
    </span>
  );
};

// ─── Pause / Play Button ─────────────────────────────────────────────────────
interface PausePlayProps {
  isPaused: boolean;
  onToggle: () => void;
}

const PausePlayButton = ({ isPaused, onToggle }: PausePlayProps) => (
  <button
    onClick={onToggle}
    className="absolute bottom-8 right-8 flex items-center justify-center size-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 z-20"
  >
    {isPaused ? (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-white ml-0.5">
        <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="text-white">
        <rect x="3.5" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
        <rect x="9" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
      </svg>
    )}
  </button>
);

// ─── Stat Pill ────────────────────────────────────────────────────────────────
const StatPill = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl px-5 py-3 shadow-2xl">
    {children}
  </div>
);

// ─── Main Hero Section ────────────────────────────────────────────────────────
export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPaused ? v.play() : v.pause();
    setIsPaused((p) => !p);
  };

  const locations = ["Harare", "Honeydew", "Kensington", "Chiredzi", "Chipinge"];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#001a33]">
      
      {/* ── Background Layer ─────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          poster="/assets/images/hero-poster.jpg"
        >
          <source src="/assets/videos/hero-clinic.mp4" type="video/mp4" />
        </video>

        {/* Deep Ocean Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001a33]/90 via-[#001a33]/50 to-[#001a33]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a33] via-[#001a33]/30 to-transparent" />
      </div>

      {/* ── Content Layer ─────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center pt-20">
        <div className="w-full max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Clinical Status Badge */}
          <div className="inline-flex items-center gap-3 bg-sky-500/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-sky-400/20">
            <span className="relative flex size-2.5">
              <span className="relative inline-flex size-2.5 rounded-full bg-sky-500" />
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-100/90">
              Est. 2008 • Optometry Services Zimbabwe
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-bold text-white leading-[1.05] tracking-tight">
              Primary <br />
              <span className="text-white/90">
                Eye Care.
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-normal text-white/80 max-w-xl leading-relaxed">
              Providing comprehensive vision examinations in <RotatingLocation locations={locations} />.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#001a33] font-bold text-lg px-10 py-5 rounded-full hover:bg-sky-50 transition-all duration-300"
            >
              Book Examination
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="https://wa.me/263776336475"
              target="_blank"
              className="inline-flex items-center justify-center gap-3 border border-white/20 text-white font-bold text-lg px-10 py-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
            >
              Contact via WhatsApp
            </Link>
          </div>

          {/* Clinical Statistics */}
          <div className="flex flex-wrap items-center gap-6 pt-6">
            <StatPill>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">16 Years</span>
                <span className="text-white/50 text-[10px] uppercase tracking-wider">Clinical Practice</span>
              </div>
            </StatPill>

            <div className="hidden sm:block h-10 w-px bg-white/10" />

            <StatPill>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">In-House Lab</span>
                <span className="text-white/50 text-[10px] uppercase tracking-wider">Lens Manufacturing</span>
              </div>
            </StatPill>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-white/30 text-[10px] font-bold tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-sky-400 to-transparent opacity-40" />
      </div>

      <PausePlayButton isPaused={isPaused} onToggle={toggleVideo} />
    </section>
  );
};