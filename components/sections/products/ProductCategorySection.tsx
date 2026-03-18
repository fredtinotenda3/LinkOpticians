// components/sections/products/ProductCategorySection.tsx
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
    color: string;
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
    <section id={id} className="relative py-28 bg-dark-300 overflow-hidden">

      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>
          </div>

          {viewAllText && viewAllLink && (
            <Link
              href={viewAllLink}
              className="group hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300 shrink-0"
            >
              {viewAllText}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── Product grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-dark-400 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">

                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-400/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-wider">
                        {badge.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-green-400/70 group-hover:text-green-400 text-xs font-semibold transition-colors duration-300">
                    View details
                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all — mobile */}
        {viewAllText && viewAllLink && (
          <div className="mt-10 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-dark-500 text-white/60 hover:text-white hover:border-green-500/50 text-sm font-medium transition-all duration-300"
            >
              {viewAllText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
