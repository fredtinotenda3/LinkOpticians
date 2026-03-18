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
    <div className="min-h-screen bg-dark-300 flex items-center justify-center px-[5%]">
      <div className="text-center max-w-md mx-auto space-y-6">

        {/* Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border border-amber-500/15 animate-ping" />
          <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-white/45 text-sm leading-relaxed">{message}</p>
        </div>

        {/* CTA */}
        <Link
          href={buttonHref}
          className="group inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.35)]"
        >
          {buttonText}
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
