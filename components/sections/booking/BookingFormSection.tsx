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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "card":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
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
    <section className="py-20 bg-dark-300">
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left Column — Form ──────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Trust badges — more visual weight */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/25 rounded-full"
                >
                  <span className="text-green-400">
                    {renderIcon(badge.icon, "w-3.5 h-3.5")}
                  </span>
                  <span className="text-white/80 text-xs font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Form container — elevated, stands out */}
            <div className="relative bg-dark-400 border border-dark-500 rounded-3xl p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
              {/* Subtle green top accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent rounded-full" />

              {/* Form header */}
              <div className="mb-8 space-y-1">
                <h2 className="text-xl font-bold text-white">Book your appointment</h2>
                <p className="text-white/45 text-sm">Fill in your details and we&apos;ll confirm within 24 hours.</p>
              </div>

              <Suspense
                fallback={
                  <div className="py-16 text-center">
                    <div className="inline-block size-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/40 mt-4 text-sm">Loading booking form...</p>
                  </div>
                }
              >
                <SimpleBookingForm branches={branches} />
              </Suspense>
            </div>

            {/* Privacy notice */}
            <div className="flex items-start gap-3 p-4 bg-dark-400/50 rounded-xl border border-dark-500/50">
              <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-white/40 text-xs leading-relaxed">
                {privacyNotice.text}{" "}
                <Link href={privacyNotice.linkHref} className="text-green-400 hover:text-green-300 transition-colors underline underline-offset-2">
                  {privacyNotice.linkText}
                </Link>.
              </p>
            </div>
          </div>

          {/* ── Right Column — Visual info ───────────────────────────────── */}
          <div className="space-y-5 lg:sticky lg:top-24">

            {/* Image card — lighter gradient */}
            <div className="relative rounded-2xl overflow-hidden border border-dark-500 aspect-[16/9]">
              <Image
                src={rightColumn.image.src}
                fill
                alt={rightColumn.image.alt}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-lg font-bold text-white leading-tight">{rightColumn.image.title}</p>
                <p className="text-white/65 text-sm mt-0.5">{rightColumn.image.subtitle}</p>
              </div>
            </div>

            {/* Quick info grid */}
            <div className="grid grid-cols-2 gap-3">
              {rightColumn.quickInfo.map((info, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 mb-3 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400">
                    {renderIcon(info.icon, "w-4.5 h-4.5")}
                  </div>
                  <p className="text-white text-sm font-semibold leading-tight">{info.title}</p>
                  <p className="text-white/40 text-xs mt-1 leading-snug">{info.description}</p>
                </div>
              ))}
            </div>

            {/* Emergency banner */}
            <div className="relative overflow-hidden p-5 rounded-2xl bg-red-500/8 border border-red-500/25">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 border border-dark-400">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{rightColumn.emergency.title}</p>
                  <p className="text-white/55 text-xs mt-0.5 mb-2">{rightColumn.emergency.subtitle}</p>
                  <a
                    href={`tel:${rightColumn.emergency.phone.replace(/\D/g, "")}`}
                    className="text-lg font-bold text-red-400 hover:text-red-300 transition-colors"
                  >
                    {rightColumn.emergency.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="p-5 rounded-2xl bg-dark-400 border border-dark-500">
              {/* Large decorative quote mark */}
              <svg className="w-7 h-7 text-green-500/25 mb-3" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
              </svg>

              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {rightColumn.testimonial.quote}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-9 rounded-full overflow-hidden border border-dark-500">
                    <Image
                      src={rightColumn.testimonial.image}
                      alt={rightColumn.testimonial.name}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-white text-sm font-semibold">{rightColumn.testimonial.name}</p>
                </div>

                {/* SVG stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rightColumn.testimonial.rating ? "text-yellow-400" : "text-white/15"}`}
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
