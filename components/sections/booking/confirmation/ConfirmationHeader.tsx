// components/sections/booking/confirmation/ConfirmationHeader.tsx
import Link from "next/link";
import Image from "next/image";

interface ConfirmationHeaderProps {
  logoSrc: string;
  logoAlt: string;
}

export const ConfirmationHeader = ({ logoSrc, logoAlt }: ConfirmationHeaderProps) => {
  return (
    <div className="border-b border-dark-500 bg-dark-400/95 backdrop-blur-md sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-[5%] py-5 flex items-center justify-between">
        <Link href="/" className="inline-block group">
          <Image
            src={logoSrc}
            height={1000}
            width={1000}
            alt={logoAlt}
            className="h-8 w-fit transition-opacity duration-300 group-hover:opacity-80"
          />
        </Link>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-white/30">
          <Link href="/" className="hover:text-white/60 transition-colors duration-200">Home</Link>
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/book" className="hover:text-white/60 transition-colors duration-200">Book</Link>
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white/50">Confirmation</span>
        </div>
      </div>
    </div>
  );
};
