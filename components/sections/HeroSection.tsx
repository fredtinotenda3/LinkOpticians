// components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ============================================
// Rotating Location Text Component
// ============================================
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
    exiting:  "opacity-0 -translate-y-2 blur-sm",
    entering: "opacity-0 translate-y-2 blur-sm",
  };

  return (
    <span className={`inline-block transition-all duration-500 ease-in-out font-semibold ${phaseStyles[phase]} text-sky-300`}>
      {locations[current]}
    </span>
  );
};

// ============================================
// Pause/Play Button for Video
// ============================================
interface PausePlayProps {
  isPaused: boolean;
  onToggle: () => void;
}

const PausePlayButton = ({ isPaused, onToggle }: PausePlayProps) => (
  <button
    onClick={onToggle}
    className="absolute bottom-8 right-8 flex items-center justify-center size-12 rounded-full border border-white/30 bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all duration-300 z-20"
    aria-label={isPaused ? "Play background video" : "Pause background video"}
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

// ============================================
// Stat Pill Component
// ============================================
const StatPill = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-3 shadow-xl">
    {children}
  </div>
);

// ============================================
// Main Hero Section
// ============================================
export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPaused) {
      v.play();
    } else {
      v.pause();
    }
    setIsPaused((p) => !p);
  };

  const locations = ["Harare", "Honeydew", "Kensington", "Chiredzi", "Chipinge"];

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#000d1a]">
      
      {/* ============================================
          Background Layer - VISIBLE & CLEAR
      ============================================ */}
      <div className="absolute inset-0">
        {/* Video - Now much more visible */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
          poster="/assets/images/hero-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/assets/videos/hero-clinic.mp4" type="video/mp4" />
        </video>

        {/* Fallback image while video loads */}
        {!videoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/assets/images/hero-poster.jpg')" }}
          />
        )}

        {/* LIGHTER Overlays - Just enough for text readability */}
        {/* Bottom gradient only (not top) - preserves the video clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-[#000d1a]/40 to-transparent" />
        
        {/* Subtle right-side gradient for text area only */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/60 via-transparent to-transparent" />
      </div>

      {/* ============================================
          Content Layer
      ============================================ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex items-center pt-20">
        <div className="w-full max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Clinical Status Badge - Transparent background to show video */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 bg-black/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15">
              <span className="relative flex size-2.5">
                <span className="relative inline-flex size-2.5 rounded-full bg-sky-400" />
              </span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">
                Est. 2008 • Registered Optometry Practice
              </span>
            </div>
            
            {/* Medical Aid Badge */}
            <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[10px] font-bold tracking-wider uppercase text-white/80">
                Medical Aid Accepted
              </span>
            </div>
          </div>

          {/* Headline - White text with subtle shadow for contrast */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-[85px] font-bold text-white leading-[1.05] tracking-tight drop-shadow-lg">
              Precion  <br />
              <span className="text-white">
                Vision. <span className="text-sky-300">For All.</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-normal text-white/90 max-w-xl leading-relaxed drop-shadow-md">
              Comprehensive eye exams • In-house lens lab • 
              <span className="inline-block mt-1 md:mt-0">
                {" "}Locations in <RotatingLocation locations={locations} />
              </span>
            </p>
          </div>

          {/* Action Hub - WhatsApp Primary */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* WhatsApp - PRIMARY CONTACT METHOD */}
            <Link
              href="https://wa.me/263773407464?text=Hello%20Link%20Opticians%2C%20I%27d%20like%20to%20book%20an%20eye%20examination"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b859] text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.123 1.524 5.861L.049 23.6c-.114.445.297.856.742.742l5.739-1.475A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.868 0-3.613-.525-5.12-1.428l-.37-.223-3.498.9.9-3.498-.223-.37A9.953 9.953 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp • Book Now
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Secondary: Online Booking Form */}
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-white text-[#001a33] font-bold text-lg px-10 py-5 rounded-full hover:bg-sky-50 transition-all duration-300"
            >
              Book Examination
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Clinical Statistics - Transparent backgrounds */}
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <StatPill>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm drop-shadow-md">16+ Years</span>
                <span className="text-white/70 text-[10px] uppercase tracking-wider">Serving Zimbabwe</span>
              </div>
            </StatPill>

            <div className="hidden sm:block h-8 w-px bg-white/20" />

            <StatPill>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm drop-shadow-md">In-House Lab</span>
                <span className="text-white/70 text-[10px] uppercase tracking-wider">Same-Day Lenses</span>
              </div>
            </StatPill>

            <div className="hidden sm:block h-8 w-px bg-white/20" />

            <StatPill>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm drop-shadow-md">5 Locations</span>
                <span className="text-white/70 text-[10px] uppercase tracking-wider">+ Mobile Unit</span>
              </div>
            </StatPill>
          </div>

          {/* Trust Bar - Subtle enough not to distract from video */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] font-medium text-white/60">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              No referral needed
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Direct medical aid claims
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              Free cancellation
            </span>
          </div>
        </div>
      </div>

      {/* ============================================
          Scroll Indicator
      ============================================ */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
        <span className="text-white/40 text-[10px] font-bold tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-sky-400 to-transparent opacity-60" />
      </div>

      <PausePlayButton isPaused={isPaused} onToggle={toggleVideo} />
    </section>
  );
};