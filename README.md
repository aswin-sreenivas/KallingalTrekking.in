# Kallingal Trekking

> **Premium Trekking Experience in Wayanad, Kerala**

Official website for **Kallingal Trekking**, an eco-adventure tourism experience located in Padinjarathara, Banasura Hills, Wayanad, Kerala. The website provides guest information on trekking routes, peak summit ridge walks, mountain cascades, weather & timings gallery, guest reviews, and direct WhatsApp booking.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Animations & Interactions](#animations--interactions)
- [Booking System](#booking-system)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Performance](#performance)
- [Technology](#technology)
- [Project Structure](#project-structure)
- [Production QA](#production-qa)
- [Development](#development)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Build & Deployment](#build--deployment)
- [Testing](#testing)
- [Developer](#developer)
- [License](#license)

---

## About

Kallingal Trekking offers guided off-road Jeep safaris and summit hikes across the Banasura Hills region in Wayanad. This web platform enables visitors to explore trekking itineraries, check real-time jeep pricing, view time-and-weather gallery highlights, and instantly generate structured booking requests sent directly to the local guiding team on WhatsApp.

---

## Features

- **Interactive Hill-Climbing Progress Tracker**: Fixed top viewport progress bar featuring an animated trekker figure with a backpack and trekking pole climbing toward the 2,073 m Banasura Summit flag, displaying real-time calculated elevation (800 m to 2,073 m) and trail stage names as the user scrolls.
- **Virtualized Gallery & Smooth Scroll Architecture**: In-view `IntersectionObserver` virtualization for gallery images with CSS `content-visibility: auto`, code-split React lazy loading (`Gallery`, `Reviews`, `FAQ`), `requestAnimationFrame` debouncing, and memoized state callbacks for buttery-smooth 60fps scrolling on mobile.
- **Interactive Hero Experience**: Full-screen video background showcase with play/pause and mute/unmute user controls.
- **Direct WhatsApp Booking Engine**: Modal-driven reservation flow calculating exact jeep requirements and total charges.
- **Dynamic Jeep Calculator**: Automatically calculates required Jeeps based on guest count (1 Jeep accommodates up to 8 guests).
- **Strict Input Validation**: Indian 10-digit mobile number format validation and non-past preferred date enforcement.
- **Timings & Weather Gallery**: Photo gallery filtered by time of day and weather conditions (Dawn, Misty, Sunny, Starlit Night) with full-screen lightbox modal.
- **Live Banasura Weather & Trail Monitor**: Real-time server endpoint (`/api/banasura-weather`) fetching live temperature, humidity, wind, cloud cover, and 3-day forecast for Banasura Hills (2,073 m) with trail safety and cloud-sea probability indicators.
- **Automated Google Reviews Integration**: Server endpoint (`/api/google-reviews`) syncing rating and reviews connected to official Google Maps listing (`https://maps.app.goo.gl/CWmoy9DoVXJ14HwZ7`) with optional Google Places API support.
- **Location & Contact Integration**: Direct Google Maps pin navigation (`11.703624, 75.944946`) and official email contact (`kallingaltrekking@gmail.com`).
- **Comprehensive FAQ & Reviews**: Accordion FAQ list and verified trekker testimonials.
- **Legal Modals**: Modal dialogues for Privacy Policy, Terms of Service, and Trek Safety Guidelines.

---

## Animations & Interactions

- **Smooth Navigation**: Section jumps with smooth scroll behavior.
- **Floating WhatsApp CTA**: Quick-action button with subtle pulsing animation for quick enquiries.
- **Modal Controls**: Backdrop blur and smooth entering transitions for booking and legal modals.
- **Reduced Motion Support**: Built-in `@media (prefers-reduced-motion: reduce)` CSS overrides ensuring accessibility for motion-sensitive users.

---

## Booking System

The booking system features client-side input validation and dynamic price calculation before formatting a structured WhatsApp message payload.

### Input Validation
- **Phone Number Validation**: Accepts valid 10-digit Indian mobile numbers (starting with 6–9) or 12-digit numbers starting with `91`.
- **Date Validation**: Prevents selection of past dates using a dynamic `min` date constraint set to today's date (`todayStr`).
- **Inline Error Feedback**: Validation errors clear immediately as the user edits the input field.

### Jeep Calculation Table

1 Jeep accommodates a maximum of **8 guests**. The application automatically rounds up jeep count using `Math.ceil(guestCount / 8)`:

| Guests | Jeeps Required | Total Cost (₹) |
| :----: | :------------: | :------------: |
| 1 – 8  | 1 Jeep         | ₹2,500         |
| 9 – 16 | 2 Jeeps        | ₹5,000         |
| 17 – 24| 3 Jeeps        | ₹7,500         |
| 25 – 32| 4 Jeeps        | ₹10,000        |

---

## Accessibility

- **Keyboard Navigation**: Full keyboard tab order across interactive controls.
- **Gallery Accessibility**: Gallery items support focus and activation via `Tab`, `Enter`, and `Space` keys (`tabIndex={0}`, `role="button"`).
- **ARIA Attributes**: Explicit `aria-label` tags, form field labels, and `role="alert"` for validation messages.
- **Reduced Motion**: Respects system-level motion preferences.

---

## SEO

- **Structured Data (JSON-LD)**: Includes `TouristAttraction` schema with exact GPS coordinates (`11.703624, 75.944946`), telephone (`+91 70342 45415`), and email (`kallingaltrekking@gmail.com`).
- **Meta Tags**: Open Graph (`og:title`, `og:description`, `og:type`, `og:image`, `og:url`) and Twitter card tags.
- **Canonical Link**: `https://kallingaltrekking.com/`

---

## Performance

- Optimized asset bundling using Vite 6.
- Lazy-loaded media elements and SVG iconography via Lucide React.
- Zero layout shift (CLS) through fixed aspect ratio containers.

---

## Technology

- **Framework**: React 19
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React

---

## Project Structure

```text
kallingal-trekking/
├── public/
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FloatingWhatsAppButton.tsx
│   │   ├── Footer.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Hero.tsx
│   │   ├── LegalModals.tsx
│   │   ├── Navbar.tsx
│   │   ├── PackageCard.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── StatsCounter.tsx
│   │   └── WhatsAppBookingModal.tsx
│   ├── data/
│   │   ├── faqs.ts
│   │   ├── gallery.ts
│   │   ├── packages.ts
│   │   └── reviews.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Production QA

The codebase has undergone a complete production QA audit:

- **TypeScript Typecheck**: Passed (`tsc --noEmit`)
- **Vite Production Build**: Passed (`vite build`)
- **Responsive Layout**: Verified across 320px, 375px, 390px, 412px, 430px, 768px, 1024px, 1280px, 1440px, and 1920px viewports.
- **Form Validation**: 100% test coverage for phone number format, date bounds, jeep calculation, and pickup location logic.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/shadowstack/kallingal-trekking.git

# Navigate into directory
cd kallingal-trekking

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## Environment Variables

Refer to `.env.example` for environment variable options:

```env
# .env.example
APP_URL="https://kallingaltrekking.com"
```

---

## Build & Deployment

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Testing

```bash
# Run TypeScript compilation & lint check
npm run lint

# Verify production build compilation
npm run build
```

---

## Developer

### ShadowStack.web

**ShadowStack.web** is the development studio behind the Kallingal Trekking website.

The project focuses on:
- Modern web engineering
- Responsive user interfaces
- Performance optimization
- Accessibility compliance
- Technical SEO
- Production-ready design execution

---

## License

Copyright © 2026 Kallingal Trekking. All rights reserved. Designed & developed by ShadowStack.web.
