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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: dateTimeLabel,
      content: <p className="text-white text-sm font-semibold">{dateTime}</p>,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: locationLabel,
      content: (
        <>
          <p className="text-white text-sm font-semibold">{branchName}</p>
          <p className="text-white/45 text-xs mt-0.5">{branchAddress}</p>
        </>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: statusLabel,
      content: (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/15 border border-amber-500/25 rounded-full text-amber-400 text-xs font-semibold">
          <span className="size-1.5 bg-amber-400 rounded-full animate-pulse" />
          {pendingStatus}
        </span>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      label: referenceLabel,
      content: (
        <code className="text-white text-sm font-mono bg-dark-300 border border-dark-500 px-4 py-1.5 rounded-lg inline-block tracking-wider">
          {bookingId.slice(0, 8).toUpperCase()}
        </code>
      ),
    },
  ];

  return (
    <div className="relative bg-dark-400 border border-dark-500 rounded-3xl p-8 md:p-10 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">

      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent rounded-full" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-dark-500">
        <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>

      {/* Info rows */}
      <div className="space-y-5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0 mt-0.5">
              {row.icon}
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">
                {row.label}
              </p>
              {row.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
