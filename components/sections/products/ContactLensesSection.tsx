// components/sections/products/ContactLensesSection.tsx

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/products";

interface ContactLensesSectionProps {
  id: string;
  subtitle: string;
  title: string;
  titleHighlight: string;
  description: string;
  image: string;
  imageAlt: string;
  products: Product[];
  buttonText: string;
  buttonLink: string;
}

export const ContactLensesSection = ({
  id,
  subtitle,
  title,
  titleHighlight,
  description,
  image,
  imageAlt,
  products,
  buttonText,
  buttonLink,
}: ContactLensesSectionProps) => {
  return (
    <section
      id={id}
      className="relative py-24 md:py-32 bg-[#020617] overflow-hidden border-b border-white/[0.05]"
    >
      {/* Softer ambient glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-sky-400/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* ── Image Side ─────────────────────────── */}
          <div className="relative order-2 lg:order-1 group">
            <div className="relative rounded-[28px] overflow-hidden border border-white/10 aspect-[4/5] bg-[#001222]">

              <Image
                src={image}
                alt={imageAlt}
                fill
                quality={100} // 🔥 sharper image
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Cleaner overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
            </div>

            {/* Softer accent (less aggressive) */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl border border-sky-400/20 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition duration-500" />
          </div>

          {/* ── Content Side ───────────────────────── */}
          <div className="space-y-8 md:space-y-10 order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-10 h-[2px] bg-sky-400" />
              <span className="text-sky-400/80 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title (cleaned) */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-[1.1] tracking-tight">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-400/40 transition-all duration-300 hover:bg-white/[0.05]"
                >
                  <p className="text-sky-400/70 text-xs font-semibold uppercase tracking-[0.2em] mb-1">
                    {product.brand}
                  </p>

                  <h3 className="text-white text-sm md:text-base font-semibold group-hover:text-sky-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-wider group-hover:text-white transition">
                    View
                    <span className="w-5 h-px bg-sky-400 transition-all duration-300 group-hover:w-8" />
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                href={buttonLink}
                className="group inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)] hover:-translate-y-0.5"
              >
                {buttonText}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};