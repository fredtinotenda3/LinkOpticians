"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HOME_TESTIMONIALS, TESTIMONIALS_SECTION_CONFIG } from "@/constants/testimonials";

// --- Internal Card Component ---
const TestimonialCard = ({ image, quote, name, location, rating }: any) => (
  <div className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] p-6 sm:p-8 rounded-[2rem] bg-[#002b4d]/40 border border-white/5 backdrop-blur-sm hover:border-sky-500/30 transition-all duration-500 flex flex-col gap-5 sm:gap-6 group">
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? "text-amber-400" : "text-white/10"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>

    <p className="text-white/80 text-sm sm:text-base md:text-lg font-light italic leading-relaxed flex-1">
      &ldquo;{quote}&rdquo;
    </p>

    <div className="flex items-center gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/5">
      <div className="size-10 sm:size-12 rounded-full overflow-hidden border-2 border-sky-500/20 shrink-0">
        <Image
          src={image}
          alt={name}
          width={48}
          height={48}
          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div>
        <p className="text-white font-bold text-xs sm:text-sm tracking-wide">{name}</p>
        <p className="text-sky-400/60 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] mt-0.5">
          {location}
        </p>
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
    <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-[#000d1a]">
      
      {/* Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonial-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#0B2F6C" opacity="0.4" />
              <circle cx="18" cy="18" r="2" fill="#38BDF8" opacity="0.15" />
              <circle cx="28" cy="8" r="1" fill="#7DD3FC" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonial-dots)" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      {/* HEADER */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 mb-14 sm:mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 sm:gap-10">
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-px bg-sky-500" />
              <span className="text-sky-400 text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              {title}
            </h2>
          </div>

          {/* RATING BOX */}
          <div className="flex items-center gap-4 sm:gap-6 bg-[#002b4d] border border-white/10 rounded-[2rem] px-5 sm:px-8 py-4 sm:py-5 shadow-2xl w-fit">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-none">5.0</p>
              <p className="text-white/30 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest mt-2">
                Avg Rating
              </p>
            </div>

            <div className="h-10 sm:h-12 w-px bg-white/10" />

            <div className="space-y-1 sm:space-y-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sky-400 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                Verified Patients
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* CAROUSEL */}
      <div className="relative group/track z-10">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-r from-[#000d1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-40 bg-gradient-to-l from-[#000d1a] to-transparent z-10 pointer-events-none" />

        <div 
          ref={trackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6"
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