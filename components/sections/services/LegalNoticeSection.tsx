// components/sections/services/LegalNoticeSection.tsx
interface LegalNoticeSectionProps {
  text: string;
}

export const LegalNoticeSection = ({ text }: LegalNoticeSectionProps) => {
  return (
    <section className="py-12 bg-[#00050a] border-y border-white/[0.03]">
      <div className="mx-auto max-w-3xl px-[5%]">
        <div className="flex items-start gap-5">

          {/* Icon - Minimal Sky Accent */}
          <div className="shrink-0 size-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center mt-1">
            <svg className="w-5 h-5 text-sky-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="space-y-1.5">
            <p className="text-sky-500/60 text-[10px] font-black uppercase tracking-[0.3em]">
              Regulatory Disclosure
            </p>
            <p className="text-white/25 text-[11px] leading-relaxed font-medium">
              {text}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};