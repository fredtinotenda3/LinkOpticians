// components/sections/booking/confirmation/ConfirmationHeader.tsx
import Link from "next/link";
import Image from "next/image";

interface ConfirmationHeaderProps {
  logoSrc: string;
  logoAlt: string;
}

export const ConfirmationHeader = ({ logoSrc, logoAlt }: ConfirmationHeaderProps) => {
  return (
    <div className="border-b border-white/5 bg-[#000B18]/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-[5%] py-6 flex items-center justify-between">
        <Link href="/" className="inline-block group">
          <Image
            src={logoSrc}
            height={1000}
            width={1000}
            alt={logoAlt}
            className="h-7 w-auto transition-all duration-500 group-hover:opacity-70 group-hover:scale-[0.98]"
          />
        </Link>

        {/* Breadcrumb — Minimalist Cinematic Style */}
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          <Link 
            href="/" 
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Home
          </Link>
          <span className="size-1 rounded-full bg-white/10" />
          <Link 
            href="/book" 
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Book
          </Link>
          <span className="size-1 rounded-full bg-blue-500/40" />
          <span className="text-blue-500/80">Confirmation</span>
        </div>
      </div>
    </div>
  );
};