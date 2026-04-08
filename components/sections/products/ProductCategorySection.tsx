import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/products";

interface ProductCategorySectionProps {
  id: string;
  subtitle: string;
  title: string;
  titleHighlight: string;
  viewAllText?: string;
  viewAllLink?: string;
  products: Product[];
  badge?: {
    text: string;
    color?: string; // FIXED: Added color property
  };
}

export const ProductCategorySection = ({
  id,
  subtitle,
  title,
  titleHighlight,
  viewAllText,
  viewAllLink,
  products,
  badge,
}: ProductCategorySectionProps) => {
  return (
    <section id={id} className="relative py-28 bg-[#000d1a] overflow-hidden border-b border-white/[0.03]">
      
      {/* Deep Ocean Glow Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-4">
              <span className="w-8 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.3em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter italic">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>
          </div>

          {viewAllText && viewAllLink && (
            <Link
              href={viewAllLink}
              className="group hidden md:inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-sky-500/50 text-[10px] font-black uppercase tracking-widest transition-all duration-500 shrink-0"
            >
              {viewAllText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── Product grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[48px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-700 hover:-translate-y-2">

                {/* Massive Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#001222]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* High-end Glass Badge */}
                  {badge && (
                    <div className="absolute top-8 right-8">
                      <span className={`px-6 py-2.5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white uppercase tracking-widest ${badge.color || 'bg-sky-500/20'}`}>
                        {badge.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className="p-12">
                  <p className="text-sky-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-70">
                    {product.brand} • {product.type}
                  </p>
                  <h3 className="text-3xl font-black text-white mb-4 italic group-hover:text-sky-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed max-w-md mb-8 italic">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-white/40 group-hover:text-white text-[11px] font-black uppercase tracking-widest transition-all duration-500">
                    Discover Details
                    <span className="w-12 h-px bg-sky-500 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};