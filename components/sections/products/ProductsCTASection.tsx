// components/sections/products/ProductsCTASection.tsx
import Link from "next/link";

interface ProductsCTASectionProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  bgGradient?: string;
}

export const ProductsCTASection = ({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: ProductsCTASectionProps) => {
  return (
    <section className="relative pb-32 pt-12 bg-[#000d1a] overflow-hidden">
      
      {/* Deep Ocean Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-sky-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-[5%]">
        <div className="relative overflow-hidden rounded-[48px] bg-gradient-to-br from-[#001a33] to-[#000d1a] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">

          {/* Background texture & accents */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-sky-500/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-400/5 blur-3xl" />
            
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-dots)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 md:px-20 py-24 text-center">

            {/* Premium Eyebrow */}
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-sky-500/50" />
              <span className="text-sky-400 text-[10px] font-black tracking-[0.4em] uppercase">
                Find your vision
              </span>
              <span className="w-10 h-px bg-sky-500/50" />
            </div>

            {/* Cinematic Headline */}
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase mb-8">
              {title}
            </h2>

            {/* Descriptive Text */}
            <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium italic">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={primaryButtonHref}
                className="group relative inline-flex items-center justify-center gap-4 bg-sky-500 hover:bg-sky-400 text-white font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:-translate-y-1"
              >
                {primaryButtonText}
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                href={secondaryButtonHref}
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-[12px] uppercase tracking-[0.2em] px-10 py-5 rounded-full backdrop-blur-md transition-all duration-500 hover:-translate-y-1"
              >
                {secondaryButtonText}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};