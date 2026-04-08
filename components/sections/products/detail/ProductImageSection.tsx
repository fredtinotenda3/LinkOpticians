// components/sections/products/detail/ProductImageSection.tsx
import Image from "next/image";
import { Product } from "@/constants/products";

interface ProductImageSectionProps {
  product: Product;
}

export const ProductImageSection = ({ product }: ProductImageSectionProps) => {
  return (
    <div className="relative group">

      {/* Main Image Container - High-End Display Style */}
      <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-[#001222] aspect-square transition-all duration-700 group-hover:border-sky-500/30">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-12 transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        
        {/* Deep Ocean Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000d1a]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Luxury Category Badge — Top Left */}
      <div className="absolute top-8 left-8">
        <span className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#000d1a]/80 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-sky-400 uppercase tracking-[0.2em]">
          <span className="size-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
          {product.category.replace("-", " ")}
        </span>
      </div>

      {/* Tech Tags — Bottom Right */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {product.tags.slice(0, 2).map((tag, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest transition-colors duration-500 hover:text-white/70 hover:bg-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Premium Geometric Accent */}
      <div className="absolute -top-6 -right-6 w-32 h-32 rounded-[32px] border border-sky-500/10 -z-10 transition-transform duration-700 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none" />
      
      {/* Glow Effect behind the image */}
      <div className="absolute inset-0 bg-sky-500/5 blur-[100px] -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </div>
  );
};