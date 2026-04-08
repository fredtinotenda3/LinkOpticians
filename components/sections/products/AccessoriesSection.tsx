// components/sections/products/AccessoriesSection.tsx
import Link from "next/link";
import { Product } from "@/constants/products";

interface AccessoriesSectionProps {
  id: string;
  subtitle: string;
  title: string;
  titleHighlight: string;
  products: Product[];
}

// SVG icon map — Refined for premium line-art style
const getIcon = (name: string): JSX.Element => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("solution") || lowerName.includes("kit") || lowerName.includes("care"))
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  if (lowerName.includes("case") || lowerName.includes("box"))
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  if (lowerName.includes("reader") || lowerName.includes("magnifier"))
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    );
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
};

export const AccessoriesSection = ({
  id,
  subtitle,
  title,
  titleHighlight,
  products,
}: AccessoriesSectionProps) => {
  return (
    <section id={id} className="relative py-32 bg-[#000d1a] overflow-hidden border-b border-white/[0.03]">
      
      {/* Deep Ocean Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-sky-500/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="w-10 h-[2px] bg-sky-500" />
            <span className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
              {subtitle}
            </span>
            <span className="w-10 h-[2px] bg-sky-500" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter italic uppercase">
            {title}
            <br />
            <span className="text-sky-400">{titleHighlight}</span>
          </h2>
        </div>

        {/* ── Product Cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all duration-700 hover:-translate-y-2 text-center overflow-hidden"
            >
              {/* Internal Card Glow */}
              <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/[0.02] transition-colors duration-700 pointer-events-none" />

              <div className="relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-sky-500/10 border border-sky-500/20 group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(14,165,233,0.2)] flex items-center justify-center text-sky-400 transition-all duration-500">
                {getIcon(product.name)}
              </div>

              <h3 className="relative text-white text-sm font-black uppercase tracking-tight mb-2 group-hover:text-sky-400 transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
              
              <div className="relative flex items-center justify-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-4 h-px bg-white/20" />
                <p className="text-white text-[10px] font-black uppercase tracking-widest">{product.type}</p>
                <span className="w-4 h-px bg-white/20" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};