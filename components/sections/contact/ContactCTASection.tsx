// components/sections/contact/ContactCTASection.tsx
import Link from "next/link";

interface ContactCTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  emergencyText: string;
  emergencyPhone: string;
  emergencyNote: string;
}

export const ContactCTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  emergencyText,
  emergencyPhone,
  emergencyNote,
}: ContactCTASectionProps) => {
  return (
    <section className="relative pb-24 pt-4 bg-[#000B18] overflow-hidden">

      {/* Background glow to lift the section */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-[5%]">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-700 via-blue-800 to-[#000B18] shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-white/5">

          {/* Cinematic Background texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-blue-900/40 blur-3xl" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="contact-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-dots)" />
            </svg>
          </div>

          <div className="relative z-10 px-8 md:px-20 py-20 text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white/60 text-[10px] font-black tracking-[0.4em] uppercase">
                Take the first step
              </span>
              <span className="w-8 h-px bg-white/30" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-6">{title}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light italic">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center justify-center gap-3 bg-white text-blue-900 font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-full shadow-2xl hover:bg-blue-50 transition-all duration-500 hover:-translate-y-1"
              >
                {primaryButtonText}
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-full backdrop-blur-md transition-all duration-500"
              >
                {secondaryButtonText}
              </Link>
            </div>

            {/* Emergency Support */}
            <div className="pt-10 border-t border-white/10">
              <div className="inline-flex flex-col sm:flex-row items-center gap-5 justify-center">
                <div className="relative flex items-center justify-center size-12 rounded-2xl bg-white/5 shrink-0 border border-white/10">
                  <span className="absolute inline-flex size-full rounded-2xl bg-blue-400/20 animate-ping" />
                  <svg className="w-5 h-5 text-blue-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">{emergencyText}</p>
                  <div className="flex flex-col sm:flex-row items-center gap-3 mt-1 justify-center sm:justify-start">
                    <a href={`tel:${emergencyPhone.replace(/\D/g, "")}`} className="text-white font-bold text-2xl tracking-tighter hover:text-blue-400 transition-colors">
                      {emergencyPhone}
                    </a>
                    <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-500/40" />
                    <span className="text-blue-200/40 text-[11px] font-medium tracking-wide italic">{emergencyNote}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};