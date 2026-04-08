// components/sections/about/AboutCTASection.tsx
import Link from "next/link";

interface AboutCTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  footerText: string;
}

export const AboutCTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  footerText,
}: AboutCTASectionProps) => {
  return (
    <section className="relative pb-24 pt-4 bg-[#000B18] overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-[5%]">
        {/* Deep Ocean Gradient Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-[#000B18] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">

          {/* Decorative Background texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-blue-400/10" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-blue-400/10" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-dots)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-6 h-[1px] bg-white/30" />
              <span className="text-white/60 text-[10px] font-black tracking-[0.4em] uppercase">
                Take the Next Step
              </span>
              <span className="w-6 h-[1px] bg-white/30" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-tight mb-6">
              {title}
            </h2>

            {/* Description */}
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center justify-center gap-3 bg-white text-blue-600 font-black text-sm uppercase tracking-widest px-10 py-5 rounded-full shadow-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-[1.02]"
              >
                {primaryButtonText}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full backdrop-blur-md transition-all duration-300"
              >
                {secondaryButtonText}
              </Link>
            </div>

            {/* Footer text */}
            <div className="pt-10 border-t border-white/10">
              <p className="text-white/40 text-xs font-medium tracking-wide">{footerText}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};