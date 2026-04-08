// components/sections/booking/confirmation/NextStepsCard.tsx
interface NextStepsCardProps {
  title: string;
  steps: string[];
}

export const NextStepsCard = ({ title, steps }: NextStepsCardProps) => {
  return (
    <div className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-10 md:p-12 mb-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>

      {/* Steps — Cinematic Vertical Timeline */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-500"
          >
            {/* Step number marker */}
            <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
                <span className="text-white text-[12px] font-black">{index + 1}</span>
                {/* Visual pulse for the current active step (optional effect) */}
                {index === 0 && (
                    <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
                )}
            </div>
            
            <p className="text-white/50 text-sm leading-relaxed pt-1.5 font-light group-hover:text-white/80 transition-colors duration-500">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};