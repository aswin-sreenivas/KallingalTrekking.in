import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqs';

interface FAQProps {
  onOpenBookingModal: () => void;
}

export const FAQSection: React.FC<FAQProps> = ({ onOpenBookingModal }) => {
  const [openId, setOpenId] = useState<string>('f1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Booking', 'Trek Prep', 'Jeep & Pickup', 'Safety'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0D47A1] font-heading text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
            Everything You Need To Know
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Have questions about Banasura Hill trek permits, Jeep transfers, fitness requirements, or gear? Find instant answers below.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-md mx-auto">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search questions (e.g. Jeep, Permits, Shoes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1] shadow-sm"
            />
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-heading font-bold tracking-wider uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] ${
                  activeCategory === cat
                    ? 'bg-[#0D47A1] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left font-heading font-bold text-base sm:text-lg text-gray-900 flex items-center justify-between gap-4 hover:text-[#0D47A1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0D47A1] text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                        {faq.category}
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1565C0] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50 animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-gray-500 text-sm">No questions matched your search query.</p>
            </div>
          )}
        </div>

        {/* Ask Direct Question Callout */}
        <div className="mt-12 text-center bg-blue-50/80 rounded-2xl p-6 border border-blue-100 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-heading font-bold text-sm text-[#0D47A1]">Still Have Questions?</h4>
            <p className="text-xs text-gray-600 mt-0.5">Ask our local guide team directly on WhatsApp.</p>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-5 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider shadow-md shrink-0 flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
