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
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left — info cards ────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Header */}
            <div className="mb-2">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">{title}</h2>
            </div>

            {/* Main clinic card */}
            <div className="p-5 rounded-2xl bg-dark-300 border border-dark-500 space-y-4">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider">{mainClinic.name}</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm leading-snug">{mainClinic.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href={`tel:${mainClinic.phone.replace(/\D/g, "")}`} className="text-white text-sm font-medium hover:text-green-400 transition-colors duration-200">
                    {mainClinic.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${mainClinic.email}`} className="text-white text-sm font-medium hover:text-green-400 transition-colors duration-200">
                    {mainClinic.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="p-5 rounded-2xl bg-dark-300 border border-dark-500">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-4">Operating hours</p>
              <div className="space-y-2.5">
                {[
                  { label: "Monday – Friday", value: hours.weekdays.split(": ")[1] },
                  { label: "Saturday", value: hours.saturday.split(": ")[1] },
                  { label: "Sunday", value: hours.sunday.split(": ")[1] },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center">
                    <span className="text-white/45 text-xs">{row.label}</span>
                    <span className="text-white text-xs font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency card */}
            <div className="p-5 rounded-2xl bg-red-500/8 border border-red-500/25">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center text-red-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-red-500 border border-dark-400">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  </span>
                </div>
                <p className="text-white text-sm font-bold">{emergency.title}</p>
              </div>
              <p className="text-white/50 text-xs mb-3 leading-relaxed">{emergency.description}</p>
              <a href={`tel:${emergency.phone.replace(/\D/g, "")}`} className="text-red-400 text-lg font-bold hover:text-red-300 transition-colors duration-200">
                {emergency.phone}
              </a>
            </div>

            {/* Social links */}
            <div className="p-5 rounded-2xl bg-dark-300 border border-dark-500">
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-4">Follow us</p>
              <div className="flex gap-2">
                {[
                  { label: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" },
                  { label: "Instagram", path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" },
                  { label: "Twitter/X", path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.393-4.62 13.978 13.978 0 001.85-6.9c0-.213-.005-.426-.014-.637A9.936 9.936 0 0024 4.59z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-dark-400 border border-dark-500 hover:border-green-500/40 hover:bg-dark-500 flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-white/50 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right — form ──────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="relative bg-dark-300 border border-dark-500 rounded-3xl p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent rounded-full" />

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-1">Send us a message</h2>
                <p className="text-white/45 text-sm">We&apos;ll respond during business hours.</p>
              </div>

              {children}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
