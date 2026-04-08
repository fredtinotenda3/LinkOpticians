// components/sections/booking/confirmation/SuccessHeader.tsx
interface SuccessHeaderProps {
  title: string;
  description: string;
}

export const SuccessHeader = ({ title, description }: SuccessHeaderProps) => {
  return (
    <div className="text-center mb-16">

      {/* Animated success icon — Deep Ocean Blue Theme */}
      <div className="relative inline-flex items-center justify-center mb-10">
        {/* Outer atmospheric ping rings */}
        <div className="absolute w-36 h-36 rounded-full border border-blue-500/10 animate-ping" />
        <div className="absolute w-28 h-28 rounded-full border border-blue-400/10 animate-ping [animation-delay:400ms]" />

        {/* Icon container — Glassmorphism style */}
        <div className="relative w-24 h-24 rounded-[2rem] bg-blue-500/10 border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(37,99,235,0.15)] backdrop-blur-sm">
          <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Eyebrow — Digital Concierge typography */}
      <div className="inline-flex items-center justify-center gap-4 mb-6">
        <span className="w-8 h-px bg-blue-500/30" />
        <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
          Request received
        </span>
        <span className="w-8 h-px bg-blue-500/30" />
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter leading-tight">
        {title}
      </h1>
      <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed font-light italic">
        {description}
      </p>
    </div>
  );
};