export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  packageTaken: string;
  comment: string;
  avatar: string;
  verified: boolean;
  trekkerPhoto?: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Anand Viswanathan',
    location: 'Bangalore, Karnataka',
    rating: 5,
    date: 'June 2026',
    packageTaken: 'Banasura Peak Summit Trek',
    comment: 'Hands down the best trekking team in Kerala! The Kallingal guides know every inch of Banasura Hills. Their 4x4 Jeep transfer made getting to basecamp seamless. The summit views above the clouds were mind-blowing.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'r2',
    name: 'Pooja Nair',
    location: 'Kochi, Kerala',
    rating: 5,
    date: 'May 2026',
    packageTaken: 'Sunrise Ridge & Cloud Sea Trek',
    comment: 'We started at 5 AM under the stars and reached the ridge just in time for sunrise. Watching the sea of clouds below us with hot Malabar tea prepared by our guide was pure magic. Professional and super safe for women groups.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'r3',
    name: 'David & Sarah Miller',
    location: 'London, UK',
    rating: 5,
    date: 'April 2026',
    packageTaken: 'Overnight Peak Camping & Expedition',
    comment: 'An incredible 2-day experience in Wayanad! The camping gear provided was clean and high quality. Campfire under the starry sky and waking up above the mist is something we will treasure forever. Booking via WhatsApp was instant.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'r4',
    name: 'Rahul Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: 'May 2026',
    packageTaken: 'Meenmutty Waterfall & Mountain Trek',
    comment: 'Great half-day trek with family including my 11-year-old son. The guide ensured everyone was comfortable during stream crossings. The hidden waterfall pool was so refreshing after the hike. Highly recommend Kallingal!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    verified: true
  },
  {
    id: 'r5',
    name: 'Dr. Sreedhar Menon',
    location: 'Trivandrum, Kerala',
    rating: 5,
    date: 'March 2026',
    packageTaken: 'Banasura Lake & Hill Circuit',
    comment: 'Punctual pickup, excellent safety equipment, deep local knowledge, and eco-friendly practices. Kallingal Trekking represents the gold standard for adventure tourism in South India.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    verified: true
  }
];
