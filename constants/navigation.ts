// constants/navigation.ts
export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  description?: string;
}

// Main navigation links - only 5 items (home is handled by logo)
export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    description: "Eye exams, glasses, contact lenses"
  },
  {
    id: "products",
    label: "Products",
    href: "/products",
    description: "Frames, sunglasses, contact lenses"
  },
  {
    id: "locations",
    label: "Locations",
    href: "/locations",
    description: "Harare, Chipinge, Chiredzi"
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    description: "Est. 2008"
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    description: "Phone, email, find us"
  }
];

export const FOOTER_DATA = {
  tagline: "Eye care clinics in Zimbabwe",
  copyright: "© 2026 Link Opticians",
  links: [
    // Main sections
    { id: "home", label: "Home", href: "/" },
    { id: "services", label: "Services", href: "/services" },
    { id: "products", label: "Products", href: "/products" },
    { id: "locations", label: "Locations", href: "/locations" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
    
    // Utility
    { id: "emergency", label: "Emergency", href: "/emergency" },
    { id: "book", label: "Book online", href: "/book" },
    
    // Legal
    { id: "privacy", label: "Privacy Policy", href: "/privacy-policy" },
    { id: "terms", label: "Terms of Service", href: "/terms-of-service" },
    
    // Admin
    { id: "admin", label: "Admin", href: "/?admin=true" }
  ]
};

export const ADMIN_LINK = {
  label: "Admin",
  href: "/?admin=true"
};