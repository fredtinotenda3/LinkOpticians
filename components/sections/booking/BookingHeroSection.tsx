// components/sections/booking/BookingHeroSection.tsx
import Image from "next/image";
import Link from "next/link";

interface BookingHeroSectionProps {
  title: string;
  titleHighlight: string;
  description: string;
  breadcrumb: string;
}

const trustPills = [
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Confirmed within 24hrs",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Harare & Regional Clinics",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    text: "Top-rated care",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    text: "Medical aids accepted",
  },
];

export const BookingHeroSection = ({
  title,
  titleHighlight,
  description,
  breadcrumb,
}: BookingHeroSectionProps) => {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden flex items-center bg-[#000B18]">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/book-hero.jpg"
          alt="Patient scheduling appointment"
          fill
          className="object-cover opacity-60"
          priority
          quality={100}
        />
        {/* Deep Ocean Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000B18] via-[#000B18]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000B18] via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
        <div className="max-w-3xl space-y-8">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            <Link href="/" className="hover:text-blue-500 transition-colors duration-300">
              Home
            </Link>
            <span className="size-1 rounded-full bg-white/20" />
            <span className="text-white/60">{breadcrumb}</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            </span>
            <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">
              Digital Concierge
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter">
            {title}<br />
            <span className="text-blue-500">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/50 max-w-lg leading-relaxed font-light italic">
            {description}
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            {trustPills.map((pill) => (
              <div
                key={pill.text}
                className="inline-flex items-center gap-3 bg-white/[0.03] backdrop-blur-md border border-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-2xl hover:border-blue-500/30 transition-colors duration-500"
              >
                <span className="text-blue-500">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Cinematic scroll indicator */}
      <div className="absolute bottom-10 right-[5%] hidden md:flex flex-row items-center gap-4 text-white/20 text-[10px] font-black tracking-[0.4em] uppercase vertical-rl rotate-180">
        <div className="w-px h-16 bg-gradient-to-t from-blue-500/50 to-transparent relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-400 animate-scroll-line" />
        </div>
        <span className="mt-4">Scroll to explore</span>
      </div>

    </section>
  );
};