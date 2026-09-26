# TAFAWOK — Commercial Real Estate Investment & Contracting Co.

### شركة تفوق للاستثمار العقاري والمقاولات

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-amber)](#)

Multilingual (Arabic / English) enterprise commercial real estate (CRE) showcase and investment portal for **TAFAWOK Real Estate Investment & Contracting Company** — specialized in prime office developments, destination retail malls, wholesale commercial trading plazas, and turnkey EPC execution across Egypt and the Middle East.

Backed by **25+ years** of multidisciplinary execution and **5 decades** of regional Gulf engineering heritage, under the leadership of **TAFAWOK Executive Leadership**.

---

## 🏛️ Flagship Commercial Portfolio

| Development                                                     | Location                                  | Focus / Highlights                                                                                                                       |
| :-------------------------------------------------------------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Fagala Plaza** (`/properties/fagala-plaza`)                   | Nasr City, Cairo                          | Modernized 3-floor wholesale & retail stationery hub, high-capacity retail promenade, dedicated loading docks, architectural video tour. |
| **Mall ChillOut** (`/properties/mall-chillout-el-shorouk`)      | El Shorouk City                           | Integrated commercial lifestyle zone anchored by Seoudi Supermarket, Z Arcade gaming center, dining terrace, and prime brand showrooms.  |
| **October Festival Mall** (`/properties/october-festival-mall`) | Gamal Abdel Nasser Axis, 6th of October   | Premier commercial destination serving the Northern Expansions corridor with high street retail frontage and multi-deck parking.         |
| **Executive Headquarters**                                      | Building 360, Fifth Settlement, New Cairo | Corporate headquarters housing executive leadership, commercial leasing desk, and engineering project controls.                          |

---

## ⚡ Core Features & Capabilities

- **True Bilingual Internationalization (AR / EN):**
  - Instant language toggling with true RTL (Right-to-Left) and LTR layout switching.
  - Server-side cookie persistence (`tafawok_locale` and `tafawok_theme`) eliminating hydration mismatch or flash of unstyled direction (FOUC).
  - BiDi numeric & unit isolation (`<PhoneNumber />`, `<FormattedUnit />`) preventing inversion of numbers and phone dial codes in Arabic mode.
- **Production SEO & Search Engine Publishing:**
  - **Dynamic XML Sitemap (`/sitemap.xml`):** Generates crawlable sitemaps for all static routes and asset slugs with bilingual `xhtml:link` hreflang alternates.
  - **Robots Control (`/robots.txt`):** Structured crawler directives and sitemap linkage.
  - **Social Sharing OpenGraph Cards:** Dynamic 1200×630px social cards (`/opengraph-image` & `public/og-image.png`) with corporate badges for WhatsApp, LinkedIn, X, and Facebook.
  - **Schema.org Structured Data (JSON-LD):** Injected schemas for `Organization`, `RealEstateAgent`, `GeneralContractor`, `WebSite`, `BreadcrumbList`, and `ShoppingCenter` / `CommercialBuilding`.
  - **Webmaster Verification:** Integrated hooks for Google Search Console, Bing Webmaster Tools, and Yandex.
- **Vercel Web Analytics:**
  - Native integration with `@vercel/analytics/next` for non-blocking real-time traffic and visitor metrics.
- **Commercial Inquiry & RFQ Portal:**
  - Full-featured leasing request dialogs and executive contact form.
  - Production SMTP delivery via `nodemailer` with graceful preview mode fallback in local development.
- **High-Performance Multimedia & Image Pipeline:**
  - Automatic Next.js format negotiation (AVIF & WebP), optimized responsive sizing, and eager preloading for above-the-fold assets.
  - Interactive HTML5 architectural video tour with fullscreen lightbox modal for Fagala Plaza.
- **CRE Brand Aesthetic:**
  - Tailored OKLCH architectural bronze palette (`#c86a27` / `#e07a2c`) paired with obsidian dark surfaces, crisp typography (Cairo for Arabic, Inter for Latin), and subtle micro-interactions.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & State:** [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [@base-ui/react](https://base-ui.com/), [Zustand](https://zustand-demo.pmnd.rs/) (UI state only)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/postcss`)
- **Animation & Motion:** [Motion](https://motion.dev/), [GSAP](https://greensock.com/), CSS Marquees
- **Icons:** [Lucide React](https://lucide.dev/)
- **Email Delivery:** [Nodemailer](https://nodemailer.com/)
- **Analytics:** [@vercel/analytics](https://vercel.com/analytics)
- **Language:** TypeScript 5 (Strict Mode — zero `any`)

---

## 📁 Project Architecture

```
Tafawok/
├── app/                           # Next.js 16 App Router
│   ├── about/                     # Corporate heritage & leadership
│   ├── api/contact/               # Commercial RFQ & inquiry submission API
│   ├── ceo-message/               # Strategic vision & executive address by TAFAWOK Leadership
│   ├── contact/                   # Executive office coordinates & RFQ form
│   ├── properties/                # Flagship commercial properties directory
│   │   └── [slug]/                # Asset details (Fagala, ChillOut, October)
│   ├── globals.css                # OKLCH brand design tokens & Tailwind v4
│   ├── layout.tsx                 # Root layout, JSON-LD schemas, Vercel Analytics
│   ├── manifest.ts                # Web App Manifest (/manifest.webmanifest)
│   ├── opengraph-image.tsx        # Dynamic 1200x630 social share card
│   ├── page.tsx                   # Interactive commercial homepage
│   ├── robots.ts                  # Search engine crawlers (/robots.txt)
│   └── sitemap.ts                 # Multilingual XML sitemap (/sitemap.xml)
├── components/                    # UI Components
│   ├── about/                     # Heritage timelines & executive sections
│   ├── ceo/                       # CEO quote, direct reach card, vision points
│   ├── contact/                   # Contact forms, location maps, details
│   ├── home/                      # Hero, metrics, disciplines, client marquee
│   ├── layout/                    # Sticky navbar, mega-dropdown, architectural footer
│   ├── motion/                    # Scroll progress, tickers, custom cursor
│   ├── properties/                # Property cards, gallery, video tour, tenant directory
│   ├── seo/                       # Server-side JSON-LD script injector
│   ├── shared/                    # BiDi PhoneNumber, FormattedUnit, SectionHeading
│   └── ui/                        # shadcn/ui accessible primitives
├── content/                       # Single source of truth CRE data
│   └── cre-data.ts                # Master typed bilingual inventory
├── lib/
│   ├── seo/schema.ts              # Schema.org JSON-LD generators
│   └── utils.ts                   # Class name merge utilities (clsx + twMerge)
├── locales/                       # Bilingual dictionaries (en.json, ar.json)
├── public/                        # Static assets, logos, and property media
├── stores/                        # Zustand UI stores (useLocaleStore, useUiStore)
└── types/                         # Strict TypeScript domain interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `v20.x` or later
- **Package Manager:** `npm` (v10+)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/OmarTemsah99/Tafawok.git
cd Tafawok

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Configuration

Edit `.env.local` to configure production domains, search engine tokens, and mail services:

```ini
# Production Domain (Used for sitemap and canonical links)
NEXT_PUBLIC_SITE_URL=https://tafawok.co

# Search Engine Webmaster Verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_google_token_here
NEXT_PUBLIC_BING_VERIFICATION=your_bing_token_here
NEXT_PUBLIC_YANDEX_VERIFICATION=your_yandex_token_here

# Outgoing SMTP Configuration for Contact & RFQ Submissions
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@tafawok.co
SMTP_PASS=your_smtp_app_password
CONTACT_RECEIVER_EMAIL=info@tafawok.co
```

_Note: If SMTP variables are omitted during local development, submitted RFQs will safely log to the terminal console with a `200 OK` response._

---

## 🔍 Quality Verification & Scripts

```bash
# Type check TypeScript without emitting files
npm run typecheck

# Run ESLint across all files
npm run lint

# Compile and optimize production build (SSG static pages)
npm run build

# Start production server
npm run start

# Format code with Prettier
npm run format
```

---

## 🌐 Publishing & Search Engine Indexing Checklist

When deploying to production:

1. **Verify Domain & SSL:** Set `NEXT_PUBLIC_SITE_URL=https://tafawok.co`.
2. **Submit Sitemap:** In [Google Search Console](https://search.google.com/search-console), submit `sitemap.xml`.
3. **Request URL Indexing:** Inspect `https://tafawok.co` in Google Search Console and click **Request Indexing**.
4. **Bing Webmaster Tools:** Import configuration directly from Google Search Console to index on Bing, Yahoo, and Microsoft Copilot.
5. **Google Business Profile:** Verify the Cairo Headquarters at **Building 360, Fifth Settlement, New Cairo** to unlock regional Google Maps citations.
6. **Vercel Analytics:** Enable Web Analytics in the Vercel dashboard to monitor traffic metrics.

---

## 📄 License & Proprietary Notice

Copyright © 2026 **TAFAWOK Real Estate Investment & Contracting Company** (شركة تفوق للاستثمار العقاري والمقاولات). All rights reserved.
All corporate photography, architectural renderings, video tours, and corporate identities are proprietary assets of TAFAWOK CRE.
