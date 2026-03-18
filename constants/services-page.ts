// constants/services-page.ts
import { SERVICES_DATA } from "./services";

export const SERVICES_PAGE_CONFIG = {
  hero: {
    title: "Comprehensive",
    titleHighlight: "eye care services",
    description: "From routine eye exams to specialized contact lens fittings. All services available at our Harare, Chipinge, and Chiredzi clinics.",
    trustIndicators: [
      { text: "Registered optometrists", icon: "check" },
      { text: "Same-day appointments", icon: "clock" }
    ]
  },
  
  quickNav: {
    items: [
      { id: "eye-exams", label: "Eye exams" },
      { id: "glasses", label: "Glasses" },
      { id: "contact-lenses", label: "Contact lenses" },
      { id: "children", label: "Children" },
      { id: "seniors", label: "Seniors" },
      { id: "emergency", label: "Emergency" },
      { id: "lab", label: "Lab" },
      { id: "corporate", label: "Corporate" }
    ]
  },
  
  servicesGrid: {
    title: "Complete eye care",
    titleHighlight: "under one roof",
    subtitle: "WHAT WE OFFER",
    description: "From diagnosis to treatment to eyewear — everything you need for healthy vision.",
    services: SERVICES_DATA // We'll map this to the grid
  },
  
  laboratory: {
    title: "Most prescriptions ready",
    titleHighlight: "in under an hour",
    subtitle: "ON-SITE LABORATORY",
    description: "We don't send your lenses elsewhere. Our in-house lab means faster service and better quality control.",
    image: "/assets/images/stories/stories-lab-conference.png",
    imageAlt: "On-site lens laboratory",
    badge: "Same-day service",
    stats: [
      { value: "1hr", label: "Standard lenses" },
      { value: "24hr", label: "Progressives & speciality" },
      { value: "100%", label: "Quality checked" },
      { value: "5yr", label: "Warranty available" }
    ],
    buttonText: "Ask about our lab",
    buttonHref: "/contact?subject=lab"
  },
  
  corporate: {
    title: "Corporate eye care",
    titleHighlight: "programs",
    subtitle: "WORKPLACE HEALTH",
    description: "On-site vision screening for your employees. Boost productivity and safety.",
    image: "/assets/images/mission-bg.png",
    imageAlt: "Corporate eye screening",
    features: [
      {
        icon: "🏢",
        title: "On-site screenings",
        description: "We come to your workplace"
      },
      {
        icon: "👓",
        title: "Safety eyewear",
        description: "Industrial prescription glasses"
      },
      {
        icon: "📊",
        title: "Bulk discounts",
        description: "For companies with 10+ employees"
      }
    ],
    buttonText: "Inquire for your company",
    buttonHref: "/contact?subject=corporate"
  },
  
  legalNotice: {
    text: "Consultation required to determine appropriate services and costs. Medical aid claims processed according to individual plan coverage. Emergency services available 24/7. Please call for immediate assistance."
  },
  
  cta: {
    title: "Ready for clearer vision?",
    description: "Book your appointment today. Most medical aids accepted.",
    primaryButtonText: "Book online",
    primaryButtonHref: "/book",
    secondaryButtonText: "Find a clinic",
    secondaryButtonHref: "/locations"
  }
};