// components/sections/booking/BookingFinalCTASection.tsx
import Link from "next/link";

interface BookingFinalCTASectionProps {
  title: string;
  description: string;
  phone: string;
  emergencyText: string;
  emergencyPhone: string;
  emergencyNote: string;
}

export const BookingFinalCTASection = ({
  title,
  description,
  phone,
  emergencyText,
  emergencyPhone,
  emergencyNote,
}: BookingFinalCTASectionProps) => {
  return (
    <section className="relative pb-32 pt-12 bg-[#000B18] overflow-hidden">

      {/* Outer ambient glow — Deep Blue Depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-blue-600/[0.07] blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-[5%]">
        <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-700 to-blue-900 shadow-[0_40px_100px_rgba(0,11,24,0.8),0_20px_40px_rgba(37,99,235,0.2)] border border-white/10">

          {/* Background texture & Atmospheric elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/[0.03] blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400/[0.05] blur-2xl" />
            
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-20 py-20 text-center">

            {/* Eyebrow — Digital Concierge Style */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-8 h-px bg-white/30" />
              <span className="text-white/60 text-[10px] font-black tracking-[0.4em] uppercase">
                Still have questions?
              </span>
              <span className="w-8 h-px bg-white/30" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
              {title}
            </h2>

            {/* Description */}
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-light italic">
              {description}
            </p>

            {/* Main Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="group inline-flex items-center gap-3 bg-white text-blue-900 font-black px-10 py-5 rounded-full shadow-2xl hover:bg-blue-50 transition-all duration-500 hover:-translate-y-1"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phone}
              </a>

              <Link
                href="/book"
                className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-10 py-5 rounded-full backdrop-blur-md transition-all duration-500"
              >
                Book online instead
                <svg className="size-4 transition-transform duration-500 group-hover:translate-x-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Emergency section — Redesigned for visual weight */}
            <div className="pt-10 border-t border-white/10">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/5">
                  <div className="relative flex items-center justify-center size-3">
                    <span className="absolute inline-flex size-full rounded-full bg-blue-400 animate-ping opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
                  </div>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                    {emergencyText}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
                    className="text-white font-bold text-2xl md:text-3xl hover:text-blue-400 transition-colors tracking-tighter"
                  >
                    {emergencyPhone}
                  </a>
                  <span className="hidden sm:block w-px h-4 bg-white/20" />
                  <span className="text-white/40 text-xs italic font-light">{emergencyNote}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};