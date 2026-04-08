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
    <section className="relative py-28 bg-[#000B18] overflow-hidden">

      {/* Brand accent glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left — info cards ────────────────────────────────────── */}
          <div className="lg:col-span-1 space-y-6">

            {/* Header */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-blue-500" />
                <span className="text-blue-500 text-[10px] font-black tracking-[0.4em] uppercase">{subtitle}</span>
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tighter leading-tight">{title}</h2>
            </div>

            {/* Main clinic card */}
            <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-5 shadow-2xl">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">{mainClinic.name}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 mt-0.5 border border-blue-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{mainClinic.address}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <a href={`tel:${mainClinic.phone.replace(/\D/g, "")}`} className="text-white text-sm font-bold hover:text-blue-400 transition-colors">
                    {mainClinic.phone}
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0 border border-blue-500/10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <a href={`mailto:${mainClinic.email}`} className="text-white text-sm font-bold hover:text-blue-400 transition-colors">
                    {mainClinic.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] mb-5">Operating hours</p>
              <div className="space-y-3.5">
                {[
                  { label: "Monday – Friday", value: hours.weekdays.split(": ")[1] },
                  { label: "Saturday", value: hours.saturday.split(": ")[1] },
                  { label: "Sunday", value: hours.sunday.split(": ")[1] },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center border-b border-white/[0.03] pb-2 last:border-0 last:pb-0">
                    <span className="text-white/40 text-[11px] font-bold uppercase tracking-wider">{row.label}</span>
                    <span className="text-white text-xs font-black">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency card */}
            <div className="p-6 rounded-[2rem] bg-red-500/5 border border-red-500/20 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 size-3 rounded-full bg-red-500 border-2 border-[#000B18]">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                  </span>
                </div>
                <p className="text-white text-sm font-black uppercase tracking-widest">{emergency.title}</p>
              </div>
              <p className="text-white/50 text-xs mb-4 leading-relaxed">{emergency.description}</p>
              <a href={`tel:${emergency.phone.replace(/\D/g, "")}`} className="text-red-500 text-xl font-black hover:text-red-400 transition-colors">
                {emergency.phone}
              </a>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">Follow</p>
              <div className="flex gap-3">
                {[
                  { label: "Facebook", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" },
                  { label: "Instagram", path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.46 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-white/40 hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right — form ──────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              {/* Top accent */}
              <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full" />

              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Send a message</h2>
                <p className="text-white/40 text-sm font-light">Expect a response from our Harare team within business hours.</p>
              </div>

              {children}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};