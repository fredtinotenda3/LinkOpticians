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
      content: <p className="text-white text-sm font-semibold">{dateTime}</p>,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
      ),
      label: locationLabel,
      content: (
        <>
          <p className="text-white text-sm font-semibold">{branchName}</p>
          <p className="text-white/40 text-xs mt-1">{branchAddress}</p>
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
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-semibold">
          <span className="size-1.5 bg-sky-400 rounded-full animate-pulse" />
          {pendingStatus}
        </span>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5" />
        </svg>
      ),
      label: referenceLabel,
      content: (
        <code className="text-sky-400 text-xs font-mono bg-white/[0.03] border border-white/5 px-3 py-1 rounded-md tracking-widest">
          {bookingId.slice(0, 8).toUpperCase()}
        </code>
      ),
    },
  ];

  return (
    <div className="relative rounded-[2rem] p-10 md:p-12 mb-8 overflow-hidden border border-white/10">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-white/[0.02]" />

      {/* ── GRID (SUBTLE SYSTEM) ── */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]
        [background-size:60px_60px]" 
      />

      {/* ── MICRO STARS ── */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── NEBULA INSIDE CARD ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[400px] h-[200px] bg-sky-400/10 blur-[120px]" 
      />

      {/* ── TOP LIGHT LINE ── */}
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

      <div className="relative">

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10" />
            </svg>
          </div>
          <h2 className="text-lg md:text-xl font-semibold text-white">
            {title}
          </h2>
        </div>

        {/* ROWS */}
        <div className="space-y-7">
          {rows.map((row, i) => (
            <div key={i} className="flex items-start gap-5 group">

              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 group-hover:text-sky-400 transition">
                {row.icon}
              </div>

              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  {row.label}
                </p>
                <div className="group-hover:translate-x-1 transition">
                  {row.content}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};