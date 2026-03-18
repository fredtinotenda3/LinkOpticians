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
    <section id={id} className="relative py-28 bg-dark-400 overflow-hidden">

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-green-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Image side ─────────────────────────────────────────── */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden border border-dark-500 aspect-[4/3]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-400/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />
          </div>

          {/* ── Content side ───────────────────────────────────────── */}
          <div className="space-y-8 order-1 lg:order-2">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-px bg-green-500" />
              <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {title}
              <br />
              <span className="text-green-400">{titleHighlight}</span>
            </h2>

            {/* Description — regulatory language */}
            <p className="text-white/60 text-lg leading-relaxed">{description}</p>

            {/* Product type cards */}
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group p-4 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/40 transition-all duration-300"
                >
                  <h3 className="text-white text-sm font-bold mb-0.5 group-hover:text-green-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-[11px]">{product.type}</p>
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={buttonLink}
              className="group inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(36,174,124,0.4)] hover:scale-[1.02]"
            >
              {buttonText}
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};
