export interface FAQItem {
  id: string;
  category: 'Booking' | 'Trek Prep' | 'Jeep & Pickup' | 'Safety';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'f1',
    category: 'Booking',
    question: 'How do I book a Jeep Safari & Trek with Kallingal Trekking?',
    answer: 'All bookings are processed directly via WhatsApp at +91 70342 45415. Click any "Book Now" button on our website to send a pre-filled booking message with your date, group size, and pickup preferences.'
  },
  {
    id: 'f2',
    category: 'Booking',
    question: 'How much does the package cost?',
    answer: 'The rate is flat ₹2,500 per Jeep. One private 4×4 Jeep accommodates up to 6–8 people (including driver). There are no additional per-person charges for your group.'
  },
  {
    id: 'f3',
    category: 'Jeep & Pickup',
    question: 'Is pickup available from my resort or hotel?',
    answer: 'Yes! We offer FREE pickup within 8 km of our starting point in Padinjarathara. Extra pickup charges apply if your hotel/resort is located beyond 8 km in Wayanad.'
  },
  {
    id: 'f4',
    category: 'Jeep & Pickup',
    question: 'What type of vehicle and terrain is involved?',
    answer: 'We operate rugged 4×4 Mahindra Jeeps driven by certified, highly experienced local drivers. The route covers 6 km of steep off-road mud trails, followed by a guided 500 m hilltop trek.'
  },
  {
    id: 'f5',
    category: 'Trek Prep',
    question: 'How long does the entire experience take?',
    answer: 'The complete Banasura Jeep Safari & Hilltop Trek takes approximately 1 hour, making it an ideal, action-packed activity for families, couples, and friend groups.'
  },
  {
    id: 'f6',
    category: 'Safety',
    question: 'Is this trek suitable for beginners, children, and families?',
    answer: 'Yes! It is very beginner-friendly and safe for all age groups. The jeep ride handles the tough terrain, and the 500 m walk to the hilltop viewpoint is gentle and suitable for kids and seniors.'
  },
  {
    id: 'f7',
    category: 'Safety',
    question: 'What happens in case of heavy rain?',
    answer: 'Misty rain makes the off-road trail even more exciting. In the event of extreme severe weather or official advisories, we provide free date rescheduling.'
  },
  {
    id: 'f8',
    category: 'Trek Prep',
    question: 'What should I wear or bring for the trek?',
    answer: 'We recommend comfortable casuals or trekking clothes, non-slip footwear, sunglasses, and a camera or smartphone to capture the scenic hilltop vistas.'
  }
];

