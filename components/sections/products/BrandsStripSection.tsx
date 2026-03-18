// components/sections/products/BrandsStripSection.tsx
interface BrandsStripSectionProps {
  brands: string[];
}

export const BrandsStripSection = ({ brands }: BrandsStripSectionProps) => {
  // Double for seamless marquee using existing .marquee-track from global.css
  const track = [...brands, ...brands];

  return (
    <section className="relative py-10 bg-dark-400 border-y border-dark-500 overflow-hidden">

      {/* Top + bottom accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-400 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-400 to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex w-max items-center gap-16 px-8">
          {track.map((brand, i) => (
            <span
              key={i}
              className="text-white/25 hover:text-white/60 text-xl font-light tracking-widest whitespace-nowrap transition-colors duration-300 select-none"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
