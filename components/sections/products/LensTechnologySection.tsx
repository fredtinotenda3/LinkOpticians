// components/sections/products/LensTechnologySection.tsx
import React from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
}

interface LensTechnologySectionProps {
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  features: Feature[];
}

// SVG icon map — Premium strokes to match high-end branding
const featureIcons: Record<string, JSX.Element> = {
  "💻": (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "☀️": (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  "🔄": (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

// Updated icon container color map for Deep Ocean palette
const iconColors: Record<string, string> = {
  "bg-blue-500/20":  "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "bg-amber-500/20": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "bg-green-500/20": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const FallbackIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const LensTechnologySection = ({
  subtitle,
  title,
  titleHighlight,
  description,
  features,
}: LensTechnologySectionProps) => {
  return (
    <section className="relative py-32 bg-[#000d1a] overflow-hidden border-b border-white/[0.03]">
      
      {/* Centered Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-sky-500/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-[2px] bg-sky-500" />
            <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-[2px] bg-sky-500" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
            {title}
            <br />
            <span className="text-sky-400">{titleHighlight}</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-medium leading-relaxed italic">
            {description}
          </p>
        </div>

        {/* ── Feature Cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-700 text-center"
            >
              {/* Card Hover Glow */}
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.02] rounded-[40px] transition-colors duration-700 pointer-events-none" />

              <div className={`relative w-20 h-20 mx-auto mb-8 rounded-3xl border flex items-center justify-center ${iconColors[feature.bgColor] ?? "bg-sky-500/10 text-sky-400 border-sky-500/20"} transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(14,165,233,0.2)]`}>
                {featureIcons[feature.icon] ?? <FallbackIcon />}
              </div>

              <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="relative text-white/30 text-sm leading-relaxed font-medium italic">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};