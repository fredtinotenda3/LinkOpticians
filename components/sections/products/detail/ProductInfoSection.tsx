// components/sections/products/detail/ProductInfoSection.tsx
import Link from "next/link";
import { Product } from "@/constants/products";

interface ProductInfoSectionProps {
  product: Product;
  consultationTitle: string;
  consultationDescription: string;
}

export const ProductInfoSection = ({
  product,
  consultationTitle,
  consultationDescription,
}: ProductInfoSectionProps) => {
  return (
    <div className="space-y-10">

      {/* ── Header: Type + Name ────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-[2px] bg-sky-500" />
          <p className="text-sky-500 text-[10px] font-black tracking-[0.4em] uppercase">
            {product.type}
          </p>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter italic uppercase mb-6">
          {product.name}
        </h1>
        <p className="text-white/40 text-lg leading-relaxed font-medium italic max-w-xl">
          {product.description}
        </p>
      </div>

      {/* ── Features ───────────────────────────────────────────────── */}
      <div className="space-y-5 pt-8 border-t border-white/[0.05]">
        <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Technical Features</h2>
        <ul className="grid grid-cols-1 gap-3">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] transition-colors duration-500 hover:bg-white/[0.04] hover:border-sky-500/20 group">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0 border border-sky-500/10 group-hover:bg-sky-500/20 transition-all duration-500">
                <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/60 text-sm font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Materials & Availability ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {product.materials && product.materials.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Composition</h2>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((material, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full text-white/50 text-[11px] font-bold uppercase tracking-widest"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Stock Status</h2>
          <div className="flex flex-wrap gap-2">
            {product.availability.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/5 border border-sky-500/10 rounded-full text-sky-400 text-[11px] font-black uppercase tracking-widest"
              >
                <span className="size-1.5 rounded-full bg-sky-500 animate-pulse shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Clinical Notice ─────────────────────────────────────────── */}
      <div className="flex items-start gap-5 p-6 rounded-3xl bg-sky-500/[0.03] border border-sky-500/10">
        <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 border border-sky-500/10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-[13px] font-black uppercase tracking-wider mb-1">{consultationTitle}</h3>
          <p className="text-white/30 text-xs leading-relaxed italic">{consultationDescription}</p>
        </div>
      </div>

      {/* ── Primary Actions ─────────────────────────────────────────── */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/book?product=${product.id}`}
            className="group flex-[1.5] inline-flex items-center justify-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-black text-[12px] uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 hover:shadow-[0_20px_40px_rgba(14,165,233,0.25)] hover:-translate-y-1"
          >
            Schedule Fitting
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/locations"
            className="flex-1 inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-white/20 text-white font-black text-[11px] uppercase tracking-[0.2em] py-5 rounded-full transition-all duration-500 hover:-translate-y-1"
          >
            Find in Clinic
          </Link>
        </div>

        {/* ── Sub-Action ─────────────────────────────────────────────── */}
        <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
          Direct Consultation:{" "}
          <a href="tel:+263242700000" className="text-sky-500/60 hover:text-sky-400 transition-colors duration-300">
            0242 757558
          </a>
        </p>
      </div>

    </div>
  );
};