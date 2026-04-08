// components/sections/about/AboutHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface AboutHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  badge: string;
  badgeSubtext: string;
  stats: Stat[];
}

export const AboutHeroSection = ({
  title,
  titleHighlight,
  description,
  badge,
  badgeSubtext,
  stats,
}: AboutHeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center">
      
      {/* Background - Layered for depth */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/about-hero.jpg"
          alt="Link Opticians History"
          fill
          className="object-cover scale-105 animate-subtle-zoom"
          priority
          quality={95}
        />
        {/* Deep Ocean Blue Overlay: Heavy on the left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#000B18]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000B18] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-20 w-full">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
            <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <span className="opacity-50">/</span>
            <span className="text-blue-500">About Our Mission</span>
          </nav>

          {/* Established Badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-2xl">
            <div className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">{badge}</span>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">{badgeSubtext}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.85] tracking-tighter">
            {title}
            <span className="block text-blue-500 mt-2">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/50 max-w-xl leading-relaxed font-light">
            {description}
          </p>

          {/* Stats Grid - High contrast glassmorphism */}
          <div className="flex flex-wrap gap-4 pt-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="min-w-[140px] p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-500 group"
              >
                <p className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-500">
                  {stat.value}
                </p>
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-12 left-[5%] hidden md:flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
        </div>
        <span className="text-white/20 text-[9px] font-bold tracking-[0.4em] uppercase vertical-text">
            Explore 16 Years
        </span>
      </div>

    </section>
  );
};