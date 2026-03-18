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

export const ContactMethodsGrid = ({
  phone,
  whatsapp,
  email,
  visit,
}: ContactMethodsGridProps) => {
  return (
    <section className="relative py-20 bg-dark-300 overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] rounded-full bg-green-500/4 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Phone */}
          <a
            href={`tel:${phone.number?.replace(/\D/g, "")}`}
            className="group flex flex-col p-6 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
          >
            <div className="w-11 h-11 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center mb-5 transition-colors duration-300">
              <PhoneIcon className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors duration-300">
              {phone.title}
            </h3>
            <p className="text-green-400 font-semibold text-base mb-1">{phone.number}</p>
            <p className="text-white/40 text-xs mt-auto">{phone.hours}</p>
          </a>

          {/* WhatsApp — featured card */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-2xl bg-[#075E54] hover:bg-[#128C7E] border border-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(37,211,102,0.2)] relative overflow-hidden"
          >
            {/* Dot grid texture */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wa-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wa-dots)" />
            </svg>

            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.123 1.524 5.861L.049 23.6c-.114.445.297.856.742.742l5.739-1.475A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.868 0-3.613-.525-5.12-1.428l-.37-.223-3.498.9.9-3.498-.223-.37A9.953 9.953 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{whatsapp.title}</h3>
              <p className="text-white/80 text-sm mb-1">{whatsapp.description}</p>
              <p className="text-white/50 text-xs mb-4">{whatsapp.subtext}</p>
              <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full text-white text-xs font-medium">
                <span className="size-1.5 bg-[#25D366] rounded-full animate-pulse" />
                {whatsapp.status}
              </div>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email.address}`}
            className="group flex flex-col p-6 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
          >
            <div className="w-11 h-11 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center mb-5 transition-colors duration-300">
              <EmailIcon className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors duration-300">
              {email.title}
            </h3>
            <p className="text-green-400 text-sm font-medium mb-1 break-all">{email.address}</p>
            <p className="text-white/40 text-xs mt-auto">{email.responseTime}</p>
          </a>

          {/* Visit */}
          <Link
            href="/locations"
            className="group flex flex-col p-6 rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(36,174,124,0.08)]"
          >
            <div className="w-11 h-11 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center mb-5 transition-colors duration-300">
              <LocationIcon className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors duration-300">
              {visit.title}
            </h3>
            <p className="text-green-400 text-sm font-semibold mb-1">{visit.locations}</p>
            <p className="text-white/40 text-xs mt-auto">{visit.locationNames}</p>
          </Link>

        </div>
      </div>
    </section>
  );
};
