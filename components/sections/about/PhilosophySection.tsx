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

// SVG icon map - Updated to match your branding
const pillarIcons: Record<string, JSX.Element> = {
  "👁️": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  "💳": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  "🇿🇼": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const FallbackPillarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const PhilosophySection = ({
  subtitle,
  title,
  description,
  pillars,
}: PhilosophySectionProps) => {
  return (
    <section className="relative py-32 bg-[#000B18] overflow-hidden">
      
      {/* Centered glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-[5%] text-center">

        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-blue-500/50" />
          <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
          <span className="w-8 h-[1px] bg-blue-500/50" />
        </div>

        {/* Title — Styled for impact */}
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
          <span className="text-blue-500/30 font-serif text-7xl md:text-8xl align-middle leading-none mr-2">&ldquo;</span>
          {title}
          <span className="text-blue-500/30 font-serif text-7xl md:text-8xl align-middle leading-none ml-2">&rdquo;</span>
        </h2>

        {/* Description */}
        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed mb-20 max-w-3xl mx-auto">
          {description}
        </p>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500">
                {pillarIcons[pillar.icon] ?? <FallbackPillarIcon />}
              </div>
              <h3 className="text-white text-lg font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-white/30 text-sm font-medium leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};