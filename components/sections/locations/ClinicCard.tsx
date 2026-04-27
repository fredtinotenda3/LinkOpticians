// ===== FILE: components/sections/locations/ClinicCard.tsx (FULL REPLACEMENT) =====

"use client";

import Image from "next/image";
import Link from "next/link";
import { type AppBranch } from "@/lib/branch-adapter";

interface ClinicCardProps {
  clinic: AppBranch;
  badge?: {
    text: string;
    color: string;
  };
  showBooking?: boolean;
}

export const ClinicCard = ({ clinic, badge, showBooking = true }: ClinicCardProps) => {
  // Use the image from the adapted branch (already has fallback)
  const imageUrl = clinic.image || "/assets/images/branches/fallback.jpg";
  
  return (
    <div
      id={clinic.$id}
      className="group relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-500 flex flex-col hover:-translate-y-1.5"
    >
      {/* ── IMAGE ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#001222]">
        <Image
          src={imageUrl}
          alt={clinic.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          quality={100}
          onError={(e) => {
            // Fallback if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = "/assets/images/branches/fallback.jpg";
          }}
        />

        {/* Clean overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md border border-white/20 text-sky-300">
              {badge.text}
            </span>
          </div>
        )}

        {/* Status */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/50 border border-white/20 text-white/80 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open Today
          </span>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Name */}
        <div className="mb-5">
          <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-sky-400 transition">
            {clinic.name}
          </h3>

          <p className="text-white/50 text-xs mt-2 line-clamp-2">
            {clinic.address}
          </p>
        </div>

        {/* Info */}
        <div className="grid gap-4 mb-6 flex-1">

          {/* Hours */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] uppercase">Weekdays</p>
              <p className="text-white text-xs font-medium">{clinic.operatingHours.weekdays}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <a
              href={`https://wa.me/${clinic.phone.replace(/\D/g, "")}`}
              className="text-white text-xs font-medium hover:text-sky-400 transition break-all"
            >
              {clinic.phone}
            </a>
          </div>
        </div>

        {/* Saturday */}
        <div className="mb-6 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl flex justify-between text-xs">
          <span className="text-white/40">Saturday</span>
          <span className="text-white">
            {clinic.operatingHours.saturday === "Closed"
              ? "Closed"
              : clinic.operatingHours.saturday}
          </span>
        </div>

        {/* ACTIONS */}
        {showBooking && (
          <div className="flex gap-3">
            <Link
              href={`/book?branch=${clinic.$id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition"
            >
              Book Now
            </Link>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition"
            >
              Map
            </a>
          </div>
        )}
      </div>

      {/* subtle glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400/5 to-violet-400/5 blur-2xl transition duration-500 pointer-events-none" />
    </div>
  );
};