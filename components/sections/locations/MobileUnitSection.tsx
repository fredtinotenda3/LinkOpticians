// components/sections/locations/MobileUnitSection.tsx
import Image from "next/image";
import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  text: string;
  icon: string;
}

interface ButtonItem {
  text: string;
  href: string;
  primary: boolean;
}

interface Stop {
  name: string;
  icon: string;
  frequency: string;
}

interface MobileUnitSectionProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  stats: Stat[];
  features: Feature[];
  buttons: ButtonItem[];
  schedulePreview: {
    stops: Stop[];
    nextOutreach: {
      date: string;
      location: string;
      time: string;
    };
    contact: string;
  };
}

export const MobileUnitSection = ({
  badge,
  title,
  titleHighlight,
  description,
  stats,
  features,
  buttons,
  schedulePreview,
}: MobileUnitSectionProps) => {
  return (
    <>
      {/* ── Mobile Unit Hero ─────────────────────────────────────────── */}
      <section id="mobile-unit" className="relative min-h-[85vh] w-full overflow-hidden flex items-center bg-[#000d1a]">

        <div className="absolute inset-0">
          <Image
            src="/assets/images/mobile-unit-hero.jpg"
            alt="Link Opticians mobile eye care unit serving rural community"
            fill
            priority
            className="object-cover opacity-60 scale-105"
          />
          {/* Cinematic Deep Ocean Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a] via-[#000d1a]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%] py-32 w-full">
          <div className="max-w-3xl space-y-10">

            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 bg-white/[0.03] backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-sky-500" />
              </span>
              <span className="text-[10px] font-black text-sky-400 tracking-[0.3em] uppercase">{badge}</span>
            </div>

            {/* Hero Headline */}
            <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter italic uppercase">
              {title}
              <br />
              <span className="text-sky-500">{titleHighlight}</span>
            </h2>

            {/* Performance Description */}
            <p className="text-xl text-white/40 max-w-xl italic font-medium leading-relaxed">
              {description}
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              {stats.map((stat, index) => (
                <div key={index} className="p-6 rounded-[24px] bg-white/[0.02] border border-white/5 backdrop-blur-md group hover:border-sky-500/30 transition-all duration-500">
                  <p className="text-3xl font-black text-white mb-1 tracking-tighter italic">{stat.value}</p>
                  <p className="text-white/20 text-[9px] font-black uppercase tracking-widest leading-tight group-hover:text-sky-500/50 transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {buttons.map((button, index) => (
                button.primary ? (
                  <Link
                    key={index}
                    href={button.href}
                    className="group inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl shadow-[0_20px_40px_rgba(14,165,233,0.25)] transition-all duration-500 hover:-translate-y-1"
                  >
                    {button.text}
                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={button.href}
                    className="inline-flex items-center justify-center gap-3 border border-white/10 text-white/60 font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] hover:text-white backdrop-blur-sm transition-all duration-500"
                  >
                    {button.text}
                  </Link>
                )
              ))}
            </div>

            {/* Tech Specs / Features */}
            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/5 text-white/30 text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl italic"
                >
                  <div className="size-1 rounded-full bg-sky-500" />
                  {feature.text}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Schedule Grid ─────────────────────────────────────────── */}
      <section className="relative py-32 bg-[#000d1a] border-t border-white/5 overflow-hidden">

        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          <div className="w-[800px] h-[400px] rounded-full bg-sky-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Route Logistics */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">Coverage</span>
                </div>
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Strategic Route</h3>
              </div>

              <div className="grid gap-4">
                {schedulePreview.stops.map((stop) => (
                  <div
                    key={stop.name}
                    className="group flex items-center gap-5 p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-lg font-black italic uppercase tracking-tight leading-none">{stop.name}</p>
                      <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-2">{stop.frequency}</p>
                    </div>
                    <div className="text-white/10 group-hover:text-sky-500/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outreach Intel + Dispatch */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">Deployment</span>
                </div>
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Next Deployment</h3>
              </div>

              {/* Countdown Card */}
              <div className="rounded-[40px] bg-white/[0.02] border border-white/5 p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 text-sky-500/5 group-hover:text-sky-500/10 transition-colors">
                   <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                   </svg>
                </div>

                <div className="relative space-y-8">
                  <div className="space-y-2">
                    <p className="text-sky-500 text-[10px] font-black uppercase tracking-[0.3em]">Confirmed Schedule</p>
                    <p className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                      {schedulePreview.nextOutreach.date}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-6 py-8 border-y border-white/5">
                    <div>
                      <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Target Location</p>
                      <p className="text-white font-black italic uppercase text-lg">{schedulePreview.nextOutreach.location}</p>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div>
                      <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-1">Clinic Hours</p>
                      <p className="text-white font-black italic uppercase text-lg">{schedulePreview.nextOutreach.time}</p>
                    </div>
                  </div>

                  <Link
                    href="/community"
                    className="inline-flex items-center gap-3 text-sky-500 hover:text-sky-400 font-black text-[11px] uppercase tracking-[0.2em] transition-all"
                  >
                    Full Deployment Log
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Dispatch Contact */}
              <div className="rounded-[24px] bg-sky-500 p-8 flex items-center justify-between group cursor-pointer shadow-[0_20px_40px_rgba(14,165,233,0.15)]">
                <div className="flex items-center gap-6">
                  <div className="size-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1">Mobile Dispatch (WhatsApp)</p>
                    <a
                      href={`https://wa.me/${schedulePreview.contact.replace(/\D/g, "")}`}
                      className="text-white font-black text-2xl tracking-tighter"
                    >
                      {schedulePreview.contact}
                    </a>
                  </div>
                </div>
                <div className="size-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-sky-500 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};