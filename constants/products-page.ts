import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from "./products";

export const PRODUCTS_PAGE_CONFIG = {
  hero: {
    title: "Eyewear",
    titleHighlight: "dispensing services",

    description:
      "Spectacle frames, sunglasses, and contact lenses available at our registered premises.",

    badge: "EST. 2008",

    categories: PRODUCT_CATEGORIES,
  },

  brands: [
    "Lacoste",
    "Ray-Ban",
    "Chanel",
    "Dior",
    "Calvin Klein",
    "Emporio Armani",
    "Prada",
    "Tiffany & Co.",
    "Bvlgari",
    "Cartier",
    "Montblanc",
    "Gucci",
    "FUBU",
    "Puma",
    "Oakley",
    "Nike",
  ],

  // ─────────────────────────────────────────────
  // FRAMES
  // ─────────────────────────────────────────────

  frames: {
    id: "frames",

    subtitle: "SPECTACLE FRAMES",

    title: "Spectacle frames",
    titleHighlight: "available",

    viewAllText: "View frame options",
    viewAllLink: "/products/frames",

    products: PRODUCTS_DATA
      .filter((p) => p.category === "frames")
      .slice(0, 4),
  },

  // ─────────────────────────────────────────────
  // PROTECTIVE EYEWEAR
  // ─────────────────────────────────────────────

  sunglasses: {
    id: "sunglasses",

    subtitle: "PROTECTIVE EYEWEAR",

    title: "Protective Eyewear",
    titleHighlight: "",

    description:
      "Prescription safety glasses, UV protection eyewear, and blue-light filtering solutions available following consultation with a registered optometrist.",

    products: PRODUCTS_DATA
      .filter((p) => p.category === "sunglasses")
      .slice(0, 4),
  },

  // ─────────────────────────────────────────────
  // CONTACT LENSES
  // ─────────────────────────────────────────────

  contactLenses: {
    id: "contact-lenses",

    subtitle: "CONTACT LENSES",

    title: "Contact lens",
    titleHighlight: "fitting services",

    description:
      "Contact lens options available following assessment of suitability by a registered optometrist. Daily, monthly, toric, and multifocal lenses dispensed at registered premises.",

    image: "/assets/images/contact-lenses-hero.png",

    imageAlt: "Contact lenses dispensed at Link Opticians",

    products: PRODUCTS_DATA
      .filter((p) => p.category === "contact-lenses")
      .slice(0, 4),

    buttonText: "Book contact lens assessment",
    buttonLink: "/book?service=contact-lenses",
  },

  // ─────────────────────────────────────────────
  // LENS TECHNOLOGY
  // ─────────────────────────────────────────────

  lensTechnology: {
    subtitle: "LENS OPTIONS",

    title: "Lens options",
    titleHighlight: "available",

    description:
      "Lens options manufactured at our on-site laboratory. Consultation with a registered optometrist required to determine appropriate lens type.",

    features: [
      {
        icon: "💻",

        title: "Blue light filtering lenses",

        description:
          "Lenses with blue light filtering properties. Availability subject to consultation.",

        bgColor: "bg-blue-500/20",
      },

      {
        icon: "☀️",

        title: "Photochromic lenses",

        description:
          "Lenses that adapt to light conditions. Availability subject to consultation.",

        bgColor: "bg-amber-500/20",
      },

      {
        icon: "🔄",

        title: "Progressive lenses",

        description:
          "Multifocal lenses for distance and near vision correction. Dispensed following prescription.",

        bgColor: "bg-green-500/20",
      },
    ],
  },

  // ─────────────────────────────────────────────
  // ACCESSORIES
  // ─────────────────────────────────────────────

  accessories: {
    id: "accessories",

    subtitle: "EYEWEAR ACCESSORIES",

    title: "Eyewear care",
    titleHighlight: "accessories",

    products: PRODUCTS_DATA
      .filter((p) => p.category === "accessories")
      .slice(0, 4),
  },

  // ─────────────────────────────────────────────
  // CTA
  // ─────────────────────────────────────────────

  cta: {
    title: "Visit our registered premises",

    description:
      "Spectacle frames and eyewear available for viewing at all clinic locations. Dispensing subject to valid prescription.",

    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",

    secondaryButtonText: "Book appointment",
    secondaryButtonHref: "/book",

    bgGradient: "from-green-600 to-green-700",
  },

  // ─────────────────────────────────────────────
  // DISCLAIMER
  // ─────────────────────────────────────────────

  disclaimer: {
    text:
      "All optical appliances are dispensed subject to a valid prescription issued by a registered optometrist or ophthalmologist. Medical aid claims are processed according to individual plan coverage. Link Opticians is registered with the Pharmacists Council of Zimbabwe.",
  },
};

export const PRODUCT_DETAIL_CONFIG = {
  consultation: {
    title: "Registered optometrist consultation required",

    description:
      " Optical appliances are dispensed following assessment by a registered optometrist. A valid prescription is required for corrective lenses.",
  },

  related: {
    subtitle: "ALSO AVAILABLE",
    title: "Related items",
  },

  cta: {
    title: "Visit our registered premises",

    description:
      "View our full range at any clinic location. Dispensing subject to valid prescription and registered practitioner assessment.",

    primaryButtonText: "Find a clinic",
    primaryButtonHref: "/locations",

    secondaryButtonText: "Book appointment",
    secondaryButtonHref: "/book",
  },
};