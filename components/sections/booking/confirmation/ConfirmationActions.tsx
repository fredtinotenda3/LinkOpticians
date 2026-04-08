// components/sections/booking/confirmation/ConfirmationActions.tsx
import Link from "next/link";

interface Action {
  text: string;
  href: string;
}

interface ConfirmationActionsProps {
  returnHome: Action;
  bookAnother: Action;
}

export const ConfirmationActions = ({ returnHome, bookAnother }: ConfirmationActionsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {/* Primary — return home */}
      <Link
        href={returnHome.href}
        className="group inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.25)] hover:-translate-y-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        {returnHome.text}
      </Link>

      {/* Secondary — book another */}
      <Link
        href={bookAnother.href}
        className="group inline-flex items-center justify-center gap-2.5 border border-white/10 bg-white/[0.02] hover:border-blue-500/40 text-white/40 hover:text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-full backdrop-blur-md transition-all duration-500"
      >
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        {bookAnother.text}
      </Link>
    </div>
  );
};