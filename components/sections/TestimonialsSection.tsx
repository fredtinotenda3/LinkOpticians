"use client";

import { useEffect, useRef } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { HOME_TESTIMONIALS, TESTIMONIALS_SECTION_CONFIG, Testimonial } from "@/constants/testimonials";

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  showGradients?: boolean;
  autoScroll?: boolean;
  scrollSpeed?: number;
}

export const TestimonialsSection = ({
  title = TESTIMONIALS_SECTION_CONFIG.title,
  subtitle = TESTIMONIALS_SECTION_CONFIG.subtitle,
  testimonials = HOME_TESTIMONIALS,
  showGradients = TESTIMONIALS_SECTION_CONFIG.showGradients,
  autoScroll = true,
  scrollSpeed = 40,
}: TestimonialsSectionProps) => {

  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    if (!autoScroll) return;
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    const step = () => {
      if (!isPaused.current) {
        pos += 0.5;
        // Reset when scrolled halfway (we duplicate items)
        if (pos >= track.scrollWidth / 2) pos = 0;
        track.scrollLeft = pos;
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [autoScroll, scrollSpeed]);

  // Duplicate for seamless loop
  const items = [...testimonials, ...testimonials];

  // Aggregate rating
  const avgRating = (
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <section className="py-28 bg-dark-400 overflow-hidden">
      <div className="mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">

          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>
          </div>

          {/* Aggregate rating pill */}
          <div className="flex items-center gap-4 bg-dark-300 border border-dark-500 rounded-2xl px-6 py-4 shrink-0">
            <div>
              <p className="text-3xl font-bold text-white leading-none">{avgRating}</p>
              <p className="text-white/40 text-xs mt-1">Overall rating</p>
            </div>
            <div className="h-10 w-px bg-dark-500" />
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-1">2,500+ reviews</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scrolling track — full bleed ─────────────────────────────── */}
      <div className="relative">

        {/* Fade edges */}
        {showGradients && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-400 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-400 to-transparent z-10 pointer-events-none" />
          </>
        )}

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide px-[5%]"
          style={{ scrollBehavior: "auto" }}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
          onTouchStart={() => { isPaused.current = true; }}
          onTouchEnd={() => { isPaused.current = false; }}
        >
          {items.map((testimonial, i) => (
            <TestimonialCard
              key={`${testimonial.id}-${i}`}
              image={testimonial.image}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
