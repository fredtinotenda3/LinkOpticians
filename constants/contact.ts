// constants/contact.ts - 

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  id: string;
  title: string;
  details: string;
  icon: string;
  action?: {
    type: "tel" | "mailto" | "url";
    value: string;
  };
}

export const CONTACT_DATA = {
  hero: {
    title: "Contact Information",
    description: "Contact details for Link Opticians practices."
  },
  
  contactInfo: [
    {
      id: "phone",
      title: "Telephone",
      details: "Main: +263 242 700 000\nEmergency: +263 77 340 7464",
      icon: "/assets/icons/phone.svg",
      action: { type: "tel", value: "+263242700000" }
    },
    {
      id: "email",
      title: "Email",
      details: "General Inquiries: info@linkopticians.co.zw\nAppointments: appointments@linkopticians.co.zw",
      icon: "/assets/icons/email.svg",
      action: { type: "mailto", value: "info@linkopticians.co.zw" }
    },
    {
      id: "hours",
      title: "Operating Hours",
      details: "Monday-Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: By prior arrangement for emergencies",
      icon: "/assets/icons/clock.svg"
    }
  ],
  
  map: {
    title: "Harare Main Practice",
    address: "Shop 15 & 16 Robinson House, Cnr Angwa / K.Nkrumah, Harare, Zimbabwe",
    placeholder: "Practice location map",
    directionsUrl: "https://maps.google.com/?q=Robinson+House+Angwa+Harare"
  },
  
  phone: {
    main: "+263 242 700 000",
    emergency: "+263 77 340 7464"
  },
  
  emergency: {
    title: "Emergency Eye Care",
    subtitle: "For urgent eye care requirements outside standard hours.",
    appointmentReason: "Emergency"
  }
};

export const FAQ_DATA: FAQ[] = [
  {
    id: "appointment",
    question: "How can I schedule an appointment?",
    answer: "Appointments can be requested via the online form, by telephone, or in person at any of our practices.",
    category: "Appointments"
  },
  {
    id: "emergency",
    question: "Do you provide emergency eye care?",
    answer: "Emergency consultations are available. Please call the emergency number for immediate assistance.",
    category: "Services"
  },
  {
    id: "insurance",
    question: "Do you accept medical aid?",
    answer: "We accept most major medical aid schemes. Cash payment is also available. Please bring your medical aid details to your appointment.",
    category: "Payment"
  },
  {
    id: "location",
    question: "Where are your practices located?",
    answer: "We have practices in Harare, Chipinge, and Chiredzi. A mobile clinic service operates in surrounding areas.",
    category: "Practice"
  },
  {
    id: "hours",
    question: "What are your opening times?",
    answer: "Standard hours are Monday to Friday, 8:00 AM to 6:00 PM. Saturday hours are 9:00 AM to 1:00 PM. Hours may vary by location.",
    category: "Practice"
  }
];

export const CONTACT_FORM_SUBJECTS = [
  { value: "appointment", label: "Appointment Request" },
  { value: "general", label: "General Inquiry" },
  { value: "billing", label: "Billing Inquiry" },
  { value: "feedback", label: "Feedback" }
];

export const APPOINTMENT_TYPES = [
  { value: "routine", label: "Routine Eye Examination" },
  { value: "contact-lens", label: "Contact Lens Consultation" },
  { value: "emergency", label: "Emergency Consultation" },
  { value: "follow-up", label: "Follow-up Visit" },
  { value: "specialized", label: "Specialist Consultation" }
];