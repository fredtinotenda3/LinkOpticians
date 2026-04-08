// constants/products.ts

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'frames' | 'sunglasses' | 'contact-lenses' | 'accessories' | 'lenses';
  type: string;
  description: string;
  features: string[];
  materials?: string[];
  image: string;
  tags: string[];
  availability: string[];
}

/**
 * PRODUCTS_DATA
 * A flat array to support .filter() operations in the page configurations.
 * Aligned with S.I. 63 of 2024 compliance for factual representations.
 */
export const PRODUCTS_DATA: Product[] = [
  // ─── LUXURY SUNGLASSES ──────────────────────────────────────────
  {
    id: "sunglass-gucci",
    name: "Gucci GG1220S",
    brand: "Gucci",
    category: "sunglasses",
    type: "Luxury Eyewear",
    description: "Iconic aviator silhouette with gold-tone finish and signature web detailing.",
    features: ["UV400 Protection", "Designer Case Included", "Italian Craftsmanship"],
    image: "/assets/images/products/gucci-aviator.jpg",
    tags: ["luxury", "sunglasses", "gucci"],
    availability: ["Harare", "Honeydew", "Chiredzi"]
  },
  {
    id: "sunglass-armani",
    name: "Giorgio Armani AR8135",
    brand: "Giorgio Armani",
    category: "sunglasses",
    type: "Luxury Eyewear",
    description: "Sophisticated rectangular frames for the modern professional.",
    features: ["Polarized Lenses", "Hand-finished Acetate"],
    image: "/assets/images/products/armani-rect.jpg",
    tags: ["luxury", "sunglasses", "armani"],
    availability: ["Harare", "Kensington"]
  },
  {
    id: "sunglass-police",
    name: "Police Origins Lite",
    brand: "Police",
    category: "sunglasses",
    type: "Active Lifestyle",
    description: "Urban design featuring polarized lenses and a lightweight metal chassis.",
    features: ["Impact Resistance", "Lightweight Alloy", "Polarized Tech"],
    image: "/assets/images/products/police-lite.jpg",
    tags: ["active", "sunglasses", "police"],
    availability: ["All Branches"]
  },

  // ─── SPECTACLE FRAMES ───────────────────────────────────────────
  {
    id: "frame-felicia",
    name: "Felicia Signature Series",
    brand: "Felicia",
    category: "frames",
    type: "Premium Frames",
    description: "Elegant feminine designs with crystal embellishments and rose gold accents.",
    features: ["Hypoallergenic", "Adjustable Nose Pads"],
    image: "/assets/images/products/felicia-frame.jpg",
    tags: ["frames", "felicia"],
    availability: ["All Branches"]
  },
  {
    id: "frame-vision-pro",
    name: "Vision Pro Titanium",
    brand: "Vision Plus",
    category: "frames",
    type: "Optical Frames",
    description: "Minimalist rimless design constructed from aerospace-grade titanium.",
    features: ["Memory Metal", "Ultra-Lightweight", "Corrosion Resistant"],
    image: "/assets/images/products/titanium-frame.jpg",
    tags: ["frames", "titanium", "vision-plus"],
    availability: ["Harare", "Kensington", "Chiredzi"]
  },

  // ─── CLINICAL LENSES (VISION PLUS TECH) ─────────────────────────
  {
    id: "lens-digital-hd",
    name: "Vision Plus HD Digital",
    brand: "Vision Plus",
    category: "lenses",
    type: "Clinical Tech",
    description: "High-definition digital surfacing for maximized peripheral clarity.",
    features: ["Blue Light Filter", "Anti-Reflective", "Easy-Clean Coating"],
    image: "/assets/images/products/lens-tech-1.png",
    tags: ["lenses", "vision-plus", "clinical"],
    availability: ["Manufactured in Link Lab"]
  },
  {
    id: "lens-photochromic",
    name: "Adaptive Light Lenses",
    brand: "Link Opticians",
    category: "lenses",
    type: "Photochromic Tech",
    description: "Lenses that intelligently adapt to changing UV levels, darkening outdoors.",
    features: ["Rapid Transition", "Indoor Clarity", "UV Protection"],
    image: "/assets/images/products/lens-tech-2.png",
    tags: ["lenses", "transition", "clinical"],
    availability: ["All Branches"]
  },

  // ─── CONTACT LENSES ─────────────────────────────────────────────
  {
    id: "contact-daily",
    name: "Vision-Link Daily Disposables",
    brand: "Vision Plus",
    category: "contact-lenses",
    type: "Daily Disposable",
    description: "High-moisture content daily lenses for all-day comfort and oxygen breathability.",
    features: ["UV Blocker", "Hydra-Balance Tech", "Soft Hydrogel"],
    image: "/assets/images/products/contact-daily.png",
    tags: ["contacts", "daily", "clinical"],
    availability: ["Following Optometrist Assessment"]
  },

  // ─── ACCESSORIES ────────────────────────────────────────────────
  {
    id: "acc-premium-kit",
    name: "Precision Lens Care Kit",
    brand: "Link Opticians",
    category: "accessories",
    type: "Maintenance",
    description: "Comprehensive care kit for all high-index and anti-reflective lenses.",
    features: ["Microfiber Cloth", "pH-Balanced Spray", "Travel Case"],
    image: "/assets/images/products/care-kit.png",
    tags: ["accessories", "care-kit"],
    availability: ["In-Store Only"]
  }
];

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products", icon: "📦" },
  { id: "luxury", label: "Luxury Collection", icon: "💎" },
  { id: "frames", label: "Optical Frames", icon: "👓" },
  { id: "sunglasses", label: "Sunglasses", icon: "🕶️" },
  { id: "lenses", label: "Lens Tech", icon: "🔍" },
  { id: "contact-lenses", label: "Contact Lenses", icon: "👁️" }
];

export const PRODUCT_FEATURES = [
  "In-House Lens Manufacturing (Vision Plus Lab)",
  "Full Medical Aid Support (CIMAS, PSMAS, etc.)",
  "Interest-Free Payment Plans (Harare & Honeydew)",
  "Professional Eye Examinations on Premises",
  "Authorized Retailer for Global Luxury Brands"
];