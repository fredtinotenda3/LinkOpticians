// constants/products.ts - 
export interface Product {
  id: string;
  name: string;
  category: 'frames' | 'sunglasses' | 'contact-lenses' | 'accessories' | 'lenses';
  type: string;
  description: string;
  features: string[];
  materials?: string[];
  image: string;
  tags: string[];
  availability: string[];
}

export const PRODUCTS_DATA: Product[] = [
  // FRAMES
  {
    id: "frame-basic",
    name: "Basic Frames",
    category: "frames",
    type: "Frame option",
    description: "Frame options available",
    features: ["Frame option"],
    materials: ["Frame materials available"],
    image: "/assets/images/products/frame-basic.png",
    tags: ["frames"],
    availability: ["Available"]
  },
  {
    id: "frame-design",
    name: "Frame Options",
    category: "frames",
    type: "Frame option",
    description: "Frame options available",
    features: ["Frame option"],
    materials: ["Frame materials available"],
    image: "/assets/images/products/frame-designer.png",
    tags: ["frames"],
    availability: ["Available"]
  },
  {
    id: "frame-special",
    name: "Specialty Frames",
    category: "frames",
    type: "Frame option",
    description: "Frame options available",
    features: ["Frame option"],
    materials: ["Frame materials available"],
    image: "/assets/images/products/frame-special.png",
    tags: ["frames"],
    availability: ["Available"]
  },

  // SUNGLASSES
  {
    id: "sunglass-basic",
    name: "Sunglasses",
    category: "sunglasses",
    type: "Sunglass option",
    description: "Sunglass options available",
    features: ["Sunglass option"],
    materials: ["Sunglass materials available"],
    image: "/assets/images/products/sunglass-basic.png",
    tags: ["sunglasses"],
    availability: ["Available"]
  },
  {
    id: "sunglass-design",
    name: "Sunglass Options",
    category: "sunglasses",
    type: "Sunglass option",
    description: "Sunglass options available",
    features: ["Sunglass option"],
    materials: ["Sunglass materials available"],
    image: "/assets/images/products/sunglass-designer.png",
    tags: ["sunglasses"],
    availability: ["Available"]
  },
  {
    id: "sunglass-prescription",
    name: "Prescription Sunglasses",
    category: "sunglasses",
    type: "Sunglass option",
    description: "Sunglass options available",
    features: ["Sunglass option"],
    materials: ["Sunglass materials available"],
    image: "/assets/images/products/sunglass-prescription.png",
    tags: ["sunglasses"],
    availability: ["Available"]
  },

  // CONTACT LENSES
  {
    id: "contact-daily",
    name: "Contact Lens Options",
    category: "contact-lenses",
    type: "Contact lens option",
    description: "Contact lens options available",
    features: ["Contact lens option"],
    image: "/assets/images/products/contact-daily.png",
    tags: ["contact lenses"],
    availability: ["Available"]
  },
  {
    id: "contact-monthly",
    name: "Contact Lens Options",
    category: "contact-lenses",
    type: "Contact lens option",
    description: "Contact lens options available",
    features: ["Contact lens option"],
    image: "/assets/images/products/contact-monthly.png",
    tags: ["contact lenses"],
    availability: ["Available"]
  },
  {
    id: "contact-special",
    name: "Specialty Contact Lenses",
    category: "contact-lenses",
    type: "Contact lens option",
    description: "Contact lens options available",
    features: ["Contact lens option"],
    image: "/assets/images/products/contact-special.png",
    tags: ["contact lenses"],
    availability: ["Available"]
  },

  // LENSES
  {
    id: "lens-single",
    name: "Lens Options",
    category: "lenses",
    type: "Lens option",
    description: "Lens options available",
    features: ["Lens option"],
    image: "/assets/images/products/lens-single.png",
    tags: ["lenses"],
    availability: ["Manufactured"]
  },
  {
    id: "lens-progressive",
    name: "Lens Options",
    category: "lenses",
    type: "Lens option",
    description: "Lens options available",
    features: ["Lens option"],
    image: "/assets/images/products/lens-progressive.png",
    tags: ["lenses"],
    availability: ["Manufactured"]
  },
  {
    id: "lens-addons",
    name: "Lens Options",
    category: "lenses",
    type: "Lens option",
    description: "Lens options available",
    features: ["Lens option"],
    image: "/assets/images/products/lens-addons.png",
    tags: ["lenses"],
    availability: ["Manufactured"]
  },

  // ACCESSORIES
  {
    id: "accessory-solutions",
    name: "Accessory Options",
    category: "accessories",
    type: "Accessory",
    description: "Accessory options available",
    features: ["Accessory option"],
    image: "/assets/images/products/accessory-solutions.png",
    tags: ["accessories"],
    availability: ["Available"]
  },
  {
    id: "accessory-cases",
    name: "Accessory Options",
    category: "accessories",
    type: "Accessory",
    description: "Accessory options available",
    features: ["Accessory option"],
    image: "/assets/images/products/accessory-cases.png",
    tags: ["accessories"],
    availability: ["Available"]
  },
  {
    id: "accessory-readers",
    name: "Accessory Options",
    category: "accessories",
    type: "Accessory",
    description: "Accessory options available",
    features: ["Accessory option"],
    image: "/assets/images/products/accessory-readers.png",
    tags: ["accessories"],
    availability: ["Available"]
  }
];

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products", icon: "📦" },
  { id: "frames", label: "Frames", icon: "👓" },
  { id: "sunglasses", label: "Sunglasses", icon: "🕶️" },
  { id: "contact-lenses", label: "Contact Lenses", icon: "🧿" },
  { id: "lenses", label: "Lenses", icon: "🔍" },
  { id: "accessories", label: "Accessories", icon: "🧰" }
];

export const PRODUCT_FEATURES = [
  "Lens manufacturing services available",
  "Medical aid coverage information available",
  "Payment options available",
  "Frame repair services available",
  "Warranty information available"
];