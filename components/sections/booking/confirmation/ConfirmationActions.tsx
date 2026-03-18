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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {/* Primary — return home */}
      <Link
        href={returnHome.href}
        className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.35)] hover:scale-[1.02]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        {returnHome.text}
      </Link>

      {/* Secondary — book another */}
      <Link
        href={bookAnother.href}
        className="inline-flex items-center justify-center gap-2 border border-dark-500 hover:border-green-500/50 text-white/60 hover:text-white font-semibold text-sm py-4 rounded-full transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        {bookAnother.text}
      </Link>
    </div>
  );
};
