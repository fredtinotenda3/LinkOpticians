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
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
  </svg>,
];

export const WhatToExpectSection = ({
  subtitle,
  title,
  steps,
}: WhatToExpectSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── CURVED GRID (UNIQUE) ── */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none 
        bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)]
        [background-size:80px_80px]" 
      />

      {/* ── FLOW LIGHT PATH ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[200px] 
        -translate-y-1/2 
        bg-gradient-to-r from-transparent via-sky-400/20 to-transparent 
        blur-3xl pointer-events-none"
      />

      {/* ── SIDE GLOW ── */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[300px] bg-sky-400/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[300px] bg-violet-500/10 blur-[140px]" />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-6xl px-[5%]">

        {/* HEADER */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-400/40" />
            <span className="text-sky-400 text-xs font-semibold tracking-[0.3em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-400/40" />
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            {title}
          </h2>
        </div>

        {/* ── FLOW STEPS ── */}
        <div className="space-y-16">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* ICON */}
              <div className="relative">

                <div className="w-16 h-16 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-sky-400">
                  {stepIcons[index] ?? step.number}
                </div>

                {/* step number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sky-500 text-white text-xs flex items-center justify-center">
                  {step.number}
                </div>

              </div>

              {/* TEXT */}
              <div className="max-w-md space-y-2 text-center md:text-left">
                <h3 className="text-white text-lg font-semibold">
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