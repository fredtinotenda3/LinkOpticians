// app/(public)/locations/[branchId]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { BRANCHES_DATA } from "@/constants/branches";
import { BRANCH_DETAIL_CONFIG } from "@/constants/locations-page";

interface BranchPageProps {
  params: Promise<{ branchId: string }>;
}

export default async function BranchDetailPage({ params }: BranchPageProps) {
  const { branchId } = await params;
  const branch = BRANCHES_DATA.find((b) => b.id === branchId);
  if (!branch) notFound();

  const isMobileBase = branch.id === "chipinge";
  const aboutContent = BRANCH_DETAIL_CONFIG.aboutSection.descriptions[
    branch.id as keyof typeof BRANCH_DETAIL_CONFIG.aboutSection.descriptions
  ];

  // ── Service icon map — replaces emoji ──────────────────────────────
  const getServiceIcon = (service: string) => {
    if (service.includes("Eye") || service.includes("Vision"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />;
    if (service.includes("Contact"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />;
    if (service.includes("Frame") || service.includes("Glasses") || service.includes("Eyewear"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />;
    if (service.includes("Emergency"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />;
    if (service.includes("School") || service.includes("Pediatric"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />;
    if (service.includes("Corporate") || service.includes("Industrial") || service.includes("Community"))
      return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />;
    return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />;
  };

  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src={branch.image}
            alt={`${branch.name} clinic exterior`}
            fill className="object-cover" priority quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* Type badge — top right */}
        <div className="absolute top-8 right-8 z-10">
          <div className="inline-flex items-center gap-2 bg-dark-400/85 backdrop-blur-md px-4 py-2 rounded-full border border-dark-500">
            <span className={`size-2 rounded-full ${branch.type === "clinic" ? "bg-green-500 animate-pulse" : "bg-blue-400"}`} />
            <span className="text-white text-xs font-semibold">
              {branch.type === "clinic" ? "Full Service Clinic" : "Mobile Unit"}
            </span>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%] py-24 w-full">
          <div className="max-w-2xl space-y-7">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href="/locations" className="hover:text-white/70 transition-colors duration-200">Locations</Link>
              <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-white/70">{branch.name}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium tracking-wide text-white/90">
                {branch.type === "clinic" ? "Full Service Clinic" : "Mobile Unit"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight">
              {branch.name}
            </h1>

            <p className="text-lg text-white/65 max-w-lg leading-relaxed">{branch.address}</p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/book?branch=${branch.id}`}
                className="group inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-base px-8 py-4 rounded-full shadow-[0_0_30px_rgba(36,174,124,0.35)] hover:shadow-[0_0_45px_rgba(36,174,124,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                Book appointment
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={branch.mapUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white/90 font-semibold text-base px-8 py-4 rounded-full bg-white/8 hover:bg-white/15 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Get directions
              </a>
            </div>

            {/* Quick contact strip */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href={`tel:${branch.phone.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full hover:text-white transition-colors duration-200">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {branch.phone}
              </a>
              <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/12 text-white/75 text-xs font-medium px-3.5 py-2 rounded-full">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {branch.operatingHours.weekdays}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/30 text-[10px] tracking-[0.2em] uppercase">
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-scroll-line" />
        </div>
      </section>

      {/* ── QUICK INFO CARDS ─────────────────────────────────────────── */}
      <section className="py-12 bg-dark-400 border-y border-dark-500">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Weekdays", value: branch.operatingHours.weekdays, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
              { label: "Saturday", value: branch.operatingHours.saturday, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> },
              { label: "Parking", value: branch.parking, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /> },
              { label: "Emergency", value: branch.operatingHours.publicHolidays, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-dark-300 border border-dark-500">
                <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                  <p className="text-white text-xs font-medium leading-snug">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS LOCATION ──────────────────────────────────────── */}
      <section className="relative py-28 bg-dark-300 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                  {BRANCH_DETAIL_CONFIG.aboutSection.subtitle}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {aboutContent?.title}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">{aboutContent?.text}</p>

              <div className="grid grid-cols-2 gap-3">
                {branch.specialties.slice(0, 4).map((specialty, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-400 border border-dark-500">
                    <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white/70 text-xs">{specialty}</span>
                  </div>
                ))}
              </div>

              {isMobileBase && (
                <div className="p-5 rounded-2xl bg-dark-400 border border-green-500/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-bold mb-1">Mobile Unit Base</h3>
                      <p className="text-white/50 text-xs leading-relaxed">
                        This clinic serves as the home base for our mobile unit serving rural communities.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-dark-500 aspect-[4/3]">
                <Image src={branch.image} alt={`${branch.name} clinic`} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-300/40 via-transparent to-transparent" />
              </div>
              <a
                href={branch.mapUrl} target="_blank" rel="noopener noreferrer"
                className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-dark-400/90 backdrop-blur-md hover:bg-green-500 text-white text-xs font-semibold px-4 py-2.5 rounded-full border border-dark-500 hover:border-green-500 transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Open in Maps
              </a>
              <div className="absolute -top-4 -left-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-dark-400 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                  {BRANCH_DETAIL_CONFIG.servicesSection.subtitle}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {BRANCH_DETAIL_CONFIG.servicesSection.title} {branch.name.split(" ")[0]}
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                {BRANCH_DETAIL_CONFIG.servicesSection.description}
              </p>
            </div>
            <div className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-dark-300 border border-dark-500 rounded-full">
              <span className="size-2 rounded-full bg-green-500" />
              <span className="text-white/60 text-xs font-medium">{branch.services.length} services</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {branch.services.map((service, i) => (
              <div
                key={i}
                className="group p-5 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(36,174,124,0.08)] text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center text-green-400 transition-colors duration-300">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {getServiceIcon(service)}
                  </svg>
                </div>
                <h3 className="text-white text-xs font-semibold leading-snug group-hover:text-green-400 transition-colors duration-300">
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTORS ──────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-dark-300 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                  {BRANCH_DETAIL_CONFIG.teamSection.subtitle}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {BRANCH_DETAIL_CONFIG.teamSection.title}
                <br />this location
              </h2>
            </div>
            <Link
              href="/about"
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
            >
              {BRANCH_DETAIL_CONFIG.teamSection.description}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {branch.doctors.map((doctor, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(36,174,124,0.10)]">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={`/assets/images/doctor-${doctor.toLowerCase().replace(/\s/g, "-")}.jpg`}
                    alt={doctor}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/90 via-dark-400/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-bold text-white leading-tight group-hover:text-green-400 transition-colors duration-300">
                    {doctor.startsWith("Dr.") ? doctor : `Dr. ${doctor}`}
                  </h3>
                  <p className="text-green-400 text-xs mt-0.5">Optometrist</p>
                  <p className="text-white/40 text-[10px] mt-0.5">
                    {branch.id === "robinson-house" && i === 0 ? "Lead Optometrist" : "Registered practitioner"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES & ACCESSIBILITY ───────────────────────────────── */}
      <section className="relative py-28 bg-dark-400 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Facilities */}
            <div className="space-y-6 p-8 rounded-3xl bg-dark-300 border border-dark-500">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">Facilities</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {BRANCH_DETAIL_CONFIG.facilitiesSection.title}
                <br />
                <span className="text-green-400">{BRANCH_DETAIL_CONFIG.facilitiesSection.titleHighlight}</span>
              </h2>
              <div className="space-y-2">
                {branch.facilities.map((facility, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-colors duration-200">
                    <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accessibility */}
            <div className="space-y-6 p-8 rounded-3xl bg-dark-300 border border-dark-500">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">Accessibility</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {BRANCH_DETAIL_CONFIG.facilitiesSection.accessibilityTitle}
                <br />
                <span className="text-green-400">{BRANCH_DETAIL_CONFIG.facilitiesSection.accessibilityHighlight}</span>
              </h2>
              <div className="space-y-2">
                {branch.accessibility.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-400 border border-dark-500 hover:border-green-500/30 transition-colors duration-200">
                    <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-400 border border-dark-500">
                  <div className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">Parking</p>
                    <p className="text-white/45 text-[11px]">{branch.parking}</p>
                  </div>
                </div>
              </div>
              {branch.notes && (
                <div className="p-4 rounded-xl bg-dark-400 border border-dark-500/50">
                  <p className="text-white/45 text-xs leading-relaxed italic">"{branch.notes}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEARBY LOCATIONS ─────────────────────────────────────────── */}
      <section className="relative py-28 bg-dark-300 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2">
                <span className="w-6 h-px bg-green-500" />
                <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                  {BRANCH_DETAIL_CONFIG.nearbySection.subtitle}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                {BRANCH_DETAIL_CONFIG.nearbySection.title}
              </h2>
              <p className="text-white/50 text-base leading-relaxed">
                {BRANCH_DETAIL_CONFIG.nearbySection.description}
              </p>
            </div>
            <Link
              href="/locations"
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
            >
              All locations
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BRANCHES_DATA.filter((b) => b.id !== branch.id).slice(0, 3).map((other) => (
              <Link key={other.id} href={`/locations/${other.id}`} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={other.image} alt={other.name} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-400/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
                      {other.name}
                    </h3>
                    <p className="text-white/40 text-xs mb-3 line-clamp-1">{other.address}</p>
                    <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                      View details
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOK CTA ─────────────────────────────────────────────────── */}
      <section className="relative pb-24 pt-4 bg-dark-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[400px] rounded-full bg-green-500/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-[5%]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-600 shadow-[0_30px_80px_rgba(36,174,124,0.35)]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5" />
              <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="branch-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#branch-dots)" />
              </svg>
            </div>
            <div className="relative z-10 px-8 md:px-16 py-16 text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-5 h-px bg-white/50" />
                <span className="text-white/70 text-xs font-semibold tracking-[0.25em] uppercase">Book at this clinic</span>
                <span className="w-5 h-px bg-white/50" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                {BRANCH_DETAIL_CONFIG.cta.title}
              </h2>
              <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                {BRANCH_DETAIL_CONFIG.cta.description} {branch.name} today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href={`/book?branch=${branch.id}`}
                  className="group inline-flex items-center justify-center gap-2.5 bg-white text-green-600 font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                  {BRANCH_DETAIL_CONFIG.cta.buttonText}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={`tel:${branch.phone.replace(/\D/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 hover:border-white/70 text-white font-semibold text-base px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call clinic
                </a>
              </div>
              <div className="pt-8 border-t border-white/20">
                <div className="inline-flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex items-center justify-center size-9 rounded-full bg-white/15 shrink-0">
                    <span className="absolute inline-flex size-full rounded-full bg-white/20 animate-ping" />
                    <svg className="w-4 h-4 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                      {BRANCH_DETAIL_CONFIG.cta.emergencyText}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 justify-center sm:justify-start">
                      <a href={`tel:${BRANCH_DETAIL_CONFIG.cta.emergencyPhone.replace(/\D/g, "")}`} className="text-white font-bold text-xl hover:text-white/90 transition-colors">
                        {BRANCH_DETAIL_CONFIG.cta.emergencyPhone}
                      </a>
                      <span className="text-white/50 text-xs">{BRANCH_DETAIL_CONFIG.cta.emergencyNote}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
