// constants/products-page.ts
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from "./products";

export const PRODUCTS_PAGE_CONFIG = {
  hero: {
    title: "See the world",
    titleHighlight: "in style",
    description: "Frames, sunglasses, and contact lenses from leading brands. Expert fitting at all locations.",
    badge: "PREMIUM EYEWEAR • SINCE 2008",
    categories: PRODUCT_CATEGORIES
  },

  brands: [
    "Ray-Ban", "Oakley", "Persol", "Vogue", "Arnette", "Oliver Peoples"
  ],

  frames: {
    id: "frames",
    subtitle: "COLLECTION",
    title: "Frames for every",
    titleHighlight: "face",
    viewAllText: "View all frames",
    viewAllLink: "/products/frames",
    products: PRODUCTS_DATA.filter(p => p.category === 'frames').slice(0, 4)
  },

  sunglasses: {
    id: "sunglasses",
    subtitle: "PROTECTION + STYLE",
    title: "Premium",
    titleHighlight: "sunglasses",
    products: PRODUCTS_DATA.filter(p => p.category === 'sunglasses').slice(0, 4)
  },

  contactLenses: {
    id: "contact-lenses",
    subtitle: "CONTACT LENSES",
    title: "Freedom from",
    titleHighlight: "frames",
    description: "Daily, monthly, toric, multifocal — we carry all major brands. Professional fitting and training included.",
    image: "/assets/images/contact-lenses-hero.jpg",
    imageAlt: "Contact lenses",
    products: PRODUCTS_DATA.filter(p => p.category === 'contact-lenses').slice(0, 4),
    buttonText: "Book contact lens fitting",
    buttonLink: "/book?service=contact-lenses"
  },

  lensTechnology: {
    subtitle: "LENS TECHNOLOGY",
    title: "More than just",
    titleHighlight: "prescriptions",
    description: "Advanced lens options for every lifestyle — all manufactured in our on-site laboratory.",
    features: [
      {
        icon: "💻",
        title: "Blue light protection",
        description: "Reduce eye strain from screens. Ideal for office workers and students.",
        bgColor: "bg-blue-500/20"
      },
      {
        icon: "☀️",
        title: "Photochromic",
        description: "Lenses that darken in sunlight. One pair for indoors and out.",
        bgColor: "bg-amber-500/20"
      },
      {
        icon: "🔄",
        title: "Progressive",
        description: "Seamless distance to near vision. No more switching glasses.",
        bgColor: "bg-green-500/20"
      }
    ]
  },

  accessories: {
    id: "accessories",
    subtitle: "ACCESSORIES",
    title: "Care for your",
    titleHighlight: "eyewear",
    products: PRODUCTS_DATA.filter(p => p.category === 'accessories').slice(0, 4)
  },

  cta: {
    title: "Can't decide?",
    description: "Visit any clinic to try frames in person. Our optical assistants are happy to help.",
    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",
    secondaryButtonText: "Book an appointment",
    secondaryButtonHref: "/book",
    bgGradient: "from-green-600 to-green-700"
  },

  disclaimer: {
    text: "All products require a valid prescription. Consultation with our optometrists recommended for proper fitting. Most medical aids accepted."
  }
};

// Product detail page config
export const PRODUCT_DETAIL_CONFIG = {
  consultation: {
    title: "Consultation recommended",
    description: "Professional fitting ensures proper comfort and vision. Our optometrists are here to help."
  },
  related: {
    subtitle: "YOU MAY ALSO LIKE",
    title: "Related products"
  },
  cta: {
    title: "Ready to find your fit?",
    description: "Visit any clinic to try our full collection. No appointment needed for browsing.",
    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",
    secondaryButtonText: "Book appointment",
    secondaryButtonHref: "/book"
  }
};