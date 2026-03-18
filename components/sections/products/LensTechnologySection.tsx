// components/sections/products/LensTechnologySection.tsx

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

// SVG icon map — replaces emoji, regulatory language in titles
const featureIcons: Record<string, JSX.Element> = {
  "💻": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "☀️": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  "🔄": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
};

// Icon container colour map
const iconColors: Record<string, string> = {
  "bg-blue-500/20":  "bg-blue-500/15 text-blue-400",
  "bg-amber-500/20": "bg-amber-500/15 text-amber-400",
  "bg-green-500/20": "bg-green-500/15 text-green-400",
};

const FallbackIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
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
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full bg-green-500/4 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
            <br />
            <span className="text-green-400">{titleHighlight}</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* ── Feature cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)] text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl flex items-center justify-center ${iconColors[feature.bgColor] ?? "bg-green-500/15 text-green-400"} group-hover:scale-105 transition-transform duration-300`}>
                {featureIcons[feature.icon] ?? <FallbackIcon />}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
