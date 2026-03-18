export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  bio?: string;
  education?: string[];
}

export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface PracticeService {
  id: string;
  title: string;
  description: string;
}

export const ABOUT_DATA = {
  hero: {
    title: "About Link Opticians",
    description: "Link Opticians provides optometry services. Established in 2008."
  },
  
  stats: [
    { id: "years", value: "16+", label: "Years in practice" },
    { id: "locations", value: "5", label: "Practice locations" },
    { id: "practitioners", value: "4", label: "Qualified practitioners" }
  ],
  
  story: "Link Opticians was established in 2008. The practice provides optometry services.",
  
  practiceServices: [
    {
      id: "comprehensive",
      title: "Eye Examinations",
      description: "Vision assessment and eye health services"
    },
    {
      id: "technology",
      title: "Eye Assessment",
      description: "Examination of eye health"
    },
    {
      id: "personalized",
      title: "Patient Consultation",
      description: "Discussion of eye health"
    },
    {
      id: "continuity",
      title: "Additional Appointments",
      description: "Follow-up services as needed"
    }
  ],
  
  community: {
    description: "Community eye health services:",
    initiatives: [
      "Vision screening services",
      "School eye health services",
      "Eyewear services",
      "Diabetes eye health services",
      "Community participation",
      "Workplace eye health services"
    ]
  },
  
  images: {
    clinicInterior: "/assets/images/clinic-interior.png",
    examRoom: "/assets/images/eye-exam-room.png",
    communityEvent: "/assets/images/community-event.png"
  }
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "richard-maveneka",
    name: "Dr. Richard Maveneka",
    role: "Optometrist",
    experience: "16 years in practice",
    specialty: "Eye examinations",
    image: "/assets/images/dr-sarah.jpg",
    bio: "Provision of optometry services.",
    education: ["Optometry qualification"]
  },
  {
    id: "taylor-mutaiwa",
    name: "Dr. Taylor Mutaiwa",
    role: "Optometrist",
    experience: "8 years in practice",
    specialty: "Eye examinations",
    image: "/assets/images/dr-taylor.jpeg",
    bio: "Provision of optometry services.",
    education: ["Optometry qualification"]
  },
  {
    id: "emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    role: "Optometrist",
    experience: "5+ years in practice",
    specialty: "Eye examinations",
    image: "/assets/images/dr-emily.jpg",
    bio: "Provision of optometry services.",
    education: ["Optometry qualification"]
  },
  {
    id: "lisa-thompson",
    name: "Lisa Thompson",
    role: "Optical Manager",
    experience: "10 years in practice",
    specialty: "Frame selection",
    image: "/assets/images/lisa-optical.jpg",
    bio: "Assistance with frame selection.",
    education: ["Optical qualification"]
  }
];

export const VALUES: Value[] = [
  {
    id: "patient-centered",
    title: "Patient Services",
    description: "Provision of optometry services.",
    icon: "👁️"
  },
  {
    id: "excellence",
    title: "Professional Standards",
    description: "Adherence to optometry standards.",
    icon: "⚕️"
  },
  {
    id: "communication",
    title: "Information Provision",
    description: "Explanation of eye health information.",
    icon: "📋"
  },
  {
    id: "community",
    title: "Community Services",
    description: "Participation in community eye health services.",
    icon: "🤝"
  }
];