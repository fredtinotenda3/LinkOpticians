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
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#000d1a] py-24 md:py-32">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px]" />

      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}
        <div className="mb-16 text-center">

          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-[2px] w-10 bg-sky-400" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400/80">
              {subtitle}
            </span>

            <span className="h-[2px] w-10 bg-sky-400" />
          </div>

          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {title}
          </h2>
        </div>

        {/* ========================================= */}
        {/* GRID */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] transition-all duration-500 hover:-translate-y-1 hover:border-sky-400/20">

                {/* ========================================= */}
                {/* IMAGE */}
                {/* ========================================= */}
                <div className="relative aspect-square overflow-hidden bg-[#001222]">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000d1a]/50 via-transparent to-transparent" />

                  {/* Brand badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/10 bg-[#000d1a]/70 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-white/70 backdrop-blur-md">
                      {product.brand}
                    </span>
                  </div>
                </div>

                {/* ========================================= */}
                {/* CONTENT */}
                {/* ========================================= */}
                <div className="space-y-4 p-7">

                  {/* Product Type */}
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-sky-400/80">
                    {product.type}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-sky-400">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 text-sm leading-relaxed text-white/65">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 transition-all duration-300 group-hover:text-white">

                    View Collection

                    <span className="h-px w-8 bg-sky-400 transition-all duration-300 group-hover:w-12" />
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