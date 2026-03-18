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

// SVG icon map — replaces emoji
const getIcon = (name: string): JSX.Element => {
  if (name.includes("Solution"))
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    );
  if (name.includes("Case"))
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    );
  if (name.includes("Reader"))
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
    <section id={id} className="relative py-28 bg-dark-400 overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-500/4 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-[5%]">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-green-500" />
            <span className="text-green-500 text-xs font-semibold tracking-[0.25em] uppercase">{subtitle}</span>
            <span className="w-6 h-px bg-green-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {title}
            <br />
            <span className="text-green-400">{titleHighlight}</span>
          </h2>
        </div>

        {/* ── Product cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group p-6 rounded-2xl bg-dark-300 border border-dark-500 hover:border-green-500/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(36,174,124,0.08)] text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/15 group-hover:bg-green-500/25 flex items-center justify-center text-green-400 transition-colors duration-300">
                {getIcon(product.name)}
              </div>
              <h3 className="text-white text-sm font-bold mb-1 group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-white/40 text-xs">{product.type}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
