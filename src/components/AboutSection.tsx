import React from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Sparkles, Navigation } from 'lucide-react';
import banasuraPeakImg from '../assets/images/banasura_peak_1784836264060.jpg';

interface AboutProps {
  onOpenBookingModal: () => void;
}

export const AboutSection: React.FC<AboutProps> = ({ onOpenBookingModal }) => {
  const highlights = [
    {
      title: 'Native Wayanad Guides',
      desc: 'Our certified guide team was raised at the foothills of Banasura, possessing unrivaled knowledge of wilderness trails and weather patterns.',
    },
    {
      title: 'Official Permits & Clearance',
      desc: 'We manage all necessary permissions, permits, and entry passes so your trek is 100% legal and hassle-free.',
    },
    {
      title: '4x4 Off-Road Jeep Support',
      desc: 'Reach basecamp effortlessly in our high-clearance 4x4 Mahindra Jeeps engineered for rugged mountain paths.',
    },
    {
      title: 'Leave-No-Trace Eco Commitment',
      desc: 'We strictly practice sustainable eco-tourism, protecting the fragile mountain flora and fauna for future generations.',
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
            Banasura Hills, Wayanad – More About the Destination
          </h2>
          <div className="mt-3 sm:mt-5 text-xs sm:text-lg text-gray-600 leading-relaxed space-y-3">
            <p>
              Banasura Hills is one of the most beautiful and naturally diverse mountain regions in Wayanad, Kerala. Located in the Western Ghats, the area is known for its impressive mountain landscapes, lush greenery, mist-covered peaks, open grasslands, dense forest areas and rugged rocky terrain.
            </p>
            <p>
              The hills offer a constantly changing landscape as you travel higher. During clear weather, visitors can enjoy wide panoramic views of the surrounding valleys, mountains, villages and Banasura Sagar Dam. During the monsoon and misty seasons, the hills take on a completely different character, with clouds and fog moving across the mountain slopes.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Composite */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white">
              <img
                src={banasuraPeakImg}
                alt="Banasura Peak Summit Trek"
                className="w-full h-[260px] xs:h-[320px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-[#1565C0] px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">
                  2,073m Elevation
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl mt-2">
                  Banasura Hills, Wayanad
                </h3>
              </div>
            </div>

            {/* Decorative Blue Circle Accent */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200/50 rounded-full blur-2xl -z-10" />
          </div>

          {/* Text & Features */}
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 leading-snug">
              Why Kallingal Trekking Is The #1 Choice For Banasura Expeditions
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Banasura Peak is the second highest mountain peak in Wayanad, renowned for its steep grassy spurs, cascading streams, and scenic hill slopes. Navigating these wild slopes requires certified guidance, local permissions, and mountain wilderness experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-3 p-3.5 rounded-xl bg-white border border-blue-50 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-5 h-5 text-[#1565C0] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#0D47A1]">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBookingModal}
                className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-7 py-3.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>Plan Your Trek Via WhatsApp</span>
                <Navigation className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Advance Cancellation Fee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
