// components\ProductCard.tsx - 

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/constants/products";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="bg-dark-400 border border-dark-500 rounded-xl overflow-hidden h-full flex flex-col">
      <div className="h-48 bg-dark-300 relative overflow-hidden">
        <Image
          src={product.image}
          width={400}
          height={192}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-dark-400/80 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <header className="mb-4">
          <h3 className="text-18-bold mb-1">{product.name}</h3>
          <p className="text-dark-600 text-sm mb-3">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-dark-300 rounded text-xs">{product.type}</span>
          </div>
        </header>
        
        <div className="mb-6">
          <div className="p-3 bg-dark-300 rounded-lg">
            <p className="text-sm text-dark-600">
              Consultation required for product information and fitting.
            </p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-12-semibold text-dark-700 mb-2">Product information:</h4>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 bg-dark-300 rounded text-10-regular text-dark-600"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="px-2 py-1 bg-dark-300 rounded text-10-regular text-dark-600">
                Information available
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between text-sm text-dark-600 mb-4">
            <div className="flex items-center gap-1">
              <div className="size-1.5 bg-dark-600 rounded-full"></div>
              <span>{product.availability[0]}</span>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="p-6 pt-0">
        <div className="flex gap-3">
          <Button className="shad-gray-btn flex-1" size="sm" asChild>
            <Link href={`/products/${product.id}`}>
              Product Details
            </Link>
          </Button>
          <Button className="shad-gray-btn flex-1" size="sm" asChild>
            <Link href={`/contact?product=${product.id}`}>
              Contact for Information
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
};