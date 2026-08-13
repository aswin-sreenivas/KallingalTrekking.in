import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Calendar, Users, MapPin, CheckCircle, ArrowRight, Car, AlertCircle } from 'lucide-react';
import { SINGLE_PACKAGE } from '../data/packages';

interface WhatsAppBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageName?: string;
}

export const WhatsAppBookingModal: React.FC<WhatsAppBookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jeepCount, setJeepCount] = useState(1);
  const [persons, setPersons] = useState('6');
  const [preferredDate, setPreferredDate] = useState('');
  const [pickupRequired, setPickupRequired] = useState('No');
  const [pickupLocation, setPickupLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  // Field-level validation state
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    date?: string;
    persons?: string;
    pickup?: string;
    general?: string;
  }>({});

  const [capacityNotice, setCapacityNotice] = useState('');

  // Get Today's date string in YYYY-MM-DD format for datepicker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Set default preferred date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setPreferredDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Auto-adjust or warn if total guests exceed jeep capacity (8 persons per jeep including driver)
  useEffect(() => {
    const pCount = parseInt(persons, 10);
    if (!isNaN(pCount) && pCount > 0) {
      const neededJeeps = Math.ceil(pCount / 7);
      if (neededJeeps > jeepCount) {
        setCapacityNotice(`Note: ${pCount} guests require ${neededJeeps} Jeep(s) (1 Jeep accommodates up to 8 persons including driver). We've updated your jeep count.`);
        setJeepCount(neededJeeps);
      } else {
        setCapacityNotice('');
      }
    } else {
      setCapacityNotice('');
    }
  }, [persons]);

  if (!isOpen) return null;

  const totalPrice = jeepCount * SINGLE_PACKAGE.pricePerJeep;

  // Validate 10-digit phone number format
  const validatePhone = (numStr: string): boolean => {
    if (!numStr.trim()) return false;
    // Extract only digits
    const digitsOnly = numStr.replace(/\D/g, '');
    // Standard Indian mobile or 10-digit number format
    // Allow 10 digits, or 12 digits if starting with 91 (e.g. +91 9876543210)
    if (digitsOnly.length === 10 && /^[6-9]\d{9}$/.test(digitsOnly)) {
      return true;
    }
    if (digitsOnly.length === 12 && digitsOnly.startsWith('91') && /^91[6-9]\d{9}$/.test(digitsOnly)) {
      return true;
    }
    if (digitsOnly.length === 10) {
      return true; // Any 10-digit number
    }
    return false;
  };

  const validateForm = (): boolean => {
    const newErrors: {
      name?: string;
      phone?: string;
      date?: string;
      persons?: string;
      pickup?: string;
      general?: string;
    } = {};

    // 1. Name validation (Must be at least 2 characters)
    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name (at least 2 characters).';
    } else if (/^\d+$/.test(name.trim())) {
      newErrors.name = 'Name cannot contain digits only.';
    }

    // 2. Phone validation (Must be valid 10-digit number)
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for booking confirmation.';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number (e.g., 9876543210).';
    }

    // 3. Date validation (Cannot be in the past)
    if (!preferredDate) {
      newErrors.date = 'Preferred date is required.';
    } else if (preferredDate < todayStr) {
      newErrors.date = 'Selected date cannot be in the past. Please select today or a future date.';
    }

    // 4. Persons validation
    const pVal = parseInt(persons, 10);
    if (!persons || isNaN(pVal) || pVal < 1) {
      newErrors.persons = 'Please enter a valid guest count (at least 1 person).';
    } else if (pVal > 100) {
      newErrors.persons = 'Maximum guest limit is 100 people.';
    }

    // 5. Pickup location validation
    if (pickupRequired === 'Yes' && !pickupLocation.trim()) {
      newErrors.pickup = 'Please specify your hotel / resort name or pickup location.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanedPhone = phone.replace(/\D/g, '').slice(-10);
    const pickupText = pickupRequired === 'Yes' 
      ? `Yes (${pickupLocation.trim() || 'Within 8 km radius'})` 
      : 'No (Self Drive / Meeting at Basecamp)';

    const notesText = notes.trim() ? notes.trim() : 'None';

    const message = `Hello Kallingal Trekking,

I would like to book the Jeep Safari & Hilltop Trek.

Package: ${SINGLE_PACKAGE.name}
Rate: ₹2,500 Per Jeep (1 Jeep: 8 persons capacity including driver)
Number of Jeeps: ${jeepCount}
Total Amount: ₹${totalPrice.toLocaleString('en-IN')}

Customer Name: ${name.trim()}
Phone Number: +91 ${cleanedPhone}
Number of Guests: ${persons}
Preferred Date: ${preferredDate}
Pickup Required: ${pickupText}
Free Pickup: Within 8 km of starting point
Notes: ${notesText}

Please confirm availability and booking details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/917034245415?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-blue-100 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        
        {/* Modal Header */}
        <div className="bg-[#0D47A1] text-white p-5 sm:p-6 relative flex items-center justify-between shrink-0">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              <span>Direct WhatsApp Booking</span>
            </span>
            <h3 id="modal-title" className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Book Your Jeep Adventure
            </h3>
            <p className="text-xs text-blue-100/90 mt-0.5 font-light">
              ₹2,500 Per Private Jeep • 1 Jeep: 8 Persons (including driver) • Instant Confirmation
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white shrink-0"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1 text-left" noValidate>
          
          {/* General Form Error Alert */}
          {errors.general && (
            <div role="alert" className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Capacity Alert Banner */}
          {capacityNotice && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium rounded-xl flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{capacityNotice}</span>
            </div>
          )}

          {/* Fixed Selected Package Banner */}
          <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-heading font-bold text-[#0D47A1] block text-sm">
                {SINGLE_PACKAGE.name}
              </span>
              <span className="text-gray-600">6 km Jeep Ride + 500 m Trek</span>
            </div>
            <div className="text-right shrink-0">
              <span className="font-heading font-black text-lg text-[#0D47A1]">₹2,500</span>
              <span className="text-[10px] text-gray-500 font-bold block">Per Jeep</span>
            </div>
          </div>

          {/* Name & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="e.g. Rahul Sharma"
                required
                className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:bg-white ${
                  errors.name ? 'border-rose-500 ring-rose-200 bg-rose-50/20' : 'border-gray-200 focus:ring-[#0D47A1]'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
                Phone Number <span className="text-rose-500">* (10 Digits Limit)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhone(cleaned);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                maxLength={10}
                placeholder="e.g. 9876543210"
                required
                className={`w-full px-3.5 py-2.5 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:bg-white ${
                  errors.phone ? 'border-rose-500 ring-rose-200 bg-rose-50/20' : 'border-gray-200 focus:ring-[#0D47A1]'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Jeeps & Persons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
                Number of Jeeps
              </label>
              <div className="relative">
                <Car className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <select
                  value={jeepCount}
                  onChange={(e) => setJeepCount(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:bg-white"
                >
                  <option value={1}>1 Jeep (8 persons including driver) — ₹2,500</option>
                  <option value={2}>2 Jeeps (16 persons total including drivers) — ₹5,000</option>
                  <option value={3}>3 Jeeps (24 persons total including drivers) — ₹7,500</option>
                  <option value={4}>4 Jeeps (25+ persons group) — ₹10,000</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
                Total Guests <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={persons}
                  onChange={(e) => {
                    setPersons(e.target.value);
                    if (errors.persons) setErrors((prev) => ({ ...prev, persons: undefined }));
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:bg-white ${
                    errors.persons ? 'border-rose-500 ring-rose-200 bg-rose-50/20' : 'border-gray-200 focus:ring-[#0D47A1]'
                  }`}
                  placeholder="e.g. 6"
                />
              </div>
              {errors.persons && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.persons}
                </p>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
              Preferred Date <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="date"
                min={todayStr}
                value={preferredDate}
                onChange={(e) => {
                  setPreferredDate(e.target.value);
                  if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
                }}
                className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:bg-white ${
                  errors.date ? 'border-rose-500 ring-rose-200 bg-rose-50/20' : 'border-gray-200 focus:ring-[#0D47A1]'
                }`}
              />
            </div>
            {errors.date && (
              <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.date}
              </p>
            )}
          </div>

          {/* Pickup Required Option */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider">
                Pickup Needed?
              </label>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Free ≤ 8 km
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setPickupRequired('No');
                  if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                  pickupRequired === 'No'
                    ? 'bg-[#0D47A1] text-white border-[#0D47A1] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                No (Self Drive to Base)
              </button>
              <button
                type="button"
                onClick={() => setPickupRequired('Yes')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all ${
                  pickupRequired === 'Yes'
                    ? 'bg-[#0D47A1] text-white border-[#0D47A1] shadow-sm'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Yes (Resort / Hotel Pickup)
              </button>
            </div>

            {pickupRequired === 'Yes' && (
              <div className="mt-2.5">
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => {
                    setPickupLocation(e.target.value);
                    if (errors.pickup) setErrors((prev) => ({ ...prev, pickup: undefined }));
                  }}
                  placeholder="Hotel / Resort Name & Town (e.g. Padinjarathara, Kalpetta)"
                  className={`w-full px-3.5 py-2 bg-gray-50 border rounded-xl text-xs focus:outline-none focus:ring-2 focus:bg-white ${
                    errors.pickup ? 'border-rose-500 ring-rose-200 bg-rose-50/20' : 'border-gray-200 focus:ring-[#0D47A1]'
                  }`}
                />
                {errors.pickup ? (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.pickup}
                  </p>
                ) : (
                  <p className="text-[10px] text-gray-500 mt-1">
                    * Free pickup within 8 km of starting point. Extra pickup charges apply beyond 8 km.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-heading font-bold text-gray-800 uppercase tracking-wider mb-1">
              Notes / Special Requests
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Morning timing preferred, elderly members in group"
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0D47A1] focus:bg-white"
            />
          </div>

          {/* Price Summary Banner */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-bold">
            <span>Total Payable Rate ({jeepCount} Jeep{jeepCount > 1 ? 's' : ''}):</span>
            <span className="text-sm font-extrabold text-[#0D47A1]">₹{totalPrice.toLocaleString('en-IN')} Total</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1565C0] hover:bg-[#0D47A1] text-white py-3.5 sm:py-4 rounded-2xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-blue-300"
            id="whatsapp-modal-submit-btn"
          >
            <span>Continue to WhatsApp (+91 70342 45415)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[10px] text-gray-400 text-center font-medium">
            Opens WhatsApp with pre-filled booking details. Pay directly upon arrival.
          </p>

        </form>

      </div>
    </div>
  );
};


