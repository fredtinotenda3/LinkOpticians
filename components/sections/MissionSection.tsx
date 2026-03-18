// components/sections/MissionSection.tsx
import Image from "next/image";
import Link from "next/link";

interface MissionSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
  foregroundImage?: string;
  foregroundAlt?: string;
  reverse?: boolean;
}

const stats = [
  { value: "17+", label: "Years of service" },
  { value: "2,500+", label: "Patients served" },
  { value: "3", label: "Clinics across Zimbabwe" },
];

export const MissionSection = ({
  title = "Our Mission",
  description = "Link Opticians is on a mission to make quality eye care accessible to every Zimbabwean. From Harare's CBD to the most remote villages, we're committed to serving our communities.",
  buttonText = "Discover our story",
  buttonHref = "/about",
  backgroundImage = "/assets/images/mission-bg.png",
  foregroundImage = "/assets/images/dr-richard.jpg",
  foregroundAlt = "Dr. Richard Maveneka",
  reverse = false,
}: MissionSectionProps) => {
  return (
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className={`flex flex-col lg:flex-row items-center gap-16 xl:gap-24 ${reverse ? "lg:flex-row-reverse" : ""}`}>

          {/* ── Image side ─────────────────────────────────────────────────── */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">

              {/* Main image */}
              <div className="relative w-full aspect-[4/5] max-w-[480px] mx-auto lg:mx-0 rounded-3xl overflow-hidden">
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-400/60 via-transparent to-transparent" />
              </div>

              {/* Floating doctor card */}
              <div className="absolute -bottom-6 -right-4 md:right-0 lg:-right-8 flex items-center gap-4 bg-dark-300/95 backdrop-blur-md border border-dark-500 rounded-2xl px-5 py-4 shadow-2xl max-w-[260px]">
                <div className="relative size-14 rounded-xl overflow-hidden shrink-0 border border-dark-500">
                  <Image
                    src={foregroundImage}
                    alt={foregroundAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{foregroundAlt}</p>
                  <p className="text-green-400 text-xs mt-0.5">Lead Optometrist</p>
                  <p className="text-white/40 text-[11px] mt-0.5">Est. 2008</p>
                </div>
              </div>

              {/* Decorative green accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-2xl border-2 border-green-500/20 pointer-events-none" />

            </div>
          </div>

          {/* ── Content side ───────────────────────────────────────────────── */}
          <div className="lg:w-1/2 space-y-8">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                Who we are
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg leading-relaxed">
              {description}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-dark-500">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/40 text-xs leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={buttonHref}
              className="group inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,174,124,0.4)] hover:scale-[1.02]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};
