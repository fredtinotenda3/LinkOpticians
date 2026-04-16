import {
  ProductsHeroSection,
  BrandsStripSection,
  ProductCategorySection,
  ContactLensesSection,
  // LensTechnologySection,
  //AccessoriesSection,
  ProductsCTASection,
  // DisclaimerSection
} from "@/components/sections/products";
import { PRODUCTS_PAGE_CONFIG } from "@/constants/products-page";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#000d1a]">
      <ProductsHeroSection {...PRODUCTS_PAGE_CONFIG.hero} />
      <BrandsStripSection brands={PRODUCTS_PAGE_CONFIG.brands} />
      
      {/* Frames Section with custom badge color */}
      <ProductCategorySection 
        {...PRODUCTS_PAGE_CONFIG.frames} 
        badge={{ text: "Frame option", color: "bg-white/10" }}
      />
      
      {/* Sunglasses Section with custom badge color */}
      <ProductCategorySection 
        {...PRODUCTS_PAGE_CONFIG.sunglasses} 
        badge={{ text: "UV400", color: "bg-sky-500/20" }}
      />
      
      <ContactLensesSection {...PRODUCTS_PAGE_CONFIG.contactLenses} />
      {/* <LensTechnologySection {...PRODUCTS_PAGE_CONFIG.lensTechnology} /> */}
      {/* <AccessoriesSection {...PRODUCTS_PAGE_CONFIG.accessories} /> */}
      <ProductsCTASection {...PRODUCTS_PAGE_CONFIG.cta} />
      {/* <DisclaimerSection text={PRODUCTS_PAGE_CONFIG.disclaimer.text} /> */}
    </div>
  );
}