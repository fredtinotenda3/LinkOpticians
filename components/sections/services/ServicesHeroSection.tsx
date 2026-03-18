// components/sections/services/ServicesHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface ServicesHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
  trustIndicators: Array<{ text: string; icon: string }>;
}

export const ServicesHeroSection = ({
  title,
  titleHighlight,
  description,
  badge,
  trustIndicators,
}: ServicesHeroSectionProps) => {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden flex items-center">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/services-hero.jpg"
          alt="Optometrist examining patient with modern equipment"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Lighter gradient — image breathes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
        <div className="max-w-2xl mx-auto space-y-7 text-center flex flex-col items-center">

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/70">Services</span>
          </nav>

          {/* Badge — with ping animation consistent with home hero */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/90">
              {badge || "All clinics open"}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            {title}
            <br />
            <span className="text-green-400">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/65 max-w-lg leading-relaxed text-center mx-auto">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(36,174,124,0.35)] hover:shadow-[0_0_45px_rgba(36,174,124,0.5)] transition-all duration-300 hover:scale-[1.02]"
            >
              Book appointment
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/90 font-semibold text-base px-8 py-4 rounded-full bg-white/8 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
            >
              Explore services
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-3 pt-2 justify-center">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full"
              >
                <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {indicator.icon === "check" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
                {indicator.text}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.2em] uppercase">
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-scroll-line" />
      </div>

    </section>
  );
};
