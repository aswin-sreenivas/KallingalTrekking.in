export interface TrekPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  pricePerJeep: number;
  capacity: string;
  vehicle: string;
  route: string;
  pickupInfo: string;
  image: string;
  features: string[];
  inclusions: string[];
  description: string;
}

export interface KeyHighlight {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

import banasuraPeakImg from '../assets/images/banasura_peak_1784836264060.jpg';
import heroBanasuraImg from '../assets/images/hero_banasura_1784836251352.jpg';
import meenmuttyImg from '../assets/images/meenmutty_waterfall_1784836276843.jpg';

export const SINGLE_PACKAGE: TrekPackage = {
  id: 'banasura-jeep-safari-trek',
  name: 'Banasura Jeep Safari & Hilltop Trek',
  tagline: 'Experience exciting 4x4 off-road trails through Banasura hills leading to stunning hilltop vistas.',
  duration: 'Approx. 1 Hour',
  pricePerJeep: 2500,
  capacity: '1 Jeep: 8 Persons (including driver)',
  vehicle: 'Private 4×4 Jeep',
  route: '6 km Jeep Ride + 500 m Trek',
  pickupInfo: 'Free pickup within 8 km of starting point (extra charges apply beyond 8 km)',
  image: heroBanasuraImg,
  features: [
    'Private 4x4 Mahindra Jeep for your group',
    'Thrilling 6 km mountain off-road trail',
    'Guided 500 m nature walk to hilltop viewpoint',
    'Experienced local driver & wilderness guide',
    'Free pickup within 8 km of basecamp'
  ],
  inclusions: [
    'Private 4x4 Jeep with dedicated driver',
    '6 km off-road safari & 500 m guided trek',
    'Free pickup within 8 km',
    'Trail access & safety guidance'
  ],
  description: 'Embark on the ultimate Banasura adventure! Ride in a powerful private 4x4 Jeep through rugged mud trails, scenic plantations, and mountain roads, followed by a short 500 m trek to a panoramic hilltop viewpoint overlooking the Wayanad valley.'
};

export const KEY_HIGHLIGHTS: KeyHighlight[] = [
  {
    id: 'h1',
    title: 'Powerful 4×4 Jeep',
    description: 'Rugged high-clearance Mahindra 4x4 built to conquer steep mountain gradients easily.',
    iconName: 'Car'
  },
  {
    id: 'h2',
    title: 'Mountain Trail Adventure',
    description: 'Traverse scenic hill trails, aromatic coffee estates, and untouched wilderness.',
    iconName: 'Trees'
  },
  {
    id: 'h3',
    title: 'Mud Off-road Experience',
    description: 'Get an adrenaline rush traversing thrilling muddy tracks and rocky stream crossings.',
    iconName: 'Compass'
  },
  {
    id: 'h4',
    title: 'Hilltop Viewpoint',
    description: 'Enjoy panoramic 360° cloud views of Banasura Sagar dam lake and surrounding peaks.',
    iconName: 'Mountain'
  },
  {
    id: 'h5',
    title: 'Experienced Local Driver',
    description: 'Native Wayanad drivers with years of expertise navigating rugged mountain roads safely.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'h6',
    title: 'Private Jeep Experience',
    description: 'Exclusively for your family or friend group — no sharing with strangers.',
    iconName: 'Users'
  },
  {
    id: 'h7',
    title: 'Affordable Group Pricing',
    description: 'Just ₹2,500 total for the entire Jeep carrying up to 8 persons (including driver).',
    iconName: 'Tag'
  },
  {
    id: 'h8',
    title: 'Perfect for Families & Friends',
    description: 'Suitable for all age groups, kids, and elders looking for fun and nature.',
    iconName: 'Smile'
  }
];

export const TREK_PACKAGES: TrekPackage[] = [SINGLE_PACKAGE];

