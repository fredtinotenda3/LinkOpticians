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
  if (id === "chipinge")
    return {
      text: "Mobile Unit Base",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    };

  if (id === "chiredzi")
    return {
      text: "Industrial Care",
      icon: (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
      ),
    };

  return { text: "Regional Hub", icon: null };
};

export const RuralClinicsSection = ({
  subtitle,
  title,
  description,
  clinics,
}: RuralClinicsSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="rural">

      {/* ── UNIQUE BACKGROUND ── */}

      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#030a1a] to-[#020617]" />

      {/* Sky glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-400/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Purple field */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-violet-500/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Green (rural/environment hint) */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-emerald-400/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Dot texture */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:30px_30px]" />

      {/* Horizon line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div className="space-y-5 max-w-2xl">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
            </h2>

            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* (kept minimal, removed noisy counters earlier) */}
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clinics.map((clinic) => {
            const badge = getSpecialtyBadge(clinic.id);

            return (
              <div
                key={clinic.id}
                id={clinic.id}
                className="group relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-500 flex flex-col hover:-translate-y-1.5"
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#001222]">
                  <Image
                    src={clinic.image}
                    alt={clinic.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={100}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/50 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-semibold text-sky-300 uppercase tracking-wider">
                      {badge.icon && <span>{badge.icon}</span>}
                      {badge.text}
                    </span>
                  </div>

                  {/* Region */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-black/50 border border-white/20 rounded-full text-[10px] text-white/70 uppercase tracking-wider">
                      {getRegionLabel(clinic.id)}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-sky-400 transition mb-2">
                    {clinic.name}
                  </h3>

                  <p className="text-white/50 text-xs mb-6 line-clamp-1">
                    {clinic.address}
                  </p>

                  {/* INFO */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <p className="text-white/40 text-[10px] uppercase mb-1">Hours</p>
                      <p className="text-white text-xs font-medium">
                        {clinic.operatingHours.weekdays}
                      </p>
                      <p className="text-white/50 text-[10px] mt-1">
                        Sat: {clinic.operatingHours.saturday}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <p className="text-white/40 text-[10px] uppercase mb-1">WhatsApp</p>
                      <a
                        href={`https://wa.me/${clinic.phone.replace(/\D/g, "")}`}
                        className="text-white text-xs font-medium hover:text-sky-400 transition"
                      >
                        {clinic.phone}
                      </a>
                    </div>
                  </div>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {clinic.specialties.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-3 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/book?branch=${clinic.id}`}
                      className="flex-1 inline-flex items-center justify-center bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition"
                    >
                      Secure Booking
                    </Link>

                    <a
                      href={clinic.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition"
                    >
                      Route Map
                    </a>
                  </div>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400/5 to-violet-400/5 blur-2xl transition duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};