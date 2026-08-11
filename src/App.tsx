import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { WeatherTrailWidget } from './components/WeatherTrailWidget';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppBookingModal } from './components/WhatsAppBookingModal';
import { LegalModals } from './components/LegalModals';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

// Code-split heavy sections using React.lazy for faster initial mobile load
const GallerySection = lazy(() => import('./components/GallerySection').then(m => ({ default: m.GallerySection })));
const ReviewsSection = lazy(() => import('./components/ReviewsSection').then(m => ({ default: m.ReviewsSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));

// Loading Skeleton Fallback for lazy-loaded sections
const SectionSkeleton: React.FC<{ title: string }> = ({ title }) => (
  <div className="py-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center animate-pulse min-h-[300px]">
    <div className="h-4 w-32 bg-slate-200 rounded mb-3"></div>
    <div className="h-8 w-64 bg-slate-300 rounded mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div className="h-48 bg-slate-200 rounded-xl"></div>
      <div className="h-48 bg-slate-200 rounded-xl hidden md:block"></div>
      <div className="h-48 bg-slate-200 rounded-xl hidden md:block"></div>
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<string | undefined>(undefined);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Smooth scroll handler (memoized)
  const handleNavigate = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Open booking modal (memoized)
  const handleOpenBookingModal = useCallback((packageName?: string) => {
    setSelectedPackageForModal(packageName);
    setIsBookingModalOpen(true);
  }, []);

  // Close booking modal (memoized)
  const handleCloseBookingModal = useCallback(() => {
    setIsBookingModalOpen(false);
  }, []);

  // Track active section on scroll with zero layout thrashing using IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'about', 'packages', 'weather', 'gallery', 'reviews', 'faq', 'contact'];
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id;
              if (id) {
                setActiveSection((prev) => (prev !== id ? id : prev));
              }
            }
          }
        },
        { rootMargin: '-20% 0px -50% 0px', threshold: 0.1 }
      );

      const elements: HTMLElement[] = [];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          elements.push(el);
          observer.observe(el);
        }
      });

      return () => {
        elements.forEach((el) => observer.unobserve(el));
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] font-['Inter',sans-serif]">
      {/* Sticky Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Hero Section */}
      <main>
        <Hero
          onOpenBookingModal={handleOpenBookingModal}
          onNavigate={handleNavigate}
        />

        {/* Quick Stats Bar */}
        <StatsCounter />

        {/* About Section */}
        <AboutSection
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Packages Section */}
        <PackagesSection
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Live Weather & Trail Monitor */}
        <WeatherTrailWidget
          onOpenBookingModal={handleOpenBookingModal}
        />

        {/* Gallery Section */}
        <Suspense fallback={<SectionSkeleton title="Gallery" />}>
          <GallerySection />
        </Suspense>

        {/* Reviews Section */}
        <Suspense fallback={<SectionSkeleton title="Reviews" />}>
          <ReviewsSection />
        </Suspense>

        {/* FAQ Section */}
        <Suspense fallback={<SectionSkeleton title="FAQ" />}>
          <FAQSection
            onOpenBookingModal={handleOpenBookingModal}
          />
        </Suspense>

        {/* Basecamp & Contact Section */}
        <ContactSection
          onOpenBookingModal={handleOpenBookingModal}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={setLegalModalType}
        onOpenBookingModal={handleOpenBookingModal}
      />

      {/* Modals & Floating Tools */}
      <WhatsAppBookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        initialPackageName={selectedPackageForModal}
      />

      <LegalModals
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <FloatingWhatsAppButton
        onOpenBookingModal={handleOpenBookingModal}
      />
    </div>
  );
}
