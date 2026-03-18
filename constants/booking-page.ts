// constants/booking-page.ts

export const BOOKING_PAGE_CONFIG = {
  hero: {
    title: "Book your",
    titleHighlight: "appointment",
    description: "We'll confirm within 24 hours. Most medical aids accepted.",
    breadcrumb: "Book"
  },

  trustBadges: [
    { text: "Free cancellation", icon: "check" },
    { text: "24hr confirmation", icon: "clock" },
    { text: "All medical aids", icon: "card" }
  ],

  privacyNotice: {
    text: "Your information is collected for appointment purposes only. By booking, you acknowledge our",
    linkText: "Privacy Policy",
    linkHref: "/privacy"
  },

  rightColumn: {
    image: {
      src: "/assets/images/appointment-preview.jpg",
      alt: "Optometrist preparing for appointment",
      title: "Ready for your visit?",
      subtitle: "We'll take care of the rest."
    },
    quickInfo: [
      {
        icon: "clock",
        title: "Same-day appointments",
        description: "Call for availability"
      },
      {
        icon: "card",
        title: "Medical aid direct",
        description: "Bring your card"
      }
    ],
    emergency: {
      title: "Emergency eye care?",
      subtitle: "24/7 emergency line",
      phone: "+263 77 340 7464"
    },
    testimonial: {
      quote: "Booked online and got a call within an hour. Fast, friendly service.",
      name: "Tendai M.",
      rating: 5,
      image: "/assets/images/testimonial-farmer.jpg"
    }
  },

  whatToExpect: {
    subtitle: "YOUR VISIT",
    title: "What to expect",
    steps: [
      {
        number: 1,
        title: "Book online",
        description: "Choose your clinic, date, and time. We'll confirm within 24 hours."
      },
      {
        number: 2,
        title: "Visit the clinic",
        description: "Arrive 10 minutes early. Bring your medical aid card if applicable."
      },
      {
        number: 3,
        title: "Get your results",
        description: "Same-day glasses available. We'll explain everything clearly."
      }
    ]
  },

  clinicsSection: {
    subtitle: "OUR CLINICS",
    title: "Choose a location"
  },

  faqSection: {
    subtitle: "QUESTIONS?",
    title: "Before you book",
    faqs: [
      {
        question: "Do I need a referral?",
        answer: "No referral needed for routine eye exams. For specialist consultations, we'll advise when you book."
      },
      {
        question: "How do I cancel or reschedule?",
        answer: "Call us at +263 242 700 000 or reply to your confirmation SMS. Free cancellation up to 2 hours before.",
        phone: "+263 242 700 000"
      },
      {
        question: "What should I bring?",
        answer: "Bring your medical aid card, current glasses (if any), and a list of any medications you're taking."
      }
    ],
    moreButtonText: "More FAQs",
    moreButtonLink: "/contact"
  },

  finalCta: {
    title: "Prefer to call?",
    description: "We're here to help. Call us during business hours.",
    phone: "+263 242 700 000",
    emergencyText: "Emergency?",
    emergencyPhone: "+263 77 340 7464",
    emergencyNote: "(24/7)"
  }
};

export const BOOKING_CONFIRMATION_CONFIG = {
  header: {
    logo: "/assets/icons/logo-full.svg",
    alt: "Link Opticians"
  },
  
  success: {
    title: "Appointment requested",
    description: "We'll contact you within 24 hours to confirm.",
    icon: "success"
  },

  appointmentDetails: {
    title: "Appointment details",
    dateTimeLabel: "Date & time requested",
    locationLabel: "Location",
    statusLabel: "Status",
    referenceLabel: "Reference number",
    pendingStatus: "Pending confirmation"
  },

  nextSteps: {
    title: "Next steps",
    steps: [
      "We'll call you during business hours to confirm your appointment time.",
      "Have your medical aid card ready if applicable.",
      "Arrive 10 minutes before your confirmed appointment time."
    ]
  },

  actions: {
    returnHome: {
      text: "Return home",
      href: "/"
    },
    bookAnother: {
      text: "Book another",
      href: "/book"
    }
  },

  contact: {
    text: "Need to make changes?",
    mainPhone: "+263 242 700 000",
    emergencyPhone: "+263 77 340 7464",
    emergencyLabel: "Emergency:"
  },

  error: {
    title: "No booking reference found",
    message: "We couldn't find your appointment details.",
    buttonText: "Book an appointment",
    buttonHref: "/book"
  }
};