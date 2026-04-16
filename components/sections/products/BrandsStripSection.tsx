// components/sections/products/BrandsStripSection.tsx
interface BrandsStripSectionProps {
  brands: string[];
}

export const BrandsStripSection = ({ brands }: BrandsStripSectionProps) => {
  const track = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-16 bg-[#020617] border-y border-white/[0.05] overflow-hidden">

      {/* ── Multi-layer Gradient Background ───────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]" />

      {/* Blue + Purple ambient blobs */}
      <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-sky-400/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 right-1/3 w-[500px] h-[500px] bg-violet-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle dot texture (premium feel) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Radial glow blend */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_70%)] pointer-events-none" />

      {/* Accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent" />

      <div className="relative flex flex-col items-center gap-8">

        {/* Eyebrow */}
        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-sky-400/70">
          Authorized Retailer
        </p>

        <div className="relative w-full">

          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-40 bg-gradient-to-l from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee */}
          <div className="marquee-track flex w-max items-center gap-16 md:gap-24 px-8 md:px-12">
            {track.map((brand, i) => (
              <span key={i} className="group relative flex items-center gap-4">

                {/* Brand Name */}
                <span className="text-white/40 group-hover:text-white text-xl md:text-2xl font-semibold tracking-tight transition-all duration-500 ease-out select-none uppercase italic">
                  {brand}
                </span>

                {/* Dot */}
                <span className="size-1.5 rounded-full bg-sky-400/40 group-hover:bg-violet-400 transition-all duration-300" />

                {/* Hover glow (dual tone) */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-sky-400/10 to-violet-400/10 transition duration-500 pointer-events-none" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom glow blend */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[60%] h-[120px] bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-transparent blur-3xl pointer-events-none" />
    </section>
  );
};