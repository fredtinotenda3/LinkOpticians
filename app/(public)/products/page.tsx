import {
  ProductsHeroSection,
  BrandsStripSection,
  ProductCategorySection,
  ContactLensesSection,
  ProductsCTASection,
} from "@/components/sections/products";

import { PRODUCTS_PAGE_CONFIG } from "@/constants/products-page";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#000d1a]">
      <ProductsHeroSection {...PRODUCTS_PAGE_CONFIG.hero} />

      <BrandsStripSection brands={PRODUCTS_PAGE_CONFIG.brands} />

      {/* Frames Section */}
      <ProductCategorySection
        {...PRODUCTS_PAGE_CONFIG.frames}
        badge={{
          text: "Frame Options",
          color: "bg-white/10",
        }}
      />

      {/* Protective Eyewear Section */}
      <ProductCategorySection
        {...PRODUCTS_PAGE_CONFIG.sunglasses}
        badge={{
          text: "Protective",
          color: "bg-sky-500/20",
        }}
      />

      <ContactLensesSection
        {...PRODUCTS_PAGE_CONFIG.contactLenses}
      />

      <ProductsCTASection
        {...PRODUCTS_PAGE_CONFIG.cta}
      />
    </div>
  );
}