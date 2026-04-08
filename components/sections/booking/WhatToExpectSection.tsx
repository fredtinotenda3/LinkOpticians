// components/sections/booking/WhatToExpectSection.tsx

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WhatToExpectSectionProps {
  subtitle: string;
  title: string;
  steps: Step[];
}

const stepIcons = [
  // Step 1 — Fill form
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  // Step 2 — Confirmation
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Step 3 — Visit
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
];

export const WhatToExpectSection = ({
  subtitle,
  title,
  steps,
}: WhatToExpectSectionProps) => {
  return (
    <section className="relative py-32 bg-[#000B18] overflow-hidden">

      {/* Background glow — subtle atmospheric depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-blue-500/30" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-blue-500/30" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-tight">
            {title}
          </h2>
        </div>

        {/* ── Steps ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">

              {/* Connector line — Premium Blue Gradient */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+60px)] right-[calc(-50%+60px)] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 z-0" />
              )}

              {/* Step circle container */}
              <div className="relative z-10 mb-8">
                {/* Outer ring */}
                <div className="w-24 h-24 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md flex items-center justify-center group-hover:border-blue-500/50 transition-all duration-700 group-hover:rotate-[10deg]">
                  {/* Inner circle / Icon container */}
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex flex-col items-center justify-center group-hover:bg-blue-500/20 transition-all duration-500">
                    <span className="text-blue-400 group-hover:scale-110 transition-transform duration-500">
                      {stepIcons[index] ?? (
                        <span className="text-2xl font-bold tracking-tighter">{step.number}</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Step number badge — Floating Glass style */}
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white text-[10px] font-black">{step.number}</span>
                </div>
              </div>

              {/* Card — Cinematic Glass */}
              <div className="w-full p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:border-blue-500/20 transition-all duration-500 group-hover:bg-white/[0.04] group-hover:-translate-y-2">
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed font-light italic">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};