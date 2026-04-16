// components/sections/contact/ContactMethodsGrid.tsx

import Link from "next/link";
import { getWhatsAppUrl } from "@/constants/social";

interface ContactMethod {
  title: string;
  number?: string;
  hours?: string;
  description?: string;
  subtext?: string;
  status?: string;
  address?: string;
  responseTime?: string;
  locations?: string;
  locationNames?: string;
  icon: string;
}

interface ContactMethodsGridProps {
  phone: ContactMethod;
  whatsapp: ContactMethod;
  email: ContactMethod;
  visit: ContactMethod;
}

/* ── ICONS (FIXED — RESTORED) ── */

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

/* ── COMPONENT ── */

export const ContactMethodsGrid = ({
  phone,
  whatsapp,
  email,
  visit,
}: ContactMethodsGridProps) => {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* ── UNIQUE BACKGROUND (COMMUNICATION HUB STYLE) ── */}

      <div className="absolute inset-0 bg-[#020617]" />

      {/* Signal gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/5 to-transparent" />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:50px_50px]" />

      {/* Center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-400/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* PHONE */}
          <a
            href={`tel:${phone.number?.replace(/\D/g, "")}`}
            className="group flex flex-col p-7 rounded-[20px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-400/10 flex items-center justify-center mb-5">
              <PhoneIcon className="w-5 h-5 text-sky-400" />
            </div>

            <p className="text-sky-400 text-xs uppercase tracking-wider mb-2">
              {phone.title}
            </p>

            <p className="text-white font-semibold text-lg mb-1">
              {phone.number}
            </p>

            <p className="text-white/40 text-xs mt-auto">
              {phone.hours}
            </p>
          </a>

          {/* WHATSAPP */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-7 rounded-[20px] bg-gradient-to-br from-[#075E54]/80 to-[#020617] border border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>

            <p className="text-[#25D366] text-xs uppercase tracking-wider mb-2">
              {whatsapp.title}
            </p>

            <p className="text-white font-semibold text-lg">
              {whatsapp.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
              <span className="size-1.5 bg-[#25D366] rounded-full animate-pulse" />
              {whatsapp.status}
            </div>
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${email.address}`}
            className="group flex flex-col p-7 rounded-[20px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-400/10 flex items-center justify-center mb-5">
              <EmailIcon className="w-5 h-5 text-sky-400" />
            </div>

            <p className="text-sky-400 text-xs uppercase tracking-wider mb-2">
              {email.title}
            </p>

            <p className="text-white font-semibold text-sm break-all">
              {email.address}
            </p>

            <p className="text-white/40 text-xs mt-auto">
              {email.responseTime}
            </p>
          </a>

          {/* VISIT */}
          <Link
            href="/locations"
            className="group flex flex-col p-7 rounded-[20px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-sky-400/10 flex items-center justify-center mb-5">
              <LocationIcon className="w-5 h-5 text-sky-400" />
            </div>

            <p className="text-sky-400 text-xs uppercase tracking-wider mb-2">
              {visit.title}
            </p>

            <p className="text-white font-semibold text-lg">
              {visit.locations}
            </p>

            <p className="text-white/40 text-xs mt-auto">
              {visit.locationNames}
            </p>
          </Link>

        </div>
      </div>
    </section>
  );
};