export interface OutreachProgram {
  id: string;
  title: string;
  description: string;
  target: string[];
  services: string[];
  frequency: string;
  image: string;
  impact: string;
}

export interface SchoolProgram {
  id: string;
  school: string;
  location: string;
  students: number;
  services: string[];
  findings: string[];
  image: string;
}

export interface CorporatePartner {
  id: string;
  name: string;
  industry: string;
  program: string;
  employees: number;
  image: string;
}

export const COMMUNITY_PROGRAMS: OutreachProgram[] = [
  {
    id: "school-screenings",
    title: "School Eye Health Services",
    description: "Information about vision screening services for school children",
    target: ["Primary schools", "Secondary schools", "Rural schools"],
    services: ["Basic vision screening", "Myopia detection", "Referral for treatment", "Eye health information"],
    frequency: "Services conducted during school terms",
    image: "/assets/images/community/school-screening.png",
    impact: "Vision screening services have been provided"
  },
  {
    id: "senior-screenings",
    title: "Vision Screening Services for Seniors",
    description: "Information about eye health services for elderly individuals in community centers",
    target: ["Senior citizens", "Retirement homes", "Community centers"],
    services: ["Cataract screening", "Glaucoma testing", "Presbyopia assessment", "Low vision evaluation"],
    frequency: "Monthly community services available",
    image: "/assets/images/community/senior-screening.png",
    impact: "Eye health services for seniors have been provided"
  },
  {
    id: "diabetes-awareness",
    title: "Diabetes Eye Health Information",
    description: "Information about diabetic retinopathy screening services",
    target: ["Individuals with diabetes", "Community health centers", "Workplaces"],
    services: ["Retinal photography", "Diabetes eye health information", "Referral to clinics", "Follow-up care"],
    frequency: "Quarterly services available",
    image: "/assets/images/community/diabetes-screening.png",
    impact: "Diabetes eye health services have been provided"
  },
  {
    id: "eyewear-donation",
    title: "Eyewear Services",
    description: "Information about eyewear services available",
    target: ["Families", "Rural communities", "School children"],
    services: ["Basic prescription glasses", "Reading glasses", "Sunglasses for UV protection"],
    frequency: "Ongoing services available",
    image: "/assets/images/community/eyewear-donation.png",
    impact: "Eyewear services have been provided"
  }
];

export const MOBILE_UNIT_DETAILS = {
  description: "Information about mobile eye care unit services.",
  features: [
    "Digital retinal camera",
    "Auto-refractor",
    "Slit lamp",
    "Visual acuity chart",
    "Frame selection",
    "Basic lens edging"
  ],
  coverage: [
    "Chipinge rural districts",
    "Chiredzi farming communities",
    "School health services",
    "Corporate wellness services",
    "Community health services"
  ],
  schedule: [
    "Schools: Weekdays during term",
    "Communities: Weekends and holidays",
    "Corporate: By arrangement",
    "Health services: Scheduled events"
  ],
  booking: "For mobile unit information: +263 77 340 7464 or community@linkopticians.co.zw"
};

export const SCHOOL_PROGRAMS: SchoolProgram[] = [
  {
    id: "chipinge-central",
    school: "Chipinge Central Primary",
    location: "Chipinge Town",
    students: 850,
    services: ["Vision screening", "Eye health information", "Referral follow-up"],
    findings: ["Vision services provided", "Referral services provided"],
    image: "/assets/images/community/chipinge-school.png"
  },
  {
    id: "sugar-estate",
    school: "Hippo Valley Estate School",
    location: "Chiredzi",
    students: 1200,
    services: ["Comprehensive screening", "Parent information sessions", "On-site follow-up"],
    findings: ["Vision services provided", "Eyewear services provided"],
    image: "/assets/images/community/estate-school.png"
  }
];

export const CORPORATE_PARTNERS: CorporatePartner[] = [
  {
    id: "tongaat",
    name: "Tongaat Hulletts",
    industry: "Sugar Production",
    program: "Industrial eye safety services provided",
    employees: 25000,
    image: "/assets/images/community/tongaat-partner.png"
  },
  {
    id: "tea-estate",
    name: "Eastern Highlands Tea Estates",
    industry: "Agriculture",
    program: "Farm worker eye health services provided",
    employees: 5000,
    image: "/assets/images/community/tea-estate.png"
  }
];

export const COMMUNITY_STATS = [
  { value: "16+", label: "Years of service" },
  { value: "Multiple", label: "Schools served" },
  { value: "Various", label: "Communities served" },
  { value: "5", label: "Districts served" }
];