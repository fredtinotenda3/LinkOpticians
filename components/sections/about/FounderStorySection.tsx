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
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ─────────────────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-dark-500 aspect-[4/5] max-w-[480px] mx-auto lg:mx-0">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-300/50 via-transparent to-transparent" />
            </div>

            {/* Floating caption card */}
            <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-[240px] flex items-center gap-3 bg-dark-400/95 backdrop-blur-md border border-dark-500 rounded-2xl px-5 py-4 shadow-2xl">
              <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{caption}</p>
                <p className="text-green-400 text-xs mt-0.5">{captionSubtext}</p>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />
          </div>

          {/* ── Content side ───────────────────────────────────────────── */}
          <div className="space-y-8 order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                Founder's Story
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed">
              {description}
            </p>

            {/* Blockquote — refined */}
            <div className="relative pl-6 py-2">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-green-500 rounded-full" />
              <svg className="w-6 h-6 text-green-500/30 mb-2" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
              </svg>
              <p className="text-white/75 text-base leading-relaxed italic">
                {quote}
              </p>
              <footer className="text-white/40 text-xs mt-3 font-medium">— {quoteAuthor}</footer>
            </div>

            {/* Milestones — info cards */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dark-500">
              {milestones.map((milestone, index) => (
                <div key={index} className="p-4 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-colors duration-300">
                  <p className="text-xl font-bold text-white leading-none mb-1">{milestone.year}</p>
                  <p className="text-white/45 text-xs leading-snug">{milestone.text}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
