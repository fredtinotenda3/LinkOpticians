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
    <section className="relative py-28 bg-dark-400 overflow-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{title}</h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">

                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/45 text-xs mb-4 line-clamp-2">{product.description}</p>
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
      </div>
    </section>
  );
};
