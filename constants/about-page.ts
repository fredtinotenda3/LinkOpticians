// constants/about-page.ts
import { ABOUT_DATA, TEAM_MEMBERS, VALUES } from "./about";

export const ABOUT_PAGE_CONFIG = {
  hero: {
    title: "Our story,",
    titleHighlight: "our purpose",
    description: "From one clinic in 2008 to five locations across Zimbabwe. What started as a vision became a mission.",
    badge: "EST. 2008",
    badgeSubtext: "16 years serving Zimbabwe",
    stats: [
      { value: "2008", label: "Founded" },
      { value: "5", label: "Clinics" },
      { value: "16+", label: "Years" }
    ]
  },

  founder: {
    title: "Born in a crisis,",
    titleHighlight: "built to last",
    description: "In 2008, at the height of Zimbabwe's economic collapse, Dr. Richard Maveneka opened the first Link Opticians clinic. While others were closing doors, he saw an opportunity to serve.",
    quote: "People still needed to see. They still needed eye care. Economic hardship doesn't change that.",
    quoteAuthor: "Dr. Richard Maveneka",
    image: "/assets/images/about-frames.jpg",
    imageAlt: "Dr. Richard Maveneka, Founder",
    caption: "Dr. Richard Maveneka",
    captionSubtext: "Founder & Managing Director",
    milestones: [
      { year: "2008", text: "First clinic opened" },
      { year: "2011", text: "Expanded to 5 branches" },
      { year: "2018", text: "In-house lab launched" },
      { year: "2024", text: "Mobile unit deployed" }
    ]
  },

  missionValues: {
    subtitle: "OUR GUIDING PRINCIPLES",
    title: "Mission & values",
    description: "Everything we do is guided by our commitment to accessible eye care for all Zimbabweans.",
    mission: {
      title: "Our mission",
      text: "To make quality eye care accessible to every Zimbabwean, regardless of where they live or their ability to pay.",
      stats: [
        { value: "18+", label: "Years serving" },
        { value: "1k+", label: "Patients/year" }
      ]
    },
    values: VALUES
  },

  foundingTeam: {
    subtitle: "LEADERSHIP",
    title: "The people behind",
    titleHighlight: "Link Opticians",
    description: "Three visionaries who came together to build something that would outlast them.",
    members: [
      {
        name: "Dr. Richard Maveneka",
        role: "Founder & Managing Director",
        details: "57% shareholder • 16 years",
        image: "/assets/images/team-richard.jpg",
        tags: ["Optometry", "WCO Member"]
      },
      {
        name: "Dr. Patience Mhiribidi",
        role: "Executive Director",
        details: "29% shareholder",
        image: "/assets/images/team-patience.jpg",
        tags: ["Clinical Lead", "Pediatrics"]
      },
      {
        name: "Dr. Bismark Mateveke",
        role: "Non-Executive Director",
        details: "14% shareholder",
        image: "/assets/images/team-bismark.jpg",
        tags: ["Strategy", "Governance"]
      }
    ]
  },

  team: {
    subtitle: "OUR TEAM",
    title: "Meet the optometrists",
    description: "4 registered optometrists across 5 locations, each committed to your vision.",
    members: TEAM_MEMBERS
  },

// constants/about-page.ts - Fix the timeline events

timeline: {
  subtitle: "OUR JOURNEY",
  title: "Sixteen years of service",
  description: "From one small clinic to a trusted name in Zimbabwean eye care.",
  events: [
    {
      year: "2008",
      title: "The beginning",
      description: "Dr. Richard Maveneka opens the first Link Opticians clinic in Harare CBD. The economy is in crisis, but the need for eye care remains.",
      image: "/assets/images/timeline-2008.jpg",
      tags: ["1 clinic", "1 optometrist"],
      align: "right" as const  // Add 'as const' to fix the type
    },
    {
      year: "2011",
      title: "Rapid expansion",
      description: "Link grows to 7 branches across Zimbabwe. The team expands to meet growing demand for quality eye care.",
      image: "/assets/images/timeline-2011.jpg",
      tags: ["7 clinics", "4 optometrists"],
      align: "left" as const   // Add 'as const' to fix the type
    },
    {
      year: "2018",
      title: "In-house laboratory",
      description: "Major investment in on-site lens manufacturing. Same-day service becomes possible, costs come down.",
      image: "/assets/images/stories/stories-lab-conference.png",
      tags: ["Lab launched", "Same-day"],
      align: "right" as const  // Add 'as const' to fix the type
    },
    {
      year: "2024",
      title: "Mobile unit deployed",
      description: "Taking eye care to remote communities. The mobile unit begins serving villages that have never had access to optometry.",
      image: "/assets/images/timeline-2024.jpg",
      tags: ["8 districts", "50+ communities"],
      align: "left" as const   // Add 'as const' to fix the type
    }
  ]
},
  philosophy: {
    subtitle: "OUR PHILOSOPHY",
    title: "Eye care for all",
    description: "We believe that good vision isn't a luxury — it's a necessity. Whether you have medical aid or pay cash, whether you live in the city or a remote village, you deserve quality eye care.",
    pillars: [
      {
        icon: "👁️",
        title: "Accessible",
        description: "5 clinics + mobile unit"
      },
      {
        icon: "💳",
        title: "Affordable",
        description: "Medical aids accepted"
      },
      {
        icon: "🇿🇼",
        title: "For Zimbabwe",
        description: "Proudly serving since 2008"
      }
    ]
  },

  stats: ABOUT_DATA.stats,

  cta: {
    title: "Be part of our story",
    description: "Whether you need an eye exam or want to partner with us, we'd love to hear from you.",
    primaryButtonText: "Book appointment",
    primaryButtonHref: "/book",
    secondaryButtonText: "Contact us",
    secondaryButtonHref: "/contact",
    footerText: "EST. 2008 • 18+ years of serving Zimbabwe"
  }
};