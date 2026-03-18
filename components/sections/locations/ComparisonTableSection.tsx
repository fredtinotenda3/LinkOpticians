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
    <section className="relative py-28 bg-dark-300 overflow-hidden">

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
              {subtitle}
            </span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
          </h2>
        </div>

        {/* ── Table — desktop ──────────────────────────────────────────── */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-dark-500">

          {/* Header row */}
          <div className="grid grid-cols-5 bg-dark-400 border-b border-dark-500">
            {headers.map((header, i) => (
              <div
                key={i}
                className="px-6 py-4 text-xs font-bold text-white/50 uppercase tracking-[0.2em]"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-5 border-b border-dark-500 last:border-0 transition-colors duration-200 hover:bg-dark-400/50 ${
                rowIndex % 2 === 0 ? "bg-dark-400" : "bg-dark-300"
              }`}
            >
              {/* Clinic name */}
              <div className="px-6 py-5 flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-green-500 shrink-0" />
                <span className="text-white text-sm font-semibold">{row.name}</span>
              </div>

              {/* Hours */}
              <div className="px-6 py-5 flex items-center">
                <span className="text-white/55 text-sm">{row.hours}</span>
              </div>

              {/* Phone */}
              <div className="px-6 py-5 flex items-center">
                <a
                  href={`tel:${row.phone.replace(/\D/g, "")}`}
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors duration-200"
                >
                  {row.phone}
                </a>
              </div>

              {/* Parking */}
              <div className="px-6 py-5 flex items-center">
                <span className="text-white/55 text-sm">{row.parking}</span>
              </div>

              {/* Book */}
              <div className="px-6 py-5 flex items-center">
                <Link
                  href={row.bookLink}
                  className="group inline-flex items-center gap-1.5 bg-green-500/15 hover:bg-green-500 border border-green-500/30 hover:border-green-500 text-green-400 hover:text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300"
                >
                  Book
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile cards — shown instead of table ────────────────────── */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-2xl bg-dark-400 border border-dark-500 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500" />
                  <span className="text-white font-bold text-sm">{row.name}</span>
                </div>
                <Link
                  href={row.bookLink}
                  className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full"
                >
                  Book
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Hours</p>
                  <p className="text-white/70 text-xs">{row.hours}</p>
                </div>
                <div>
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                  <a href={`tel:${row.phone.replace(/\D/g, "")}`} className="text-green-400 text-xs font-medium">
                    {row.phone}
                  </a>
                </div>
                <div className="col-span-2">
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Parking</p>
                  <p className="text-white/70 text-xs">{row.parking}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
