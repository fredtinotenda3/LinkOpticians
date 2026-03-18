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
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  // Step 2 — Confirmation
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Step 3 — Visit
  <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
];

export const WhatToExpectSection = ({
  subtitle,
  title,
  steps,
}: WhatToExpectSectionProps) => {
  return (
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ──────────────────────────────────────────── */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {subtitle}
            </span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h2>
        </div>

        {/* ── Steps ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">

          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">

              {/* Connector line between steps — desktop only */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+44px)] right-[calc(-50%+44px)] h-px bg-gradient-to-r from-dark-500 via-green-500/30 to-dark-500 z-0" />
              )}

              {/* Step circle */}
              <div className="relative z-10 mb-6">
                {/* Outer ring */}
                <div className="w-20 h-20 rounded-full border border-green-500/20 bg-dark-300 flex items-center justify-center group-hover:border-green-500/50 transition-colors duration-300">
                  {/* Inner circle */}
                  <div className="w-14 h-14 rounded-full bg-green-500/15 flex flex-col items-center justify-center gap-0.5 group-hover:bg-green-500/25 transition-colors duration-300">
                    <span className="text-green-400">
                      {stepIcons[index] ?? (
                        <span className="text-xl font-bold">{step.number}</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{step.number}</span>
                </div>
              </div>

              {/* Card */}
              <div className="w-full p-6 rounded-2xl bg-dark-300 border border-dark-500 group-hover:border-green-500/30 transition-all duration-300 group-hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
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
