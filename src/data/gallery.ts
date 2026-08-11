import banasuraPeakImg from '../assets/images/banasura_peak_1784836264060.jpg';
import meenmuttyImg from '../assets/images/meenmutty_waterfall_1784836276843.jpg';
import sunriseRidgeImg from '../assets/images/sunrise_ridge_1784836289711.jpg';
import overnightCampingImg from '../assets/images/overnight_camping_1784836355917.jpg';
import heroBanasuraImg from '../assets/images/hero_banasura_1784836251352.jpg';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Early Dawn & Sunrise' | 'Misty & Foggy Trail' | 'Bright & Clear Day' | 'Sunset & Night Skies';
  timing: string;
  weather: string;
  image: string;
  location: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: '5:30 AM - Pre-Dawn Torchlight Ascent',
    category: 'Early Dawn & Sunrise',
    timing: '5:30 AM • Pre-Dawn',
    weather: 'Chilly Wind & Starlit Sky',
    image: sunriseRidgeImg,
    location: 'Banasura Ridge Ascent Route',
    caption: 'Trekkers climbing under torchlight through cool night air to reach Banasura summit in time for sunrise.'
  },
  {
    id: 'g2',
    title: '6:15 AM - Golden Cloud Sea Inversion',
    category: 'Early Dawn & Sunrise',
    timing: '6:15 AM • Sunrise',
    weather: 'Golden Light & Dense Cloud Sea',
    image: sunriseRidgeImg,
    location: 'Banasura Eastern Crest',
    caption: 'First golden rays breaking through morning cloud inversions hovering over Banasura hills.'
  },
  {
    id: 'g3',
    title: '8:00 AM - Rolling Fog on Knife-Edge Ridge',
    category: 'Misty & Foggy Trail',
    timing: '8:00 AM • Morning',
    weather: 'Swirling Mountain Fog & 18°C',
    image: banasuraPeakImg,
    location: 'Banasura Summit Grassland Ridge',
    caption: 'Trekking along high altitude grassland ridges enveloped in cool, mystical monsoon mists.'
  },
  {
    id: 'g4',
    title: '10:30 AM - Shola Stream Cascade Flow',
    category: 'Misty & Foggy Trail',
    timing: '10:30 AM • Mid-Morning',
    weather: 'Shaded Mountain Trail',
    image: meenmuttyImg,
    location: 'Banasura Shola Cascade Trail',
    caption: 'Pure mountain stream flowing over granite rocks surrounded by lush green hills.'
  },
  {
    id: 'g5',
    title: '1:00 PM - Clear Blue Reservoir Islands View',
    category: 'Bright & Clear Day',
    timing: '1:00 PM • Afternoon',
    weather: 'Sunny & Clear 22°C',
    image: heroBanasuraImg,
    location: 'Banasura Peak Viewpoint',
    caption: 'Breathtaking 360-degree panorama of Banasura dam reservoir islands under bright, crisp sunshine.'
  },
  {
    id: 'g6',
    title: '3:30 PM - River Crossing on Shola Trail',
    category: 'Bright & Clear Day',
    timing: '3:30 PM • Late Afternoon',
    weather: 'Mild Sun & Refreshing Waters',
    image: meenmuttyImg,
    location: 'Banasura Mountain Stream',
    caption: 'Navigating smooth granite boulders along mountain streams with fresh, cool water.'
  },
  {
    id: 'g7',
    title: '6:00 PM - Sunset Horizon over Western Ghats',
    category: 'Sunset & Night Skies',
    timing: '6:00 PM • Twilight Dusk',
    weather: 'Golden Amber Glow & Breeze',
    image: overnightCampingImg,
    location: 'Banasura High Camp Lookout',
    caption: 'Vibrant orange and violet sunset shades sweeping over the rolling green crests of Banasura.'
  },
  {
    id: 'g8',
    title: '9:30 PM - Starlit High Campfire Night',
    category: 'Sunset & Night Skies',
    timing: '9:30 PM • Starlit Night',
    weather: 'Clear Starry Night & Warm Fire',
    image: overnightCampingImg,
    location: 'Banasura Base Camp',
    caption: 'Unwinding around a crackling campfire under unpolluted starry night skies atop Banasura hills.'
  }
];

