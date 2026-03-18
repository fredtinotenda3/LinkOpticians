// components/sections/contact/ContactHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface ContactHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  emergencyText: string;
  emergencyPhone: string;
  emergencyBadge: string;
}

export const ContactHeroSection = ({
  title,
  titleHighlight,
  description,
  emergencyText,
  emergencyPhone,
  emergencyBadge,
}: ContactHeroSectionProps) => {
  return (
    <section className="relative min-h-[55vh] w-full overflow-hidden flex items-center">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/contact-hero.jpg"
          alt="Link Opticians clinic interior"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-20 w-full">
        <div className="max-w-2xl space-y-7">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white/70">Contact</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-400 text-xs font-semibold tracking-[0.25em] uppercase">
              We&apos;re here to help
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            {title}
            <br />
            <span className="text-green-400">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/65 max-w-lg leading-relaxed">
            {description}
          </p>

          {/* Emergency pill */}
          <div className="inline-flex items-center gap-3 bg-red-500/15 backdrop-blur-md px-5 py-3 rounded-full border border-red-500/30">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
            </span>
            <span className="text-white/80 text-sm font-medium">{emergencyText}</span>
            <a
              href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
              className="text-white font-bold hover:text-red-300 transition-colors duration-200 text-sm"
            >
              {emergencyPhone}
            </a>
            <span className="text-white/40 text-xs border-l border-white/20 pl-3">{emergencyBadge}</span>
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
