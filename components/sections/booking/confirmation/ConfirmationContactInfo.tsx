// components/sections/booking/confirmation/ConfirmationContactInfo.tsx
interface ConfirmationContactInfoProps {
  text: string;
  mainPhone: string;
  emergencyPhone: string;
  emergencyLabel: string;
}

export const ConfirmationContactInfo = ({
  text,
  mainPhone,
  emergencyPhone,
  emergencyLabel,
}: ConfirmationContactInfoProps) => {
  return (
    <div className="rounded-2xl bg-dark-400 border border-dark-500 p-6">
      <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] text-center mb-5">
        {text}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Main phone */}
        <a
          href={`tel:${mainPhone.replace(/\D/g, "")}`}
          className="group flex items-center gap-3 p-4 rounded-xl bg-dark-300 border border-dark-500 hover:border-green-500/30 transition-all duration-300"
        >
          <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Clinic</p>
            <p className="text-white text-sm font-semibold group-hover:text-green-400 transition-colors duration-200">
              {mainPhone}
            </p>
          </div>
        </a>

        {/* Emergency phone */}
        <a
          href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
          className="group flex items-center gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20 hover:border-red-500/40 transition-all duration-300"
        >
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 border border-dark-400">
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
            </span>
          </div>
          <div>
            <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">
              {emergencyLabel}
            </p>
            <p className="text-red-400 text-sm font-semibold">{emergencyPhone}</p>
          </div>
        </a>
      </div>
    </div>
  );
};
