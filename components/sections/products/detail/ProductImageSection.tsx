// components/sections/products/detail/ProductImageSection.tsx
import Image from "next/image";
import { Product } from "@/constants/products";

interface ProductImageSectionProps {
  product: Product;
}

export const ProductImageSection = ({ product }: ProductImageSectionProps) => {
  return (
    <div className="relative">

      {/* Main image */}
      <div className="relative rounded-3xl overflow-hidden border border-dark-500 bg-dark-400 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {/* Subtle gradient at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400/30 via-transparent to-transparent" />
      </div>

      {/* Category badge — top left */}
      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-[0.15em]">
          <span className="size-1.5 rounded-full bg-green-400" />
          {product.category.replace("-", " ")}
        </span>
      </div>

      {/* Tags — bottom right */}
      <div className="absolute bottom-5 right-5 flex gap-2">
        {product.tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className="px-2.5 py-1 bg-dark-400/85 backdrop-blur-sm border border-dark-500/60 rounded-full text-[10px] text-white/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Decorative corner accent */}
      <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl border-2 border-green-500/20 pointer-events-none" />
    </div>
  );
};
