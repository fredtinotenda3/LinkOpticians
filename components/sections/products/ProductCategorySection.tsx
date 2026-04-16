// components/sections/products/ProductCategorySection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
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
    color?: string;
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
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (productId: string) => {
    setLoadedImages((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-b border-white/[0.05]"
    >
      {/* ── BACKGROUND SYSTEM (BLUE + PURPLE + TEXTURE) ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]" />

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* subtle dot texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ── HEADER ── */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-5 max-w-xl">
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.15] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>
          </div>

          {viewAllText && viewAllLink && (
            <Link
              href={viewAllLink}
              className="group hidden md:inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-sky-400/60 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              {viewAllText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* ── PRODUCT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group block transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative overflow-hidden rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-500 hover:-translate-y-1.5">

                {/* IMAGE */}
                <div className="relative aspect-[16/11] overflow-hidden bg-[#001a33]">
                  {!loadedImages[product.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#001a33] to-[#020617] animate-pulse" />
                  )}

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-contain p-8 md:p-10 transition-all duration-700 group-hover:scale-105 ${
                      loadedImages[product.id] ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(product.id)}
                    quality={100}
                    priority={index === 0}
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent" />

                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-5 right-5 z-10">
                      <span
                        className={`px-4 py-2 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-semibold text-white uppercase tracking-wider ${
                          badge.color || "bg-sky-400/20"
                        }`}
                      >
                        {badge.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-9">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sky-400/70 text-xs font-semibold uppercase tracking-[0.2em]">
                      {product.brand}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/40 text-xs uppercase">
                      {product.type}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-sky-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3 text-white/50 group-hover:text-white text-xs font-semibold uppercase tracking-wider transition">
                    View Product
                    <span className="w-8 h-px bg-sky-400 group-hover:w-12 transition-all duration-300" />
                  </div>
                </div>

                {/* subtle glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-sky-400/5 to-violet-400/5 blur-2xl transition duration-500 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        {viewAllText && viewAllLink && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-sky-400/60 text-xs font-semibold uppercase tracking-wider transition-all duration-300"
            >
              {viewAllText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};