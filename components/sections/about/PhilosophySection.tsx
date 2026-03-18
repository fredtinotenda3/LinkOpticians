// components/sections/about/PhilosophySection.tsx
interface Pillar {
  icon: string;
  title: string;
  description: string;
}

interface PhilosophySectionProps {
  subtitle: string;
  title: string;
  description: string;
  pillars: Pillar[];
}

// SVG icon map
const pillarIcons: Record<string, JSX.Element> = {
  "👁️": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "❤️": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  "🌍": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const FallbackPillarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
  </svg>
);

export const PhilosophySection = ({
  subtitle,
  title,
  description,
  pillars,
}: PhilosophySectionProps) => {
  return (
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-green-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-[5%] text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2 mb-6">
          <span className="w-6 h-px bg-green-500" />
          <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
          <span className="w-6 h-px bg-green-500" />
        </div>

        {/* Title — quoted philosophy */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          <span className="text-green-400/50 text-6xl leading-none">&quot;</span>
          {title}
          <span className="text-green-400/50 text-6xl leading-none">&quot;</span>
        </h2>

        {/* Description */}
        <p className="text-white/60 text-lg leading-relaxed mb-16 max-w-2xl mx-auto">
          {description}
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 mx-auto mb-4 group-hover:bg-green-500/25 transition-colors duration-300">
                {pillarIcons[pillar.icon] ?? <FallbackPillarIcon />}
              </div>
              <h3 className="text-white font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
