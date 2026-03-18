// components/sections/services/LegalNoticeSection.tsx
interface LegalNoticeSectionProps {
  text: string;
}

export const LegalNoticeSection = ({ text }: LegalNoticeSectionProps) => {
  return (
    <section className="py-10 bg-dark-400 border-y border-dark-500/50">
      <div className="mx-auto max-w-3xl px-[5%]">
        <div className="flex items-start gap-3">

          {/* Icon */}
          <div className="shrink-0 w-8 h-8 rounded-lg bg-dark-300 border border-dark-500 flex items-center justify-center mt-0.5">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Text */}
          <div>
            <p className="text-white/30 text-[11px] font-semibold uppercase tracking-[0.2em] mb-1">
              Important notice
            </p>
            <p className="text-white/35 text-xs leading-relaxed">
              {text}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
