import React from 'react';
import { Clock, Check, Mountain, Truck, ArrowRight, Tag, Users, Car, MapPin } from 'lucide-react';
import { TrekPackage } from '../data/packages';

interface PackageCardProps {
  pkg: TrekPackage;
  onBookNow: (packageName: string) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onBookNow }) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100/80 flex flex-col h-full transform hover:-translate-y-1.5">
      
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-20 bg-[#0D47A1] text-white px-3.5 py-1 rounded-full text-xs font-heading font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-white/20">
        <Tag className="w-3.5 h-3.5 text-yellow-300" />
        <span>Featured Expedition</span>
      </div>

      {/* Package Image & Overlay */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0D47A1] text-white border border-white/20 shadow-sm flex items-center gap-1">
            <Car className="w-3 h-3 text-amber-300" />
            <span>{pkg.vehicle}</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-md border border-white/20 flex items-center gap-1">
            <Clock className="w-3 h-3 text-blue-300" />
            <span>{pkg.duration}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <h3 className="font-heading font-bold text-xl text-[#0D47A1] group-hover:text-[#1565C0] transition-colors leading-tight">
            {pkg.name}
          </h3>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed font-light">
            {pkg.tagline}
          </p>

          {/* Key Stats Bar */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-700">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#1565C0]" />
              <span className="font-semibold text-gray-900">{pkg.capacity}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#1565C0]" />
              <span className="font-semibold text-gray-900">Free Pickup ≤ 8 km</span>
            </div>
          </div>

          {/* Features List */}
          <div className="mt-4 space-y-2">
            <p className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Package Highlights:</p>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {pkg.features.slice(0, 4).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & Booking Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Package Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-extrabold text-2xl text-[#0D47A1]">
                ₹{pkg.pricePerJeep.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-600 font-bold">Per Jeep</span>
            </div>
          </div>

          <button
            onClick={() => onBookNow(pkg.name)}
            className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-full font-heading font-bold text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
            id={`book-pkg-${pkg.id}`}
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

