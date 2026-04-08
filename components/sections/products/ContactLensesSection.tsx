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
    <section id={id} className="relative py-32 bg-[#000d1a] overflow-hidden border-b border-white/[0.03]">
      
      {/* Deep Ocean Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-400/5 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* ── Image Side (Cinematic Frame) ─────────────────────────── */}
          <div className="relative order-2 lg:order-1 group">
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 aspect-[4/5] lg:aspect-[3/4] bg-[#001222]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay for cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/60 via-transparent to-transparent" />
            </div>
            
            {/* Decorative Geometric Accent */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl border border-sky-500/20 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
          </div>

          {/* ── Content Side ───────────────────────────────────────── */}
          <div className="space-y-10 order-1 lg:order-2">

            {/* Premium Eyebrow */}
            <div className="flex items-center gap-4">
              <span className="w-12 h-[2px] bg-sky-500" />
              <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
                {subtitle}
              </span>
            </div>

            {/* Cinematic Title */}
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
              {title}
              <br />
              <span className="text-sky-400">{titleHighlight}</span>
            </h2>

            {/* Regulatory Description */}
            <p className="text-white/40 text-lg leading-relaxed max-w-xl font-medium">
              {description}
            </p>

            {/* Product Grid - Glassmorphism Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group p-6 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-sky-500/40 transition-all duration-500 hover:bg-white/[0.04]"
                >
                  <p className="text-sky-500 text-[9px] font-black uppercase tracking-widest mb-1 opacity-60">
                    {product.brand}
                  </p>
                  <h3 className="text-white text-base font-bold group-hover:text-sky-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-white/20 text-[9px] font-black uppercase tracking-widest group-hover:text-white/40">
                    Details <span className="w-4 h-px bg-sky-500/30" />
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href={buttonLink}
                className="group inline-flex items-center gap-4 bg-sky-500 hover:bg-sky-400 text-white font-black text-[11px] uppercase tracking-[0.2em] px-10 py-5 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(14,165,233,0.25)] hover:-translate-y-1"
              >
                {buttonText}
                <svg
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};