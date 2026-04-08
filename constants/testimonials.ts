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
    quote: "The mobile unit came to our village in Chipinge. I can see clearly now—the care was truly professional.",
    name: "Amai Tembo",
    location: "Chipinge District",
    rating: 5,
  },
  {
    id: "tendai-m",
    image: "/assets/images/testimonial-teacher.jpg",
    quote: "Very professional service in Chiredzi. They accepted my medical aid immediately and the glasses were ready fast.",
    name: "Tendai M.",
    location: "Chiredzi Branch",
    rating: 5,
  },
  {
    id: "mr-dube",
    image: "/assets/images/testimonial-business.jpg",
    quote: "Excellent clinical care at the Kensington clinic. The lead optometrist explained everything so clearly.",
    name: "Mr. Dube",
    location: "Kensington, Harare",
    rating: 5,
  },
  {
    id: "sekuru-chigumba",
    image: "/assets/images/testimonial-senior.jpg",
    quote: "The best eye care in Zimbabwe. The in-house lab made my specialty lenses perfectly. Highly recommended.",
    name: "Sekuru Chigumba",
    location: "Harare CBD",
    rating: 5,
  }
];

export const TESTIMONIALS_SECTION_CONFIG = {
  title: "What our patients say",
  subtitle: "PATIENT STORIES",
  showGradients: true
};

// You could also add featured testimonials for other pages
export const FEATURED_TESTIMONIALS = HOME_TESTIMONIALS.slice(0, 2); // First two for featured sections