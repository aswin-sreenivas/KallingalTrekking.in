import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="bg-[#0D47A1] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'privacy' ? <ShieldCheck className="w-6 h-6 text-blue-200" /> : <FileText className="w-6 h-6 text-blue-200" />}
            <h3 className="font-heading font-extrabold text-xl">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="font-semibold text-gray-900">Effective Date: January 1, 2026</p>
              <p>
                At <strong>Kallingal Trekking</strong>, we are dedicated to protecting your privacy. This Privacy Policy outlines how we collect and use information when you use our website or interact with our trekking services in Banasura Hills, Wayanad.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">1. Information Collection</h4>
              <p>
                We do not use user account databases or online payment gateways on this website. When you initiate a booking via WhatsApp, you voluntarily provide details such as your name, contact phone number, group size, and preferred trek dates.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">2. Use of Information</h4>
              <p>
                Information sent via WhatsApp is used solely for trek permit applications, allocating certified guide teams, organizing 4x4 Jeep transfers, and communicating trek logistics.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">3. Data Sharing</h4>
              <p>
                We never sell or rent your personal information to third parties. Information may only be shared with local tourism authority officials as required by Kerala tourism regulatory mandates for entry permits.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">4. Contact Us</h4>
              <p>
                If you have any questions regarding your privacy, contact Kallingal Trekking directly at +91 70342 45415 or via email at kallingaltrekking@gmail.com or visit our basecamp in Padinjarathara, Wayanad.
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900">Effective Date: January 1, 2026</p>
              <p>
                Welcome to <strong>Kallingal Trekking</strong>. By booking a trek or participating in our guided mountain expeditions in Banasura Hills, Wayanad, you agree to the following terms and safety conditions.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">1. Booking & Payments</h4>
              <p>
                All bookings occur directly via WhatsApp (+91 70342 45415). No online payment is requested or collected through this website. Package charges (price per head and Jeep fees) are settled directly at basecamp on the day of the trek.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">2. Safety & Guide Instructions</h4>
              <p>
                Trekking in high-altitude mountain terrain carries inherent natural risks. All participants must strictly adhere to guide instructions, remain on designated trails, and refrain from leaving the group. Kallingal Trekking provides certified guides and first-aid support.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">3. Weather & Trail Advisories</h4>
              <p>
                Trail access is subject to official weather advisories. In the event of heavy monsoon downpours or trail closures, treks may be rescheduled or rerouted to alternative safe mountain trails.
              </p>

              <h4 className="font-heading font-bold text-[#0D47A1] text-base pt-2">4. Leave-No-Trace Policy</h4>
              <p>
                Littering, smoking, alcohol consumption, plastic dumping, or disturbing wildlife during the trek is strictly prohibited. Trekkers must carry all personal waste back down to basecamp.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#0D47A1] hover:bg-[#1565C0] text-white px-6 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
