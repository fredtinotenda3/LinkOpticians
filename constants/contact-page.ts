// constants/contact-page.ts
import { FAQ_DATA } from "./contact";

export const CONTACT_PAGE_CONFIG = {
  hero: {
    title: "Get in",
    titleHighlight: "touch",
    description: "Questions? Appointments? We're here to help.",
    emergencyText: "Emergency?",
    emergencyPhone: "0737 683 090",
    emergencyBadge: "24/7"
  },

  contactMethods: {
    phone: {
      title: "Call us",
      number: "0242 757558",
      hours: "Mon-Fri, 8am-6pm",
      icon: "phone"
    },
    whatsapp: {
      title: "WhatsApp",
      description: "Quickest response",
      subtext: "Typically replies within minutes",
      status: "Online now",
      icon: "whatsapp"
    },
    email: {
      title: "Email",
      address: "linkoptical@gmail.com",
      responseTime: "24-48 hour response",
      icon: "email"
    },
    visit: {
      title: "Visit a clinic",
      locations: "3 locations",
      locationNames: "Harare • Chipinge • Chiredzi",
      icon: "location"
    }
  },

  contactInfo: {
    subtitle: "GET IN TOUCH",
    title: "Contact information",
    mainClinic: {
      name: "Main clinic",
      address: "Shop 15 & 16 Robinson House, Cnr Angwa/K.Nkrumah, Harare",
      phone: "0242 757558",
      email: "linkoptical@gmail.com"
    },
    hours: {
      weekdays: "Monday - Friday: 8:00 - 18:00",
      saturday: "Saturday: 9:00 - 13:00",
      sunday: "Sunday: Closed (emergencies only)"
    },
    emergency: {
      title: "24/7 Emergency",
      description: "For eye injuries, sudden vision loss, or severe pain",
      phone: "0737 683 090"
    }
  },

  locations: {
    subtitle: "FIND US",
    title: "Our locations",
    viewAllText: "View all locations",
    locations: [
      {
        id: "robinson-house",
        name: "Robinson House",
        area: "Harare CBD",
        address: "Shop 15 & 16 Robinson House",
        icon: "🏥"
      },
      {
        id: "kensington",
        name: "Kensington",
        area: "Harare",
        address: "Corner Argyle & Prince Edward",
        icon: "🏡"
      },
      {
        id: "honey-dew",
        name: "Honey Dew",
        area: "Greendale",
        address: "16 Greendale Avenue",
        icon: "🛍️"
      },
      {
        id: "chipinge",
        name: "Chipinge",
        area: "Eastern Highlands",
        address: "93 Moodie Street",
        icon: "⛰️"
      },
      {
        id: "chiredzi",
        name: "Chiredzi",
        area: "Lowveld",
        address: "361 Mopani Drive",
        icon: "🌾"
      }
    ]
  },

  faq: {
    subtitle: "QUESTIONS?",
    title: "Frequently asked",
    faqs: FAQ_DATA,
    stillQuestions: "Still have questions?",
    contactButtonText: "Contact us directly"
  },

  cta: {
    title: "Ready to see clearly?",
    description: "Book your appointment today. Most medical aids accepted.",
    primaryButtonText: "Book online",
    primaryButtonHref: "/book",
    secondaryButtonText: "Find a clinic",
    secondaryButtonHref: "/locations",
    emergencyText: "Emergency? Call",
    emergencyPhone: "0737 683 090",
    emergencyNote: "(24/7)"
  }
};