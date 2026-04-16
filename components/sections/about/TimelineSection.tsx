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
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (TIME FLOW STYLE) ── */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Vertical gradient (time flow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" />

      {/* Light texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* HEADER */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-400" />
            <span className="text-sky-400/80 text-xs font-semibold tracking-[0.3em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-400" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg">
            {description}
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative">

          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden lg:block" />

          <div className="space-y-28">
            {events.map((event, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
              >
                {/* CONTENT */}
                <div className={`${event.align === "right" ? "lg:text-right order-2 lg:order-1" : "order-2"}`}>

                  {/* Mobile year */}
                  <div className="inline-flex items-center gap-2 lg:hidden bg-white/[0.05] border border-white/10 px-4 py-2 rounded-full text-sky-400 text-xs font-semibold mb-6">
                    <span className="size-1.5 rounded-full bg-sky-400" />
                    {event.year}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                    {event.title}
                  </h3>

                  <p className="text-white/60 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <div className={`flex flex-wrap gap-2 ${event.align === "right" ? "lg:justify-end" : ""}`}>
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* IMAGE SIDE */}
                <div className={`relative ${event.align === "right" ? "order-1 lg:order-2" : "order-1"}`}>

                  {/* Timeline dot */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block z-10 ${
                    event.align === "right"
                      ? "left-0 -translate-x-[calc(50%+40px)]"
                      : "right-0 translate-x-[calc(50%+40px)]"
                  }`}>
                    <div className="w-3 h-3 rounded-full bg-sky-400" />
                  </div>

                  {/* Year (desktop) */}
                  <div className={`absolute top-1/2 -translate-y-1/2 hidden lg:block z-10 ${
                    event.align === "right"
                      ? "left-0 -translate-x-[120px]"
                      : "right-0 translate-x-[120px]"
                  }`}>
                    <span className="text-sky-400 text-sm font-semibold">
                      {event.year}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative rounded-[24px] overflow-hidden border border-white/10 aspect-[16/10] group">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />
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