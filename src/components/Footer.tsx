import React from 'react';
import { Mountain, Phone, MessageSquare, MapPin, Instagram, ShieldCheck, Heart } from 'lucide-react';
import logoImg from '../assets/images/kallingal_logo_1784836369394.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenBookingModal,
}) => {
  return (
    <footer className="bg-[#092C63] text-white pt-16 pb-8 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-800/80">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 shadow-md">
                <img
                  src={logoImg}
                  alt="Kallingal Trekking Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white tracking-tight">
                  Kallingal Trekking
                </h3>
                <p className="text-[10px] text-blue-200 tracking-widest uppercase font-semibold">
                  Banasura Hills, Wayanad, Kerala
                </p>
              </div>
            </div>

            <p className="text-xs text-blue-100/80 leading-relaxed font-light">
              Kerala's premier adventure tourism operator specializing in guided Banasura Peak summit climbs, waterfall trails, cloud ridge walks, and high-altitude camping expeditions.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/917034245415"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:+917034245415"
                className="p-2.5 rounded-full bg-[#1565C0] hover:bg-[#1976D2] text-white transition-colors"
                title="Call Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/kallingaltrekking"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white transition-colors"
                title="Follow on Instagram (@kallingaltrekking)"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              {['home', 'about', 'packages', 'weather', 'gallery', 'reviews', 'faq', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="hover:text-white transition-colors capitalize text-left focus:outline-none focus:underline"
                  >
                    • {id === 'faq' ? 'FAQ' : id === 'weather' ? 'Live Weather' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Packages Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Trek Packages
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li>
                <button onClick={() => onOpenBookingModal('Banasura Peak Summit Trek')} className="hover:text-white transition-colors text-left">
                  • Banasura Peak Summit Trek (2,073m)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBookingModal('Sunrise Ridge & Cloud Sea Trek')} className="hover:text-white transition-colors text-left">
                  • Sunrise Ridge & Cloud Sea Trek
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBookingModal('Meenmutty Waterfall & Mountain Trek')} className="hover:text-white transition-colors text-left">
                  • Meenmutty Waterfall Mountain Trail
                </button>
              </li>
              <li>
                <button onClick={() => onOpenBookingModal('Overnight Peak Camping & Expedition')} className="hover:text-white transition-colors text-left">
                  • Overnight Peak Camping & Expedition
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Basecamp
            </h4>
            <div className="text-xs text-blue-200 space-y-2 font-light">
              <a
                href="https://maps.google.com/?q=11.703624,75.944946"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1.5 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Padinjarathara, Banasura Hills, Wayanad</span>
              </a>
              <p className="font-semibold text-white">
                WhatsApp: +91 70342 45415
              </p>
              <p className="text-[11px] text-blue-300">
                Email: <a href="mailto:kallingaltrekking@gmail.com" className="underline hover:text-white">kallingaltrekking@gmail.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300 font-light">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Kallingal Trekking. All rights reserved. Designed &amp; developed by ShadowStack.web
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors focus:outline-none focus:underline"
            >
              Privacy Policy
            </button>
            <span className="text-blue-800">•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors focus:outline-none focus:underline"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
