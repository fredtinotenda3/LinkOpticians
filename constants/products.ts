export interface Product {
  id: string;
  name: string;
  brand: string;
  category:
    | "frames"
    | "sunglasses"
    | "contact-lenses"
    | "accessories"
    | "lenses";

  type: string;
  description: string;
  features: string[];
  materials?: string[];
  image: string;
  tags: string[];
  availability: string[];
}

export const PRODUCTS_DATA: Product[] = [
  // ─────────────────────────────────────────────
  // PROTECTIVE EYEWEAR
  // ─────────────────────────────────────────────

  {
    id: "rayban-protective",

    name: "Ray-Ban Active Collection",

    brand: "Ray-Ban",

    category: "sunglasses",

    type: "Protective Eyewear",

    description:
      "Eyewear with UV protection and lightweight comfort for everyday outdoor use.",

    features: [
      "UV400 Protection",
      "Lightweight Frame",
      "Prescription Compatible",
    ],

    image: "/assets/images/products/rayban-protective.png",

    tags: ["protective", "sunglasses", "rayban"],

    availability: ["Harare", "Honeydew", "Chiredzi"],
  },

  {
    id: "oakley-active",

    name: "Oakley Active Shield",

    brand: "Oakley",

    category: "sunglasses",

    type: "Sports Eyewear",

    description:
      "Durable eyewear designed for active lifestyles, sports, and outdoor environments.",

    features: [
      "Impact Resistant",
      "UV Protection",
      "Sport Performance Design",
    ],

    image: "/assets/images/products/oakley-shield.png",

    tags: ["protective", "sports", "oakley"],

    availability: ["All Branches"],
  },

  {
    id: "prada-blue-light",

    name: "Prada Vision Collection",

    brand: "Prada",

    category: "sunglasses",

    type: "Blue-Light Protection",

    description:
      "Modern eyewear designed for digital screen exposure and daily visual comfort.",

    features: [
      "Blue-Light Filtering",
      "Designer Finish",
      "Premium Comfort",
    ],

    image: "/assets/images/products/prada-blue-light.png",

    tags: ["protective", "blue-light", "prada"],

    availability: ["Harare", "Kensington"],
  },

  {
    id: "gucci-uv-series",

    name: "Gucci Signature Collection",

    brand: "Gucci",

    category: "sunglasses",

    type: "Protective Eyewear",

    description:
      "Luxury eyewear combining designer styling with certified UV protection.",

    features: [
      "UV400 Protection",
      "Luxury Finish",
      "Premium Optical Comfort",
    ],

    image: "/assets/images/products/gucci-uv.png",

    tags: ["protective", "luxury", "gucci"],

    availability: ["Harare", "Honeydew"],
  },

  // ─────────────────────────────────────────────
  // OPTICAL FRAMES
  // ─────────────────────────────────────────────

  {
    id: "cartier-signature",

    name: "Cartier Signature Optical",

    brand: "Cartier",

    category: "frames",

    type: "Luxury Optical Frames",

    description:
      "Elegant optical frames crafted with refined detailing and premium comfort.",

    features: [
      "Premium Materials",
      "Adjustable Nose Pads",
      "Luxury Finish",
    ],

    image: "/assets/images/products/cartier-frame.png",

    tags: ["frames", "cartier", "luxury"],

    availability: ["Harare", "Kensington"],
  },

  {
    id: "montblanc-titanium",

    name: "Montblanc Titanium Series",

    brand: "Montblanc",

    category: "frames",

    type: "Optical Frames",

    description:
      "Minimalist titanium optical frames engineered for lightweight durability and daily wear.",

    features: [
      "Titanium Build",
      "Ultra-Lightweight",
      "Corrosion Resistant",
    ],

    image: "/assets/images/products/montblanc-titanium.png",

    tags: ["frames", "montblanc", "titanium"],

    availability: ["Harare", "Chiredzi"],
  },

  {
    id: "chanel-classic",

    name: "Chanel Classic Optical",

    brand: "Chanel",

    category: "frames",

    type: "Designer Optical Frames",

    description:
      "Timeless designer optical frames with sophisticated styling and premium comfort.",

    features: [
      "Luxury Finish",
      "Premium Acetate",
      "Elegant Styling",
    ],

    image: "/assets/images/products/chanel-classic.png",

    tags: ["frames", "chanel"],

    availability: ["All Branches"],
  },

  {
    id: "calvin-klein-modern",

    name: "Calvin Klein Modern Fit",

    brand: "Calvin Klein",

    category: "frames",

    type: "Optical Frames",

    description:
      "Contemporary optical frames designed for comfortable everyday wear.",

    features: [
      "Modern Design",
      "Lightweight Comfort",
      "Prescription Ready",
    ],

    image: "/assets/images/products/ck-modern.png",

    tags: ["frames", "ck"],

    availability: ["All Branches"],
  },

  // ─────────────────────────────────────────────
  // CONTACT LENSES
  // ─────────────────────────────────────────────

  {
    id: "contact-daily",

    name: "Daily Disposable Contact Lenses",

    brand: "Bausch + Lomb",

    category: "contact-lenses",

    type: "Daily Disposable",

    description:
      "Comfort-focused daily disposable contact lenses available following optometrist assessment.",

    features: [
      "UV Blocker",
      "Hydration Technology",
      "Soft Hydrogel Material",
    ],

    image: "/assets/images/products/contact-daily.png",

    tags: ["contacts", "daily", "clinical"],

    availability: ["Following Optometrist Assessment"],
  },
];

export const PRODUCT_CATEGORIES = [
  {
    id: "all",
    label: "All Products",
    icon: "📦",
  },

  {
    id: "luxury",
    label: "Luxury Collection",
    icon: "💎",
  },

  {
    id: "frames",
    label: "Optical Frames",
    icon: "👓",
  },

  {
    id: "sunglasses",
    label: "Protective Eyewear",
    icon: "🕶️",
  },

  {
    id: "lenses",
    label: "Lens Technology",
    icon: "🔍",
  },

  {
    id: "contact-lenses",
    label: "Contact Lenses",
    icon: "👁️",
  },
];

export const PRODUCT_FEATURES = [
  "Comprehensive Eye Examinations",
  "Prescription Eyewear Dispensing",
  "Blue-Light Protection Options",
  "Medical Aid Support",
  "Authorized Retailer for International Brands",
];