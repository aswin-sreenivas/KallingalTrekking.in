import React from 'react';
import { 
  Car, 
  Compass, 
  Mountain, 
  ShieldCheck, 
  Users, 
  Tag, 
  Smile, 
  Clock, 
  MapPin, 
  Check, 
  ArrowRight, 
  Sparkles,
  TreePine,
  Navigation
} from 'lucide-react';
import { SINGLE_PACKAGE, KEY_HIGHLIGHTS } from '../data/packages';

interface PackagesSectionProps {
  onOpenBookingModal: (packageName?: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onOpenBookingModal }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-6 h-6 text-[#1565C0]" />;
      case 'Trees': return <TreePine className="w-6 h-6 text-[#1565C0]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#1565C0]" />;
      case 'Mountain': return <Mountain className="w-6 h-6 text-[#1565C0]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#1565C0]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#1565C0]" />;
      case 'Tag': return <Tag className="w-6 h-6 text-[#1565C0]" />;
      case 'Smile': return <Smile className="w-6 h-6 text-[#1565C0]" />;
      default: return <Sparkles className="w-6 h-6 text-[#1565C0]" />;
    }
  };

  return (
    <section id="packages" className="py-12 sm:py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* ========================================================= */}
        {/* SECTION 1: SINGLE PACKAGE OVERVIEW & DETAILED CARD */}
        {/* ========================================================= */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
              Banasura Jeep Safari & Hilltop Trek
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-lg text-gray-600 leading-relaxed font-light">
              Ride in a private 4x4 Jeep through rugged mountain trails, conquer exciting mud tracks, and enjoy a short guided trek to a breathtaking hilltop viewpoint.
            </p>
          </div>

          {/* Main Single Package Showcase Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100 grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[360px] lg:min-h-full bg-slate-900 overflow-hidden">
              <img
                src={SINGLE_PACKAGE.image}
                alt="Banasura Jeep Safari"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 bg-[#0D47A1] text-white px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold tracking-wider uppercase shadow-lg flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-300" />
                <span>Private 4×4 Jeep</span>
              </div>

              {/* Bottom Details Overlay on Image */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Starting Point</div>
                <div className="text-lg font-bold font-heading">Padinjarathara, Wayanad</div>
                <div className="text-xs text-gray-300">Free Pickup within 8 km Radius</div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    All-Inclusive Group Rate
                  </span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0D47A1]">₹2,500</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-600 block sm:inline ml-1">Per Jeep</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl font-heading font-bold text-gray-900 leading-tight">
                  {SINGLE_PACKAGE.name}
                </h3>

                <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-light">
                  {SINGLE_PACKAGE.description}
                </p>

                {/* 5 Key Package Parameters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Duration</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0D47A1]">{SINGLE_PACKAGE.duration}</span>
                  </div>
                  <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Capacity</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0D47A1]">6–8 People</span>
                  </div>
                  <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Vehicle</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0D47A1]">{SINGLE_PACKAGE.vehicle}</span>
                  </div>
                  <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 col-span-2 sm:col-span-2">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Route Covered</span>
                    <span className="text-xs sm:text-sm font-bold text-[#0D47A1]">{SINGLE_PACKAGE.route}</span>
                  </div>
                  <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">Pickup</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-900">Free within 8 km</span>
                  </div>
                </div>

                {/* Feature Checkmarks */}
                <div className="space-y-2 pt-2">
                  <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">What's Included:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                    {SINGLE_PACKAGE.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA Button inside Package Card */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500 text-center sm:text-left">
                  <span className="font-semibold text-gray-800">Fixed Group Price:</span> ₹2,500 Per Jeep (No per head extra charge)
                </div>
                <button
                  onClick={() => onOpenBookingModal(SINGLE_PACKAGE.name)}
                  className="w-full sm:w-auto bg-[#0D47A1] hover:bg-[#1565C0] text-white px-8 py-3.5 rounded-2xl font-heading font-bold text-xs uppercase tracking-wider shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  id="package-card-book-now-btn"
                >
                  <span>Book This Jeep Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: KEY HIGHLIGHTS (8 Feature Cards) */}
        {/* ========================================================= */}
        <div id="highlights" className="pt-6">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0D47A1] font-heading text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Choose This Adventure</span>
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
              Key Highlights
            </h2>
            <p className="mt-3 text-xs sm:text-base text-gray-600 font-light">
              Everything that makes our Banasura Jeep Safari an unforgettable Wayanad mountain experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {KEY_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-blue-50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1"
              >
                <div>
                  <div className="p-3 rounded-2xl bg-blue-50 w-fit text-[#0D47A1] mb-4 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors duration-300">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-gray-900 group-hover:text-[#0D47A1] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Schema.org JSON-LD for Search Engine Indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": SINGLE_PACKAGE.name,
              "image": "https://kallingaltrekking.com/assets/images/hero_banasura.jpg",
              "description": SINGLE_PACKAGE.description,
              "brand": {
                "@type": "Brand",
                "name": "Kallingal Trekking"
              },
              "offers": {
                "@type": "Offer",
                "price": SINGLE_PACKAGE.pricePerJeep,
                "priceCurrency": "INR",
                "priceValidUntil": "2027-12-31",
                "availability": "https://schema.org/InStock",
                "itemCondition": "https://schema.org/NewCondition",
                "seller": {
                  "@type": "TravelAgency",
                  "name": "Kallingal Trekking Wayanad"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "184"
              }
            })
          }}
        />

      </div>
    </section>
  );
};

