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
    text: "3 clinic locations",
  },
  {
    icon: (
      <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    text: "4.9 rated by patients",
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
    <section className="relative min-h-[55vh] w-full overflow-hidden flex items-center">

      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/book-hero.jpg"
          alt="Patient scheduling appointment"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Lighter gradient — image breathes */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%] py-20 w-full">
        <div className="max-w-2xl mx-auto space-y-6 text-center items-center flex flex-col">

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
            <span className="text-white/70">{breadcrumb}</span>
          </nav>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-green-400 text-xs font-semibold tracking-[0.25em] uppercase">
              Online Booking
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
            {title}{" "}
            <span className="text-green-400">{titleHighlight}</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-white/65 max-w-lg leading-relaxed text-center mx-auto">
            {description}
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2 pt-2 justify-center">
            {trustPills.map((pill) => (
              <div
                key={pill.text}
                className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full"
              >
                <span className="text-green-400">{pill.icon}</span>
                {pill.text}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.2em] uppercase">
        <span>Scroll to book</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-scroll-line" />
      </div>

    </section>
  );
};
