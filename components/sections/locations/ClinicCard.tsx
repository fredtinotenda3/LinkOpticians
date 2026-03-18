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
      className="group relative overflow-hidden rounded-3xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-500 scroll-mt-32 hover:shadow-[0_8px_40px_rgba(36,174,124,0.10)] flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden shrink-0">
        <Image
          src={clinic.image}
          alt={clinic.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400/70 via-transparent to-transparent" />

        {/* Badge — on-brand colours only */}
        {badge && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-[0.15em]">
              <span className="size-1.5 rounded-full bg-green-400" />
              {badge.text}
            </span>
          </div>
        )}

        {/* Open status */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-medium text-white/70">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
            Open today
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">

        {/* Name + area */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300 leading-tight">
            {clinic.name}
          </h3>
          <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">
            {clinic.address}
          </p>
        </div>

        {/* Info rows */}
        <div className="space-y-3 mb-5 flex-1">

          {/* Hours */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Hours</p>
              <p className="text-white text-xs font-medium">{clinic.operatingHours.weekdays}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Phone</p>
              <a
                href={`tel:${clinic.phone.replace(/\D/g, "")}`}
                className="text-white text-xs font-medium hover:text-green-400 transition-colors duration-200"
              >
                {clinic.phone}
              </a>
            </div>
          </div>

          {/* Parking */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Parking</p>
              <p className="text-white text-xs font-medium">{clinic.parking}</p>
            </div>
          </div>

        </div>

        {/* Saturday hours pill */}
        <div className="mb-5 px-3 py-2 bg-dark-300 border border-dark-500 rounded-xl flex items-center justify-between">
          <span className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">Saturday</span>
          <span className="text-white text-xs font-medium">
            {clinic.operatingHours.saturday === "Closed" ? (
              <span className="text-white/30">Closed</span>
            ) : clinic.operatingHours.saturday}
          </span>
        </div>

        {/* CTAs */}
        {showBooking && (
          <div className="flex gap-2">
            <Link
              href={`/book?branch=${clinic.id}`}
              className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-xs py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.35)]"
            >
              Book
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={clinic.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-dark-500 hover:border-green-500/50 text-white/60 hover:text-white text-xs font-semibold py-3 rounded-full transition-all duration-300"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Directions
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
