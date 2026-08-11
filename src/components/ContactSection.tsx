import React, { useState } from 'react';
import { MapPin, Phone, MessageSquare, Clock, Instagram, Send, ShieldCheck, Mail, AlertCircle } from 'lucide-react';

interface ContactProps {
  onOpenBookingModal: () => void;
}

export const ContactSection: React.FC<ContactProps> = ({ onOpenBookingModal }) => {
  const [quickMsg, setQuickMsg] = useState('');
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!quickName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (quickPhone.trim()) {
      const digitsOnly = quickPhone.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        setErrorMsg('Please enter a valid 10-digit phone number.');
        return;
      }
    }

    if (!quickMsg.trim()) {
      setErrorMsg('Please enter your question or inquiry.');
      return;
    }

    const message = `Hello Kallingal Trekking,

My Name: ${quickName.trim()}
Phone Number: ${quickPhone.trim() ? '+91 ' + quickPhone.replace(/\D/g, '').slice(-10) : 'Not provided'}
Inquiry: ${quickMsg.trim()}

Please get back to me regarding date availability and Jeep Safari details.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/917034245415?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#0D47A1] font-heading text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Basecamp & Contact</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0D47A1] tracking-tight">
            Connect With Kallingal Trekking
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Our trekking basecamp is located at the foot of Banasura Hills, Wayanad, Kerala. We respond instantly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Info Card */}
            <div className="bg-[#0D47A1] text-white rounded-3xl p-8 shadow-xl space-y-6 relative overflow-hidden">
              <h3 className="font-heading font-bold text-2xl">Official Contact Channels</h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Reach out to us anytime for trek date availability, weather updates, resort pickup arrangements, or custom group planning.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/917034245415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/15 group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500 text-white shrink-0 shadow-md">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">WhatsApp Booking & Inquiry</span>
                    <span className="font-heading font-bold text-base text-white group-hover:text-blue-200 transition-colors">
                      +91 70342 45415
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+917034245415"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/15 group"
                >
                  <div className="p-3 rounded-xl bg-[#1565C0] text-white shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">Direct Helpline Call</span>
                    <span className="font-heading font-bold text-base text-white group-hover:text-blue-200 transition-colors">
                      +91 70342 45415
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors border border-white/15 group">
                  <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0 shadow-md">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">Official Email</span>
                    <a
                      href="mailto:kallingaltrekking@gmail.com"
                      className="font-heading font-bold text-sm text-white group-hover:text-blue-200 transition-colors break-all"
                    >
                      kallingaltrekking@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="p-3 rounded-xl bg-blue-700/60 text-blue-200 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">Basecamp Location</span>
                    <span className="font-heading font-semibold text-sm text-white">
                      Banasura Hills, Padinjarathara, Wayanad, Kerala - 673575
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/10 border border-white/15">
                  <div className="p-3 rounded-xl bg-blue-700/60 text-blue-200 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-200 block">Operating Hours</span>
                    <span className="font-heading font-semibold text-sm text-white">
                      Monday – Sunday: 6:00 AM – 8:00 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-blue-200">
                <span>Follow us for trail updates:</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  <Instagram className="w-4 h-4 text-pink-300" />
                  <span>Instagram</span>
                </a>
              </div>

            </div>

          </div>

          {/* Interactive Map & Quick Note Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Inquiry Form */}
            <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-8 border border-blue-50 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#0D47A1]">
                Quick WhatsApp Inquiry
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Have a specific question about trek dates or group pricing? Type below and hit send to chat directly with our guide team on WhatsApp.
              </p>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleQuickSend} className="space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={quickName}
                    onChange={(e) => {
                      setQuickName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  />
                  <input
                    type="tel"
                    placeholder="10-Digit Mobile Number"
                    value={quickPhone}
                    onChange={(e) => {
                      setQuickPhone(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    maxLength={15}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Type your message or question here..."
                  value={quickMsg}
                  onChange={(e) => {
                    setQuickMsg(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0D47A1]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#1565C0] hover:bg-[#0D47A1] text-white py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  id="quick-whatsapp-send-btn"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* Google Maps Location Preview Frame */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-200 p-2">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
                <iframe
                  title="Kallingal Trekking Banasura Hills Location Map"
                  src="https://maps.google.com/maps?q=11.703624,75.944946&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-gray-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#1565C0]" />
                  <span>Padinjarathara, Banasura Sagar, Wayanad</span>
                </span>
                <a
                  href="https://maps.google.com/?q=11.703624,75.944946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D47A1] font-bold hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

