// components/sections/about/MissionValuesSection.tsx

import { Value } from "@/constants/about";

interface MissionStat {
  value: string;
  label: string;
}

interface MissionValuesSectionProps {
  subtitle: string;
  title: string;
  description: string;
  mission: {
    title: string;
    text: string;
    stats: MissionStat[];
  };
  values: Value[];
}

// ICONS (UNCHANGED)
const valueIcons: Record<string, JSX.Element> = {
  "👁️": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "⚕️": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  "📋": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  "🤝": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const FallbackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
  </svg>
);

export const MissionValuesSection = ({
  subtitle,
  title,
  description,
  mission,
  values,
}: MissionValuesSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (BLUEPRINT STYLE) ── */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Subtle highlight */}
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-sky-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
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

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* MISSION (more structured) */}
          <div className="p-10 rounded-[20px] bg-white/[0.03] border border-white/10">

            <p className="text-sky-400 text-xs uppercase tracking-wider mb-4">
              Mission
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              {mission.title}
            </h3>

            <p className="text-white/60 leading-relaxed mb-8">
              {mission.text}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              {mission.stats.map((stat, index) => (
                <div key={index}>
                  <p className="text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-xs uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* VALUES (clean list style) */}
          <div className="p-10 rounded-[20px] bg-white/[0.03] border border-white/10">

            <p className="text-sky-400 text-xs uppercase tracking-wider mb-4">
              Values
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Our values
            </h3>

            <div className="space-y-5">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">

                  <div className="w-10 h-10 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400 shrink-0">
                    {valueIcons[value.icon] ?? <FallbackIcon />}
                  </div>

                  <div>
                    <p className="text-white font-semibold mb-1">
                      {value.title}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};