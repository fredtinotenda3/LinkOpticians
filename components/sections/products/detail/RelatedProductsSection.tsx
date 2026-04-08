// components/sections/products/detail/RelatedProductsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/products";

interface RelatedProductsSectionProps {
  subtitle: string;
  title: string;
  products: Product[];
}

export const RelatedProductsSection = ({
  subtitle,
  title,
  products,
}: RelatedProductsSectionProps) => {
  if (products.length === 0) return null;

  return (
    <section className="relative py-32 bg-[#000d1a] overflow-hidden border-t border-white/[0.03]">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-[2px] bg-sky-500" />
            <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-[2px] bg-sky-500" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
            {title}
          </h2>
        </div>

        {/* ── Product Grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[32px] bg-white/[0.02] border border-white/5 transition-all duration-700 hover:border-sky-500/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                {/* Image Container with Luxury Backdrop */}
                <div className="relative aspect-square overflow-hidden bg-[#001222]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-10 transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Content Area */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/30 text-xs mb-6 line-clamp-2 italic font-medium">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sky-500/60 group-hover:text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300">
                    Explore Product
                    <svg className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
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