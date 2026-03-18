// components/sections/products/detail/ProductBreadcrumb.tsx
import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
  category: string;
}

export const ProductBreadcrumb = ({ productName, category }: ProductBreadcrumbProps) => {
  return (
    <div className="border-b border-dark-500 bg-dark-400/95 backdrop-blur-md sticky top-0 z-10">
      <div className="mx-auto max-w-7xl px-[5%] py-4">
        <nav className="flex items-center gap-1.5 text-xs text-white/35">
          <Link href="/" className="hover:text-white/70 transition-colors duration-200 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/products" className="hover:text-white/70 transition-colors duration-200">Products</Link>
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={`/products#${category}`} className="hover:text-white/70 transition-colors duration-200 capitalize">
            {category.replace("-", " ")}
          </Link>
          <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white/60 truncate max-w-[160px]">{productName}</span>
        </nav>
      </div>
    </div>
  );
};
