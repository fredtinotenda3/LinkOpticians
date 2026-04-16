// components/sections/about/FounderStorySection.tsx

import Image from "next/image";

interface Milestone {
  year: string;
  text: string;
}

interface FounderStorySectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  image: string;
  imageAlt: string;
  caption: string;
  captionSubtext: string;
  milestones: Milestone[];
}

export const FounderStorySection = ({
  title,
  titleHighlight,
  description,
  quote,
  quoteAuthor,
  image,
  imageAlt,
  caption,
  captionSubtext,
  milestones,
}: FounderStorySectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (SOFT STORY LIGHTING) ── */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Soft spotlight (focus on person) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-400/10 blur-[160px]" />

      {/* Subtle secondary tone */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-violet-500/10 blur-[140px]" />

      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── IMAGE SIDE ── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/5] max-w-[480px] mx-auto lg:mx-0">
              
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={100}
              />

              {/* Softer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
            </div>

            {/* Caption card (cleaner) */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-[260px] flex items-center gap-4 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl px-5 py-4">
              
              <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>

              <div>
                <p className="text-white text-sm font-semibold">{caption}</p>
                <p className="text-sky-400 text-[10px] uppercase tracking-wider">
                  {captionSubtext}
                </p>
              </div>
            </div>
          </div>

          {/* ── CONTENT SIDE ── */}
          <div className="space-y-8 order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                The Founder&apos;s Vision
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
              <span className="block text-sky-400 mt-2">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Quote (editorial style) */}
            <div className="relative pl-6 border-l border-sky-400/50">
              <p className="text-white text-lg md:text-xl italic leading-relaxed">
                {quote}
              </p>
              <p className="text-sky-400 text-xs mt-4 uppercase tracking-wider">
                — {quoteAuthor}
              </p>
            </div>

            {/* Milestones */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition"
                >
                  <p className="text-xl font-semibold text-white mb-1">
                    {milestone.year}
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {milestone.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};