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
  description?: string;
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
  description,
  viewAllText,
  viewAllLink,
  products,
  badge,
}: ProductCategorySectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const [loadedImages, setLoadedImages] = useState<
    Record<string, boolean>
  >({});

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (productId: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [productId]: true,
    }));
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative overflow-hidden border-b border-white/[0.06] bg-[#020617] py-16 md:py-24"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Soft medical blue glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-sky-500/10 blur-[120px]" />

      {/* Soft emerald glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-emerald-500/5 blur-[120px]" />

      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADER */}
        <div
          className={`mb-14 flex flex-col gap-8 transition-all duration-700 md:flex-row md:items-end md:justify-between ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="max-w-2xl space-y-5">

            {/* Subtitle */}
            <div className="flex items-center gap-4">
              <span className="h-[2px] w-10 bg-sky-400" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-400/80">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
              {title}

              <br />

              <span className="text-sky-400">
                {titleHighlight}
              </span>
            </h2>

            {/* Description */}
            {description && (
              <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                {description}
              </p>
            )}
          </div>

          {/* Desktop CTA */}
          {viewAllText && viewAllLink && (
            <Link
              href={viewAllLink}
              className="group hidden items-center gap-3 rounded-full border border-white/10 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-sky-400/60 hover:text-white md:inline-flex"
            >
              {viewAllText}

              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className={`group block transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] transition-all duration-500 hover:-translate-y-1 hover:border-sky-400/30">

                {/* IMAGE AREA */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#001427]">

                  {/* Skeleton */}
                  {!loadedImages[product.id] && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#001427] to-[#020617]" />
                  )}

                  {/* Product Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index === 0}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-contain p-6 transition-all duration-700 group-hover:scale-105 md:p-8 ${
                      loadedImages[product.id]
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(product.id)}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />

                  {/* Badge */}
                  {badge && (
                    <div className="absolute right-4 top-4 z-10">
                      <span
                        className={`rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md ${
                          badge.color || "bg-sky-500/20"
                        }`}
                      >
                        {badge.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-7 md:p-8">

                  {/* Brand + Type */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/80">
                      {product.brand}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-white/20" />

                    <span className="text-[11px] uppercase tracking-wide text-white/50">
                      {product.type}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="mb-3 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-sky-400 md:text-2xl">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-white/70">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-all duration-300 group-hover:text-white">
                    View collection

                    <span className="h-px w-8 bg-sky-400 transition-all duration-300 group-hover:w-12" />
                  </div>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-sky-400/5 to-emerald-400/5 blur-2xl" />
              </div>
            </Link>
          ))}
        </div>

        {/* MOBILE CTA */}
        {viewAllText && viewAllLink && (
          <div className="mt-10 text-center md:hidden">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-sky-400/60 hover:text-white"
            >
              {viewAllText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}