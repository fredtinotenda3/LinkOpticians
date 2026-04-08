// components/sections/locations/ComparisonTableSection.tsx
import Link from "next/link";

interface TableRow {
  name: string;
  hours: string;
  phone: string;
  parking: string;
  bookLink: string;
}

interface ComparisonTableSectionProps {
  subtitle: string;
  title: string;
  headers: string[];
  rows: TableRow[];
}

export const ComparisonTableSection = ({
  subtitle,
  title,
  headers,
  rows,
}: ComparisonTableSectionProps) => {
  return (
    <section className="relative py-32 bg-[#000d1a] overflow-hidden">

      {/* Background Deep Ocean Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-sky-500/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-500" />
            <span className="text-sky-500 text-[10px] font-black tracking-[0.5em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
            {title}
          </h2>
        </div>

        {/* ── Desktop Table ──────────────────────────────────────────── */}
        <div className="hidden md:block rounded-[32px] overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-sm">

          {/* Header row */}
          <div className="grid grid-cols-5 bg-white/[0.03] border-b border-white/5">
            {headers.map((header, i) => (
              <div
                key={i}
                className="px-8 py-6 text-[10px] font-black text-white/30 uppercase tracking-[0.25em]"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-5 border-b border-white/5 last:border-0 transition-all duration-300 hover:bg-white/[0.03] group ${
                rowIndex % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
              }`}
            >
              {/* Clinic Name */}
              <div className="px-8 py-7 flex items-center gap-4">
                <span className="size-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.6)] shrink-0" />
                <span className="text-white text-sm font-black italic uppercase tracking-tight group-hover:text-sky-400 transition-colors">
                  {row.name}
                </span>
              </div>

              {/* Hours */}
              <div className="px-8 py-7 flex items-center">
                <span className="text-white/40 text-[11px] font-medium italic">{row.hours}</span>
              </div>

              {/* WhatsApp / Phone */}
              <div className="px-8 py-7 flex items-center">
                <a
                  href={`https://wa.me/${row.phone.replace(/\D/g, "")}`}
                  className="text-white/60 hover:text-sky-400 text-[11px] font-black uppercase tracking-widest transition-colors duration-300"
                >
                  {row.phone}
                </a>
              </div>

              {/* Parking */}
              <div className="px-8 py-7 flex items-center">
                <span className="text-white/40 text-[11px] font-medium italic">{row.parking}</span>
              </div>

              {/* Booking Action */}
              <div className="px-8 py-7 flex items-center">
                <Link
                  href={row.bookLink}
                  className="group/btn inline-flex items-center gap-2 bg-sky-500/10 hover:bg-sky-500 border border-sky-500/20 hover:border-sky-500 text-sky-400 hover:text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl transition-all duration-500"
                >
                  Book
                  <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile Cards ────────────────────── */}
        <div className="md:hidden space-y-6">
          {rows.map((row, i) => (
            <div key={i} className="rounded-[24px] bg-white/[0.02] border border-white/5 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-sky-500" />
                  <span className="text-white font-black italic uppercase tracking-tight text-lg">{row.name}</span>
                </div>
                <Link
                  href={row.bookLink}
                  className="inline-flex items-center gap-2 bg-sky-500 text-white text-[9px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl"
                >
                  Book
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1.5">Availability</p>
                  <p className="text-white/60 text-xs font-medium italic leading-relaxed">{row.hours}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1.5">Contact</p>
                  <a href={`https://wa.me/${row.phone.replace(/\D/g, "")}`} className="text-sky-400 text-xs font-black uppercase tracking-tight">
                    {row.phone}
                  </a>
                </div>
                <div className="col-span-2 pt-2">
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1.5">Logistics</p>
                  <p className="text-white/60 text-xs font-medium italic">{row.parking}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};