// components/sections/booking/confirmation/NextStepsCard.tsx
interface NextStepsCardProps {
  title: string;
  steps: string[];
}

export const NextStepsCard = ({ title, steps }: NextStepsCardProps) => {
  return (
    <div className="bg-dark-400 border border-dark-500 rounded-3xl p-8 md:p-10 mb-6">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-dark-500">
        <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-2xl bg-dark-300 border border-dark-500"
          >
            {/* Step number */}
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(36,174,124,0.4)]">
              <span className="text-white text-[11px] font-bold">{index + 1}</span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed pt-0.5">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
