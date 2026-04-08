// components/sections/locations/LocationsCTASection.tsx
import Link from "next/link";

interface LocationsCTASectionProps {
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

export const LocationsCTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  emergencyText,
  emergencyPhone,
  emergencyNote,
}: LocationsCTASectionProps) => {
  return (
    <section className="relative pb-32 pt-8 bg-[#000d1a] overflow-hidden">

      {/* Cinematic Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-[5%]">
        {/* Main Card: Using Deep Ocean Gradient */}
        <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-sky-600 to-[#004e8c] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">

          {/* Background Industrial Texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-sky-400/10 blur-2xl" />
            
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 px-8 md:px-20 py-24 text-center">

            {/* Cinematic Eyebrow */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-8 h-[2px] bg-white/40" />
              <span className="text-white/80 text-[10px] font-black tracking-[0.4em] uppercase">
                Find your nearest clinic
              </span>
              <span className="w-8 h-[2px] bg-white/40" />
            </div>

            {/* Section Headline */}
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter italic uppercase mb-8">
              {title}
            </h2>

            {/* Supporting Text */}
            <p className="text-white/80 text-lg md:text-xl font-medium italic max-w-2xl mx-auto mb-14 leading-relaxed">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center justify-center gap-3 bg-white text-[#004e8c] font-black text-[11px] uppercase tracking-[0.2em] px-12 py-6 rounded-2xl shadow-2xl hover:scale-[1.05] transition-all duration-500"
              >
                {primaryButtonText}
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/50 text-white font-black text-[11px] uppercase tracking-[0.2em] px-12 py-6 rounded-2xl backdrop-blur-md transition-all duration-500"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {secondaryButtonText}
              </Link>
            </div>

            {/* Emergency / WhatsApp Logic */}
            <div className="pt-12 border-t border-white/10">
              <div className="inline-flex flex-col md:flex-row items-center gap-6">
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center size-14 rounded-2xl bg-white/10 backdrop-blur-md">
                    <span className="absolute inline-flex size-full rounded-2xl bg-white/20 animate-ping opacity-50" />
                    <svg className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mb-1">
                    {emergencyText} (WhatsApp Support)
                  </p>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                    <a
                      href={`https://wa.me/${emergencyPhone.replace(/\D/g, "")}`}
                      className="text-white font-black text-3xl tracking-tighter hover:text-sky-200 transition-colors italic"
                    >
                      {emergencyPhone}
                    </a>
                    <span className="text-white/40 text-[11px] font-bold italic uppercase tracking-widest">
                      — {emergencyNote}
                    </span>
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