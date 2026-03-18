// app/(public)/products/[productId]/page.tsx
import { notFound } from "next/navigation";
import { PRODUCTS_DATA } from "@/constants/products";
import { PRODUCT_DETAIL_CONFIG } from "@/constants/products-page";
import {
  ProductBreadcrumb,
  ProductImageSection,
  ProductInfoSection,
  RelatedProductsSection,
  ProductDetailCTASection
} from "@/components/sections/products/detail";

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = PRODUCTS_DATA.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS_DATA
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <ProductBreadcrumb 
        productName={product.name} 
        category={product.category} 
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ProductImageSection product={product} />
            <ProductInfoSection 
              product={product} 
              consultationTitle={PRODUCT_DETAIL_CONFIG.consultation.title}
              consultationDescription={PRODUCT_DETAIL_CONFIG.consultation.description}
            />
          </div>
        </div>
      </section>

      <RelatedProductsSection 
        subtitle={PRODUCT_DETAIL_CONFIG.related.subtitle}
        title={PRODUCT_DETAIL_CONFIG.related.title}
        products={relatedProducts}
      />

      <ProductDetailCTASection {...PRODUCT_DETAIL_CONFIG.cta} />
    </div>
  );
}