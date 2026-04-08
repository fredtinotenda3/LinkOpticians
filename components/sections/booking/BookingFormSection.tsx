// components/sections/booking/BookingFormSection.tsx
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { SimpleBookingForm } from "@/components/ui/forms/SimpleBookingForm";
import { Branch } from "@/types";

interface TrustBadge {
  text: string;
  icon: string;
}

interface RightColumnImage {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface QuickInfo {
  icon: string;
  title: string;
  description: string;
}

interface Emergency {
  title: string;
  subtitle: string;
  phone: string;
}

interface Testimonial {
  quote: string;
  name: string;
  rating: number;
  image: string;
}

interface BookingFormSectionProps {
  branches: Branch[];
  trustBadges: TrustBadge[];
  privacyNotice: {
    text: string;
    linkText: string;
    linkHref: string;
  };
  rightColumn: {
    image: RightColumnImage;
    quickInfo: QuickInfo[];
    emergency: Emergency;
    testimonial: Testimonial;
  };
}

const renderIcon = (iconName: string, className = "w-5 h-5") => {
  switch (iconName) {
    case "check":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "card":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    default:
      return null;
  }
};

export const BookingFormSection = ({
  branches,
  trustBadges,
  privacyNotice,
  rightColumn,
}: BookingFormSectionProps) => {
  return (
    <section className="py-24 bg-[#000B18]">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left Column — Form ──────────────────────────────────────── */}
          <div className="space-y-8">

            {/* Trust badges — Premium Pill Style */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-blue-500/5 border border-blue-500/10 rounded-xl"
                >
                  <span className="text-blue-500">
                    {renderIcon(badge.icon, "w-4 h-4")}
                  </span>
                  <span className="text-white/50 text-[10px] font-black uppercase tracking-widest">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Form container — Cinematic Elevated Glass */}
            <div className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
              {/* Blue accent top line */}
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              {/* Form header */}
              <div className="mb-10 space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">Reserve your consultation</h2>
                <p className="text-white/40 text-sm font-light italic">Confirmations are usually processed within 24 hours.</p>
              </div>

              <Suspense
                fallback={
                  <div className="py-20 text-center">
                    <div className="inline-block size-10 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/20 mt-6 text-[10px] font-black uppercase tracking-[0.2em]">Initializing Portal...</p>
                  </div>
                }
              >
                <SimpleBookingForm branches={branches} />
              </Suspense>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-4 p-5 bg-blue-500/[0.02] rounded-2xl border border-blue-500/5">
              <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-white/30 text-[11px] leading-relaxed">
                {privacyNotice.text}{" "}
                <Link href={privacyNotice.linkHref} className="text-blue-400 hover:text-blue-300 transition-colors font-bold underline underline-offset-4 decoration-blue-500/30">
                  {privacyNotice.linkText}
                </Link>
              </p>
            </div>
          </div>

          {/* ── Right Column — Visual info ───────────────────────────────── */}
          <div className="space-y-6 lg:sticky lg:top-24">

            {/* Image card — Cinematic Frame */}
            <div className="relative rounded-[2rem] overflow-hidden border border-white/5 aspect-[16/10] shadow-2xl group">
              <Image
                src={rightColumn.image.src}
                fill
                alt={rightColumn.image.alt}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000B18] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xl font-bold text-white tracking-tight">{rightColumn.image.title}</p>
                <p className="text-blue-200/50 text-sm font-light italic mt-1">{rightColumn.image.subtitle}</p>
              </div>
            </div>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-4">
              {rightColumn.quickInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                    {renderIcon(info.icon, "w-5 h-5")}
                  </div>
                  <p className="text-white text-sm font-bold tracking-tight">{info.title}</p>
                  <p className="text-white/30 text-[11px] mt-1.5 leading-relaxed">{info.description}</p>
                </div>
              ))}
            </div>

            {/* Emergency banner — Refined Red */}
            <div className="relative overflow-hidden p-6 rounded-[2rem] bg-red-500/[0.03] border border-red-500/10">
              <div className="flex items-center gap-5">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-red-500 border-2 border-[#000B18]">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-red-500/60 text-[10px] font-black uppercase tracking-[0.2em]">{rightColumn.emergency.title}</p>
                  <a
                    href={`tel:${rightColumn.emergency.phone.replace(/\D/g, "")}`}
                    className="text-2xl font-bold text-white tracking-tighter hover:text-red-500 transition-colors block mt-1"
                  >
                    {rightColumn.emergency.phone}
                  </a>
                  <p className="text-white/30 text-[10px] mt-1 font-medium">{rightColumn.emergency.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Testimonial — High End Quote */}
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 relative">
              <svg className="w-10 h-10 text-blue-500/10 absolute top-6 right-8" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
              </svg>

              <p className="text-white/60 text-sm leading-relaxed mb-6 italic font-light">
                &quot;{rightColumn.testimonial.quote}&quot;
              </p>

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full overflow-hidden border border-white/10 p-0.5">
                    <Image
                      src={rightColumn.testimonial.image}
                      alt={rightColumn.testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                  <p className="text-white text-[11px] font-black uppercase tracking-widest">{rightColumn.testimonial.name}</p>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3 h-3 ${i < rightColumn.testimonial.rating ? "text-blue-400" : "text-white/5"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};