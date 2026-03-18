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
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-500/4 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">{description}</p>
        </div>

        {/* ── Timeline ─────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Center line — desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-dark-500 to-transparent hidden lg:block" />

          <div className="space-y-20">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center`}
              >
                {/* ── Content ── */}
                <div className={`${event.align === "right" ? "lg:text-right order-2 lg:order-1" : "order-2"}`}>

                  {/* Year pill — mobile */}
                  <div className="inline-flex items-center gap-1.5 lg:hidden bg-green-500/15 border border-green-500/30 px-3.5 py-1.5 rounded-full text-green-400 font-bold text-xs mb-4">
                    <span className="size-1.5 rounded-full bg-green-400" />
                    {event.year}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-white/55 text-base leading-relaxed mb-5">
                    {event.description}
                  </p>
                  <div className={`flex flex-wrap gap-2 ${event.align === "right" ? "lg:justify-end" : ""}`}>
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-dark-400 border border-dark-500 rounded-full text-xs text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Image ── */}
                <div className={`relative ${event.align === "right" ? "order-1 lg:order-2" : "order-1"}`}>

                  {/* Timeline dot — desktop */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-10 ${
                    event.align === "right" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
                  }`}>
                    <div className="w-5 h-5 rounded-full bg-green-500 border-4 border-dark-300 shadow-[0_0_12px_rgba(36,174,124,0.5)]" />
                  </div>

                  {/* Year label — desktop */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block z-10 ${
                    event.align === "right"
                      ? "left-0 -translate-x-16"
                      : "right-0 translate-x-16"
                  }`}>
                    <span className="inline-flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 px-3 py-1.5 rounded-full text-green-400 font-bold text-xs">
                      <span className="size-1.5 rounded-full bg-green-400" />
                      {event.year}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-2xl overflow-hidden border border-dark-500 aspect-[16/10] group">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-300/50 via-transparent to-transparent" />
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
