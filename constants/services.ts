// constants/services.ts 
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  category: string;
}

export const SERVICES_DATA: Service[] = [
  {
    id: "eye-exam",
    title: "Eye Examinations",
    description: "Comprehensive vision testing and eye health assessment",
    features: [
      "Digital retinal imaging",
      "Glaucoma screening",
      "Prescription determination",
      "Eye pressure testing"
    ],
    icon: "/assets/icons/eye-exam.svg",
    category: "exams"
  },
  {
    id: "prescription-glasses",
    title: "Prescription Glasses",
    description: "Wide selection of frames for every style and budget",
    features: [
      "100+ frame styles",
      "Progressive lenses",
      "Blue light protection",
      "High-index options"
    ],
    icon: "/assets/icons/glasses.svg",
    category: "glasses"
  },
  {
    id: "contact-lens",
    title: "Contact Lenses",
    description: "Professional fitting and training for all lens types",
    features: [
      "Daily & monthly disposables",
      "Toric for astigmatism",
      "Multifocal options",
      "Colored contacts"
    ],
    icon: "/assets/icons/contact-lens.svg",
    category: "contacts"
  },
  {
    id: "pediatric",
    title: "Children's Eye Care",
    description: "Specialized care for developing vision",
    features: [
      "School vision screening",
      "Myopia management",
      "Pediatric frames",
      "Amblyopia treatment"
    ],
    icon: "/assets/icons/pediatric.svg",
    category: "specialized"
  },
  {
    id: "dry-eye",
    title: "Senior Eye Care",
    description: "Age-related vision care and cataract screening",
    features: [
      "Cataract evaluation",
      "Glaucoma monitoring",
      "Low vision aids",
      "Macular degeneration screening"
    ],
    icon: "/assets/icons/dry-eye.svg",
    category: "treatment"
  },
  {
    id: "emergency",
    title: "Emergency Eye Care",
    description: "Immediate attention for eye injuries and sudden vision changes",
    features: [
      "24/7 emergency line",
      "Eye injury treatment",
      "Sudden vision loss",
      "Foreign object removal"
    ],
    icon: "/assets/icons/emergency.svg",
    category: "emergency"
  },
  {
    id: "cataract",
    title: "Cataract Consultation",
    description: "Cataract consultation services",
    features: [
      "Cataract consultation services"
    ],
    icon: "/assets/icons/cataract.svg",
    category: "surgical"
  },
  {
    id: "low-vision",
    title: "Low Vision Services",
    description: "Low vision services",
    features: [
      "Low vision services"
    ],
    icon: "/assets/icons/low-vision.svg",
    category: "specialized"
  }
];

// Rest of your existing constants...
export const TECHNOLOGY_FEATURES = [
  "Digital retinal imaging",
  "Optical coherence tomography",
  "Auto-refraction",
  "Visual field analysis",
  "Corneal topography"
];

export const SERVICE_CATEGORIES = [
  "All Services",
  "Eye Exams",
  "Contact Lenses",
  "Glasses",
  "Treatment",
  "Pediatric",
  "Emergency",
  "Surgical"
];

export const INSURANCE_PARTNERS = [
  {
    name: "Medical Aid Coverage",
    description: "Medical aid coverage information available",
    coverage: "Coverage information available upon consultation",
    notes: "Plan information available"
  }
];

export const PAYMENT_OPTIONS = [
  "Payment options available",
  "Consultation required"
];

export const PRACTICE_FEATURES = [
  "Lens manufacturing services available",
  "Medical aid coverage information available",
  "Payment options available",
  "Frame repair services available",
  "Warranty information available"
];

// Homepage specific exports
export interface ServiceItem {
  id: string;
  image: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

export const HOME_SERVICES: ServiceItem[] = [
  {
    id: "comprehensive-exams",
    image: "/assets/images/service-exam.png",
    title: "Clinical Examinations",
    description: "Diagnostic testing and ocular health assessments.",
    href: "/services",
    category: "Diagnostics"
  },
  {
    id: "on-site-lab",
    image: "/assets/images/service-lab.png",
    title: "Precision In-House Lab",
    description: "State-of-the-art lens surfacing and same-day fitting services.",
    href: "/services",
    category: "Manufacturing"
  },
  {
    id: "glasses",
    image: "/assets/images/service-glasses.png",
    title: "Eyewear",
    description: "Curated frames and high-index therapeutic lens options.",
    href: "/products",
    category: "Products"
  },
  {
    id: "contact-lenses",
    image: "/assets/images/service-contact.png",
    title: "Specialty Contact Lenses",
    description: "Scleral, multifocal, and therapeutic fitting solutions.",
    href: "/services",
    category: "Specialized"
  }
];

export const SERVICES_PAGE_INTRO = {
  title: "What we offer",
  subtitle: "SERVICES",
  description: "From routine eye exams to specialized contact lens fittings. All services available at our Harare, Chipinge, and Chiredzi clinics."
};