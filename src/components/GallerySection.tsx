import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, MapPin, Clock, CloudSun } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/gallery';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onOpenLightbox: (index: number) => void;
}

// Virtualized Card Component: Only renders heavy image tags and content when visible or near viewport
const GalleryCard = memo<GalleryCardProps>(({ item, index, onOpenLightbox }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { rootMargin: '300px 0px' } // Preload 300px before scrolling into view
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleClick = () => onOpenLightbox(index);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenLightbox(index);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`View photo: ${item.title}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-slate-900 cursor-pointer border border-blue-50 transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] min-h-[220px]"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '300px 225px' }}
    >
      <div className="aspect-[4/3] overflow-hidden bg-slate-800">
        {isVisible ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-slate-800/80 animate-pulse" />
        )}
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

      {/* Expand Icon */}
      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Maximize2 className="w-4 h-4" />
      </div>

      {/* Timing Badge on top left */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold tracking-wider flex items-center gap-1 border border-white/10">
        <Clock className="w-3 h-3 text-amber-300" />
        <span>{item.timing}</span>
      </div>

      {/* Caption Content */}
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className="flex items-center gap-1.5 text-[10px] text-blue-200 font-semibold mb-1">
          <CloudSun className="w-3 h-3 text-amber-300 shrink-0" />
          <span className="line-clamp-1">{item.weather}</span>
        </div>
        <h4 className="font-heading font-bold text-xs sm:text-sm leading-snug line-clamp-1">
          {item.title}
        </h4>
        <p className="text-[11px] text-gray-300 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </p>
      </div>
    </div>
  );
});

GalleryCard.displayName = 'GalleryCard';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Early Dawn & Sunrise',
    'Misty & Foggy Trail',
    'Bright & Clear Day',
    'Sunset & Night Skies',
  ];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const handleOpenLightbox = useCallback((index: number) => {
    setActiveLightboxIndex(index);
  }, []);

  const handleNextLightbox = useCallback(() => {
    setActiveLightboxIndex(prev => (prev !== null ? (prev + 1) % filteredItems.length : null));
  }, [filteredItems.length]);

  const handlePrevLightbox = useCallback(() => {
    setActiveLightboxIndex(prev => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
  }, [filteredItems.length]);

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
            Visual Story of Banasura Hills
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Experience the changing moods, weather, and timings of Banasura Hills—from early pre-dawn cloud inversions to misty ridge walks, sunny reservoir vistas, and starlit night skies.
          </p>

          {/* Filter Categories */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
                  activeCategory === cat
                    ? 'bg-[#0D47A1] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Image Grid with Virtualized In-View Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentLightboxItem && (
        <div className="fixed inset-0 z-[120] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[75vh]">
              <img
                src={currentLightboxItem.image}
                alt={currentLightboxItem.title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 text-center text-white max-w-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#1565C0] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {currentLightboxItem.timing}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5" /> {currentLightboxItem.weather}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl mt-1">
                {currentLightboxItem.title}
              </h3>
              <p className="text-sm text-gray-300 mt-1 font-light">
                {currentLightboxItem.caption}
              </p>
              <p className="text-xs text-blue-300 font-medium flex items-center justify-center gap-1 mt-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentLightboxItem.location}</span>
              </p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};


