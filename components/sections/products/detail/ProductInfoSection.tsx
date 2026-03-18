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
    <div className="space-y-8">

      {/* Type + name */}
      <div>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-6 h-px bg-green-500" />
          <p className="text-green-400 text-xs font-semibold tracking-[0.25em] uppercase">
            {product.type}
          </p>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          {product.name}
        </h1>
        <p className="text-white/60 text-lg leading-relaxed">{product.description}</p>
      </div>

      {/* Features */}
      <div className="space-y-3 pt-2 border-t border-dark-500">
        <h2 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Features</h2>
        <ul className="space-y-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-dark-400 border border-dark-500">
              <div className="w-6 h-6 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-white/70 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Materials */}
      {product.materials && product.materials.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">Materials</h2>
          <div className="flex flex-wrap gap-2">
            {product.materials.map((material, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-dark-400 border border-dark-500 rounded-full text-white/60 text-xs font-medium"
              >
                {material}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white/40 uppercase tracking-[0.2em]">Availability</h2>
        <div className="flex flex-wrap gap-2">
          {product.availability.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-green-500/10 border border-green-500/25 rounded-full text-green-400 text-xs font-semibold"
            >
              <span className="size-1.5 rounded-full bg-green-400" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Consultation notice — regulatory language */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-dark-400 border border-dark-500">
        <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h3 className="text-white text-sm font-bold mb-1">{consultationTitle}</h3>
          <p className="text-white/45 text-xs leading-relaxed">{consultationDescription}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link
          href={`/book?product=${product.id}`}
          className="group flex-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(36,174,124,0.35)] hover:scale-[1.02]"
        >
          Book fitting appointment
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <Link
          href="/locations"
          className="flex-1 inline-flex items-center justify-center gap-2 border border-dark-500 hover:border-green-500/50 text-white/60 hover:text-white font-semibold text-sm py-4 rounded-full transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Find in clinic
        </Link>
      </div>

      {/* Phone contact */}
      <p className="text-center text-white/35 text-xs">
        Enquiries:{" "}
        <a href="tel:+263242700000" className="text-green-400 hover:text-green-300 transition-colors duration-200">
          +263 242 700 000
        </a>
      </p>

    </div>
  );
};
