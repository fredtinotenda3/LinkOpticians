// constants/testimonials.ts

export interface Testimonial {
  id: string;
  image: string;
  quote: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service?: string;
  date?: string;
}

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "amai-tembo",
    image: "/assets/images/testimonial-farmer.jpg",
    quote: "I can see my grandchildren clearly now. The mobile unit came to our village and changed my life.",
    name: "Amai Tembo",
    location: "Chipinge rural",
    rating: 5,
    service: "Mobile Unit",
    date: "2024"
  },
  {
    id: "mr-dube",
    image: "/assets/images/testimonial-teacher.jpg",
    quote: "The school screening program caught my vision problem early. Now I can teach without headaches.",
    name: "Mr. Dube",
    location: "Harare",
    rating: 5,
    service: "School Screening",
    date: "2024"
  },
  {
    id: "tendai-m",
    image: "/assets/images/testimonial-business.jpg",
    quote: "Professional service, affordable prices, and they accept my medical aid. Highly recommended.",
    name: "Tendai M.",
    location: "Chiredzi",
    rating: 5,
    service: "Eye Examination",
    date: "2024"
  },
  {
    id: "sekuru-chigumba",
    image: "/assets/images/testimonial-senior.jpg",
    quote: "After my cataract surgery consultation, I can finally read again. Thank you Link Opticians.",
    name: "Sekuru Chigumba",
    location: "Kensington",
    rating: 5,
    service: "Cataract Consultation",
    date: "2024"
  }
];

export const TESTIMONIALS_SECTION_CONFIG = {
  title: "What our patients say",
  subtitle: "PATIENT STORIES",
  showGradients: true
};

// You could also add featured testimonials for other pages
export const FEATURED_TESTIMONIALS = HOME_TESTIMONIALS.slice(0, 2); // First two for featured sections