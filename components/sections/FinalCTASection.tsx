// components/sections/FinalCTASection.tsx
import Link from "next/link";

interface FinalCTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  emergencyText?: string;
  emergencyPhone?: string;
  showEmergency?: boolean;
}

export const FinalCTASection = ({
  title = "Ready for better vision?",
  description = "Schedule your comprehensive eye exam at any of our clinics in Harare, Chipinge, or Chiredzi. Most medical aids accepted.",
  primaryButtonText = "Book Appointment",
  primaryButtonHref = "/book",
  secondaryButtonText = "View Locations",
  secondaryButtonHref = "/locations",
  emergencyText = "Emergency care needed?",
  emergencyPhone = "0737 683 090",
  showEmergency = true,
}: FinalCTASectionProps) => {
  return (
    <section className="relative py-24 bg-[#000d1a] overflow-hidden">
      
      {/* Dotted Pattern Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="#0B2F6C" opacity="0.4" />
              <circle cx="18" cy="18" r="2" fill="#38BDF8" opacity="0.15" />
              <circle cx="28" cy="8" r="1" fill="#7DD3FC" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      {/* Background Lighting Accent */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 z-10">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#002b4d] to-[#001a33] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          
          {/* Subtle Technical Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 px-8 md:px-20 py-20 text-center">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-400 text-xs font-black tracking-[0.4em] uppercase">
                Take the first step
              </span>
              <div className="w-8 h-[2px] bg-sky-500" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              {title}
            </h2>

            {/* Description */}
            <p className="text-white/60 text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              {description}
            </p>

            {/* Main Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-sm uppercase tracking-widest px-10 py-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {primaryButtonText}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                {secondaryButtonText}
              </Link>
            </div>

            {/* Clinical Trust Footer */}
            {showEmergency && (
              <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="flex items-center gap-4">
                  <div className="relative flex items-center justify-center size-10 rounded-full bg-red-500/20 shrink-0">
                    <span className="absolute inline-flex size-full rounded-full bg-red-500/20 animate-ping" />
                    <svg className="w-5 h-5 text-red-400 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{emergencyText}</p>
                    <a href={`tel:${emergencyPhone}`} className="text-white font-bold text-lg hover:text-sky-400 transition-colors">
                      {emergencyPhone}
                    </a>
                  </div>
                </div>

                <div className="hidden md:block h-10 w-px bg-white/10" />

                <div className="flex items-center gap-3">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Medical Aid Partners</p>
                  <div className="flex -space-x-2">
                    <div className="size-8 rounded-full bg-white/10 border border-[#001a33] flex items-center justify-center text-[8px] font-bold text-white">CIMAS</div>
                    <div className="size-8 rounded-full bg-white/10 border border-[#001a33] flex items-center justify-center text-[8px] font-bold text-white">PSMAS</div>
                    <div className="size-8 rounded-full bg-white/10 border border-[#001a33] flex items-center justify-center text-[8px] font-bold text-white">MASCA</div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};