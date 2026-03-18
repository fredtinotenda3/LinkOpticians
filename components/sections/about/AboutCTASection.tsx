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
    <section className="relative pb-24 pt-4 bg-dark-300 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-green-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-[5%]">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-600 shadow-[0_30px_80px_rgba(36,174,124,0.35)]">

          {/* Background texture */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#about-dots)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-16 py-16 text-center">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-5 h-px bg-white/50" />
              <span className="text-white/70 text-xs font-semibold tracking-[0.25em] uppercase">
                Start your journey
              </span>
              <span className="w-5 h-px bg-white/50" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
              {title}
            </h2>

            {/* Description */}
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href={primaryButtonHref}
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-green-600 font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
              >
                {primaryButtonText}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 hover:border-white/70 text-white font-semibold text-base px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                {secondaryButtonText}
              </Link>
            </div>

            {/* Footer text */}
            <div className="pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm">{footerText}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
