// components/sections/products/detail/ProductBreadcrumb.tsx
import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
  category: string;
}

export const ProductBreadcrumb = ({ productName, category }: ProductBreadcrumbProps) => {
  return (
    <div className="border-b border-white/[0.03] bg-[#000d1a]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-[5%] py-5">
        <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em]">
          
          {/* Home Link */}
          <Link 
            href="/" 
            className="text-white/30 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>

          <svg className="w-3 h-3 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>

          {/* Products Hub */}
          <Link 
            href="/products" 
            className="text-white/30 hover:text-sky-400 transition-colors duration-300"
          >
            Products
          </Link>

          <svg className="w-3 h-3 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>

          {/* Category Anchor */}
          <Link 
            href={`/products#${category}`} 
            className="text-white/30 hover:text-sky-400 transition-colors duration-300 italic"
          >
            {category.replace("-", " ")}
          </Link>

          <svg className="w-3 h-3 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>

          {/* Active Product Name */}
          <span className="text-sky-500 truncate max-w-[200px] italic">
            {productName}
          </span>
          
        </nav>
      </div>
    </div>
  );
};