"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

// ─── Rotating Location Text Component ────────────────────────────────────────
interface RotatingLocationProps {
  locations: string[];
  interval?: number; // ms between transitions
}

const RotatingLocation = ({ locations, interval = 2800 }: RotatingLocationProps) => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      // Step 1: start exit animation
      setPhase("exiting");

      // Step 2: swap text mid-animation, start enter animation
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % locations.length);
        setPhase("entering");
      }, 350);

      // Step 3: settle to visible
      setTimeout(() => {
        setPhase("visible");
      }, 700);
    }, interval);

    return () => clearInterval(timer);
  }, [locations.length, interval]);

  const phaseStyles: Record<typeof phase, string> = {
    visible:  "opacity-100 translate-y-0    blur-0",
    exiting:  "opacity-0   -translate-y-3   blur-sm",
    entering: "opacity-0    translate-y-3   blur-sm",
  };

  return (
    <span
      className={`
        inline-block transition-all duration-300 ease-in-out
        ${phaseStyles[phase]}
        text-green-400
      `}
    >
      {locations[current]}
    </span>
  );
};

// ─── Pause / Play Button (controlled) ────────────────────────────────────────
interface PausePlayProps {
  isPaused: boolean;
  onToggle: () => void;
}

const PausePlayButton = ({ isPaused, onToggle }: PausePlayProps) => (
  <button
    onClick={onToggle}
    aria-label={isPaused ? "Play video" : "Pause video"}
    className="group absolute bottom-8 right-8 flex items-center justify-center size-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
  >
    {isPaused ? (
      /* Play icon */
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white ml-0.5">
        <path d="M4 2.5L13 8L4 13.5V2.5Z" fill="currentColor" />
      </svg>
    ) : (
      /* Pause icon */
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
        <rect x="3.5" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
        <rect x="9"   y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
      </svg>
    )}
  </button>
);

// ─── Stat Pill ────────────────────────────────────────────────────────────────
const StatPill = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3">
    {children}
  </div>
);

// ─── Main Hero Section ────────────────────────────────────────────────────────
interface HeroSectionProps {
  showStats?: boolean;
  showScrollIndicator?: boolean;
  showPauseButton?: boolean;
}

export const HeroSection = ({
  showStats = true,
  showScrollIndicator = true,
  showPauseButton = true,
}: HeroSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isPaused ? v.play() : v.pause();
    setIsPaused((p) => !p);
  };

  const locations = ["Harare", "Chipinge", "Chiredzi"];

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">

      {/* ── Video Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105" /* subtle scale for parallax feel */
          poster="/assets/images/hero-poster.jpg"
        >
          <source src="/assets/videos/hero-clinic.webm" type="video/webm" />
          <source src="/assets/videos/hero-clinic.mp4"  type="video/mp4"  />
        </video>

        {/* Layered gradients — bottom-heavy for legibility, left-heavy for layout */}
        <div className="absolute inset-0 bg-gradient-to-t  from-black/85  via-black/40  to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r  from-black/60  via-black/20  to-transparent" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      {/* ── Hero Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-[5%] h-full flex items-end pb-28 md:pb-36">
        <div className="w-full max-w-2xl mx-auto space-y-7 animate-fade-in-up text-center">

          {/* Est. badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mx-auto">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
              Est. 2008 · Zimbabwe
            </span>
          </div>

          {/* ── Headline with rotating location ── */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-white leading-[0.95] tracking-tight">
              See life
              <br />
              <span className="text-green-400">clearly</span>
            </h1>

            {/* Dynamic location line */}
            <p className="text-lg sm:text-xl md:text-2xl font-light text-white/70 pt-1">
              Serving{" "}
              <RotatingLocation locations={locations} interval={2800} />
              {" "}& beyond
            </p>
          </div>

          {/* Supporting copy */}
          <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed mx-auto">
           Eye care clinics in Hrare, Chiredzi, Chipinge. Bringing vision to every corner of Zimbabwe.
          </p>

          {/* Location pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 bg-green-500/15 border border-green-400/35 text-green-300 text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full backdrop-blur-sm"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {loc}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center">
            <Link
              href="/book"
              className="
                group inline-flex items-center justify-center gap-2
                bg-green-500 hover:bg-green-400
                text-white font-semibold text-base
                px-8 py-4 rounded-full
                shadow-[0_0_40px_rgba(34,197,94,0.35)]
                hover:shadow-[0_0_55px_rgba(34,197,94,0.55)]
                transition-all duration-300 hover:scale-[1.03]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black
              "
            >
              Book appointment
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="/community"
              className="
                inline-flex items-center justify-center gap-2
                border border-white/30 text-white/90 font-semibold text-base
                px-8 py-4 rounded-full
                bg-white/8 hover:bg-white/15 backdrop-blur-sm
                transition-all duration-300 hover:border-white/50
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50
              "
            >
              See our impact
            </Link>
          </div>

          {/* Stats bar */}
          {showStats && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              {/* Avatar stack */}
              <StatPill>
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="size-8 rounded-full border-2 border-black/40 bg-dark-300 overflow-hidden ring-1 ring-white/10">
                      <Image
                        src={`/assets/images/patient-${i}.png`}
                        alt="Happy patient"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="size-8 rounded-full border-2 border-black/40 bg-green-500 flex items-center justify-center text-[10px] font-bold text-white ring-1 ring-white/10">
                    +2k
                  </div>
                </div>
                <span className="text-white/70 text-xs font-medium">Happy patients</span>
              </StatPill>

              {/* Divider */}
              <div className="hidden sm:block h-6 w-px bg-white/15" />

              {/* Rating */}
              <StatPill>
                <div className="flex text-yellow-400 text-sm gap-px">
                  {Array(5).fill(null).map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-white/70 text-xs font-medium">4.9 · 2,500+ reviews</span>
              </StatPill>
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll Indicator ─────────────────────────────────────────────── */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex">
          <div className="flex flex-col items-center gap-2 text-white/40 text-[10px] font-semibold tracking-[0.25em] uppercase">
            <span>Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-[scroll-line_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      {/* ── Pause/Play ───────────────────────────────────────────────────── */}
      {showPauseButton && (
        <div className="z-10">
          <PausePlayButton isPaused={isPaused} onToggle={toggleVideo} />
        </div>
      )}
    </section>
  );
};
