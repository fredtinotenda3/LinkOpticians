// components/sections/contact/ContactInfoSection.tsx

import { ReactNode } from "react";

interface MainClinic {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface Hours {
  weekdays: string;
  saturday: string;
  sunday: string;
}

interface Emergency {
  title: string;
  description: string;
  phone: string;
}

interface ContactInfoSectionProps {
  subtitle: string;
  title: string;
  mainClinic: MainClinic;
  hours: Hours;
  emergency: Emergency;
  children: ReactNode;
}

export const ContactInfoSection = ({
  subtitle,
  title,
  mainClinic,
  hours,
  emergency,
  children,
}: ContactInfoSectionProps) => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (CONTROL PANEL STYLE) ── */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* Structured grid */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Soft highlight */}
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-sky-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT PANEL ── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-[1px] bg-sky-400" />
                <span className="text-sky-400 text-xs font-semibold uppercase tracking-[0.25em]">
                  {subtitle}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
                {title}
              </h2>
            </div>

            {/* Main Clinic */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">

              <p className="text-white text-sm font-semibold">
                {mainClinic.name}
              </p>

              <p className="text-white/60 text-sm">
                {mainClinic.address}
              </p>

              <a
                href={`tel:${mainClinic.phone.replace(/\D/g, "")}`}
                className="text-white text-sm hover:text-sky-400 transition"
              >
                {mainClinic.phone}
              </a>

              <a
                href={`mailto:${mainClinic.email}`}
                className="text-white text-sm hover:text-sky-400 transition"
              >
                {mainClinic.email}
              </a>
            </div>

            {/* Hours */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-sm">

              <div className="flex justify-between text-white/60">
                <span>Mon – Fri</span>
                <span>{hours.weekdays.split(": ")[1]}</span>
              </div>

              <div className="flex justify-between text-white/60">
                <span>Saturday</span>
                <span>{hours.saturday.split(": ")[1]}</span>
              </div>

              <div className="flex justify-between text-white/60">
                <span>Sunday</span>
                <span>{hours.sunday.split(": ")[1]}</span>
              </div>
            </div>

            {/* Emergency (clean + focused) */}
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">

              <p className="text-red-400 text-xs uppercase tracking-wider mb-2">
                {emergency.title}
              </p>

              <a
                href={`tel:${emergency.phone.replace(/\D/g, "")}`}
                className="text-white text-lg font-semibold hover:text-red-400 transition"
              >
                {emergency.phone}
              </a>

            </div>

          </div>

          {/* ── RIGHT PANEL (FORM) ── */}
          <div className="lg:col-span-2">

            <div className="relative bg-white/[0.03] border border-white/10 rounded-[28px] p-8 md:p-12">

              {/* subtle top line */}
              <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-white">
                  Send a message
                </h2>
              </div>

              {children}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};