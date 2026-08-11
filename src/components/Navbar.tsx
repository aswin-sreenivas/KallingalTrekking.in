import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall, ChevronRight, Flag, Mountain } from 'lucide-react';
import logoImg from '../assets/images/kallingal_logo_1784836369394.jpg';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBookingModal: (packageName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenBookingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

      setIsScrolled((prev) => {
        const next = scrollY > 50;
        return prev !== next ? next : prev;
      });

      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress((prev) => (Math.abs(prev - progress) > 0.05 ? progress : prev));
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    // Calculate initial progress on mount
    updateScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'packages', label: 'Packages' },
    { id: 'weather', label: 'Live Weather' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Calculate elevation and stage based on scroll progress
  const currentElevation = Math.round(800 + (scrollProgress / 100) * 1273); // 800m to 2073m
  const getTrekStage = (progress: number) => {
    if (progress < 25) return 'Basecamp (800m)';
    if (progress < 50) return 'Shola Trail (1,200m)';
    if (progress < 75) return 'Ridge Ascent (1,600m)';
    if (progress < 95) return 'Summit Push (1,950m)';
    return 'Banasura Peak! (2,073m)';
  };

  return (
    <>
      {/* Hill-Climbing Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-2 bg-slate-950/80 z-[65] pointer-events-none border-b border-blue-500/20"
        role="progressbar"
        aria-label="Banasura Hill Climb scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Hill Slope Gradient Progress Line */}
        <div
          className="h-full bg-gradient-to-r from-[#0D47A1] via-[#1565C0] to-amber-400 will-change-[width] shadow-[0_0_12px_rgba(245,158,11,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Banasura Peak Summit Flag at 100% Right End */}
        <div className="absolute right-1 -top-1 sm:-top-1.5 flex items-center gap-1 text-[9px] sm:text-[10px] font-black text-amber-300 bg-slate-900/95 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-400/40 shadow-md">
          <Flag className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline">Summit</span> 2,073m
        </div>

        {/* Climber Figure Tracking Scroll Progress */}
        <div
          className="absolute top-1/2 -translate-y-1/2 will-change-[left] flex flex-col items-center group pointer-events-auto"
          style={{ left: `${Math.max(2, Math.min(97, scrollProgress))}%`, transform: 'translate(-50%, -50%)' }}
        >
          {/* Elevation & Stage Tooltip */}
          <div className="absolute -top-7 whitespace-nowrap bg-slate-900/95 text-amber-300 border border-amber-400/30 text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-lg flex items-center gap-1">
            <Mountain className="w-2.5 h-2.5 text-amber-400" />
            <span>{currentElevation}m</span>
            <span className="text-slate-400 hidden md:inline">• {getTrekStage(scrollProgress)}</span>
          </div>

          {/* Person Climbing Hill SVG Figure */}
          <div className="relative -mt-1 sm:-mt-0.5 transform -scale-x-100">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Head */}
              <circle cx="11" cy="4" r="2" fill="currentColor" className="text-amber-300" />
              {/* Backpack */}
              <rect x="13.5" y="7" width="3.5" height="6" rx="1" fill="currentColor" className="text-amber-600" />
              {/* Leaning Body / Torso */}
              <path d="M11 6.5L8 12.5L10 18" />
              {/* Legs in Climbing Stride */}
              <path d="M10 12.5L13.5 18" />
              <path d="M8 12.5L5 17.5" />
              {/* Arms holding Trekking Pole */}
              <path d="M10 8L5.5 12" />
              <path d="M5 6L3 19" stroke="#38BDF8" strokeWidth="1.8" />
            </svg>
          </div>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-scrolled py-3 text-[#1F2937] border-b border-blue-100/50'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('home');
              }}
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#1565C0] rounded-lg p-1"
              id="nav-logo-link"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border border-white/20 group-hover:scale-105 transition-transform duration-200 bg-[#0D47A1] shrink-0">
                <img
                  src={logoImg}
                  alt="Kallingal Trekking Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className={`font-heading font-extrabold text-base sm:text-lg tracking-tight uppercase leading-tight ${
                  isScrolled ? 'text-[#0D47A1]' : 'text-white'
                }`}>
                  Kallingal
                </span>
                <span className={`text-[10px] uppercase font-semibold tracking-widest leading-none ${
                  isScrolled ? 'text-[#1565C0]' : 'text-blue-200'
                }`}>
                  Trekking Wayanad
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1565C0] ${
                      isActive
                        ? isScrolled
                          ? 'bg-[#0D47A1] text-white shadow-sm font-semibold'
                          : 'bg-white/20 text-white backdrop-blur-md font-semibold border border-white/30'
                        : isScrolled
                          ? 'text-gray-700 hover:text-[#0D47A1] hover:bg-blue-50/80'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right Action CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+917034245415"
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                  isScrolled
                    ? 'border-blue-200 text-[#0D47A1] hover:bg-blue-50'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
                title="Call Kallingal Trekking"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#1565C0]" />
                <span>+91 70342 45415</span>
              </a>

              <button
                onClick={() => onOpenBookingModal()}
                className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-full font-heading text-xs font-semibold tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D47A1]"
                id="nav-book-now-btn"
              >
                <span>Book Trek</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onOpenBookingModal()}
                className="bg-[#0D47A1] text-white px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm"
              >
                Book
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#1565C0] ${
                  isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/80 backdrop-blur-md animate-fadeIn flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0D47A1]">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="w-8 h-8 rounded-full border border-white" />
              <span className="text-white font-heading font-bold text-lg">Kallingal Trekking</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl font-medium text-lg flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#1565C0] text-white font-bold shadow-lg'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </button>
              );
            })}

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full bg-[#1565C0] hover:bg-[#0D47A1] text-white py-3.5 rounded-xl font-heading font-bold uppercase tracking-wider text-sm shadow-xl flex items-center justify-center gap-2"
              >
                <span>Book Now on WhatsApp</span>
              </button>

              <a
                href="tel:+917034245415"
                className="w-full border border-white/20 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/10"
              >
                <PhoneCall className="w-4 h-4 text-blue-300" />
                <span>Call +91 70342 45415</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
