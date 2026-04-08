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

  const aboutContent = BRANCH_DETAIL_CONFIG.aboutSection.descriptions[
    branch.id as keyof typeof BRANCH_DETAIL_CONFIG.aboutSection.descriptions
  ];


  return (
    <div className="min-h-screen bg-[#000d1a]">
      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <Image
            src={branch.image}
            alt={branch.name}
            fill className="object-cover scale-105" priority quality={100}
          />
          {/* Deep Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#000d1a]/95 via-[#000d1a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-[5%] pt-20 w-full">
          <div className="max-w-3xl space-y-8">
            {/* Industrial Eyebrow */}
            <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-sky-400/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="size-1 rounded-full bg-sky-500/30" />
              <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
              <span className="size-1 rounded-full bg-sky-500/30" />
              <span className="text-white/40">{branch.name}</span>
            </nav>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
              {branch.name}
            </h1>

            <p className="text-xl text-white/70 max-w-lg font-medium leading-relaxed italic">
              {branch.address}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={`/book?branch=${branch.id}`}
                className="group inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl shadow-[0_20px_50px_rgba(14,165,233,0.3)] transition-all duration-500 hover:scale-105"
              >
                Book Appointment
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={`https://wa.me/${branch.phone.replace(/\D/g, "")}`}
                className="inline-flex items-center justify-center gap-3 border border-white/20 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Status Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <div className="flex items-center gap-2.5 bg-sky-500/10 border border-sky-500/20 px-4 py-2 rounded-full">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-sky-500" />
                </span>
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">
                  {branch.type === "clinic" ? "Full-Service Facility" : "Mobile Command Center"}
                </span>
              </div>
              <div className="text-white/40 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Open Today: {branch.operatingHours.weekdays}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ──────────────────────────────────────────────── */}
      <section className="py-12 bg-[#001226] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Phone", value: branch.phone, icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
              { label: "Saturdays", value: branch.operatingHours.saturday, icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { label: "Parking", value: branch.parking, icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
              { label: "Emergency", value: "WhatsApp Available", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((item, i) => (
              <div key={i} className="group">
                <p className="text-sky-500/50 text-[9px] font-black uppercase tracking-[0.3em] mb-2">{item.label}</p>
                <div className="flex items-center gap-3">
                   <svg className="w-4 h-4 text-white/20 group-hover:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                   </svg>
                   <p className="text-white font-bold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THE BRANCH ────────────────────────────────────────── */}
      <section className="relative py-32 bg-[#000d1a]">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-4">
                  <span className="w-10 h-[2px] bg-sky-500" />
                  <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">The Location</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase italic">
                  {aboutContent?.title}
                </h2>
                <p className="text-white/60 text-lg font-medium leading-relaxed italic">{aboutContent?.text}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branch.specialties.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-all">
                    <div className="size-2 rounded-full bg-sky-500" />
                    <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <Image src={branch.image} alt={branch.name} fill className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-10 -left-10 size-40 border-l-2 border-b-2 border-sky-500/30 rounded-bl-[40px] pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ────────────────────────────────────────────── */}
      <section className="py-32 bg-[#001226] overflow-hidden">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="space-y-4">
               <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">Expertise</span>
               <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter uppercase italic">
                Our Specialist<br/><span className="text-sky-500">Optometrists</span>
               </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branch.doctors.map((doctor, i) => (
              <div key={i} className="group relative aspect-[3/4] rounded-[32px] overflow-hidden border border-white/5">
                <Image 
                  src={`/assets/images/doctor-${doctor.toLowerCase().replace(/\s/g, "-")}.jpg`}
                  alt={doctor} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a] via-[#000d1a]/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-1">Optometrist</p>
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{doctor}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}