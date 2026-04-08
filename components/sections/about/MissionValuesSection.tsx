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

// SVG icon map — themed with Blue-400
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
    <section className="relative py-28 bg-[#000B18] overflow-hidden">
      
      {/* Brand Blue Glow accent */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-blue-500/50" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
            <span className="w-8 h-[1px] bg-blue-500/50" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">{title}</h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg font-light leading-relaxed">{description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── Mission ──────────────────────────────────────────────── */}
          <div className="group space-y-8 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-blue-500" />
              <span className="text-blue-500 text-[10px] font-black tracking-[0.25em] uppercase">Mission</span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight">{mission.title}</h3>
            <p className="text-white/50 text-lg leading-relaxed font-light">{mission.text}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              {mission.stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-blue-500/20 transition-all duration-500">
                  <p className="text-3xl font-bold text-blue-500 leading-none mb-2">{stat.value}</p>
                  <p className="text-white/30 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Values ───────────────────────────────────────────────── */}
          <div className="space-y-8 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-blue-500" />
              <span className="text-blue-500 text-[10px] font-black tracking-[0.25em] uppercase">Values</span>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight">Our values</h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                    {valueIcons[value.icon] ?? <FallbackIcon />}
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold mb-1">{value.title}</h4>
                    <p className="text-white/40 text-xs leading-relaxed font-medium">{value.description}</p>
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