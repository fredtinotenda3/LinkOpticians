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
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center">

      {/* Background with Brand Deep Blue Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/contact-hero.jpg"
          alt="Link Opticians clinic interior"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Deep Ocean gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18]/90 via-[#000B18]/60 to-[#000B18]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000B18] via-transparent to-transparent" />
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_40%,rgba(0,11,24,0.7)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
        <div className="max-w-2xl mx-auto space-y-8 text-center flex flex-col items-center">

          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <Link href="/" className="hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="text-white/60">Contact</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-blue-500/50" />
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
              Support & Inquiries
            </span>
            <span className="w-8 h-[1px] bg-blue-500/50" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter">
            {title}
            <br />
            <span className="text-blue-500">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/50 max-w-lg leading-relaxed font-light">
            {description}
          </p>

          {/* Emergency pill - Keeping high-alert red but with brand-consistent styling */}
          <div className="inline-flex items-center gap-4 bg-red-500/10 backdrop-blur-xl px-6 py-3.5 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </span>
            <span className="text-white/70 text-xs font-bold uppercase tracking-wider">{emergencyText}</span>
            <a
              href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
              className="text-white font-black hover:text-red-400 transition-colors duration-200 text-sm"
            >
              {emergencyPhone}
            </a>
            <span className="text-white/20 text-[10px] border-l border-white/10 pl-4 font-black tracking-tighter">{emergencyBadge}</span>
          </div>

        </div>
      </div>

      {/* Scroll indicator - Themed Blue */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 text-white/20 text-[9px] font-black tracking-[0.3em] uppercase">
        <span>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent" />
      </div>

    </section>
  );
};