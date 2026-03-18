// components/sections/booking/confirmation/SuccessHeader.tsx
interface SuccessHeaderProps {
  title: string;
  description: string;
}

export const SuccessHeader = ({ title, description }: SuccessHeaderProps) => {
  return (
    <div className="text-center mb-12">

      {/* Animated success icon */}
      <div className="relative inline-flex items-center justify-center mb-8">
        {/* Outer ping rings */}
        <div className="absolute w-32 h-32 rounded-full border border-green-500/15 animate-ping" />
        <div className="absolute w-24 h-24 rounded-full border border-green-500/20 animate-ping animation-delay-300" />

        {/* Icon container */}
        <div className="relative w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(36,174,124,0.25)]">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-6 h-px bg-green-500" />
        <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
          Request received
        </span>
        <span className="w-6 h-px bg-green-500" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-white/55 text-lg max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
};
