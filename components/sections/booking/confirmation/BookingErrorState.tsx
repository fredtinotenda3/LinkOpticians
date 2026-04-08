// components/sections/booking/confirmation/BookingErrorState.tsx
import Link from "next/link";

interface BookingErrorStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonHref: string;
}

export const BookingErrorState = ({
  title,
  message,
  buttonText,
  buttonHref,
}: BookingErrorStateProps) => {
  return (
    <div className="min-h-screen bg-[#000B18] flex items-center justify-center px-[5%] overflow-hidden relative">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative text-center max-w-lg mx-auto space-y-10">

        {/* Cinematic Error Icon */}
        <div className="relative inline-flex items-center justify-center">
          {/* Outer ripples */}
          <div className="absolute w-32 h-32 rounded-full border border-blue-500/10 animate-ping" />
          <div className="absolute w-24 h-24 rounded-full border border-white/5 animate-ping [animation-delay:400ms]" />
          
          {/* Icon Hexagon/Shield Container */}
          <div className="relative w-20 h-20 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-md shadow-2xl">
            <svg className="w-9 h-9 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Text — Digital Concierge Typography */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 mb-2">
             <span className="w-4 h-px bg-blue-500/50" />
             <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">System Notice</span>
             <span className="w-4 h-px bg-blue-500/50" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">{title}</h1>
          <p className="text-white/40 text-lg leading-relaxed font-light italic max-w-sm mx-auto">
            {message}
          </p>
        </div>

        {/* CTA — Premium Blue Action */}
        <Link
          href={buttonHref}
          className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:-translate-y-1"
        >
          {buttonText}
          <svg
            className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5 text-blue-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};