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
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (DATA GRID STYLE) ── */}

      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Horizontal scan lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:100%_6px]" />

      {/* Soft blue highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-400/10 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── HEADER ── */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-sky-400" />
            <span className="text-sky-400/80 text-xs font-semibold tracking-[0.3em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-px bg-sky-400" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
            {title}
          </h2>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block rounded-[24px] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-md">

          {/* Header */}
          <div className="grid grid-cols-5 bg-white/[0.04] border-b border-white/10">
            {headers.map((header, i) => (
              <div
                key={i}
                className="px-6 py-5 text-xs font-semibold text-white/40 uppercase tracking-wider"
              >
                {header}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid grid-cols-5 border-b border-white/5 last:border-0 transition-all duration-300 hover:bg-white/[0.03] ${
                rowIndex % 2 === 0 ? "bg-transparent" : "bg-white/[0.01]"
              }`}
            >
              {/* Name */}
              <div className="px-6 py-6 flex items-center gap-3">
                <span className="size-2 rounded-full bg-sky-400" />
                <span className="text-white text-sm font-semibold">
                  {row.name}
                </span>
              </div>

              {/* Hours */}
              <div className="px-6 py-6 flex items-center">
                <span className="text-white/60 text-sm">
                  {row.hours}
                </span>
              </div>

              {/* Phone */}
              <div className="px-6 py-6 flex items-center">
                <a
                  href={`https://wa.me/${row.phone.replace(/\D/g, "")}`}
                  className="text-white/70 hover:text-sky-400 text-sm transition"
                >
                  {row.phone}
                </a>
              </div>

              {/* Parking */}
              <div className="px-6 py-6 flex items-center">
                <span className="text-white/60 text-sm">
                  {row.parking}
                </span>
              </div>

              {/* Action */}
              <div className="px-6 py-6 flex items-center">
                <Link
                  href={row.bookLink}
                  className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold px-5 py-2 rounded-lg transition"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden space-y-5">
          {rows.map((row, i) => (
            <div key={i} className="rounded-[20px] bg-white/[0.03] border border-white/10 p-6 space-y-5">

              <div className="flex items-center justify-between">
                <span className="text-white font-semibold text-base">
                  {row.name}
                </span>
                <Link
                  href={row.bookLink}
                  className="bg-sky-500 text-white text-xs px-4 py-2 rounded-lg"
                >
                  Book
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 text-xs">Hours</p>
                  <p className="text-white">{row.hours}</p>
                </div>

                <div>
                  <p className="text-white/40 text-xs">Contact</p>
                  <a
                    href={`https://wa.me/${row.phone.replace(/\D/g, "")}`}
                    className="text-sky-400"
                  >
                    {row.phone}
                  </a>
                </div>

                <div className="col-span-2">
                  <p className="text-white/40 text-xs">Parking</p>
                  <p className="text-white">{row.parking}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};