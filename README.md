# 🎁 KIMA UNBOXING — Premium 3D Interactive E-Commerce

> **A revolutionary interactive shopping game where customers select products and physically place them inside their own 3D gift box.**

KIMA UNBOXING is a Moroccan luxury unboxing brand combining luxury branding, gamification, and e-commerce.

---

## ✨ Features

- **🎮 Build Your Own Box (Core Experience)**
  - Interactive 3D gift box built with Three.js & React Three Fiber (R3F)
  - Realistic cardboard textures, open flaps, interior depth, studio lighting & contact shadows
  - **Drag & Drop (Desktop):** Drag product cards directly into the 3D gift box with drop zone highlights and smooth landing animations
  - **Touch Friendly (Mobile):** One-tap "Add to Box" buttons with instant feedback and sticky navigation
  - Visual Box Capacity Meter (0% Empty → 25% Getting started → 50% Half full → 75% Almost full → 100% Full) with strict capacity enforcement
- **🛍️ Product Explorer & Categories**
  - Rich catalog categorized by: *All Products, Women, Men, Beauty, Baby, Accessories, Offers*
  - Real-time stock, pricing in Moroccan Dirhams (MAD), and dynamic volume tracking
- **📦 "My Box" Management System**
  - Dynamic slide-over drawer with item previews, quantity increments/decrements, item removal, and instant price calculation
  - Persistent box state powered by Zustand with `localStorage` sync
- **💳 Seamless Checkout Flow**
  - Two-step checkout: Customer information (Name, Phone, City, Delivery Address, Notes) and detailed Order Review
  - Transparent pricing breakdown: Subtotal + Moroccan standard delivery (39 MAD) = Total
- **🌍 Bilingual Support (i18n)**
  - Instant language toggle between **French (Français)** and **Arabic (العربية)** with automatic RTL direction handling
- **💎 Luxury Visual Brand Language**
  - Dark luxury theme (`#101114`, `#18191F`) with hot pink & magenta accents (`#F34D83`, `#D92968`) and cream product surfaces (`#F8EDEB`)

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **3D Graphics:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Drag & Drop:** `@dnd-kit/core`
- **Animations:** Framer Motion
- **State Management:** Zustand (with persist middleware)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/oualid-2012/KIMA-UNBOXING.git

# Navigate into the project
cd KIMA-UNBOXING

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BoxBuilder/      # Interactive 3D drag-and-drop workspace
│   ├── Categories/      # Category pills filter
│   ├── Checkout/        # 2-step checkout modal & order review
│   ├── Footer/          # Brand footer with social & service links
│   ├── Hero/            # Cinematic hero with floating products
│   ├── HowItWorks/      # 3-step visual unboxing journey
│   ├── MyBox/           # Slide-over cart & item management drawer
│   ├── Navbar/          # Sticky blur navigation & language toggle
│   ├── ProductCard/     # Draggable product card with touch actions
│   ├── ProductGrid/     # Filterable responsive product matrix
│   ├── ThreeDBox/       # 3D Gift Box mesh, studio lights & physics
│   └── UI/              # Reusable UI components (Capacity bar, etc.)
├── data/
│   └── products.ts      # Product catalog & pricing data
├── hooks/
│   └── useTranslation.ts# French/Arabic localization hook
├── store/
│   └── boxStore.ts      # Zustand global box store & persistence
├── types/
│   └── index.ts         # TypeScript definitions
└── styles/
```

---

## 🇲🇦 Crafted for Kima Unboxing
Designed and developed as a modern, playful, and interactive 3D unboxing experience.
