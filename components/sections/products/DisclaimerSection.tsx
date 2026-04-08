// components/sections/products/DisclaimerSection.tsx

interface DisclaimerSectionProps {
  text: string;
}

export const DisclaimerSection = ({ text }: DisclaimerSectionProps) => {
  return (
    <section className="py-16 bg-[#000d1a] border-t border-white/[0.03]">
      <div className="mx-auto max-w-4xl px-[5%]">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
          
          {/* Minimalist Info Icon */}
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
            <svg className="w-5 h-5 text-sky-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sky-500/60 text-[10px] font-black uppercase tracking-[0.3em]">
                Regulatory Compliance Notice
              </span>
              <span className="flex-1 h-px bg-white/[0.03]" />
            </div>
            
            <p className="text-white/30 text-[11px] md:text-xs leading-relaxed font-medium italic">
              {text}
            </p>
            
            <p className="text-white/10 text-[9px] font-bold uppercase tracking-widest pt-2">
              Statutory Instrument 63 of 2024 • Registered Optometry Practice
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};