// constants/products-page.ts
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from "./products";

export const PRODUCTS_PAGE_CONFIG = {
  hero: {
    // S.I. 63 s.6(2): factual, not misleading, dignified, no reference to efficiency
    title: "Eyewear",
    titleHighlight: "dispensing services",
    description: "Spectacle frames, sunglasses, and contact lenses available at our registered premises. Dispensed by registered optometrists and dispensing opticians.",
    badge: "REGISTERED OPTOMETRY PRACTICE • EST. 2008",
    categories: PRODUCT_CATEGORIES
  },

  // S.I. 63 s.6: brand names are factual statements, not claims of superiority
  brands: [
    "Ray-Ban", "Oakley", "Persol", "Vogue", "Arnette", "Oliver Peoples"
  ],

  frames: {
    id: "frames",
    subtitle: "SPECTACLE FRAMES",
    // S.I. 63 s.6(2): no efficiency claims — factual description only
    title: "Spectacle frames",
    titleHighlight: "available",
    viewAllText: "View frame options",
    viewAllLink: "/products/frames",
    products: PRODUCTS_DATA.filter(p => p.category === 'frames').slice(0, 4)
  },

  sunglasses: {
    id: "sunglasses",
    subtitle: "PROTECTIVE EYEWEAR",
    // S.I. 63 Second Schedule Part I s.5: dispensing optician may advise on protective eyewear
    title: "Protective",
    titleHighlight: "eyewear",
    products: PRODUCTS_DATA.filter(p => p.category === 'sunglasses').slice(0, 4)
  },

  contactLenses: {
    id: "contact-lenses",
    subtitle: "CONTACT LENSES",
    // S.I. 63 Second Schedule Part II s.12: optometrist assesses suitability and fits contact lenses
    title: "Contact lens",
    titleHighlight: "fitting services",
    description: "Contact lens options available following assessment of suitability by a registered optometrist. Daily, monthly, toric, and multifocal lenses dispensed at registered premises.",
    image: "/assets/images/contact-lenses-hero.jpg",
    imageAlt: "Contact lenses dispensed at Link Opticians",
    products: PRODUCTS_DATA.filter(p => p.category === 'contact-lenses').slice(0, 4),
    // S.I. 63 s.7: directional information is permitted
    buttonText: "Book contact lens assessment",
    buttonLink: "/book?service=contact-lenses"
  },

  lensTechnology: {
    subtitle: "LENS OPTIONS",
    // S.I. 63 s.6(2): factual description of available lens types, no efficiency claims
    title: "Lens options",
    titleHighlight: "available",
    description: "Lens options manufactured at our on-site laboratory. Consultation with a registered optometrist required to determine appropriate lens type.",
    features: [
      {
        icon: "💻",
        // S.I. 63 Second Schedule Part I s.5: dispensing optician may advise on screen eyewear
        title: "Blue light filtering lenses",
        description: "Lenses with blue light filtering properties. Availability subject to consultation.",
        bgColor: "bg-blue-500/20"
      },
      {
        icon: "☀️",
        title: "Photochromic lenses",
        description: "Lenses that adapt to light conditions. Availability subject to consultation.",
        bgColor: "bg-amber-500/20"
      },
      {
        icon: "🔄",
        // S.I. 63 Second Schedule Part I s.3: dispensing optician may advise on progressive lenses
        title: "Progressive lenses",
        description: "Multifocal lenses for distance and near vision correction. Dispensed following prescription.",
        bgColor: "bg-green-500/20"
      }
    ]
  },

  accessories: {
    id: "accessories",
    subtitle: "EYEWEAR ACCESSORIES",
    title: "Eyewear care",
    titleHighlight: "accessories",
    products: PRODUCTS_DATA.filter(p => p.category === 'accessories').slice(0, 4)
  },

  cta: {
    // S.I. 63 s.7(b): directional information to premises is permitted
    title: "Visit our registered premises",
    description: "Spectacle frames and eyewear available for viewing at all clinic locations. Dispensing subject to valid prescription.",
    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",
    secondaryButtonText: "Book appointment",
    secondaryButtonHref: "/book",
    bgGradient: "from-green-600 to-green-700"
  },

  disclaimer: {
    // S.I. 63 s.6(2) and Second Schedule: factual compliance notice
    text: "All optical appliances are dispensed subject to a valid prescription issued by a registered optometrist or ophthalmologist. The sale of optical appliances to correct a defect of sight may only be effected by or under the supervision of a registered dispensing optician. Medical aid claims processed according to individual plan coverage. Link Opticians is registered with the Pharmacists Council of Zimbabwe."
  }
};

// Product detail page config
export const PRODUCT_DETAIL_CONFIG = {
  consultation: {
    // S.I. 63 s.18 and Second Schedule: duties of registered members
    title: "Registered optometrist consultation required",
    description: "Optical appliances are dispensed following assessment by a registered optometrist or dispensing optician. A valid prescription is required for corrective lenses."
  },
  related: {
    subtitle: "ALSO AVAILABLE",
    title: "Related items"
  },
  cta: {
    // S.I. 63 s.7(b): directional signs to premises are permitted
    title: "Visit our registered premises",
    description: "View our full range at any clinic location. Dispensing subject to valid prescription and registered practitioner assessment.",
    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",
    secondaryButtonText: "Book appointment",
    secondaryButtonHref: "/book"
  }
};