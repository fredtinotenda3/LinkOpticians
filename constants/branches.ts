// constants/branches.ts -

export interface BranchDetail {
  id: string;
  name: string;
  type: 'clinic' | 'mobile' | 'satellite';
  address: string;
  phone: string;
  email: string;
  operatingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    publicHolidays: string;
  };
  services: string[];
  specialties: string[];
  doctors: string[];
  facilities: string[];
  parking: string;
  accessibility: string[];
  notes?: string;
  mapUrl: string;
  image: string;
}

export const BRANCHES_DATA: BranchDetail[] = [
  {
    id: 'robinson-house',
    name: 'Robinson House Clinic',
    type: 'clinic',
    address: 'Shop 15 & 16 Robinson House, Cnr Angwa/K.Nkrumah, Harare CBD',
    phone: '+263 242 700 000',
    email: 'robinson@linkopticians.co.zw',
    operatingHours: {
      weekdays: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed',
      publicHolidays: 'Emergency services available'
    },
    services: [
      'Comprehensive eye examinations',
      'Contact lens fittings',
      'Pediatric eye care',
      'Emergency eye care',
      'Lens dispensing',
      'Frame dispensing',
      'Sunglasses'
    ],
    specialties: [
      'Primary eye care',
      'Lens dispensing',
      'Corporate eye care',
      'CBD location'
    ],
    doctors: ['Dr. Richard Maveneka', 'Dr. Taylor Mutaiwa'],
    facilities: [
      'Digital retinal imaging',
      'Optical coherence tomography',
      'Lens dispensing',
      'Frame selection',
      'Parking nearby'
    ],
    parking: 'Street parking available, secure parking nearby',
    accessibility: ['Wheelchair accessible', 'Elevator available'],
    notes: 'On-site lens dispensing available',
    mapUrl: 'https://maps.google.com/?q=Robinson+House+Angwa+Harare',
    image: '/assets/images/branches/robinson-house.png'
  },
  {
    id: 'kensington',
    name: 'Kensington Clinic',
    type: 'clinic',
    address: 'Corner of Argyle & Prince Edward Street, Kensington, Harare',
    phone: '+263 242 700 001',
    email: 'kensington@linkopticians.co.zw',
    operatingHours: {
      weekdays: '8:30 AM - 5:30 PM',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed',
      publicHolidays: 'By appointment only'
    },
    services: [
      'Comprehensive eye examinations',
      'Geriatric eye care',
      'Low vision services',
      'Frame dispensing',
      'Contact lens fittings'
    ],
    specialties: [
      'Geriatric eye care',
      'Frame dispensing',
      'Suburban location',
      'On-site parking'
    ],
    doctors: ['Dr. Emily Rodriguez'],
    facilities: [
      'Visual field testing',
      'Diagnostic equipment',
      'Frame selection',
      'Consultation rooms'
    ],
    parking: 'Parking on premises',
    accessibility: ['Wheelchair accessible', 'Ramp access'],
    notes: 'Clinic location in Kensington',
    mapUrl: 'https://maps.google.com/?q=Kensington+Harare+Argyle+Street',
    image: '/assets/images/branches/kensington.png'
  },
  {
    id: 'honey-dew',
    name: 'Honey Dew Lifestyle Centre',
    type: 'clinic',
    address: '16 Greendale Avenue, Honey Dew Lifestyle Centre, Greendale, Harare',
    phone: '+263 242 700 002',
    email: 'honeydew@linkopticians.co.zw',
    operatingHours: {
      weekdays: '9:00 AM - 7:00 PM',
      saturday: '9:00 AM - 6:00 PM',
      sunday: '10:00 AM - 4:00 PM',
      publicHolidays: '10:00 AM - 4:00 PM'
    },
    services: [
      'Frame dispensing',
      'Contact lens fittings',
      'Sunglasses',
      'Blue light protection lenses',
      'Eye examinations'
    ],
    specialties: [
      'Frame dispensing',
      'Weekend appointments',
      'Mall location'
    ],
    doctors: ['Dr. Richard Maveneka', 'Lisa Thompson (Optical Manager)'],
    facilities: [
      'Frame selection',
      'Eye care services',
      'Mall parking'
    ],
    parking: 'Secure mall parking',
    accessibility: ['Wheelchair accessible', 'Mall access'],
    notes: 'Weekend appointments available',
    mapUrl: 'https://maps.google.com/?q=Honey+Dew+Lifestyle+Centre+Greendale',
    image: '/assets/images/branches/honey-dew.png'
  },
  {
    id: 'chipinge',
    name: 'Chipinge Clinic',
    type: 'clinic',
    address: '93 Moodie Street, Chipinge Town, Eastern Highlands',
    phone: '+263 267 222 333',
    email: 'chipinge@linkopticians.co.zw',
    operatingHours: {
      weekdays: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Emergency services available',
      publicHolidays: 'Closed'
    },
    services: [
      'Community eye care',
      'Agricultural worker eye health',
      'School vision screenings',
      'Eyewear dispensing',
      'Mobile unit base'
    ],
    specialties: [
      'Community eye care',
      'Agricultural industry services',
      'Border town location'
    ],
    doctors: ['Dr. Local Practitioner'],
    facilities: [
      'Diagnostic equipment',
      'Frame repair',
      'Community room',
      'Generator backup'
    ],
    parking: 'Street parking available',
    accessibility: ['Ground floor access'],
    notes: 'Serving Chipinge district. Mobile unit based at this location.',
    mapUrl: 'https://maps.google.com/?q=Chipinge+Moodie+Street',
    image: '/assets/images/branches/chipinge.png'
  },
  {
    id: 'chiredzi',
    name: 'Chiredzi Clinic',
    type: 'clinic',
    address: '361 Mopani Drive, Chiredzi CBD, Lowveld',
    phone: '+263 312 444 555',
    email: 'chiredzi@linkopticians.co.zw',
    operatingHours: {
      weekdays: '8:00 AM - 5:00 PM',
      saturday: '8:00 AM - 12:00 PM',
      sunday: 'Emergency services available',
      publicHolidays: 'Closed'
    },
    services: [
      'Industrial eye safety',
      'Diabetes eye screening',
      'Agricultural worker care',
      'Eyewear dispensing',
      'Emergency repairs'
    ],
    specialties: [
      'Industrial eye care',
      'Agricultural worker health',
      'Diabetes screening'
    ],
    doctors: ['Dr. Local Practitioner'],
    facilities: [
      'Industrial safety equipment',
      'Diabetes screening tools',
      'Repair services',
      'Air conditioning'
    ],
    parking: 'On-site parking available',
    accessibility: ['Ground floor access'],
    notes: 'Serving Tongaat Hulletts employees and local community',
    mapUrl: 'https://maps.google.com/?q=Chiredzi+Mopani+Drive',
    image: '/assets/images/branches/chiredzi.png'
  }
];

export const MOBILE_UNIT_DATA = {
  description: 'Mobile eye care unit providing services to various communities.',
  services: [
    'Basic eye screenings',
    'School vision testing',
    'Community health services',
    'Geriatric vision care',
    'Remote area services'
  ],
  coverage: [
    'Chipinge rural districts',
    'Chiredzi areas',
    'School health programs',
    'Corporate wellness programs',
    'Community outreach'
  ],
  schedule: 'Schedule varies. Contact for current schedule.',
  contact: 'Mobile unit inquiries: +263 77 340 7464',
  image: '/assets/images/branches/mobile-unit.png'
};

export const BRANCH_CATEGORIES = [
  { id: 'all', label: 'All Locations' },
  { id: 'harare', label: 'Harare Clinics' },
  { id: 'rural', label: 'Rural Clinics' },
  { id: 'mobile', label: 'Mobile Services' }
];