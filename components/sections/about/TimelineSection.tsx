// components/sections/about/TimelineSection.tsx
import Image from "next/image";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  align: "left" | "right";
}

interface TimelineSectionProps {
  subtitle: string;
  title: string;
  description: string;
  events: TimelineEvent[];
}

export const TimelineSection = ({
  subtitle,
  title,
  description,
  events,
}: TimelineSectionProps) => {
  return (
    <section className="relative py-32 bg-[#000B18] overflow-hidden">
      
      {/* Brand accent glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-blue-500/50" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
            <span className="w-8 h-[1px] bg-blue-500/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">{title}</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">{description}</p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Center line — desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

          <div className="space-y-32">
            {events.map((event, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
              >
                {/* ── Content ── */}
                <div className={`${event.align === "right" ? "lg:text-right order-2 lg:order-1" : "order-2"}`}>

                  {/* Year pill — mobile */}
                  <div className="inline-flex items-center gap-2 lg:hidden bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 font-bold text-xs mb-6">
                    <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                    {event.year}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-white/50 text-lg leading-relaxed mb-6 font-light">
                    {event.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${event.align === "right" ? "lg:justify-end" : ""}`}>
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Image/Center-Anchor side ── */}
                <div className={`relative ${event.align === "right" ? "order-1 lg:order-2" : "order-1"}`}>

                  {/* Timeline dot — desktop */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10 ${
                    event.align === "right" ? "left-0 -translate-x-[calc(50%+48px)]" : "right-0 translate-x-[calc(50%+48px)]"
                  }`}>
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-[#000B18] shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                  </div>

                  {/* Year label — desktop */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block z-10 ${
                    event.align === "right"
                      ? "left-0 -translate-x-[140px]"
                      : "right-0 translate-x-[140px]"
                  }`}>
                    <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-2.5 rounded-full text-blue-400 font-black text-sm tracking-widest">
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      {event.year}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div className="relative rounded-[2rem] overflow-hidden border border-white/5 aspect-[16/10] group shadow-2xl">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000B18]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};