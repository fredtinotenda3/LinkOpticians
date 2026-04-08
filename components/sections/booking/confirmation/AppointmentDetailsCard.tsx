// components/sections/booking/confirmation/AppointmentDetailsCard.tsx

interface AppointmentDetailsCardProps {
  title: string;
  dateTime: string;
  dateTimeLabel: string;
  branchName?: string;
  branchAddress?: string;
  locationLabel: string;
  statusLabel: string;
  pendingStatus: string;
  referenceLabel: string;
  bookingId: string;
}

export const AppointmentDetailsCard = ({
  title,
  dateTime,
  dateTimeLabel,
  branchName,
  branchAddress,
  locationLabel,
  statusLabel,
  pendingStatus,
  referenceLabel,
  bookingId,
}: AppointmentDetailsCardProps) => {

  const rows = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: dateTimeLabel,
      content: <p className="text-white text-sm font-bold tracking-tight">{dateTime}</p>,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: locationLabel,
      content: (
        <>
          <p className="text-white text-sm font-bold tracking-tight">{branchName}</p>
          <p className="text-white/40 text-[11px] mt-1 font-light italic">{branchAddress}</p>
        </>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: statusLabel,
      content: (
        <span className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
          <span className="size-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          {pendingStatus}
        </span>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      label: referenceLabel,
      content: (
        <code className="text-blue-400 text-xs font-mono bg-white/[0.03] border border-white/5 px-4 py-1.5 rounded-lg inline-block tracking-[0.2em] font-bold">
          {bookingId.slice(0, 8).toUpperCase()}
        </code>
      ),
    },
  ];

  return (
    <div className="relative bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2.5rem] p-10 md:p-12 mb-8 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">

      {/* Top accent line — Cinematic Blue Beam */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
      </div>

      {/* Info rows */}
      <div className="space-y-8">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-6 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 shrink-0 mt-0.5 group-hover:text-blue-500 group-hover:border-blue-500/30 transition-all duration-500">
              {row.icon}
            </div>
            <div className="flex flex-col">
              <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {row.label}
              </p>
              <div className="transition-all duration-500 group-hover:translate-x-1">
                {row.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};