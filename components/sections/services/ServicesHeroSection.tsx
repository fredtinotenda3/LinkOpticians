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
    <section className="relative min-h-[80vh] w-full overflow-hidden flex items-center bg-[#000d1a]">

      {/* Background image with refined cinematic overlays */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/services-hero.jpg"
          alt="Clinical Optometry Equipment"
          fill
          className="object-cover opacity-60"
          priority
          quality={100}
        />
        {/* Deep Ocean Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a] via-[#000d1a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-[#000d1a]/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 w-full">
        <div className="max-w-3xl space-y-8">

          {/* Breadcrumb - Precise & Clean */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <Link href="/" className="hover:text-sky-400 transition-colors duration-300">
              Home
            </Link>
            <span className="size-1 rounded-full bg-white/20" />
            <span className="text-white/60">Clinical Services</span>
          </nav>

          {/* Badge - Consistent with Home Hero */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
              {badge}
            </span>
          </div>

          {/* Headline - Black weight for premium feel */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight">
            {title}
            <br />
            <span className="text-sky-400">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed">
            {description}
          </p>

          {/* CTAs - Sky Blue Pivot */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/book"
              className="group inline-flex items-center justify-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full shadow-2xl shadow-sky-900/40 transition-all duration-500 hover:scale-[1.02]"
            >
              Book Appointment
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-500"
            >
              View Specialities
            </Link>
          </div>

          {/* Trust indicators - More clinical look */}
          <div className="flex flex-wrap gap-4 pt-6">
            {trustIndicators.map((indicator, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <div className="size-5 flex items-center justify-center rounded-full bg-sky-500/10 text-sky-400">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest">{indicator.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-10 hidden lg:flex flex-col items-start gap-3">
        <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[2px] h-12 bg-gradient-to-b from-sky-500 via-sky-500/20 to-transparent" />
      </div>

    </section>
  );
};