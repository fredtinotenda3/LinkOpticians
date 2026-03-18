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
      <section id="mobile-unit" className="relative min-h-[75vh] w-full overflow-hidden flex items-center">

        <div className="absolute inset-0">
          <Image
            src="/assets/images/mobile-unit-hero.jpg"
            alt="Link Opticians mobile eye care unit serving rural community"
            fill
            className="object-cover"
          />
          {/* Lighter gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-400/60 via-transparent to-transparent" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
          <div className="max-w-2xl space-y-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-green-500/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-green-500/30">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-green-400 tracking-wide">{badge}</span>
            </div>

            {/* Headline */}
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-[0.95] tracking-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/65 max-w-lg leading-relaxed">
              {description}
            </p>

            {/* Stats — contained cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="p-4 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12">
                  <p className="text-2xl font-bold text-white leading-none mb-1">{stat.value}</p>
                  <p className="text-white/45 text-xs leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {buttons.map((button, index) => (
                button.primary ? (
                  <Link
                    key={index}
                    href={button.href}
                    className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(36,174,124,0.35)] hover:shadow-[0_0_45px_rgba(36,174,124,0.5)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    {button.text}
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    key={index}
                    href={button.href}
                    className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/90 font-semibold text-base px-8 py-4 rounded-full bg-white/8 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
                  >
                    {button.text}
                  </Link>
                )
              ))}
            </div>

            {/* Features — pill treatment */}
            <div className="flex flex-wrap gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature.text}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Schedule Preview ─────────────────────────────────────────── */}
      <section className="relative py-24 bg-dark-400 overflow-hidden">

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] rounded-full bg-green-500/4 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Regular stops */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">Coverage areas</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Regular stops</h3>
              <div className="space-y-3">
                {schedulePreview.stops.map((stop) => (
                  <div
                    key={stop.name}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/30 transition-colors duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold">{stop.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{stop.frequency}</p>
                    </div>
                    <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming outreach + contact */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">Schedule</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Upcoming outreach</h3>

              {/* Next outreach card */}
              <div className="rounded-2xl bg-dark-300 border border-dark-500 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-1">Next mobile clinic</p>
                    <p className="text-2xl font-bold text-green-400 leading-none mb-1">
                      {schedulePreview.nextOutreach.date}
                    </p>
                    <p className="text-white/50 text-xs">
                      {schedulePreview.nextOutreach.location} · {schedulePreview.nextOutreach.time}
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <Link
                    href="/community"
                    className="group inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-semibold transition-colors duration-200"
                  >
                    View full schedule
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Contact card */}
              <div className="rounded-2xl bg-dark-300 border border-dark-500 p-5">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-green-500 border border-dark-300">
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    </span>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Mobile unit contact</p>
                    <a
                      href={`tel:${schedulePreview.contact.replace(/\D/g, "")}`}
                      className="text-white font-bold text-lg hover:text-green-400 transition-colors duration-200"
                    >
                      {schedulePreview.contact}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};
