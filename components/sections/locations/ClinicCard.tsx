// components/sections/locations/ClinicCard.tsx
import Image from "next/image";
import Link from "next/link";
import { BranchDetail } from "@/constants/branches";

interface ClinicCardProps {
  clinic: BranchDetail;
  badge?: {
    text: string;
    color: string;
  };
  showBooking?: boolean;
}

export const ClinicCard = ({ clinic, badge, showBooking = true }: ClinicCardProps) => {
  return (
    <div
      id={clinic.id}
      className="group relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-700 scroll-mt-32 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col hover:-translate-y-2"
    >
      {/* ── Image Section ─────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-[#001222]">
        <Image
          src={clinic.image}
          alt={clinic.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        {/* Cinematic Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-[#000d1a]/20 to-transparent" />

        {/* Brand Badge */}
        {badge && (
          <div className="absolute top-5 left-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#000d1a]/80 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-black text-sky-400 uppercase tracking-[0.2em]">
              <span className="size-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
              {badge.text}
            </span>
          </div>
        )}

        {/* Live Status */}
        <div className="absolute top-5 right-5">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-black text-white/90 uppercase tracking-[0.1em]">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open Today
          </span>
        </div>
      </div>

      {/* ── Content Section ──────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-8">

        {/* Name + Area */}
        <div className="mb-6">
          <h3 className="text-2xl font-black text-white group-hover:text-sky-400 transition-colors duration-300 leading-none italic uppercase tracking-tighter">
            {clinic.name}
          </h3>
          <p className="text-white/30 text-[11px] mt-3 font-medium italic line-clamp-1 uppercase tracking-widest">
            {clinic.address}
          </p>
        </div>

        {/* Utility Grid */}
        <div className="grid grid-cols-1 gap-4 mb-8 flex-1">
          {/* Hours */}
          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover/item:border-sky-500/30 transition-colors">
              <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white/20 text-[9px] font-black uppercase tracking-widest">Weekdays</p>
              <p className="text-white/80 text-xs font-bold">{clinic.operatingHours.weekdays}</p>
            </div>
          </div>

          {/* WhatsApp / Phone */}
          <div className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 group-hover/item:border-sky-500/30 transition-colors">
              <svg className="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-white/20 text-[9px] font-black uppercase tracking-widest">WhatsApp</p>
              <a
                href={`https://wa.me/${clinic.phone.replace(/\D/g, "")}`}
                className="text-white/80 text-xs font-bold hover:text-sky-400 transition-colors"
              >
                {clinic.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Saturday Specific Row */}
        <div className="mb-8 px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest italic">Saturday Service</span>
          <span className="text-white text-[11px] font-black uppercase">
            {clinic.operatingHours.saturday === "Closed" ? (
              <span className="text-white/10">N/A</span>
            ) : clinic.operatingHours.saturday}
          </span>
        </div>

        {/* ── Actions ─────────────────────────────────────────────── */}
        {showBooking && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/book?branch=${clinic.id}`}
              className="group/btn flex-[1.5] inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_30px_rgba(14,165,233,0.3)]"
            >
              Book Now
              <svg className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={clinic.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/[0.02] text-white/40 hover:text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-2xl transition-all duration-500"
            >
              Map
            </a>
          </div>
        )}
      </div>
    </div>
  );
};