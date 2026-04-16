// components/sections/booking/confirmation/SuccessHeader.tsx

interface SuccessHeaderProps {
  title: string;
  description: string;
}

export const SuccessHeader = ({ title, description }: SuccessHeaderProps) => {
  return (
    <section className="relative w-full py-28 md:py-36 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── GRID ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── STARS ── */}
      <div className="absolute inset-0 opacity-[0.09] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:60px_60px]" 
      />

      <div className="absolute inset-0 opacity-[0.07] pointer-events-none 
        bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.7)_1px,transparent_1px),
             radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.7)_1px,transparent_1px)]
        [background-size:100px_100px]" 
      />

      {/* ── NEBULA ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[900px] h-[350px] bg-sky-400/20 blur-[180px]" 
      />

      <div className="absolute bottom-0 right-0 
        w-[800px] h-[350px] bg-violet-500/20 blur-[180px]" 
      />

      {/* ── CENTER GLOW ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[500px] h-[500px] bg-sky-400/10 blur-[160px]" 
      />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative mx-auto max-w-7xl px-[5%] text-center">

        {/* SUCCESS ICON */}
        <div className="relative inline-flex items-center justify-center mb-12">

          <div className="absolute w-40 h-40 rounded-full border border-sky-400/20 animate-ping" />
          <div className="absolute w-32 h-32 rounded-full border border-violet-400/20 animate-ping [animation-delay:400ms]" />

          <div className="relative w-24 h-24 rounded-[2rem] 
            bg-gradient-to-br from-sky-500/20 to-violet-500/20 
            border border-white/10 
            flex items-center justify-center 
            shadow-[0_0_80px_rgba(56,189,248,0.25)] backdrop-blur-sm">

            <svg className="w-12 h-12 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

        </div>

        {/* EYEBROW */}
        <div className="inline-flex items-center justify-center gap-4 mb-6">
          <span className="w-10 h-px bg-sky-400/40" />
          <span className="text-sky-400 text-[10px] font-semibold tracking-[0.4em] uppercase">
            Request received
          </span>
          <span className="w-10 h-px bg-sky-400/40" />
        </div>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          {description}
        </p>

      </div>
    </section>
  );
};