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
    <section className="relative py-28 bg-[#000B18] overflow-hidden">
      
      {/* Brand-aligned subtle glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Image side ─────────────────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 aspect-[4/5] max-w-[480px] mx-auto lg:mx-0 shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000B18]/80 via-transparent to-transparent" />
            </div>

            {/* Floating caption card - Updated to Blue/Deep Ocean Theme */}
            <div className="absolute bottom-8 left-8 right-8 md:right-auto md:max-w-[260px] flex items-center gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-5 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold leading-tight">{caption}</p>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mt-1">{captionSubtext}</p>
              </div>
            </div>

            {/* Subtle decorative frame */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-3xl border border-blue-500/10 -z-10" />
          </div>

          {/* ── Content side ───────────────────────────────────────────── */}
          <div className="space-y-10 order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-8 bg-blue-500/50" />
              <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
                The Founder&apos;s Vision
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tighter">
              {title}
              <span className="block text-blue-500 mt-2">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/50 text-lg leading-relaxed font-light">
              {description}
            </p>

            {/* Blockquote — Clean & Modern */}
            <div className="relative pl-8 py-4 bg-white/[0.02] rounded-r-3xl border-l-2 border-blue-500">
              <svg className="w-8 h-8 text-blue-500/10 absolute top-4 left-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
              </svg>
              <p className="text-white/80 text-xl leading-relaxed italic font-serif relative z-10">
                {quote}
              </p>
              <footer className="text-blue-400 text-[10px] mt-4 font-black uppercase tracking-[0.2em]">
                — {quoteAuthor}
              </footer>
            </div>

            {/* Milestones — info cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="p-6 rounded-[1.5rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/40 transition-all duration-500 group">
                  <p className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {milestone.year}
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed font-medium">
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