// components/sections/products/BrandsStripSection.tsx
interface BrandsStripSectionProps {
  brands: string[];
}

export const BrandsStripSection = ({ brands }: BrandsStripSectionProps) => {
  // Double for seamless marquee effect
  const track = [...brands, ...brands, ...brands];

  return (
    <section className="relative py-14 bg-[#000d1a] border-y border-white/[0.03] overflow-hidden">

      {/* Top + bottom clinical accent lines in Sky Blue */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Eyebrow Label */}
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-sky-500/50 mb-2">
          Authorized Retailer
        </p>

        <div className="relative w-full">
          {/* High-end edge masks for seamless fading */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#000d1a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#000d1a] to-transparent z-10 pointer-events-none" />

          {/* Using your existing .marquee-track logic from global.css */}
          <div className="marquee-track flex w-max items-center gap-20 px-10">
            {track.map((brand, i) => (
              <span
                key={i}
                className="group relative flex items-center gap-4"
              >
                <span className="text-white/20 group-hover:text-white/80 text-2xl md:text-3xl font-black tracking-tighter transition-all duration-500 select-none uppercase italic">
                  {brand}
                </span>
                {/* Separator Dot */}
                <span className="size-1 rounded-full bg-sky-500/30 group-hover:bg-sky-500 transition-colors" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-500/[0.02] blur-3xl pointer-events-none" />
    </section>
  );
};