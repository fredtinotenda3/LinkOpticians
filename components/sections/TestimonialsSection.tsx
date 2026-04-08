"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HOME_TESTIMONIALS, TESTIMONIALS_SECTION_CONFIG } from "@/constants/testimonials";

// --- Internal Card Component ---
const TestimonialCard = ({ image, quote, name, location, rating }: any) => (
  <div className="min-w-[340px] md:min-w-[400px] p-8 rounded-[2rem] bg-[#002b4d]/40 border border-white/5 backdrop-blur-sm hover:border-sky-500/30 transition-all duration-500 flex flex-col gap-6 group">
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-white/10"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-white/80 text-lg font-light italic leading-relaxed flex-1">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
      <div className="size-12 rounded-full overflow-hidden border-2 border-sky-500/20 shrink-0">
        <Image src={image} alt={name} width={48} height={48} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>
      <div>
        <p className="text-white font-bold text-sm tracking-wide">{name}</p>
        <p className="text-sky-400/60 text-[10px] font-black uppercase tracking-[0.15em] mt-0.5">{location}</p>
      </div>
    </div>
  </div>
);

// --- Main Section ---
export const TestimonialsSection = ({
  title = TESTIMONIALS_SECTION_CONFIG.title,
  subtitle = TESTIMONIALS_SECTION_CONFIG.subtitle,
  testimonials = HOME_TESTIMONIALS,
  autoScroll = true,
}: any) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    if (!autoScroll) return;
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const step = () => {
      if (!isPaused.current) {
        pos += 0.6;
        if (pos >= track.scrollWidth / 2) pos = 0;
        track.scrollLeft = pos;
      }
      requestAnimationFrame(step);
    };
    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [autoScroll]);

  const items = [...testimonials, ...testimonials];

  return (
    <section className="py-32 bg-[#001a33] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-px bg-sky-500" />
              <span className="text-sky-500 text-xs font-black tracking-[0.3em] uppercase">{subtitle}</span>
            </div>
            <h2 className="text-5xl font-bold text-white tracking-tight">{title}</h2>
          </div>

          <div className="flex items-center gap-6 bg-[#002b4d] border border-white/10 rounded-[2rem] px-8 py-5 shadow-2xl">
            <div className="text-center">
              <p className="text-4xl font-black text-white leading-none">5.0</p>
              <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-2">Avg Rating</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="space-y-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest">Verified Patients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative group/track">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#001a33] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#001a33] to-transparent z-10 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6"
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          {items.map((t, i) => (
            <TestimonialCard key={`${t.id}-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};