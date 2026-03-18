export interface HomeServicePreview {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const HOME_SERVICES_PREVIEW: HomeServicePreview[] = [
  {
    id: "eye-exam",
    title: "Eye Examinations",
    description: "Comprehensive eye examinations.",
    icon: "/assets/icons/eye.svg"
  },
  {
    id: "contact-lens",
    title: "Contact Lens Services",
    description: "Contact lens fitting and assessment.",
    icon: "/assets/icons/contact-lens.svg"
  },
  {
    id: "prescription-glasses",
    title: "Prescription Glasses",
    description: "Dispensing of prescription spectacles.",
    icon: "/assets/icons/glasses.svg"
  },
  {
    id: "dry-eye",
    title: "Dry Eye Services",
    description: "Assessment and management of dry eye conditions.",
    icon: "/assets/icons/dry-eye.svg"
  },
  {
    id: "pediatric",
    title: "Pediatric Services",
    description: "Eye care for pediatric patients.",
    icon: "/assets/icons/pediatric.svg"
  },
  {
    id: "emergency",
    title: "Emergency Services",
    description: "Management of ocular emergencies and sudden vision changes.",
    icon: "/assets/icons/emergency.svg"
  }
];

export const HOME_HERO_DATA = {
  title: "Link Opticians",
  description: "A registered optometry practice.",
  primaryCta: {
    text: "Book Appointment",
    href: "/book"
  },
  secondaryCta: {
    text: "Our Services",
    href: "/services"
  },
  image: {
    src: "/assets/images/eye-care-hero.png",
    alt: "Optometrist conducting eye examination"
  }
};