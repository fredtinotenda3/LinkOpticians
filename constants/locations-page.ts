// constants/locations-page.ts
import { BRANCHES_DATA } from "./branches";

export const LOCATIONS_PAGE_CONFIG = {
  hero: {
    title: "Find a clinic",
    titleHighlight: "near you",
    description: "Harare • Chipinge • Chiredzi. Plus mobile unit serving rural communities.",
    badge: "3 CLINICS • 1 MOBILE UNIT",
    quickLinks: [
      { id: "robinson-house", label: "Robinson House", name: "Robinson" },
      { id: "kensington", label: "Kensington", name: "Kensington" },
      { id: "honey-dew", label: "Honey Dew", name: "Honey Dew" },
      { id: "chipinge", label: "Chipinge", name: "Chipinge" },
      { id: "chiredzi", label: "Chiredzi", name: "Chiredzi" },
      { id: "mobile-unit", label: "Mobile Unit", name: "Mobile Unit", isMobile: true }
    ]
  },

  clinicsGrid: {
    subtitle: "OUR CLINICS",
    title: "Three locations,",
    titleHighlight: "one standard of care",
    description: "Each clinic is fully equipped with modern diagnostic technology and staffed by registered optometrists.",
    clinics: BRANCHES_DATA.filter(b => b.id !== 'chipinge' && b.id !== 'chiredzi') // Harare clinics only
  },

  ruralClinics: {
    subtitle: "BEYOND HARARE",
    title: "Serving eastern Zimbabwe",
    description: "Permanent clinics in Chipinge and Chiredzi, plus mobile unit reaching remote communities.",
    clinics: BRANCHES_DATA.filter(b => b.id === 'chipinge' || b.id === 'chiredzi')
  },

  mobileUnit: {
    badge: "MOBILE UNIT",
    title: "Taking eye care",
    titleHighlight: "to the last mile",
    description: "Regular visits to remote communities in Chipinge, Chiredzi, and surrounding districts. No one is too far.",
    stats: [
      { value: "8", label: "Districts" },
      { value: "50+", label: "Communities" },
      { value: "15k+", label: "Patients" }
    ],
    features: [
      { text: "Full eye exams", icon: "check" },
      { text: "Glasses dispensing", icon: "check" },
      { text: "Diabetes screening", icon: "check" }
    ],
    buttons: [
      { text: "View schedule", href: "/community", primary: true },
      { text: "Call mobile unit", href: "tel:+263773407464", primary: false }
    ],
    schedulePreview: {
      stops: [
        { name: "Chipinge rural", icon: "🌽", frequency: "Monthly visits" },
        { name: "Chiredzi farms", icon: "🍭", frequency: "Bi-weekly" },
        { name: "Schools", icon: "📚", frequency: "School terms" },
        { name: "Community centers", icon: "🏘️", frequency: "Monthly" },
        { name: "Corporate sites", icon: "🏢", frequency: "Quarterly" }
      ],
      nextOutreach: {
        date: "15 March 2026",
        location: "Chipinge rural",
        time: "9am - 4pm"
      },
      contact: "+263 77 340 7464"
    }
  },

  comparisonTable: {
    subtitle: "AT A GLANCE",
    title: "Find your nearest clinic",
    headers: ["Location", "Hours", "Phone", "Parking", "Book"],
    rows: [
      {
        name: "Robinson House",
        hours: "Mon-Fri 8-6",
        phone: "+263 242 700 000",
        parking: "Street parking",
        bookLink: "/book?branch=robinson"
      },
      {
        name: "Kensington",
        hours: "Mon-Fri 8:30-5:30",
        phone: "+263 242 700 001",
        parking: "On-site",
        bookLink: "/book?branch=kensington"
      },
      {
        name: "Honey Dew",
        hours: "Mon-Sat 9-7",
        phone: "+263 242 700 002",
        parking: "Mall parking",
        bookLink: "/book?branch=honeydew"
      },
      {
        name: "Chipinge",
        hours: "Mon-Fri 8-5",
        phone: "+263 267 222 333",
        parking: "Street parking",
        bookLink: "/book?branch=chipinge"
      },
      {
        name: "Chiredzi",
        hours: "Mon-Fri 8-5",
        phone: "+263 312 444 555",
        parking: "On-site",
        bookLink: "/book?branch=chiredzi"
      }
    ]
  },

  cta: {
    title: "Visit us today",
    description: "Walk-ins welcome, but appointments guaranteed. Most medical aids accepted.",
    primaryButtonText: "Book appointment",
    primaryButtonHref: "/book",
    secondaryButtonText: "Contact us",
    secondaryButtonHref: "/contact",
    emergencyText: "Emergency?",
    emergencyPhone: "+263 77 340 7464",
    emergencyNote: "(24/7)"
  }
};

// Step 2: Create Branch detail page config
export const BRANCH_DETAIL_CONFIG = {
  quickInfoIcons: [
    { icon: "clock", label: "Weekdays" },
    { icon: "check", label: "Saturday" },
    { icon: "location", label: "Parking" },
    { icon: "phone", label: "Emergency" }
  ],
  
  aboutSection: {
    subtitle: "ABOUT THIS LOCATION",
    descriptions: {
      'robinson-house': {
        title: "City centre convenience",
        text: "Our flagship clinic in the heart of Harare CBD. Full-service optometry with on-site laboratory."
      },
      'kensington': {
        title: "Suburban comfort",
        text: "Quiet suburban location with easy access and ample parking. Perfect for those who prefer to avoid the CBD."
      },
      'honey-dew': {
        title: "Premium shopping destination",
        text: "Located in Zimbabwe's premier lifestyle centre. Shop, dine, and get your eye care all in one visit."
      },
      'chipinge': {
        title: "Gateway to the Eastern Highlands",
        text: "Serving the tea and coffee farming communities. Base for our mobile unit reaching remote areas."
      },
      'chiredzi': {
        title: "Serving the Lowveld community",
        text: "Supporting the sugar industry and local community with comprehensive eye care services."
      }
    }
  },

  servicesSection: {
    subtitle: "AVAILABLE SERVICES",
    title: "Services at",
    description: "All locations offer comprehensive eye care. Some services may vary by location."
  },

  teamSection: {
    subtitle: "YOUR CARE TEAM",
    title: "Optometrists at",
    description: "Meet all doctors"
  },

  facilitiesSection: {
    title: "Designed for your",
    titleHighlight: "comfort",
    accessibilityTitle: "Everyone is",
    accessibilityHighlight: "welcome"
  },

  nearbySection: {
    subtitle: "NEARBY",
    title: "Other locations",
    description: "Can't make it to this clinic? Try another location near you."
  },

  cta: {
    title: "Ready to visit?",
    description: "Book your appointment at",
    buttonText: "Book appointment",
    emergencyText: "Emergency?",
    emergencyPhone: "+263 77 340 7464",
    emergencyNote: "(24/7)"
  }
};