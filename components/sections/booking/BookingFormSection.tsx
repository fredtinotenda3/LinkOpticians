// components/sections/booking/BookingFormSection.tsx

import { Suspense } from "react";
import Image from "next/image";
import { SimpleBookingForm } from "@/components/ui/forms/SimpleBookingForm";
import { Branch } from "@/types";

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

interface BookingFormSectionProps {
  branches: Branch[];
  trustBadges: any[];
  privacyNotice: any;
  rightColumn: {
    image: RightColumnImage;
    quickInfo: QuickInfo[];
    emergency: Emergency;
  };
}

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case "check":
      return "✓";
    case "clock":
      return "⏱";
    case "card":
      return "💳";
    default:
      return null;
  }
};

export const BookingFormSection = ({
  branches,
  rightColumn,
}: BookingFormSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── BASE ── */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* ── PRIMARY GRID (VISIBLE) ── */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)]
        [background-size:60px_60px]" 
      />

      {/* ── SECONDARY GRID (DEPTH) ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[linear-gradient(to_right,rgba(56,189,248,0.15)_1px,transparent_1px),
             linear-gradient(to_bottom,rgba(168,85,247,0.15)_1px,transparent_1px)]
        [background-size:120px_120px]" 
      />

      {/* ── MICRO STARS (DENser) ── */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none 
        bg-[radial-gradient(circle,white_1px,transparent_1px)]
        [background-size:70px_70px]" 
      />

      {/* ── COLORED STAR LAYER ── */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none 
        bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.7)_1px,transparent_1px),
             radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.7)_1px,transparent_1px),
             radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.5)_1px,transparent_1px)]
        [background-size:100px_100px]" 
      />

      {/* ── MAIN NEBULA ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[900px] h-[400px] bg-sky-400/20 blur-[180px] pointer-events-none" 
      />

      {/* ── SECOND NEBULA ── */}
      <div className="absolute bottom-0 right-0 
        w-[800px] h-[400px] bg-violet-500/20 blur-[180px] pointer-events-none" 
      />

      {/* ── SIDE AMBIENT LIGHT ── */}
      <div className="absolute left-0 top-1/3 
        w-[400px] h-[300px] bg-sky-400/10 blur-[140px] pointer-events-none" 
      />

      {/* ── CENTER LIGHT BAND (STRONGER) ── */}
      <div className="absolute top-1/2 left-0 right-0 h-[160px] 
        -translate-y-1/2 
        bg-gradient-to-r from-transparent via-sky-400/30 to-transparent 
        blur-3xl pointer-events-none"
      />

      {/* ── VIGNETTE ── */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_center,transparent,rgba(2,6,23,0.9))]" 
      />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div className="space-y-6">

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">
                Book an appointment
              </h2>
              <p className="text-white/60 text-sm">
                Choose a time that works for you.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="py-16 text-center">
                  <div className="inline-block size-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
                </div>
              }
            >
              <SimpleBookingForm branches={branches} />
            </Suspense>

          </div>

          {/* RIGHT */}
          <div className="space-y-8 lg:sticky lg:top-24">

            <div className="relative rounded-xl overflow-hidden aspect-[16/10] border border-white/10">
              <Image
                src={rightColumn.image.src}
                alt={rightColumn.image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {rightColumn.quickInfo.map((info, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-sky-400">
                    {renderIcon(info.icon)}
                  </div>
                  <p className="text-white text-sm font-medium">
                    {info.title}
                  </p>
                  <p className="text-white/50 text-xs">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-red-400 text-xs uppercase">
                {rightColumn.emergency.title}
              </p>
              <a
                href={`tel:${rightColumn.emergency.phone.replace(/\D/g, "")}`}
                className="text-white text-xl font-semibold hover:text-red-400"
              >
                {rightColumn.emergency.phone}
              </a>
              <p className="text-white/40 text-xs mt-1">
                {rightColumn.emergency.subtitle}
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};