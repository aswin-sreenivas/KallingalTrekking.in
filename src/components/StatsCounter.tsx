import React from 'react';
import { Mountain, Users, Star, Shield, Calendar } from 'lucide-react';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      id: 'altitude',
      icon: <Mountain className="w-6 h-6 text-[#1565C0]" />,
      value: '2,073m',
      label: 'Banasura Summit Height',
      subtext: '2nd Highest Peak in Wayanad',
    },
    {
      id: 'trekkers',
      icon: <Users className="w-6 h-6 text-[#1565C0]" />,
      value: '10,000+',
      label: 'Happy Trekkers',
      subtext: 'Guided Safely Since 2014',
    },
    {
      id: 'rating',
      icon: <Star className="w-6 h-6 text-[#1565C0]" />,
      value: '4.9 / 5',
      label: 'Google & Trip Rating',
      subtext: 'Based on 480+ Reviews',
    },
    {
      id: 'safety',
      icon: <Shield className="w-6 h-6 text-[#1565C0]" />,
      value: '100%',
      label: 'Safety Record',
      subtext: 'Certified Native Guides',
    },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border border-blue-50 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
              index !== stats.length - 1 ? 'lg:border-r lg:border-gray-100 lg:pr-6' : ''
            }`}
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 mb-2 sm:mb-3 text-[#0D47A1]">
              {stat.icon}
            </div>
            <span className="font-heading font-black text-xl sm:text-3xl text-[#0D47A1] tracking-tight">
              {stat.value}
            </span>
            <span className="font-heading font-bold text-xs sm:text-sm text-gray-800 mt-0.5">
              {stat.label}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
              {stat.subtext}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
