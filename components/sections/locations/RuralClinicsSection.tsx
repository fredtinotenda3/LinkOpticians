// components/sections/locations/RuralClinicsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { BranchDetail } from "@/constants/branches";

interface RuralClinicsSectionProps {
  subtitle: string;
  title: string;
  description: string;
  clinics: BranchDetail[];
}

const getRegionLabel = (id: string) => {
  if (id === "chipinge") return "Eastern Highlands";
  if (id === "chiredzi") return "Lowveld";
  return "Zimbabwe";
};

const getSpecialtyBadge = (id: string) => {
  if (id === "chipinge") return { text: "Mobile Unit Base", icon: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  )};
  if (id === "chiredzi") return { text: "Industrial Care", icon: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
    </svg>
  )};
  return { text: "Regional Hub", icon: null };
};

export const RuralClinicsSection = ({
  subtitle,
  title,
  description,
  clinics,
}: RuralClinicsSectionProps) => {
  return (
    <section className="relative py-32 bg-[#000d1a] overflow-hidden" id="rural">

      {/* Cinematic Right-Side Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[160px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Section Header ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
              {title}
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-medium italic max-w-xl leading-relaxed">
              {description}
            </p>
          </div>

          {/* Regional Pill */}
          <div className="shrink-0 inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-xl">
            <div className="flex -space-x-2">
              <div className="size-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
              <div className="size-2.5 rounded-full bg-sky-500/40" />
            </div>
            <span className="text-white/60 text-[11px] font-black uppercase tracking-widest">
              {clinics.length} Regional Operations
            </span>
          </div>
        </div>

        {/* ── Cards Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clinics.map((clinic) => {
            const badge = getSpecialtyBadge(clinic.id);
            return (
              <div
                key={clinic.id}
                id={clinic.id}
                className="group relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-700 scroll-mt-32 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex flex-col hover:-translate-y-2"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/9] overflow-hidden shrink-0 bg-[#001222]">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-[#000d1a]/20 to-transparent" />

                  {/* Specialty badge */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#000d1a]/80 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-black text-sky-400 uppercase tracking-[0.2em]">
                      <span className="text-sky-500">{badge.icon}</span>
                      {badge.text}
                    </span>
                  </div>

                  {/* Region Label */}
                  <div className="absolute top-5 right-5">
                    <span className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-[9px] font-black text-white/40 uppercase tracking-[0.1em]">
                      {getRegionLabel(clinic.id)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="text-3xl font-black text-white group-hover:text-sky-400 transition-colors duration-300 mb-2 italic uppercase tracking-tighter">
                    {clinic.name}
                  </h3>
                  <p className="text-white/30 text-[11px] font-medium italic mb-8 line-clamp-1 uppercase tracking-widest">
                    {clinic.address}
                  </p>

                  {/* Utility Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-sky-500/20 transition-colors">
                      <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Operating Hours</p>
                      <p className="text-white/80 text-xs font-bold leading-snug">{clinic.operatingHours.weekdays}</p>
                      <p className="text-white/30 text-[10px] mt-1 italic font-medium uppercase tracking-tighter">Sat: {clinic.operatingHours.saturday}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-sky-500/20 transition-colors">
                      <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${clinic.phone.replace(/\D/g, "")}`}
                        className="text-white/80 text-xs font-bold hover:text-sky-400 transition-colors duration-300 block mb-1"
                      >
                        {clinic.phone}
                      </a>
                      <p className="text-sky-500/50 text-[10px] italic font-black uppercase tracking-tighter">Emergency Response Available</p>
                    </div>
                  </div>

                  {/* Specialty Tags */}
                  <div className="flex flex-wrap gap-2 mb-10 flex-1">
                    {clinic.specialties.slice(0, 4).map((s) => (
                      <span key={s} className="text-[9px] font-black uppercase tracking-[0.15em] px-3.5 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg text-white/30 group-hover:text-white/50 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/book?branch=${clinic.id}`}
                      className="group/btn flex-[1.5] inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-[10px] uppercase tracking-widest py-4 rounded-2xl transition-all duration-500 hover:shadow-[0_15px_30px_rgba(14,165,233,0.3)]"
                    >
                      Secure Booking
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
                      Route Map
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};