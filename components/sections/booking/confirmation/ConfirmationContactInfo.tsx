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
    <div className="rounded-3xl bg-white/[0.02] border border-white/5 p-8 backdrop-blur-md">
      <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] text-center mb-6">
        {text}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Main phone — Clinic Blue */}
        <a
          href={`tel:${mainPhone.replace(/\D/g, "")}`}
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-500"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Clinic</p>
            <p className="text-white text-sm font-bold tracking-tight group-hover:text-blue-400 transition-colors duration-500">
              {mainPhone}
            </p>
          </div>
        </a>

        {/* Emergency phone — Refined Red */}
        <a
          href={`tel:${emergencyPhone.replace(/\D/g, "")}`}
          className="group flex items-center gap-4 p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/30 transition-all duration-500"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 group-hover:scale-110 transition-transform duration-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-red-500 border-2 border-[#000B18]">
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
            </span>
          </div>
          <div>
            <p className="text-red-500/40 text-[9px] font-black uppercase tracking-widest mb-1">
              {emergencyLabel}
            </p>
            <p className="text-red-500 text-sm font-bold tracking-tight">{emergencyPhone}</p>
          </div>
        </a>
      </div>
    </div>
  );
};