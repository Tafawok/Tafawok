# TAFAWOK Engineering Decision Journal

Chronological decision log tracking major architectural milestones and engineering implementations.

---

## Milestone 1: Core Types, State & Bilingual Architecture (Phase 1)

- **Date:** September 2026
- **Scope:**
  - Strict TypeScript schema defining Commercial Real Estate domain entities (`Property`, `PropertySpec`, `StoreItem`, `OwnerContact`, `CorporateMetric`, `ClientPartner`, `CommercialDiscipline`).
  - Bilingual single-source-of-truth content inventory (`content/cre-data.ts`) with zero untyped strings and full English/Arabic parity.
  - Client state stores (`stores/useLocaleStore.ts` and `stores/useUiStore.ts`) powered by Zustand for lightweight UI state and dynamic RTL HTML attributes.
  - BiDi isolation primitives (`<PhoneNumber />`, `<FormattedUnit />`) and CSS utilities preventing number/unit inversion in RTL layouts.

---

## Milestone 2: Global Navigation & Architectural Footer (Phase 2)

- **Date:** September 2026
- **Scope:**
  - Modern sticky Header with backdrop blur, responsive sheet navigation for mobile devices, and dark/light theme switching.
  - Interactive Properties Mega-Dropdown (`PropertyDropdown.tsx`) showcasing all 3 flagship developments directly from the navigation bar.
  - 4-column architectural Footer (`Footer.tsx`) with corporate sitemap, location links, legal licensing, and direct owner access.
  - SVG Emblem & Brand Logo (`Logo.tsx`) combining geometric structural mark with bilingual typography.

---

## Milestone 3: Interactive Commercial Real Estate Home Page (Phase 3)

- **Date:** September 2026
- **Scope:**
  - **Motion Animation Utilities:** Created reusable viewport scroll triggers (`MotionFade.tsx`), ease-out animated counter tickers (`CounterTicker.tsx`), and continuous CSS-based marquees (`Marquee.tsx`) respecting `prefers-reduced-motion`.
  - **Architectural Hero (`HeroSection.tsx`):** High-impact kinetic typography, dual CTAs ("Explore Commercial Assets" & "Connect with Company Owner"), fast credentials bar, and interactive preview cards for the 3 flagship properties.
  - **Track Record & Scale (`MetricsSection.tsx`):** Animated numerical counters highlighting the 25-year track record, 5 decades of Gulf heritage, 77,500 m² GLA, and 50+ core engineers.
  - **Flagship CRE Showcase (`FeaturedProperties.tsx`):** 3-column architectural cards detailing Building 360 Business Park, Tafawok Retail Center, and Tafawok Logistics Park with key specs (GLA, floors, parking, occupancy) and highlights.
  - **Commercial Disciplines (`DisciplinesSection.tsx`):** 2x2 capability grid breaking down Office Towers, Destination Malls, Logistics Parks, and Turnkey EPC Contracting.
  - **Executive Perspective (`CeoQuoteSection.tsx`):** Executive statement quoting Eng. Tarek Ahmed (CEO & Owner) paired with a high-utility Direct Owner Reach Card (direct telephone, WhatsApp, email, HQ coordinates).
  - **Institutional Credentials (`ClientMarquee.tsx`):** Continuous infinite marquee presenting Tier-1 partners (Saudi Aramco, ADNOC, Bechtel, Petrofac, Samsung Engineering, Grand Hypermarket, etc.).
  - **Closing Commercial CTA (`HomeContactCta.tsx`):** Dual conversion action prompts directing tenants and investors to official inquiry channels.
  - **Verification:** 100% passes on `tsc --noEmit`, ESLint (`npm run lint`), and static page pre-rendering (`next build`).

---

## Milestone 3.1: Dedicated Bilingual Dictionaries (`en.json` & `ar.json`)

- **Date:** September 2026
- **Scope:**
  - Separated UI strings into standard JSON dictionaries: [`locales/en.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/en.json) and [`locales/ar.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/ar.json).
  - Upgraded [`stores/useLocaleStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useLocaleStore.ts) translation helper `t()` to dynamically support both dot-notation key paths (`t("home.heroTitle")`, `t("nav.home")`) and structured bilingual domain objects (`t(property.name)`).
  - Derived [`content/cre-data.ts`](file:///C:/Users/shine/WebProjects/Tafawok/content/cre-data.ts) `UI_DICTIONARY` directly from the JSON files to preserve full backward compatibility and strict type safety.
  - Verified static generation (`npm run build`), linting (`npm run lint`), and runtime SSR/SSG parity across all pages.

---

## Milestone 3.2: Cookie-Based SSR Persistence for Locale & Theme + Hydration Hardening

- **Date:** September 2026
- **Scope:**
  - Integrated asynchronous `await cookies()` from `next/headers` into [`app/layout.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/app/layout.tsx) to read `tafawok_locale` and `tafawok_theme` on initial server render.
  - Dynamically set `<html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="... font-arabic|font-sans dark">` directly on the server, eliminating layout shifts and client-side theme/font flashing.
  - Upgraded [`stores/useLocaleStore.ts`](file:///C:/Users/shine/WebProjects/Tafawok/stores/useLocaleStore.ts) to a context-backed Zustand store (`createLocaleStore` + `LocaleContext`), isolating SSR request state and synchronizing cookie changes upon language switch.
  - Added `ThemeCookieSync` to [`components/theme-provider.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/theme-provider.tsx) to write `tafawok_theme` cookie with 1-year persistence alongside localStorage.
  - Resolved all React 19 hydration mismatches in `CounterTicker` and `MotionFade` using `useSyncExternalStore` for client mounting.

---

## Milestone 4: Commercial Properties Directory & Dedicated Property Detail Pages (Phase 4)

- **Date:** September 2026
- **Scope:**
  - **Property Card Primitives (`PropertyCard.tsx`):** Architectural card featuring category badge, occupancy badge, address locator, GLA/floors/parking specs summary, and hover zoom feedback.
  - **Engineering & Specs Grid (`PropertySpecs.tsx`):** Certified technical metrics table with icon badges, BiDi-isolated `<FormattedUnit />` values, and a dedicated mission-critical engineering standards box.
  - **Visual Photography & Lightbox (`PropertyGallery.tsx`):** Responsive architectural photo gallery featuring active showcase display, thumbnail strip, and accessible full-screen Lightbox with keyboard navigation (Esc, Arrow keys) and counter badge.
  - **Commercial Tenants Directory (`StoreDirectory.tsx`):** Real-time search and category filter for on-site businesses, bank branches, and amenities, with unit numbers, floor details, operational status, and direct dial buttons.
  - **Geographic Accessibility (`PropertyMap.tsx`):** Embedded Google Maps container with coordinates, address details card, and external directions launcher.
  - **On-Site Leasing Portal (`PropertyLeasingCard.tsx`):** Direct commercial leasing desk actions (direct telephone dialing, one-click WhatsApp chat, official proposal request, and direct owner escalation).
  - **Directory Catalog (`app/properties/page.tsx` & `PropertiesDirectoryClient.tsx`):** Searchable, filterable portfolio showcase with total GLA and parking summary chips.
  - **Dynamic Route Pre-Rendering (`app/properties/[slug]/page.tsx`):** Next.js App Router dynamic route using `generateStaticParams()` to pre-render `/properties/building-360-business-park`, `/properties/tafawok-retail-center`, and `/properties/tafawok-logistics-park` with static SEO metadata.
  - **Verification:** 100% passes on `npm run typecheck`, `npm run lint`, and `npm run build` with zero errors.

---

## Milestone 4.1: Advanced Scroll Engineering & Knockout Typography Showcase ($10k Agency Polish)

- **Date:** September 2026
- **Scope:**
  - **Knockout Image-in-Text Showcase (`TextMaskShowcase.tsx`):** High-impact architectural typography (`TAFAWOK` / `تفوق`) with live photography masked directly inside the letters (`background-clip: text`), paired with parallax vertical drifting and interactive property switcher tabs (`Building 360`, `Retail Mall`, `Logistics Park`) plus an interactive cinema view mode.
  - **Dual Opposite-Direction Parallax Scroll Bands (`ParallaxScrollBands.tsx`):** Two massive full-bleed typographic tracks reacting to page scroll velocity with spring physics (`useScroll` + `useTransform` + `useSpring`) — top track glides left, bottom track glides right, alternating solid and outlined stroke typography.
  - **Alternating Staggered Horizontal Scroll Entrances (`FeaturedProperties.tsx`):** Upgraded property showcase where cards glide smoothly from alternating left and right directions (`x: -90px` / `+90px` to `0px`) on scroll with oversized architectural numeral watermarks (`01`, `02`, `03`).
  - **Architectural Scroll Progress Bar (`ScrollProgressBar.tsx`):** Precision 3px copper/bronze indicator pinned to the viewport ceiling tracking scroll progress with spring damping.
  - **Parallax 3D Card Floating Physics (`HeroSection.tsx`):** Preview cards float and separate at divergent parallax speeds as the user scrolls past the hero section.
  - **Verification:** 100% passes on TypeScript strict check (`npm run typecheck`), ESLint (`npm run lint`), and static compilation (`npm run build`).

---

## Milestone 4.2: Continuous GPU Scroll Marquees, Hydration Elimination & Bespoke Editorial Redesign

- **Date:** September 2026
- **Scope:**
  - **Zero-Hydration-Error Architecture:**
    - Root-caused and permanently eradicated the Next.js 16 / React 19 attribute mismatch on `initial={{ transform }}` in `FeaturedProperties` and `DisciplinesSection` caused by client-side `useReducedMotion()`.
    - Eliminated shorthand/longhand CSS conflict in `TextMaskShowcase` (`backgroundPosition` vs `backgroundPositionY`) to comply with React 19 style rules.
    - Used `useSyncExternalStore` mounted checks to guarantee 100% byte-for-byte attribute matching between server HTML and initial client hydration.
  - **Continuous Moving Scroll Bands (`ParallaxScrollBands.tsx`):**
    - Fixed RTL coordinate system bug where flex containers in `dir="rtl"` translated offscreen: added `dir="ltr"` coordinate isolation with Arabic BiDi isolation on items.
    - Structured tracks into two seamless halves (`w-max flex shrink-0 items-center gap-8 animate-marquee-left / right`) with edge vignette masks, guaranteeing continuous 60/120fps hardware-accelerated movement in all browsers and locales.
    - Measured and verified live movement in Chrome DevTools: `moving: true` with continuous velocity in opposite directions.
  - **Architectural Editorial Portfolio Layout (`FeaturedProperties.tsx`):**
    - Moved away from generic SaaS 3-box card kit into a prestigious editorial hierarchy:
      - **Flagship Asset (Building 360):** Full-width panoramic architectural feature with 2-column desk, 4-cell architectural specs matrix (18,500 m² GLA, G+5 Floors, Dual Substation, 380 Vehicles), blueprint coordinates, and high-impact photography.
      - **Companion Powerhouses (Retail Center & Logistics Complex):** 2-column balanced split with tailored retail and industrial metrics, eliminating text truncation and cramped cards.
      - **Alternating Slide Entrances:** Flagship asset and companion cards glide in from alternating left and right directions via deterministic `MotionFade`.
  - **Showstopper Knockout Typography (`TextMaskShowcase.tsx`):**
    - Giant knockout brand typography (`TAFAWOK` / `تفــوق` and `COMMERCIAL ASSETS` / `ريادة الأصول التجارية`) with live building photography masked inside the letterforms via `-webkit-background-clip: text`.
    - Razor-sharp bronze border strokes and luxury drop shadows ensure maximum contrast in both light and dark themes.
    - Interactive property pills (01, 02, 03) dynamically switch the masked architectural image in real time with an expandable cinema view toggle.
  - **Disciplines Architectural Elevation (`DisciplinesSection.tsx`):**
    - Added blueprint discipline codes (`DISC-01 // CORPORATE TOWERS`, `DISC-02 // RETAIL MALLS`, `DISC-03 // HEAVY LOGISTICS`, `DISC-04 // TURNKEY EPC`) with alternating sliding entrances and zero hydration divergence.
  - **Verification & Quality Gate:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 pages statically pre-rendered successfully.
    - Browser DevTools console: 0 errors, 0 warnings, Next.js issue overlay is completely clean.

---

## Milestone 4.3: React Bits Interactive Components Integration, Living SVG Knockout Mask & Motion Normalization

- **Date:** September 2026
- **Scope:**
  - **Motion Normalization & Warning Eradication:**
    - Eradicated the `[browser] You have Reduced Motion enabled on your device` console warning by removing `useReducedMotion()` from `CounterTicker.tsx` and configuring `<MotionConfig reducedMotion="never">` in `LanguageProvider.tsx`.
    - Enabled metric counter tickers to animate smoothly on all devices without being suppressed by OS/browser accessibility flags.
  - **Integrated Three Interactive Components from `prompt.md`:**
    - **`ScrollExpandShowcase.tsx` (`ScrollExpand`):** Full-bleed stage expansion driven by page scroll where the media frame expands from 50% to 100% full bleed, resting title lifts away, and rich architectural metrics (GLA, occupancy, parking) fade in over the flagship asset (Building 360 Business Park).
    - **`FeaturedProperties.tsx` (`AccordionGallery`):** Integrated GSAP-powered interactive accordion gallery with 3D perspective tilt (`6deg`), internal image parallax drift as panels resize, desaturation transitions on collapsed panels, and illuminated bronze accent bars (`oklch(0.553 0.195 38.402)`).
    - **`CeoQuoteSection.tsx` (`BorderGlow`):** Wrapped the CEO executive statement in an interactive cursor-following mesh gradient border with warm copper/amber glow (`#d97706`, `#b45309`, `#f59e0b`) and soft ambient depth.
  - **Living Architectural SVG Knockout Mask (`TextMaskShowcase.tsx`):**
    - Replaced CSS text-clipping with a true physical SVG knockout mask (`mask="url(#creKnockoutMask)"`) where the letters `TAFAWOK` / `تــفـــوق` are a transparent aperture cut directly through the page surface.
    - Behind the letters, high-res architectural photography travels vertically with deep parallax (`imageY: [-130px, 130px]`, `scale: [1.18, 1.06]`) and mouse micro-drift, creating palpable, unmistakable motion inside the typography.
    - Sub-pixel precision SVG stroke (`strokeWidth="2.5"`) directly aligned in SVG coordinate space, eliminating kerning discrepancies.
  - **Balanced Information Architecture & Page Pacing:**
    - Unified the home page layout so sections have clear breathing room: Hero -> Metrics -> ScrollExpand -> TextMaskShowcase -> FeaturedProperties (AccordionGallery) -> DisciplinesSection -> CeoQuoteSection (BorderGlow) -> ParallaxScrollBands -> ClientMarquee -> HomeContactCta.
  - **Verification & Quality Gate:**
    - Browser DevTools console: 0 errors, 0 warnings.

---

## Milestone 4.4: shadcn/ui Component Standardization

- **Date:** September 2026
- **Scope:**
  - **Installed Core shadcn/ui Primitives via CLI:**
    - `Card` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`) via `npx shadcn@latest add card`.
    - `Tabs` (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`) via `npx shadcn@latest add tabs`.
    - `Avatar` (`Avatar`, `AvatarImage`, `AvatarFallback`) via `npx shadcn@latest add avatar`.
  - **Standardized UI Across Platform Components:**
    - **`MetricsSection.tsx`:** Standardized 4 corporate metric tiles into full shadcn `Card` composition (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) and `Badge` tags.
    - **`FeaturedProperties.tsx`:** Standardized the 3 companion powerhouse cards into `Card` with `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, and `Badge` occupancy/category pills.
    - **`DisciplinesSection.tsx`:** Converted the 4 commercial discipline grids into standardized `Card` composition with `CardHeader`, `CardTitle`, `CardDescription`, and feature checklist in `CardFooter`.
    - **`PropertyCard.tsx`:** Refactored the core catalog property card (`/properties`) into full shadcn `Card`, `Badge`, and `Separator` composition.
    - **`StoreDirectory.tsx`:** Transformed tenant and service directory cards into semantic `Card` items with `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter`, and status `Badge` indicators.
  - **Resolved Turbopack HMR Exception:**
    - Removed redundant `MotionConfig` from `LanguageProvider.tsx`.
  - **Applied All 23 Canonical Tailwind CSS IntelliSense Classes:**
    - Cleaned up arbitrary values to standardized shorthand equivalents (`aspect-video`, `h-0.75`, `inset-s-0`, `min-h-80`, `grayscale-15`, `contrast-105`, `max-w-50`).
  - **Verification:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 static routes generated successfully.
    - Browser DevTools console: Clean, 0 errors.

---

## Milestone 4.5: Clean UI Refinement, TargetCursor Integration & Codebase De-Cluttering

- **Date:** September 2026
- **Scope:**
  - **Removed All Background Effects:**
    - Stripped ambient glowing radial gradients, blueprint grids, and decorative overlays from `HeroSection`, `FeaturedProperties`, and `ParallaxScrollBands`.
    - Removed `ArchitecturalBackground` from `app/layout.tsx` and deleted `components/motion/ArchitecturalBackground.tsx`.
    - Restored pristine, clean architectural surfaces with high contrast.
  - **Pruned Dead & Obsolete Code:**
    - Removed orphaned and superseded components: `components/home/DisciplinesSection.tsx`, `components/home/HomeContactCta.tsx`, `components/home/TextMaskShowcase.tsx`, and `components/motion/BorderGlow.tsx`.
    - Zero dead component imports across the entire codebase.
  - **React Bits TargetCursor Integration:**
    - Installed and configured `TargetCursor` with dynamic frame-by-frame target geometry tracking (`tickerFn` updates `activeTarget.getBoundingClientRect()` continuously) ensuring flawless tracking even on animated components like `AccordionGallery`.
    - Fixed all Tailwind Intellisense canonical classes (`translate-x-[-150%]`, `translate-y-[-150%]`).
  - **Scrollbar Hidden via Built-In Progress Indicator:**
    - Added global scrollbar hiding (`scrollbar-width: none; -ms-overflow-style: none; display: none;`) as scroll position is clearly displayed via the top architectural copper progress bar.
  - **Verification & Build Gate:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 static routes generated successfully.
    - Browser DevTools console: Clean, 0 errors.

---

## Milestone 4.6: shadcn Dialog Gallery, Breadcrumbs, Evergreen CRE Architecture & 100% Next.js `<Image>`

- **Date:** September 2026
- **Scope:**
  - **shadcn Dialog Fullscreen Gallery (`PropertyGallery.tsx`):**
    - Replaced custom lightbox `div` overlay with accessible, focus-trapped, and backdrop-blurred shadcn `Dialog` primitive.
    - Added responsive full-width viewport dialog (`w-[96vw] sm:max-w-6xl h-[92vh]`) with integrated image counter, property title, navigation arrows, and bottom filmstrip thumbnail carousel.
    - Integrated keyboard navigation (Escape to dismiss, Arrow keys for cycling, RTL-aware).
  - **shadcn Breadcrumb Component (`PropertyDetailClient.tsx`):**
    - Installed and integrated official `@/components/ui/breadcrumb` (`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`).
    - Handled RTL chevron rotation and seamless client-side Next.js routing via `render={<Link href="..." />}`.
  - **Evergreen Static CRE Data Model (No Stale Content):**
    - Removed dynamic leasing availability and occupancy percentage figures from all user-facing interfaces (catalog property cards, detail hero stat chips, overview feature boxes, homepage showcase widgets, dropdown menus, and store directory).
    - Substituted with permanent, structural engineering data: Built-Up Area (BUA), Gross Leasable Area (GLA), Levels & Floors, and Dedicated Parking Capacity.
  - **100% Next.js `<Image>` Adoption:**
    - Replaced all remaining raw `<img>` tags in `AccordionGallery.tsx` and `ScrollExpand.tsx` with Next.js `<Image>` utilizing responsive `fill`, `sizes`, and `priority` optimization.
    - Removed `@next/next/no-img-element` eslint ignores. Zero `<img>` tags remain across the entire repository.
  - **Verification & Quality Gate:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - `npm run build`: 10/10 static routes generated in 699ms.
    - Browser DevTools console: Clean, 0 errors.

---

## Milestone 4.7: Full Bilingual Parity & RTL Hardening Across All Navigation, Catalog & Detail Surfaces

- **Date:** September 2026
- **Scope:**
  - **100% Bilingual Parity (EN/AR) & Zero Hardcoded Strings:**
    - Synchronized `locales/en.json` and `locales/ar.json` with 100% key parity across all namespaces (`nav`, `home`, `propertyCard`, `propertyDetail`, `propertiesPage`, `storeDirectory`, `propertyGallery`, `propertyDropdown`, `owner`, `contactForm`, `footer`, `about`, `ceoMessage`, `common`).
    - Verified bidirectional parity via node verification test: 0 missing keys in EN->AR and AR->EN.
    - Replaced remaining hardcoded inline ternaries in `Navbar.tsx`, `MobileNav.tsx`, `PropertyDropdown.tsx`, `PropertyCard.tsx`, `PropertiesDirectoryClient.tsx`, `PropertyMap.tsx`, `PropertySpecs.tsx`, `StoreDirectory.tsx`, `ScrollExpandShowcase.tsx`, and `Footer.tsx` with unified `t()` dictionary keys.
  - **Localized Architectural Stats & BiDi Isolation:**
    - Converted `floors` and `parkingCapacity` to `LocalizedString` across all flagship properties (`Building 360`, `Tafawok Retail Center`, `Tafawok Logistics Park`), rendering natural Arabic (`أرضي + 5 طوابق + 3 بدروم`, `380 سيارة`) and English (`G + 5 Floors + 3 Basements`, `380 Vehicles`) without truncation or BiDi inversion.
    - Removed `(Available for Lease)` / `(متاح للتأجير)` from store directories to preserve static evergreen presentation.
  - **Pruned Unused Variables & Strict Lint Compliance:**
    - Cleaned up unused `isArabic` references in client components.
    - Zero `any` types throughout the entire codebase.
  - **Verification & Quality Gate:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - `npm run build`: 10/10 static routes generated in 409ms via Next.js 16.3 Turbopack.
    - Visual verification via Chrome DevTools in both Arabic RTL and English LTR viewports.

---

## Milestone 4.8: Human-Centric Architectural Design, Tactile Warm Palette & Executive Stewardship Integration

- **Date:** September 2026
- **Scope:**
  - **Tactile Warm Architectural Color Palette (`globals.css`):**
    - Shifted base color palette from cold tech/SaaS telemetry hues (cyan/purple/cold obsidian at hue 285°) to warm, prestigious architectural real estate materials (limestone, travertine, and architectural warm copper/bronze at hues 45°–65°).
    - Light mode: Warm natural limestone parchment (`oklch(0.988 0.005 65)`), rich espresso foreground (`oklch(0.18 0.015 45)`), soft stone card surfaces, warm bronze primary accents.
    - Dark mode: Warm architectural graphite/obsidian (`oklch(0.142 0.008 50)`), warm stone card elevations (`oklch(0.182 0.012 48)`), and bronze-tinted architectural frame borders (`oklch(0.27 0.016 46)`).
  - **Human-Centric Property Hero Transformation (`PropertyDetailClient.tsx`):**
    - Completely dismantled cold, redundant "SaaS telemetry" metric box chips and duplicate overview cards.
    - Replaced with an **Architectural Stat Ribbon**: A continuous hairline-divided bar presenting GLA, Elevation & Levels, Dedicated Parking, and Total Built-Up Area with dignified typography.
    - Added **Human Scale & Wellbeing Badges**: Emphasizing Natural Daylight & Thermal Comfort, Acoustic Privacy & Quiet Focus, and Executive Hospitality & Wellness.
    - Elevated **Executive Founder & Personal Stewardship Card**: Highlighting Eng. Tarek Ahmed (CEO & Founder), featuring his signed personal commitment to tenants and investors, an executive "TA" monogram emblem, 25+ years leadership credibility, direct personal WhatsApp reach, and on-site leasing concierge coordinates.
  - **Arabic Cursive Typography & BiDi Hardening:**
    - Removed `font-mono` from all user-facing Arabic text strings (such as `380 سيارة` and zoning classifications), preserving natural Arabic cursive ligature shaping.
    - Updated `BiDiIsolate` default to `dir="auto"`, allowing Unicode Bidirectional Algorithm to naturally layout mixed Latin/Arabic measurements without manual string chopping.
    - Added `whitespace-nowrap` on catalog summary metric values.
  - **Catalog Directory Full Bilingual Integration (`PropertiesDirectoryClient.tsx`):**
    - Moved the directory hero section into `PropertiesDirectoryClient` to guarantee dynamic translation of badge, title, and subtitle when toggling between Arabic and English.
    - Localized summary strip values (`77,500 m²` / `77,500 م²`, `1,320+ Dedicated Bays` / `1,320+ موقف مخصص`).
  - **Verification & Quality Gate:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - `npm run build`: 10/10 static routes prerendered in 391ms.
    - Multi-viewport, multi-locale, and light/dark theme verification via Chrome DevTools.

---

## Milestone 4.9: Architectural Monograph Layout, Clean Neutral Obsidian Palette & Directory Polish

- **Date:** September 2026
- **Scope:**
  - **Clean Neutral Obsidian Palette Restored (`globals.css`):**
    - Reverted dark mode from the muddy brown/sepia tint back to the crisp, high-contrast neutral obsidian/charcoal foundation (`oklch(0.141 0.005 285.823)` background, `oklch(0.21 0.006 285.885)` cards, and crisp `oklch(0.985 0 0)` typography).
    - Preserved high-contrast architectural bronze/copper accents (`oklch(0.553 0.195 38.402)`).
  - **Architectural Monograph Hero (`PropertyDetailClient.tsx`, `PropertyGallery.tsx`):**
    - Repositioned high-resolution cinematic gallery to the very top as a full-width hero frame with floating fullscreen dialog trigger (`showHeading={false}`).
    - Replaced disjointed photo boxes with an architectural monograph header: Swiss-inspired bold title, bronze category classification, narrative editorial synopsis, Google Maps pin, and continuous hairline stat ribbon (GLA, Floors, Parking, BUA).
  - **Editorial Hairline Specifications (`PropertySpecs.tsx`):**
    - Transformed card-based metric chips into an unboxed, continuous hairline grid table with subtle horizontal dividers and checkmark highlights.
  - **Lobby Directory Index Board (`StoreDirectory.tsx`):**
    - Replaced card grid with an institutional architectural directory index table (Unit #, Tenant & Description, Floor, Category, Direct Phone).
    - Replaced parenthesized count strings (`(6)`) with subtle badge pills (`<span className="...">6</span>`) to prevent Unicode Bidirectional Algorithm (UBA) parenthesis mirroring in mixed contexts.
    - Added `dir="ltr"` and monospace styling to `unitNumber` cells for flawless multi-unit formatting across RTL and LTR.
  - **Asset Photography Integrity (`content/cre-data.ts`):**
    - Replaced broken 404 Unsplash image ID in `tafawok-retail-center` with a verified high-resolution commercial interior asset (`photo-1555529669-e69e7aa0ba9a`).
    - Verified 100% of all image URLs in the portfolio return HTTP 200.
  - **Quality Gates & Static Build:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - Verified via Chrome DevTools across all 3 flagship properties in Arabic (RTL) and English (LTR).

---

## Milestone 4.10: Official Shadcn Table Integration & Unboxed Option 2 Leasing Layout

- **Date:** September 2026
- **Scope:**
  - **Official Shadcn Table Integration (`components/ui/table.tsx`):**
    - Added the official shadcn `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell` primitives.
    - Fixed CLI import issue (`cn` from `@/lib/utils` instead of `"cn"`).
    - Refactored `StoreDirectory.tsx` to consume shadcn Table components with responsive horizontal scrolling and architectural styling.
  - **Option 2 Leasing Desk Implementation (`PropertyLeasingCard.tsx`):**
    - Dismantled the awkward dual-card side-by-side design.
    - **Left Column (Unboxed Editorial):** 100% unboxed, sitting directly on the background with spacious Swiss typography, subtle hairline border for on-site management suite coordinates, and primary call/inquire triggers.
    - **Right Column (Single Accentuated Card):** Replaced with a single, prestigious shadcn `Card` for Eng. Tarek Ahmed's Executive Stewardship (monogram badge, leadership years, signed commitment quote, and direct WhatsApp / personal line).
  - **Quality Gates:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 errors.
    - `npm run build`: 10/10 static pages generated in 365ms.
    - Verified via Chrome DevTools in both Arabic and English.

---

## Milestone 4.11: Mobile & Tablet Directory Cards and Touch/Tablet Cursor Suppression

- **Date:** September 2026
- **Scope:**
  - **Responsive Directory Cards for Smaller Screens (`StoreDirectory.tsx`):**
    - Recognized that multi-column tables cause horizontal scrolling and poor legibility on phones and tablets.
    - Implemented a dual-presentation architecture:
      - **Desktop (`>= 1024px`, `hidden lg:block`):** Full 5-column shadcn `Table` with hover highlights, monospace unit codes, and direct call actions.
      - **Tablets (`768px – 1023px`, `sm:grid-cols-2 lg:hidden`):** A 2-column grid of dedicated architectural directory cards with top unit pill badges, floor markers, tenant details, and full-width tap-friendly contact actions.
      - **Mobile Phones (`< 768px`, `grid-cols-1`):** A single-column vertical stack with clear hierarchy, high contrast, and 44px+ tap targets.
  - **TargetCursor Disabled on Tablets & Phones (`TargetCursor.tsx`):**
    - Enhanced detection via `useSyncExternalStore` and `subscribeTouchOrTablet`:
      - Disables if viewport width `< 1024px` (phones, mini tablets, iPad Air, iPad Pro).
      - Disables if touch points exist (`navigator.maxTouchPoints > 0` or `'ontouchstart' in window`) alongside coarse pointer or no-hover media queries (`pointer: coarse`, `hover: none`).
      - Explicitly suppresses on mobile and tablet user agents (including iPadOS desktop Safari mode).
      - Completely unmounts cursor portal (`return null`), detaches GSAP listeners, and restores native body cursor.
  - **Quality Gates & Static Build:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - `npm run build`: 10/10 static pages generated in 377ms.
    - Verified live across 1440px desktop, 768px tablet, and 390px mobile viewports via Chrome DevTools.

---

## Milestone 5: Corporate About Us & Dedicated CEO Message Pages (Phase 5)

- **Date:** September 2026
- **Scope:**
  - **Data Layer Expansion (`content/cre-data.ts` & `types/cre.ts`):**
    - Added comprehensive, strictly typed schemas: `TimelineMilestone`, `CorporateValue`, `HseCharter`, `HsePrinciple`, `InvestmentPillar`, `CeoMilestone`, and `CeoProfile`.
    - Structured authentic data extracted from corporate knowledge base (`TAFAWOK_ASSETS_AND_CONTENT.md`):
      - 6-era chronological milestones spanning the 1970s Gulf roots through to 2026+ sustainable CRE expansions.
      - 7 foundational values (Teamwork, Honesty, Transparency, Credibility, Responsibility, Commitment, Technical Rigor).
      - Zero-Harm HSE policy charter signed by Eng. Tarek Ahmed with 6 core commitments and ISO 9001 / ISO 45001 / ISO 14001 / NFPA-13 standards.
      - 4-pillar commercial real estate investment thesis comparing institutional standards against speculative development.
      - Full executive address, biographical narrative, and 3 pillars of leadership doctrine for Eng. Tarek Ahmed.
  - **About Us Route (`app/about/page.tsx` & `components/about/`):**
    - `AboutHeroSection.tsx`: Monumental architectural typography with 4-stat animated counter ticker.
    - `TimelineSection.tsx`: Interactive vertical timeline with category filters and check-item highlights.
    - `InvestmentThesisSection.tsx`: 4 investment pillars with metric badges and a side-by-side comparison matrix.
    - `CorporateValuesSection.tsx`: 7 values grid with lucide icons and numbered badges.
    - `HseSection.tsx`: Executive safety policy statement with signature block, 6 operational safety commitments, and certified compliance badges.
    - `AboutCtaSection.tsx`: Closing commercial portfolio and leadership outreach CTA.
  - **Dedicated CEO Message Route (`app/ceo-message/page.tsx` & `components/ceo/`):**
    - `CeoHeroSection.tsx`: Executive credentials, core corporate philosophy quote banner, and quick-reach widget.
    - `CeoAddressSection.tsx`: Formal executive address with salutation, 4 authoritative paragraphs, and direct signature block.
    - `CeoDoctrineSection.tsx`: 3 strategic leadership pillars (Tangible Asset Value, In-House Engineering Cadre, Open Owner Door).
    - `CeoCareerSection.tsx`: 4-era career milestones spanning Gulf infrastructure, Cairo founding, institutional EPC, and CRE stewardship.
    - `CeoDirectReachCard.tsx`: Dedicated executive contact card featuring BiDi-isolated telephone dialing, direct WhatsApp link, email, and Cairo HQ coordinates.
  - **Bilingual & RTL Alignment:**
    - Full English and Arabic string parity in `locales/en.json` and `locales/ar.json`.
    - Dynamic RTL layout mirroring with BiDi isolation for phone numbers and metric units.
  - **Quality Gates & Build Verification:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 errors (`eslint`).
    - `npm run build`: 12/12 static pages generated successfully in 357ms.
    - Live browser inspection verified with Chrome DevTools in both Arabic (RTL) and English (LTR).

---

## Milestone 5.1: Swiss Editorial Unboxed Layout & Shadcn Primitives Integration

- **Date:** September 2026
- **Scope:**
  - **User Feedback & Design Realignment:**
    - Preserved the user-acclaimed `TimelineSection` (`components/about/TimelineSection.tsx`) exactly as loved.
    - Replaced generic SaaS card grids across both `/about` and `/ceo-message` with unboxed Swiss editorial numbered rows (generous typography, subtle dividers, accent numerals `01`–`07`).
  - **Official Shadcn UI Components Integration:**
    - Incorporated shadcn `Avatar` & `AvatarFallback` (`TA` monogram) for executive branding and signatory trust.
    - Utilized official shadcn `Badge` variants for accreditation codes, tenure markers, and quality benchmarking.
    - Modeled the single focused executive reach card on `PropertyLeasingCard.tsx` using shadcn `Card`.
    - Integrated shadcn `Separator` where appropriate.
  - **HSE Executive Safety Charter:**
    - Refactored into an authentic signed Executive Safety Charter document signed by Eng. Tarek Ahmed with certification badges (ISO 9001, ISO 45001, ISO 14001, NFPA-13/72) and unboxed commitment rows.
  - **Arabic Typography Hardening:**
    - Eliminated cursive ligature disruptions caused by monospace/letter-spacing (`tracking-widest`, `tracking-wider`, `uppercase`) on Arabic text across all About and CEO sections.
  - **Quality Gates Verification:**
    - `npm run typecheck`: 0 errors.
    - `npm run lint`: 0 warnings, 0 errors.
    - `npm run build`: 12/12 static pages compiled and pre-rendered cleanly.
    - Verified via Chrome DevTools in both Arabic (RTL) and English (LTR).

---

## Milestone 5.2: Site-Wide Elimination of Pill Badges in Favor of Architectural Typographic Overlines

- **Date:** September 2026
- **Scope:**
  - **Design Problem Solved:**
    - Repetitive, generic SaaS-style pill capsules (`rounded-full`, bordered backgrounds with miscellaneous icons) above section headlines created visual noise and diluted the impact of genuine functional badges.
  - **Architectural Design Realignment:**
    - Systematically replaced section header pill bubbles across the entire platform with an understated, elegant architectural typographic overline:
      - Crisp geometric square marker (`size-1.5 bg-primary shrink-0`) paired with clean category typography (`text-xs font-bold text-primary`).
      - True RTL protection: `uppercase tracking-wider` applied exclusively to LTR/English to maintain pristine cursive Arabic ligatures.
      - Preserved `<Badge>` strictly for actual functional and certified data (e.g., ISO certifications, property GLA stats, career milestone years, and unit badges).
  - **Files Refactored:**
    - `components/home/MetricsSection.tsx`
    - `components/home/FeaturedProperties.tsx`
    - `components/home/ScrollExpandShowcase.tsx`
    - `components/home/CeoQuoteSection.tsx`
    - `components/home/ClientMarquee.tsx`
    - `components/about/AboutHeroSection.tsx`
    - `components/about/TimelineSection.tsx`
    - `components/about/InvestmentThesisSection.tsx`
    - `components/about/CorporateValuesSection.tsx`
    - `components/about/HseSection.tsx`
    - `components/about/AboutCtaSection.tsx`
    - `components/ceo/CeoHeroSection.tsx`
    - `components/ceo/CeoAddressSection.tsx`
    - `components/ceo/CeoDoctrineSection.tsx`
    - `components/ceo/CeoCareerSection.tsx`
    - `components/ceo/CeoDirectReachCard.tsx`
    - `components/properties/PropertiesDirectoryClient.tsx`
  - **Quality Gates Verification:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 warnings, 0 errors (`eslint`).
    - `npm run build`: 12/12 static pages compiled and pre-rendered cleanly in ~380ms.
    - Live browser inspection verified across Home, About Us, CEO Message, and Commercial Properties pages.

---

## Milestone 5.3: Minimalist Card Dismantling, Avatar Removal & React Bits LineSidebar Integration

- **Date:** September 2026
- **Scope:**
  - **Card Dismantling & Minimalist Separation:**
    - Dismantled heavy card wrappers (`bg-card`, border frames, shadows) in `CeoHeroSection`, `CeoAddressSection`, `CeoDirectReachCard`, and `HseSection`.
    - Replaced boxed elements with minimalist typography, generous whitespace, and subtle `<Separator />` hairlines, matching architectural monograph standards (Foster + Partners, Zaha Hadid style).
    - Unified container width to `max-w-4xl` across all monograph sections on `/ceo-message` for optimal typographical line length (60–75 characters) and consistent spatial rhythm.
  - **Avatar Removal Across Platform:**
    - Completely eliminated all `Avatar` and `AvatarFallback` monogram bubbles across executive bylines and safety signatories (`CeoHeroSection`, `CeoAddressSection`, `HseSection`).
    - Replaced with crisp typographic signatures: Name (`text-base font-black sm:text-lg`), Role (`text-xs font-bold text-primary`), Company (`text-xs text-muted-foreground`), and certified credentials.
  - **React Bits `<LineSidebar />` Integration:**
    - Built `components/motion/LineSidebar.tsx` adhering to the React Bits specification, equipped with:
      - Full TypeScript interfaces and strict typing (zero `any`).
      - Dynamic CSS custom properties and color-mixing (`color-mix(in srgb, var(--accent-color) ..., var(--text-color))`).
      - Full bidirectional RTL/LTR support: mirrored origin transforms (`origin-right` vs `origin-left`), reversed shift multiplier, and logical spacing.
      - Smooth cursor proximity spring animation with `requestAnimationFrame` loop.
      - React 19 & ESLint compliance: refs updated within `useEffect` without mutating during render.
  - **Architectural Monograph Chapter Navigation:**
    - Integrated `<LineSidebar />` into `components/ceo/CeoMessageClient.tsx` as a floating desktop architectural chapter index (`hidden xl:block fixed start-6 2xl:start-10 top-1/2 -translate-y-1/2`).
    - Anchored 5 monograph chapters:
      1. `01 Executive Profile` (`#executive-profile`)
      2. `02 Formal Address` (`#formal-address`)
      3. `03 Strategic Doctrine` (`#strategic-doctrine`)
      4. `04 Career Milestones` (`#career-milestones`)
      5. `05 Direct Reach` (`#direct-reach`)
    - Implemented bidirectional scroll-spy synchronization that automatically tracks reading position through the sections.
    - Added smooth-scroll click navigation with sticky navbar offset compensation.
    - Added bilingual chapter dictionary entries in `locales/en.json` and `locales/ar.json`.
  - **Quality Gates Verification:**
    - `npm run typecheck`: 0 errors (`tsc --noEmit`).
    - `npm run lint`: 0 warnings, 0 errors (`eslint`).
    - `npm run build`: 12/12 static pages compiled and pre-rendered cleanly via Next.js 16 Turbopack.
    - Verified via Chrome DevTools in Arabic (RTL) and English (LTR) across both dark and light modes.

---

## Milestone 5.4: Site-Wide LineSidebar Integration, Total Badge Elimination & Full Minimalist Realignment

- **Date:** September 2026
- **Scope:**
  - **Site-Wide React Bits `<LineSidebar />` Integration:**
    - Adopted the exact React Bits design specification provided:
      - `markerLength = 60`, `markerGap = 0`, `maxShift = 30`, `tickScale = 0.5`, `scaleTick = true`, `itemGap = 20`, `fontSize = 1.1`, `proximityRadius = 100`, `smoothing = 100`.
      - Built a reusable high-order container `components/motion/PageLineSidebar.tsx` with automated scroll-spy tracking and offset-adjusted smooth-scroll clicks.
      - Integrated across **all pages** of the platform:
        1. **Home (`/`):** 6 chapters (`#hero`, `#metrics`, `#showcase`, `#portfolio`, `#leadership`, `#partners`).
        2. **About Us (`/about`):** 6 chapters (`#heritage`, `#timeline`, `#thesis`, `#values`, `#hse`, `#outreach`).
        3. **CEO Message (`/ceo-message`):** 5 chapters (`#executive-profile`, `#formal-address`, `#strategic-doctrine`, `#career-milestones`, `#direct-reach`).
        4. **Properties Directory (`/properties`):** 3 chapters (`#portfolio-hero`, `#portfolio-metrics`, `#asset-directory`).
        5. **Property Detail (`/properties/[slug]`):** Dynamic chapters (`#property-overview`, `#property-specs`, `#property-directory`, `#property-location`, `#property-leasing`).
      - Verified bidirectional RTL/LTR support: mirrored origin transforms, dynamic start/end alignment (`start-6 2xl:start-10`), and isolated numerics.
  - **Total Elimination of Top Badges & Overlines:**
    - Per user directive, completely removed all top badges, overlines, and section marker chips across all pages so sections open directly into confident, authoritative `<h1>`/`<h2>` typography.
    - Removed all remaining instances of `<Badge>` across the entire codebase (`FeaturedProperties`, `PropertyCard`, `InvestmentThesisSection`, `HseSection`, `PropertyDropdown`, `MobileNav`), replacing any functional metrics with clean, high-contrast monospace typography.
  - **Unboxed Architecture & Zero-Avatar Enforcement:**
    - Converted `PropertyLeasingCard.tsx` from an enclosed box into a clean, unboxed minimalist section with architectural dividers.
    - Removed all `Avatar` components site-wide.
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - `npm run lint` (`eslint`): 0 warnings, 0 errors.
    - `npm run build` (`next build`): 12/12 static routes compiled successfully via Next.js 16 Turbopack in ~398ms.

---

## Milestone 5.5: Free-Floating LineSidebar, Plain Text Metrics with Vertical Separators & Single CTA Streamlining

- **Date:** September 2026
- **Scope:**
  - **Free-Floating `<LineSidebar />`:**
    - Removed the enclosing card container (border, background blur box, shadow, padding) from `components/motion/PageLineSidebar.tsx`.
    - `<LineSidebar />` now floats freely and natively directly on the page surface.
  - **Metrics Cards Replaced with Plain Text & Vertical `<Separator />`:**
    - Replaced all `<Card>` components in `MetricsSection.tsx`, `AboutHeroSection.tsx`, and `PropertiesDirectoryClient.tsx` with pure typographic metrics.
    - Added vertical shadcn `<Separator orientation="vertical" />` components between metrics on desktop, gracefully switching to subtle dividers on mobile.
  - **Content Reduction & Owner Personal Detail Removal:**
    - Removed education and academic resume milestones from `CeoHeroSection.tsx`.
    - Removed `CeoCareerSection.tsx` (the 1998–2026 multi-era resume timeline) to eliminate biographical clutter.
    - Streamlined `InvestmentThesisSection.tsx` on `/about` by removing the redundant 6-row comparison matrix, focusing entirely on the 4 core Pillars of Investment Excellence.
  - **Single Focused CTA Per Page (Eliminating Contact Overload):**
    - Removed the multiple redundant contact channels in `CeoHeroSection.tsx` (direct WhatsApp button, phone button, direct email lines).
    - Refactored `CeoDirectReachCard.tsx` and `AboutCtaSection.tsx` into single, focused executive CTA sections with a direct telephone call action to the company and a link to the upcoming official contact page.
    - Updated chapters on `/ceo-message` to 4 clear, focused sections: Profile, Formal Address, Strategic Doctrine, and Direct Reach.
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - `npm run lint` (`eslint`): 0 errors, 0 warnings.
    - `npm run build` (`next build`): 12/12 static routes compiled in ~392ms.

---

## Milestone 5.6: Home Metrics Unification, 100% Translation Key Parity & Minimalist Realignment

- **Date:** September 2026
- **Scope:**
  - **Home Page Minimalist Metric Strip (`MetricsSection.tsx`):**
    - Replaced boxed cards and heavy section titles with the exact minimalist plain-text style from the properties directory: uppercase muted label on top, bold animated counter value below, separated by vertical `<Separator orientation="vertical" />`.
    - Maintained full responsive flexibility with horizontal dividers on mobile and vertical hairlines on desktop.
  - **Hero Section Minimalist Cleanup (`HeroSection.tsx`):**
    - Removed redundant secondary call buttons; eliminated mobile pill badges, converting credentials into a clean, badge-free dot-separated inline list.
  - **100% Translation Key & Namespace Audit:**
    - Scanned all 106 unique `t(...)` keys across the codebase with zero missing translations.
    - Added missing `about.hseZeroHarm` ("Zero-Harm Enforced Policy" / "ميثاق السلامة الخالية من الحوادث (Zero-Harm)") in both `locales/en.json` and `locales/ar.json`.
    - Added `propertyDetail.directDeskPhone` and `propertyDetail.callDirect` with complete bidirectional parity.
    - Verified exact dictionary symmetry: 234 keys in English, 234 keys in Arabic (0 delta).
  - **Property Detail Leasing Desk Streamlining (`PropertyLeasingCard.tsx`):**
    - Dismantled redundant two-column founder WhatsApp/personal quote block into a single clean leasing desk CTA with direct phone call and inquiry link.
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - `npm run lint` (`eslint`): 0 errors, 0 warnings.
    - `npm run build` (`next build`): 12/12 static routes generated cleanly.

---

## Milestone 5.7: Timeline Sidebar Bounding Area Tracking & End-of-Page Active State Fix

- **Date:** September 2026
- **Scope:**
  - **Timeline Sidebar (`components/motion/PageLineSidebar.tsx`) Precision Scroll Engine:**
    - Resolved the issue where the final item in the sidebar never became active when scrolled to the complete bottom of the page.
    - Replaced the brittle linear `top <= scrollY + 160` scroll check with a multi-tiered viewport bounding area algorithm:
      1. **End-of-Page Guarantee:** When reaching the bottom of the document (`remainingScroll <= 60px`), the final chapter is unconditionally activated.
      2. **Top-of-Page Detection:** When at the top (`scrollY <= 60px`), the first chapter is unconditionally activated.
      3. **Last Section Early-Entry Logic:** If the final section enters the viewport and physical page scroll constraints prevent its top from reaching the standard focal line, it cleanly activates.
      4. **Bounding Box Focal Intersection:** Determines active sections by checking if the reader's eye focal line (~35% down the viewport) is inside the section's bounding rectangle (`rect.top <= focalLine && rect.bottom > focalLine`), with a graceful fallback to the last entered section.
      5. **Scroll Performance & Click Smoothness:** Wrapped scroll measurement in `requestAnimationFrame` to eliminate layout thrashing, and added click-scroll locking with interruptible cancel on user wheel/touch events.
  - **Semantic Section IDs & Anchor Clearance:**
    - Standardized all chapter targets across the platform to semantic `<section id="...">` elements with `scroll-mt-20` for proper sticky header clearance.
    - Updated [`PropertiesDirectoryClient.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/properties/PropertiesDirectoryClient.tsx) (`#portfolio-hero`, `#portfolio-metrics`, `#asset-directory`) and [`PropertyDetailClient.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/properties/PropertyDetailClient.tsx) (`#property-overview`, `#property-specs`, `#property-directory`, `#property-location`, `#property-leasing`).
    - Added `scroll-mt-20` to all sections on Home (`/`), About (`/about`), and CEO Message (`/ceo-message`).
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - `npm run build` (`next build`): 12/12 static routes compiled in ~410ms.

---

## Milestone 6.0: Contact Portal, Executive Owner Reach & Secure SMTP Backend Delivery Service

- **Date:** September 2026
- **Scope:**
  - **Secure SMTP Backend Delivery Route (`app/api/contact/route.ts`):**
    - Built a robust Next.js API Route for handling official commercial inquiries via `nodemailer`.
    - Supports standard environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_RECEIVER_EMAIL`.
    - Integrated safe dev-mode preview fallback that logs structured inquiries to the server console with a 200 OK preview response when SMTP credentials are unset.
    - Added strict field-level server validation (name, corporate email, phone, requirements message) returning 400 Bad Request with mapped error messages.
    - Architectural HTML email template featuring TAFAWOK copper branding, metadata table, and tenant requirements block.
  - **Bilingual Inquiry & RFQ Form (`components/contact/ContactForm.tsx`):**
    - Unboxed, high-contrast CRE styling matching platform aesthetic.
    - Supports initial pre-selected property via URL query param (`?property=...`).
    - Multi-option classification selector (Office/Retail Leasing, CRE Investment & JVs, Turnkey EPC, Executive Meeting).
    - Client-side validation with localized inline errors, loading indicator, success confirmation, and direct phone error fallback.
  - **Executive Owner Reach Card (`components/contact/OwnerCard.tsx`):**
    - Direct access card for Eng. Tarek Ahmed (CEO & Company Owner).
    - Direct phone dial, secondary line, executive email, direct WhatsApp with pre-filled bilingual message, and copy-to-clipboard functionality with feedback.
    - Uses `<PhoneNumber />` for BiDi LTR isolation in RTL Arabic contexts.
  - **Interactive Cairo HQ Map (`components/contact/HqMap.tsx`):**
    - Highlighting Building 360 Business Park in Fifth Settlement, New Cairo.
    - Embedded Google Map with custom architectural styling and floating address badge.
    - Arterial connectivity ribbon displaying travel times (Ring Road, Cairo Airport, New Administrative Capital).
  - **Operating Schedule & SLA Assurance (`components/contact/OperatingHoursSection.tsx`):**
    - Displaying 9:00 AM – 5:00 PM operating hours, official weekend schedule, and guaranteed 24-hour response SLA.
  - **Composite Contact Page & Route (`app/contact/page.tsx` & `components/contact/ContactPageClient.tsx`):**
    - Full Server Component with OpenGraph and SEO metadata.
    - Responsive 2-column layout (Inquiry Form + Owner Reach) with desktop `PageLineSidebar` chapter navigation.
    - Wrapped in `Suspense` for App Router static optimization.
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - Live API test via Node script: Verified 400 on invalid payload, 200 on valid payload with preview mode, and 200 on `/contact` HTML rendering.
    - `npm run build` (`next build`): 14/14 static & dynamic routes compiled cleanly in 531ms.

---

## Milestone 6.1: Two-Tier Adaptive Navigation Rail & 1440p Viewport Collision Elimination

- **Date:** September 2026
- **Scope:**
  - **1440p Desktop Viewport Collision Fix (`components/motion/LineSidebar.tsx` & `PageLineSidebar.tsx`):**
    - Identified root layout conflict where the centered `max-w-7xl` (1280px) container left an 80px margin on 1440px desktop screens, whereas the unconstrained sidebar with full labels required 260px+, intruding 170px over the page title and body text.
    - Refactored [`LineSidebar.tsx`](file:///c:/Users/shine/WebProjects/Tafawok/components/motion/LineSidebar.tsx) and [`PageLineSidebar.tsx`](file:///c:/Users/shine/WebProjects/Tafawok/components/motion/PageLineSidebar.tsx) with a responsive two-tier layout system:
      1. **Compact Architectural Rail (`1440px – 1799px`):** Positioned at `inset-s-4` (16px from viewport boundary) with width restricted to ~42px, maintaining a generous 54px whitespace buffer before central page typography.
      2. **Architectural Ticks & Active Indicator:** Features compact 22px tick marks, 8px proximity shift, and high-contrast monospace chapter numbers (`— 01`, `— 02`, `— 03`, `— 04`) with active state highlighted in TAFAWOK architectural bronze (`var(--primary)`).
      3. **Floating Frosted-Glass Tooltip Peeking:** Hovering over individual tick markers instantly reveals the localized section title (`01 — Inquiry Portal` / `01 — بوابة الاستفسار`) in an elevated floating badge (`bg-background/95 backdrop-blur-md border border-border/80 shadow-2xl`) anchored to the tick (`left-full ml-3` / `right-full mr-3` in RTL) with zero layout shift.
      4. **Full Monograph Panel Overlay Toggle:** Added an interactive expand/collapse toggle (`PanelLeftOpen` / `PanelLeftClose`) in the rail header, allowing users on 1440px screens to temporarily expand the entire directory table of contents in an intentional frosted-glass overlay card with full inline labels.
      5. **Ultra-Wide Monograph Expansion (`≥ 1800px`):** Automatically expands to full inline text labels and 48px tick markers where the viewport gutter exceeds 260px.
      6. **Bilingual RTL/LTR Parity:** Verified in Arabic RTL mode (`dir="rtl"`) with mirrored `rotate-180` icons, `start-4` right-gutter positioning, and isolated chapter numerics.
  - **Site-Wide Cohesion:**
    - All 6 platform pages consuming `PageLineSidebar` (`/`, `/about`, `/ceo-message`, `/properties`, `/properties/[slug]`, `/contact`) instantly inherit this collision-free navigation rail.
  - **Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): 0 errors.
    - `npm run lint` (`eslint`): 0 errors, 0 warnings.
    - `npm run build` (`next build`): 14/14 static and dynamic routes compiled in 641ms.
    - Live Chrome DevTools verification across 1440x650 viewport in both English LTR and Arabic RTL modes.

---

## Milestone 7.0: Animation Polish, WCAG 2.2 Accessibility Compliance, Contrast Audit & Production Build Verification

- **Date:** September 2026
- **Scope:**
  - **Motion Accessibility (`prefers-reduced-motion`):**
    - Updated [`components/motion/MotionFade.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/motion/MotionFade.tsx) with `useReducedMotion()` from `motion/react` to bypass translation/scale transforms when users request reduced motion, immediately displaying content with minimal duration (`0.05s`) and zero delay.
    - Updated [`components/motion/CounterTicker.tsx`](file:///C:/Users/shine/WebProjects/Tafawok/components/motion/CounterTicker.tsx) with `useReducedMotion()` to immediately render static numbers without running count-up tween animations, avoiding extraneous state updates and eliminating `react-hooks/set-state-in-effect` linting errors.
    - Added `@media (prefers-reduced-motion: reduce)` in [`app/globals.css`](file:///C:/Users/shine/WebProjects/Tafawok/app/globals.css) setting animation and transition durations to `0.01ms !important`, forcing `scroll-behavior: auto !important`, and pausing `.animate-marquee`.
  - **Dictionary Synchronization & Zero Missing Keys Audit:**
    - Ran full AST/regex scan across all 84 codebase files: 0 missing translation keys.
    - Audited English ([`locales/en.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/en.json)) and Arabic ([`locales/ar.json`](file:///C:/Users/shine/WebProjects/Tafawok/locales/ar.json)): 100% key-for-key symmetry across all 269 keys with zero missing keys or schema divergence.
  - **WCAG 2.2 AAA / AA Contrast Ratio Verification:**
    - High-contrast architectural theme tokens verified in OKLCH:
      - Light Mode: Text foreground `oklch(0.141 0.005 285.823)` on background `oklch(1 0 0)` yields > 15:1 (WCAG AAA). Muted text `oklch(0.552 0.016 285.938)` yields > 4.5:1 (WCAG AA).
      - Dark Mode: Text foreground `oklch(0.985 0 0)` on obsidian background `oklch(0.141 0.005 285.823)` yields > 15:1 (WCAG AAA).
      - Architectural Bronze Primary: `oklch(0.553 0.195 38.402)` with pristine contrast ratios against card and background surfaces.
  - **Automated Quality Gates Verification:**
    - `npm run typecheck` (`tsc --noEmit`): Passed with 0 errors.
    - `npm run lint` (`eslint`): Passed with 0 warnings, 0 errors.
    - `npm run build` (`next build`): All 14 static and dynamic routes compiled and pre-rendered successfully in ~800ms via Turbopack.
  - **Final Platform Status:**
    - All 7 project phases complete, fully tested, and verified.

---

## Milestone 8.0: Authentic Commercial Portfolio Integration (Fagala Plaza, Mall ChillOut El Shorouk, October Festival Mall)

- **Date:** September 2026
- **Scope:**
  - **Fagala Plaza (`fagala-plaza`):**
    - High-volume commercial wholesale and retail stationery plaza in Nasr City (10th District, `29WJ+879`, Cairo).
    - Modern architectural evolution of Cairo's historic El Fagala market, providing institutional wholesale ("gomla") pricing for schools, universities, and corporate offices, while offering parents affordable, high-grade school supplies.
    - Anchors: Bernasos (since 1918), Samir & Aly Outlet, Alyanour Mega Bookstore, El-Azhary Engineering & Stationery, Galal Import & Trading, Ashraf Aly Faid, Belal Stationery, and Sea Mar3i Seafood Restaurant.
    - Assets: Replaced mock photography with real photography from `/public/FagalaPlaza/` (Samir & Aly Outlet storefront, Bernasos & Galal promenade, evening fountain illumination, daylight open plaza).
    - Google Maps link and embed integrated: `https://maps.app.goo.gl/CQn1vuvLMWFmSq9S7?g_st=iw`.
  - **Mall ChillOut El Shorouk (`mall-chillout-el-shorouk`):**
    - Full-scale destination commercial and family lifestyle mall on the Cairo-Ismailia Desert Highway (`5J23+4PC`, El Shorouk City, Cairo).
    - Complete commercial zone featuring Seoudi Supermarket anchor, Z Arcade interactive gaming & VR center, Loly Land kids play arena, Délice specialty coffee & dessert lounge, and a high-capacity stationery & books hub (Alyanour, El-Azhary, Ashraf Ali Faid, B Stationery) matching wholesale pricing advantages.
    - Assets: Replaced mock photography with real photography from `/public/MallChilloutAlshrouk/` (wide daytime exterior facade with Seoudi, Loly Land, Alyanour and TAFAWOK billboard, Seoudi portico, Z Arcade games, and illuminated directory portal).
    - Google Maps link and embed integrated: `https://maps.app.goo.gl/orJz3L8DPECmMGG38?g_st=iw`.
  - **October Festival Mall (`october-festival-mall`):**
    - Prime commercial, retail, and quick-commerce development situated along the high-traffic Gamal Abdel Nasser Axis in the Northern Expansions of 6th of October City (`محور جمال عبد الناصر، التوسعات الشمالية، 6 أكتوبر`).
    - Curved architectural design with natural polished granite cladding, 130 m²+ glass-fronted flagship retail stores for rent, Noon Minutes rapid 15-minute quick fulfillment depot, and Alyanour Mega Bookstore & Stationery Center (wholesale and retail).
    - Assets: Replaced mock photography with real photography from `/public/OctoberMall/` (curved granite facade, Alyanour interior concourse with shoppers, Noon Minutes delivery hub, and 130 m² flagship retail frontage).
    - Google Maps link and coordinates integrated: `https://maps.app.goo.gl/PBDCaRMpznhAWYic8?g_st=iw`.
  - **Platform-Wide Synchronization:**
    - Updated [`content/cre-data.ts`](file:///Users/omartemsah/webProjects/tafawok/content/cre-data.ts): `NAV_ITEMS`, `CORPORATE_METRICS` (64,500 m² GLA, 1,450+ parking slots), `PROPERTIES`, and CEO career timeline.
    - Updated [`components/layout/PropertyDropdown.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/layout/PropertyDropdown.tsx) and [`components/layout/MobileNav.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/layout/MobileNav.tsx) icon mappings and links.
    - Updated [`components/home/FeaturedProperties.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/home/FeaturedProperties.tsx) and [`components/home/ScrollExpandShowcase.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/home/ScrollExpandShowcase.tsx) to showcase real project photography and dynamic titles.
    - Decoupled [`components/contact/HqMap.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/contact/HqMap.tsx) to use `COMPANY_IDENTITY.headquarters` directly.
    - Updated bilingual dictionaries [`locales/en.json`](file:///Users/omartemsah/webProjects/tafawok/locales/en.json) and [`locales/ar.json`](file:///Users/omartemsah/webProjects/tafawok/locales/ar.json).
  - **Quality Gates:**
    - Next.js production build (`next build`) succeeded with 0 errors. All routes pre-rendered statically.
  - **Refinements (Accordion & ScrollExpand Showcase):**
    - Updated [`components/home/FeaturedProperties.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/home/FeaturedProperties.tsx): Streamlined `AccordionGallery` to exactly 3 items corresponding to the 3 portfolio locations (Fagala Plaza, Mall ChillOut El Shorouk, October Festival Mall).
    - Updated [`components/home/ScrollExpandShowcase.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/home/ScrollExpandShowcase.tsx): Swapped the expanding canvas image to `IMG_5918` (`/MallChilloutAlshrouk/IMG_5918.webp` — the illuminated nighttime facade showcasing Ashraf Ali Faid & Seoudi), harmonizing all textual overlays, metrics, and CTA links with Mall ChillOut El Shorouk.
    - Added `IMG_5918.webp` to `Mall ChillOut El Shorouk` photography gallery in [`content/cre-data.ts`](file:///Users/omartemsah/webProjects/tafawok/content/cre-data.ts).
    - Rotated the last two images in Mall ChillOut gallery (`IMG_9239.webp` and `IMG_7490.webp`) 90° clockwise from landscape into their intended portrait orientation.
    - Added high-contrast frosted glass overlay card (`bg-black/60 backdrop-blur-md border border-white/15 rounded-2xl md:rounded-3xl`) to the title and narrative text in [`components/home/ScrollExpandShowcase.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/home/ScrollExpandShowcase.tsx), elevated `overlayScrim` to `0.65`, and strengthened scrim gradient in [`components/motion/ScrollExpand.tsx`](file:///Users/omartemsah/webProjects/tafawok/components/motion/ScrollExpand.tsx) to ensure pristine legibility over high-exposure nighttime facade neon lighting.

---

## Milestone 9.0: Largest Contentful Paint (LCP) Optimization & Modern Image Architecture

- **Date:** September 2026
- **Scope:**
  - **Root Cause Analysis of LCP Warnings:**
    - Next.js internal image registry (`allImgs`) tracks rendered images by URL key. When property thumbnails used `<Image fill>` with the same asset URL as the hero image, the thumbnail's `loading="lazy"` collided with and overwrote the hero image's `loading="eager"`.
    - Furthermore, on fast network connections, small thumbnail images rendered before massive 3840w unconstrained hero images, causing Chrome's `PerformanceObserver` to emit an intermediate LCP candidate event for the thumbnail, triggering Next.js runtime dev warnings (`Image with src "..." was detected as the Largest Contentful Paint (LCP)`).
  - **Thumbnail Dimension & Registry Optimization (`PropertyGallery.tsx` & `PropertyDropdown.tsx`):**
    - Replaced `<Image fill>` with intrinsic dimensions (`width={160} height={100}` for gallery strips, `width={160} height={112}` for lightbox thumbnails, and `width={64} height={64}` for navbar dropdown items).
    - This changes Next.js's optimized query parameters (`&w=384` for thumbnails vs. `&w=1280` for hero images), isolating registry keys and preventing key collision in `allImgs`.
    - Added `loading="eager"` to visible above-the-fold gallery thumbnails to eliminate intermediate LCP flags.
  - **Hero Responsive Sizing & Priority Preloading:**
    - Refined `sizes` attribute on the showcase hero image in [`PropertyGallery.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/properties/PropertyGallery.tsx) from generic `(max-width: 1200px) 100vw, 1200px` to `(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px`, preventing browsers from fetching oversized 3840w variants on high-DPI viewports.
    - Added `key={images[activeIndex]}` and `loading="eager"` to guarantee immediate preloading upon slide selection.
    - Updated [`PropertiesDirectoryClient.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/properties/PropertiesDirectoryClient.tsx) priority threshold from `idx === 0` to `idx < 3`, ensuring all 3 above-the-fold commercial property cards (Fagala Plaza, Mall ChillOut, October Festival Mall) receive eager preloading.
    - Synchronized `loading={priority ? "eager" : "lazy"}` in [`PropertyCard.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/properties/PropertyCard.tsx).
    - Added `loading="eager"` in [`ScrollExpand.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/motion/ScrollExpand.tsx) and prioritized hero cards in [`AccordionGallery.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/motion/AccordionGallery.tsx).
  - **Next.js Image Pipeline Configuration (`next.config.ts` & `app/layout.tsx`):**
    - Configured `images: { formats: ["image/avif", "image/webp"] }` in `next.config.ts` for AVIF/WebP automatic format negotiation.
    - Defined `metadataBase` in `app/layout.tsx` using `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"` to eliminate OpenGraph URL resolution warnings.
  - **Quality Gates Verification:**
    - Live Chrome DevTools verification across all pages: `/`, `/properties`, `/properties/[slug]`, `/about`, `/ceo-message`, and `/contact`.
    - Zero LCP runtime warnings in dev server terminal or browser console.
    - `npx tsc --noEmit`: 0 errors.
    - `npm run build`: 14/14 static pages successfully compiled and pre-rendered in 581ms.

---

## Milestone 9.1: Fagala Plaza Architectural Video Tour & Unified Gallery Media Integration

- **Date:** September 2026
- **Scope:**
  - **Data Layer & CRE Types (`types/cre.ts` & `content/cre-data.ts`):**
    - Introduced `PropertyVideo` interface supporting typed `src`, `poster`, and bilingual `title: LocalizedString`.
    - Extended `Property` model with optional `video?: PropertyVideo`.
    - Configured Fagala Plaza (`fagala-plaza`) with authentic commercial video tour asset: `src: "/FagalaPlaza/IMG_6803.webm"`, `poster: "/FagalaPlaza/IMG_6803.webp"`, and bilingual title: _"Fagala Plaza — Architectural Promenade & Commercial Hub Tour"_ / _"فجالة بلازا – جولة في الممشى التجاري والمجمع المتطور"_.
  - **PropertyGallery Component Enhancement (`components/properties/PropertyGallery.tsx`):**
    - Built unified `GalleryMediaItem` architecture seamlessly supporting both photography and video tours while preserving LCP performance (cover photo remains #1 eager asset; video tour seamlessly positioned as #2).
    - Added high-visibility thumbnail play button overlays with primary copper/bronze accent, dark scrim, and `VIDEO TOUR` / `فيديو تعريفي` badge.
    - Injected interactive HTML5 `<video>` player with `controls`, `playsInline`, `preload="metadata"`, and responsive object-contain letterboxing.
    - Added floating live indicator pill badge (`● Fagala Plaza — Architectural Video Tour`) with animated ping pulse on video playback.
    - Implemented quick-action `[ ▶ Watch Video Tour ]` / `[ ▶ جولة بالفيديو ]` button in the gallery header and floating overlay.
    - Upgraded full-screen shadcn `Dialog` Lightbox to support interactive video playback, modal media type badges, and filmstrip video thumbnails.
    - Integrated lifecycle hooks pausing active video playback whenever users navigate to photo slides or dismiss the lightbox modal.
  - **Bilingual Dictionaries (`locales/en.json` & `locales/ar.json`):**
    - Added keys: `videoTour`, `videoBadge`, `playVideo`, and `pauseVideo` in both English and Arabic with full RTL logical styling.
  - **Quality Gates Verification:**
    - Chrome DevTools MCP live verification in both English (LTR) and Arabic (RTL) mode.
    - Lightbox full-screen video playback verified.
    - `npx tsc --noEmit`: 0 errors.
    - `npm run build`: 14/14 static routes compiled in 648ms.

---

## Milestone 10: Production SEO Architecture, Sitemaps, Structured Data & Search Engine Publishing

- **Date:** September 2026
- **Scope:**
  - **Dynamic Multilingual XML Sitemap (`app/sitemap.ts`):**
    - Built native Next.js App Router sitemap generation capturing all 8 canonical routes (`/`, `/about`, `/properties`, `/properties/[slug]` for all 3 commercial flagships, `/ceo-message`, `/contact`).
    - Configured bilingual `xhtml:link` hreflang alternates (`ar` and `en`) for localized search engine crawlers.
    - Explicit `priority` tiers (1.0 for home, 0.9 for assets, 0.8 for corporate) and `changeFrequency` attributes.
  - **Search Engine Crawlers Control (`app/robots.ts`):**
    - Standardized `robots.txt` granting full crawler access to public routes while isolating `/api/` endpoints.
    - Declared canonical `Host: https://tafawok.co` and dynamic `Sitemap: https://tafawok.co/sitemap.xml`.
  - **Progressive Web App Manifest (`app/manifest.ts`):**
    - PWA `/manifest.webmanifest` defining bilingual corporate branding, dark obsidian surface theme, bronze accent, and SVG/PNG app icons.
  - **Rich OpenGraph & Social Cards (`app/opengraph-image.tsx` & `public/og-image.png`):**
    - Implemented high-resolution (1200x630) social sharing preview banner displaying TAFAWOK CRE branding, corporate credentials (25+ years, 5 decades heritage), and flagship asset chips.
    - Generated static fallback at `public/og-image.png` (122 KB) for external scrapers (WhatsApp, LinkedIn, X, Facebook, Slack).
  - **Schema.org Structured Data (JSON-LD) (`lib/seo/schema.ts` & `components/seo/JsonLd.tsx`):**
    - Injected `@type: ["Organization", "RealEstateAgent", "GeneralContractor"]` in `app/layout.tsx` with legal name, executive leadership (Eng. Tarek Ahmed), contact points, and New Cairo HQ address.
    - Injected `WebSite` schema with multilingual language alternates.
    - Injected `BreadcrumbList` schema across `/properties`, `/properties/[slug]`, `/about`, `/ceo-message`, and `/contact`.
    - Injected `["Place", "ShoppingCenter", "CommercialBuilding"]` schema for all asset detail pages with geo coordinates, floor plans, and tenant directories.
  - **Metadata Hardening & Webmaster Verification:**
    - Standardized `metadataBase` to `https://tafawok.co` across all pages.
    - Configured `verification` hooks in `app/layout.tsx` and `.env.example` for Google Search Console, Bing Webmaster Tools, and Yandex.
    - Added logical canonical URLs and bilingual hreflang alternates across all route handlers.
  - **Production Analytics Integration (`@vercel/analytics`):**
    - Integrated native `@vercel/analytics/next` inside [`app/layout.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/layout.tsx).
    - Automatically collects real-time pageviews, visitors, top devices, referrers, and geography on Vercel deployment without blocking hydration or initial paint.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: 0 errors.
    - `npm run lint`: 0 warnings/errors.
    - `npm run build`: 18/18 static routes pre-rendered in 324ms.
    - Verified generated output of `.next/server/app/robots.txt.body` and `.next/server/app/sitemap.xml.body`.

---

## Milestone 11: Supabase Backend Integration & Full-Control Content Dashboard Foundation

- **Date:** September 2026
- **Scope:**
  - **Core SDK & SSR Package Installation:**
    - Installed `@supabase/supabase-js` and `@supabase/ssr` with full Next.js 16 App Router compatibility.
  - **Supabase Client Architecture (`lib/supabase/`):**
    - `lib/supabase/client.ts`: Browser client initialization (`createBrowserClient`) reading `NEXT_PUBLIC_` environment variables.
    - `lib/supabase/server.ts`: Server client initialization (`createServerClient`) handling asynchronous Next.js 16 cookies (`await cookies()`).
    - `lib/supabase/middleware.ts`: Session management helper for server-side auth and cookie synchronization.
  - **Environment Configuration:**
    - Set active project credentials in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
    - Updated `.env.example` with documented environment variable keys for the team.
  - **Agent Skills & Supabase CLI Integration:**
    - Added official Supabase skills (`supabase`, `supabase-postgres-best-practices`) to `.agents/skills/`.
    - Initialized Supabase CLI structure (`supabase init`, `supabase/config.toml`) for database migrations, declarative schemas, and seed files.
  - **Live Connectivity Verification:**
    - Pinged Supabase Auth & REST services against `https://qdeegiucxasdiyzasepa.supabase.co` — verified live 200 OK connection.
    - Verified TypeScript strict type safety (`npm run typecheck` - 0 errors) and production compilation (`npm run build` - successful).

---

## Milestone 12: Production PostgreSQL 17 Database Migration, Super Admin Suite & Nexus Portal Dashboard

- **Date:** September 2026
- **Scope:**
  - **Live PostgreSQL 17 Schema Migration (`supabase/migrations/20260926000000_create_tafawok_cre_schema.sql`):**
    - Created 11 production tables with Row-Level Security (RLS) enabled on every table:
      - `properties`: Commercial asset flagships (Fagala Plaza, Mall ChillOut, October Festival Mall) with JSONB bilingual models, specs, location coordinates, galleries, and videos.
      - `property_stores`: Retail tenant directories with unit allocations, categories, floors, and statuses.
      - `commercial_disciplines`: 4 core sectors (Office Towers, Retail, Logistics, EPC).
      - `corporate_metrics`: 4 hero numerical benchmarks.
      - `timeline_milestones`: Corporate timeline from 1974 to present.
      - `corporate_values`: 7 institutional core values.
      - `investment_pillars`: 4 strategic thesis pillars.
      - `client_partners`: 12 Tier-1 energy, EPC, and commercial partners.
      - `site_settings`: Singleton JSONB store for `company_identity`, `ceo_profile`, and `hse_charter`.
      - `inquiries`: Live commercial RFQs & contact submissions.
      - `admin_users`: Super Admin access control with `is_admin()` security definer function.
  - **Comprehensive Data Seeding (`scripts/seed.ts`):**
    - Executed seeder against live AWS Ireland pooler (`aws-1-eu-west-1.pooler.supabase.com:6543`).
    - Successfully inserted all 3 flagship assets, 22 retail stores, 4 disciplines, 4 metrics, 6 milestones, 7 values, 4 investment pillars, 12 partners, and 3 singleton settings.
  - **Super Admin Provisioning (`scripts/create-admin.ts`):**
    - Created confirmed Super Admin user `superadmin@tafawok.co` in `auth.users` and `public.admin_users`.
    - Verified live authentication via Supabase Auth client (`signInWithPassword`).
  - **Content Service Layer & Server Actions (`lib/content/`):**
    - `cre-service.ts`: Fallback-resilient typed service layer fetching live database rows with automatic fallback to static content.
    - `actions.ts`: Secure `"use server"` mutations requiring Super Admin authentication with instant multi-path ISR cache revalidation (`revalidatePath`).
    - Connected `app/api/contact/route.ts` to automatically persist all incoming inquiries into `inquiries` table.
  - **Hidden Management Suite (`/nexus-portal`):**
    - `/nexus-portal/login`: Prestigious obsidian & bronze authentication portal.
    - `/nexus-portal`: Full-control dashboard suite with responsive sidebar, live stats, property editor modal, store manager, discipline editor, metric editor, milestone editor, values/pillars editor, partners manager, CEO profile editor, HQ coordinates editor, HSE charter editor, and live inquiries inbox.
    - Protected via Next.js 16 `proxy.ts` (redirecting unauthenticated users to `/nexus-portal/login`).
    - Public isolation: Hides public `Navbar` and `Footer` on portal routes; disallowed in `robots.ts` and excluded from `sitemap.ts`.
  - **Quality Gates Verification:**
    - `npm run typecheck`: 0 errors across all types and components.
    - `npm run build`: 19/19 routes compiled in 423ms without warnings.

---

## Milestone 13: Strict Type Safety, React 19 Hygiene & Complete Zero-Lint Cleanliness

- **Date:** September 2026
- **Scope:**
  - **Type Safety Hardening (Strictly Zero `any`):**
    - Eliminated all 43 `Unexpected any` occurrences across [`lib/content/cre-service.ts`](file:///Users/omartemsah/WebProjects/Tafawok/lib/content/cre-service.ts), [`lib/content/actions.ts`](file:///Users/omartemsah/WebProjects/Tafawok/lib/content/actions.ts), and the entire [`components/nexus/`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/) suite.
    - Bridged Supabase JSONB non-nullable database schema with `type DbJson = NonNullable<Json>`.
    - Strongly typed company identity with [`CompanyIdentity`](file:///Users/omartemsah/WebProjects/Tafawok/types/cre.ts) interface.
    - Added typed error guards for all server action try/catch blocks (`catch (err: unknown)`).
  - **React 19 & ESLint Cascading Render Remediation:**
    - Re-architected [`NexusPropertyModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPropertyModal.tsx) and [`NexusStoreModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusStoreModal.tsx) to eliminate synchronous `setState` in `useEffect`.
    - Decomposed modals into dedicated keyed form components (`key={property?.id || "new"}`) allowing React to mount fresh state instances with zero cascading re-renders.
  - **Tailwind CSS v4 & JSX Standards:**
    - Replaced deprecated Tailwind classes with native Tailwind v4 tokens (`start-` -> `inset-s-`, `end-` -> `inset-e-`, `bg-gradient-` -> `bg-linear-`, arbitrary pixel utilities to v4 fractional sizing).
    - Escaped unescaped JSX quotes (`&apos;`, `&quot;`).
    - Cleaned up all unused Lucide icon imports and UI component imports.
  - **Comprehensive CRE Property Form Coverage:**
    - Added dedicated bilingual inputs for all location and structural specs in Tab 4 (City, Alt Phone, Commercial Leasing Office, Floors, Arabic Parking Capacity, Zoning Classification, and Direct Google Maps Link).
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: 0 errors across the entire repository.
    - `npm run lint`: **0 errors, 0 warnings** (completely clean ESLint output).
    - `npm run build`: 19/19 routes compiled cleanly with Next.js 16 App Router.

---

## Milestone 14: shadcn/ui Sidebar Dashboard Architecture & "The Works" Control Suite

- **Date:** September 2026
- **Scope:**
  - **shadcn/ui Sidebar Primitives Integration:**
    - Installed official shadcn `sidebar` suite (`components/ui/sidebar.tsx`, `components/ui/skeleton.tsx`, `hooks/use-mobile.ts`).
    - Modernized `hooks/use-mobile.ts` with React 19 `useSyncExternalStore` to eliminate hydration mismatch and cascading renders.
    - Ensured all imports reference `@/lib/utils` and semantic `--sidebar-*` theme tokens in `app/globals.css`.
  - **Enterprise Sidebar Composition (`NexusDashboard.tsx`):**
    - `SidebarHeader`: TAFAWOK CRE brand shield badge, live status dot, and instant client-side search filter (`SidebarInput`).
    - 4 Structured Menu Groups with bilingual labels & dynamic record count badges:
      1. **Commercial Portfolio:** Overview, Commercial Assets, Retail Directory, Sectors & Disciplines.
      2. **Heritage & Scale:** Corporate Benchmarks, Heritage Timeline, Values & Pillars, Strategic Partners & Clients.
      3. **Leadership & HQ:** CEO Profile & Vision, HQ Coordinates, HSE & Governance Charters.
      4. **Inbound Leads:** Inquiries & RFQs (with animated destructive badge for unread submissions).
    - `SidebarFooter`: Super Admin avatar monogram, authenticated email, Live Website quick link, and interactive Sign Out button.
    - `SidebarRail`: One-click collapse/expand rail with tooltip-supported icon mode.
  - **Dashboard Shell & Inset Navigation (`SidebarInset`):**
    - `SidebarTrigger` with keyboard shortcut support (`⌘B` / `Ctrl+B`).
    - Interactive breadcrumbs (`Nexus Portal` > `[Category]` > `[Active Tab]`).
    - Live health pill (`PostgreSQL 17.6 • Live` with pulsing indicator).
    - Instant server data sync action (`RotateCw`) with feedback toast.
    - Integrated language toggle (`ar` / `en` with true RTL sidebar docking) and dark/light theme switch.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: 0 errors.
    - `npm run lint`: 0 errors, 0 warnings.
    - `npm run build`: 19/19 static and dynamic routes compiled in 146ms.

---

## Milestone 15: Pinned Dialog Architecture & Universal Zod + React Hook Form Standardization

- **Date:** September 2026
- **Scope:**
  - **Pinned Dialog Layout Architecture (`components/ui/dialog.tsx`):**
    - Added and exported dedicated `DialogBody` (`flex-1 overflow-y-auto p-4 sm:p-6`) primitive.
    - Styled `DialogHeader` as pinned (`shrink-0 border-b border-border/70 p-4 sm:p-6 bg-card`).
    - Styled `DialogFooter` as pinned (`shrink-0 border-t border-border/70 bg-muted/40 p-4 sm:p-6 m-0`).
    - Standardized `DialogContent` with explicit responsive width bounds (`sm:max-w-4xl`, `sm:max-w-2xl`, `sm:max-w-lg`), constrained viewport height (`max-h-[90vh]`), and internal vertical flex flow (`flex flex-col p-0 overflow-hidden`).
    - Re-architected modal forms so `<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">` wraps the dialog body and footer. The Header (title, description) and Footer (Cancel, Save/Submit buttons) are permanently locked in view at the top and bottom while the form body scrolls smoothly and independently in between.
  - **Applied Across All System Dialogs:**
    - **`NexusPropertyModal.tsx`:** Standardized with `sm:max-w-4xl max-h-[90vh]`, pinned header & footer, scrollable tabbed body.
    - **`NexusStoreModal.tsx`:** Standardized with `sm:max-w-2xl max-h-[90vh]`, pinned header & footer, scrollable body.
    - **`NexusDisciplinesTab.tsx`:** Standardized with `sm:max-w-2xl max-h-[90vh]`, pinned header & footer, scrollable body.
    - **`NexusMetricsTab.tsx`:** Standardized with `sm:max-w-lg max-h-[90vh]`, pinned header & footer, scrollable body.
    - **`NexusTimelineTab.tsx`:** Standardized with `sm:max-w-2xl max-h-[90vh]`, pinned header & footer, scrollable body.
    - **`NexusValuesPillarsTab.tsx`:** Both Corporate Value Modal and Investment Pillar Modal standardized with `sm:max-w-lg max-h-[90vh]`, pinned headers & footers, scrollable body.
    - **`NexusPartnersTab.tsx`:** Standardized with `sm:max-w-lg max-h-[90vh]`, pinned header & footer, scrollable body.
  - **Universal Zod Schema Validation & React Hook Form Integration:**
    - Centralized strong validation schemas in [`lib/validations/cre-schemas.ts`](file:///Users/omartemsah/WebProjects/Tafawok/lib/validations/cre-schemas.ts).
    - Standardized all 13 application forms with `useForm` + `zodResolver`:
      1. `ContactForm.tsx`: Public tenant/investor RFQ form with `useWatch` and Zod schema.
      2. `app/nexus-portal/login/page.tsx`: Super admin portal authentication.
      3. `NexusPropertyModal.tsx`: Comprehensive commercial asset editor with numeric casting.
      4. `NexusStoreModal.tsx`: Retail tenant directory item editor with pure slug generation.
      5. `NexusDisciplinesTab.tsx`: Commercial capability discipline editor.
      6. `NexusMetricsTab.tsx`: Corporate metric benchmark editor.
      7. `NexusTimelineTab.tsx`: Heritage milestone editor with typed category enum and isolated highlights parsing.
      8. `NexusValuesPillarsTab.tsx` (Values): Corporate value statement editor.
      9. `NexusValuesPillarsTab.tsx` (Pillars): Investment pillar and key metric editor.
      10. `NexusPartnersTab.tsx`: Client partner & institutional credential editor.
      11. `NexusCeoTab.tsx`: Executive profile & formal statement editor with numeric casting.
      12. `NexusCompanyIdentityTab.tsx`: Corporate credentials & coordinates editor.
      13. `NexusHseTab.tsx`: HSE charter & ISO standard governance editor.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors** across the entire codebase.
    - `npm run lint`: **0 errors, 0 warnings** (completely clean ESLint run).
    - `npm run build`: **19/19 routes compiled successfully** with Turbopack.

---

## Milestone 15.1: Nexus Portal De-cluttering & Authentic Brand Logo Integration

- **Date:** September 2026
- **Scope:**
  - **Sidebar Brand Identity Upgrade:**
    - Replaced generic shield icon with the official [`TafawokEmblem`](file:///Users/omartemsah/WebProjects/Tafawok/components/layout/Logo.tsx#L18) SVG brand mark.
    - Added bilingual typography (`TAFAWOK` / `تَفَـوُّق`) and `Nexus` portal badge in the sidebar header.
    - Collapses seamlessly into the standalone centered brand emblem in icon mode (`group-data-[collapsible=icon]`).
  - **Header De-cluttering & Simplification:**
    - Removed redundant search filter from the sidebar header.
    - Removed breadcrumbs, PostgreSQL status badge, and manual data sync button from the top navigation bar.
    - Streamlined the header to feature clean active section labeling, live site link, language switch, and theme toggle.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors**.
    - `npm run lint`: **0 errors, 0 warnings**.
    - `npm run build`: **19/19 routes compiled successfully** with Turbopack.

---

## Milestone 16: Multi-Page App Router Architecture with Route-Level Data Isolation

- **Date:** September 2026
- **Scope:**
  - **Decoupled Monolithic Tab Switcher into Independent Next.js Pages:**
    - Transitioned the Nexus Super Admin dashboard from a monolithic client-side tab switcher into 12 dedicated Next.js App Router sub-routes.
    - Implemented route grouping via `app/nexus-portal/(dashboard)/` to share persistent sidebar layout while keeping clean URLs (`/nexus-portal/properties`, `/nexus-portal/stores`, etc.) and excluding unauthenticated routes (`/nexus-portal/login`).
  - **Route-Level Granular Data Fetching (Backend Isolation):**
    - Eliminated the monolithic 11-way `Promise.all` concurrent database waterfall on load.
    - Each page is an independent React Server Component (`export const dynamic = "force-dynamic"`) that fetches **only** its relevant domain dataset:
      - `/nexus-portal`: Overview summary counts and metrics.
      - `/nexus-portal/properties`: Fetches only `getProperties()`.
      - `/nexus-portal/stores`: Fetches only `getProperties()`.
      - `/nexus-portal/disciplines`: Fetches only `getCommercialDisciplines()`.
      - `/nexus-portal/metrics`: Fetches only `getCorporateMetrics()`.
      - `/nexus-portal/timeline`: Fetches only `getTimelineMilestones()`.
      - `/nexus-portal/values`: Fetches only `getCorporateValues()` and `getInvestmentPillars()`.
      - `/nexus-portal/partners`: Fetches only `getClientPartners()`.
      - `/nexus-portal/ceo`: Fetches only `getCeoProfile()`.
      - `/nexus-portal/company`: Fetches only `getCompanyIdentity()`.
      - `/nexus-portal/hse`: Fetches only `getHseCharter()`.
      - `/nexus-portal/inquiries`: Fetches only `getInquiriesAction()`.
  - **Shared Dashboard Shell & Layout Architecture:**
    - [`app/nexus-portal/(dashboard)/layout.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/layout.tsx>): Server-side authentication guard (`getCurrentAdmin()` check, redirecting unauthorized users) and unread inquiry counter.
    - [`components/nexus/NexusDashboardLayout.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDashboardLayout.tsx): Shared client shell with official Tafawok emblem, active route recognition via `usePathname()`, `@base-ui/react` `render={<Link href="..." />}` navigation integration, language/theme toggles, and user session menu.
  - **Tab Component Reusability & Router Refresh Fallback:**
    - Updated all 11 domain tab components to support optional `onRefresh` callbacks, falling back automatically to Next.js App Router `useRouter().refresh()` so mutations trigger instant server re-renders and re-fetching.
    - Converted [`NexusOverviewTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusOverviewTab.tsx) action cards to direct Next.js `<Link>` navigations.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors** across all TypeScript files.
    - `npm run lint`: **0 warnings, 0 errors** (ESLint 100% clean).
    - `npm run build`: **All 27 routes compiled cleanly** with Next.js Turbopack.

---

## Milestone 16.1: RTL Sidebar Border Direction Fix & Edge-to-Edge Group Separators

- **Date:** September 2026
- **Scope:**
  - **RTL Sidebar Border Direction Fix (`components/ui/sidebar.tsx`):**
    - Corrected physical-to-logical inversion in shadcn sidebar borders. Because `side="left"` / `side="right"` represent physical screen edges (`left: 0` / `right: 0`), using Tailwind logical properties `group-data-[side=left]:border-e group-data-[side=right]:border-s` erroneously inverted in RTL:
      - In RTL, `side="right"` with `border-s` evaluated to `border-right`, placing the 1px dividing border against the screen edge off-canvas, leaving no visible separator between the sidebar and the main content on its left.
    - Replaced with physical bindings: `group-data-[side=left]:border-r group-data-[side=right]:border-l data-[side=left]:border-r data-[side=right]:border-l border-sidebar-border`. In Arabic (`side="right"`), the dividing border is guaranteed to render on the inner left edge, cleanly partitioning the sidebar from the main content.
  - **Edge-to-Edge Sidebar Separators:**
    - Updated `SidebarSeparator` in `components/ui/sidebar.tsx` to use `w-full bg-sidebar-border/70` instead of the constrained `mx-2 w-auto`.
    - Removed horizontal padding from `SidebarContent` (`px-0 py-2`), while retaining comfortable inset padding on `SidebarGroup` (`px-2 py-1`). Horizontal divider lines between menu groups now span the full width of the sidebar from start to end with zero gaps.
  - **Unified RTL Direction on Layout Shell:**
    - Added `dir={isArabic ? "rtl" : "ltr"}` to the main layout wrapper in both `NexusDashboardLayout.tsx` and `NexusDashboard.tsx`, ensuring proper flex order and header trigger positioning.
  - **TypeScript Props Integrity:**
    - Re-introduced optional `onSelectTab?: (tabId: string) => void` in `NexusOverviewTabProps` to resolve the IDE error in `NexusDashboard.tsx:548`.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors**.
    - `npm run lint`: **0 warnings, 0 errors**.
    - `npm run build`: **All 27 routes compiled successfully** with Next.js Turbopack.

---

## Milestone 17: Full REST CRUD API Suite & Supabase Storage Media Bucket Integration

- **Date:** September 2026
- **Scope:**
  - **Supabase Storage Architecture & Public CDN Bucket (`tafawok-media`):**
    - Provisioned dedicated Supabase Storage bucket `tafawok-media` with `public: true`, 10MB maximum file size limit, and strict MIME type constraints (`image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `image/avif`).
    - Configured Row-Level Security (RLS) policies on `storage.objects`:
      - **Public Read (`SELECT`):** Open public access enabling direct high-speed CDN delivery for marketing pages.
      - **Super Admin Write (`INSERT` / `UPDATE` / `DELETE`):** Restricted to authenticated super-administrators verified via `auth.uid()` against `nexus_admins`.
    - Added `*.supabase.co` to `images.remotePatterns` in [`next.config.ts`](file:///Users/omartemsah/WebProjects/Tafawok/next.config.ts) for Next.js image optimization.
  - **Unified Super Admin Auth & Response Helper (`lib/api/nexus-auth.ts`):**
    - Created `authenticateNexusAdmin()` utility that inspects session cookies, authenticates with Supabase, verifies active `is_super_admin` status, and provides standard `apiSuccess()` and `apiError()` JSON responses.
  - **Comprehensive REST CRUD Endpoints (`app/api/nexus/*`):**
    1. **Media Upload & Management (`/api/nexus/upload`):**
       - `POST`: Validates file size, MIME type, generates sanitized timestamped file paths, uploads buffer to `tafawok-media`, and returns public CDN URL.
       - `GET`: Lists uploaded assets with metadata and CDN public URLs.
       - `DELETE`: Safely deletes files from the storage bucket.
    2. **Properties (`/api/nexus/properties` & `/api/nexus/properties/[id]`):**
       - `GET` (list with type, status, and bilingual search filters / get by ID or slug).
       - `POST` (create property).
       - `PUT` (update property).
       - `DELETE` (delete property and cascade associated stores).
    3. **Stores & Commercial Directory (`/api/nexus/stores` & `/api/nexus/stores/[id]`):**
       - `GET` (filter by `property_id` and status / get single store).
       - `POST` (create store under parent property).
       - `PUT` (update store details).
       - `DELETE` (remove store).
    4. **Commercial Disciplines (`/api/nexus/disciplines` & `[id]`):**
       - Full CRUD for Office Towers, Retail Hubs, Logistics Parks, and Turnkey EPC.
    5. **Corporate Scale & Metrics (`/api/nexus/metrics` & `[id]`):**
       - Full CRUD for track record figures (25+ yrs, 5 decades heritage, 77.5k m² GLA).
    6. **Historical Timeline & Heritage (`/api/nexus/timeline` & `[id]`):**
       - Full CRUD for Gulf expansion, regional infrastructure, and landmark projects.
    7. **Values & Strategic Pillars (`/api/nexus/values` & `/api/nexus/pillars`):**
       - Full CRUD for institutional principles and engineering standards.
    8. **Client & EPC Partners (`/api/nexus/partners` & `[id]`):**
       - Full CRUD for Tier-1 commercial, energy, and manufacturer partners.
    9. **Corporate Settings & Charters (`/api/nexus/settings/[key]`):**
       - `GET` and `PUT` for `ceo_profile`, `company_identity`, and `hse_charter`.
    10. **Investor & Commercial Inquiries (`/api/nexus/inquiries` & `[id]`):**
        - `GET` (list with status and priority filters), `PATCH` (update status to `read`, `responded`, `archived`), `DELETE`.
  - **Admin Media Uploader Component (`components/nexus/MediaUploader.tsx`):**
    - Drag-and-drop upload zone with real-time preview, CDN verification badge, copy URL shortcut, replace/remove controls, and fallback direct URL manual input.
    - Fully integrated into [`components/nexus/NexusPropertyModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPropertyModal.tsx) for:
      - Main Hero Visual (`mainImage`)
      - Visual Gallery batch uploads (auto-appends CDN URLs to `galleryText`)
      - Video Tour Poster Thumbnail (`videoPoster`)
  - **Commercial Property Cards Full-Bleed Header:**
    - Fixed card header top gap in [`components/nexus/NexusPropertiesTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPropertiesTab.tsx). Eliminated the default shadcn `py-(--card-spacing)` and `gap-(--card-spacing)` padding by applying `pt-0 pb-0 gap-0` and explicit `style={{ paddingTop: 0, paddingBottom: 0, gap: 0 }}` on `<Card>`.
    - Allowed the architectural hero thumbnail to start flush at `(0, 0)` and bleed seamlessly across the full top header, automatically clipped by the card's `rounded-xl overflow-hidden` outer border.
  - **Unified Multi-Format Media (Images & Videos) Support:**
    - Upgraded Supabase Storage bucket `tafawok-media` constraints to support both high-res images and video files (`video/mp4`, `video/webm`, `video/ogg`, `video/quicktime`, `video/x-matroska`) with maximum file size expanded to **100MB**.
    - Updated [`app/api/nexus/upload/route.ts`](file:///Users/omartemsah/WebProjects/Tafawok/app/api/nexus/upload/route.ts) with video MIME validation, dynamic limits (20MB for images, 100MB for video walkthroughs), and automatic `mediaType: "image" | "video"` metadata tagging in both `POST` and `GET`.
    - Enhanced [`components/nexus/MediaUploader.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/MediaUploader.tsx) to accept `acceptType: "image" | "video" | "all"`, automatically detecting video assets and rendering a responsive HTML5 `<video controls playsInline>` preview alongside image previews.
    - Wired property video tours (`videoSrc`) and walkthrough gallery media directly into [`NexusPropertyModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPropertyModal.tsx) with direct Supabase CDN storage and stream preview.
  - **Full Migration to shadcn `<Select>` Component:**
    - Installed official shadcn `Select` primitive ([`components/ui/select.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/ui/select.tsx)) powered by `@base-ui/react/select`.
    - Completely replaced native `<select>` dropdowns across all portal management forms and public inquiry dialogs:
      - **Property Management (`NexusPropertyModal.tsx`):** Development Type (`commercial`, `office`, `retail`, `mixed-use`) and Execution Status (`operational`, `under-development`, `pipeline`).
      - **Tenant Stores Directory (`NexusStoreModal.tsx`):** Assigned Asset Property selector and Store Operational Status (`open`, `coming_soon`, `leased`).
      - **Disciplines Showcase (`NexusDisciplinesTab.tsx`):** Architectural Icon selector (`building-2`, `shopping-bag`, `warehouse`, `hard-hat`).
      - **Historical Milestones (`NexusTimelineTab.tsx`):** Scope Category selector (`commercial`, `heritage`, `infrastructure`, `expansion`).
      - **Partners & EPC (`NexusPartnersTab.tsx`):** Industry Category selector (`commercial`, `energy`, `epc`, `manufacturer`).
      - **Public Inquiry Desk (`ContactForm.tsx`):** Target Property development selector.
    - Zero raw `<select>` tags remain in the codebase; all forms feature accessible popover menus with keyboard navigation and theme integration.
  - **Compiler & Linter Modernization (Zero Warnings Quality Gate):**
    - **React Compiler Memoization Compliance:** Replaced render-time `watch()` invocations across [`NexusPropertyModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPropertyModal.tsx), [`NexusStoreModal.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusStoreModal.tsx), [`NexusDisciplinesTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDisciplinesTab.tsx), [`NexusTimelineTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusTimelineTab.tsx), and [`NexusPartnersTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusPartnersTab.tsx) with React Hook Form's `<Controller control={control} name="..." render={({ field }) => ...} />`. This prevents unmemoized render churn and guarantees strict React Compiler compatibility.
    - **Tailwind CSS v4 Logical Positioning Classes:** Modernized positioning utilities in [`components/ui/sidebar.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/ui/sidebar.tsx), [`components/ui/dialog.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/ui/dialog.tsx), and [`components/nexus/MediaUploader.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/MediaUploader.tsx) to canonical Tailwind v4 logical properties (`inset-s-*`, `inset-e-*`, `-left-(--sidebar-width)`, `-right-(--sidebar-width)`, `after:w-0.5`).
  - **Brand Voice Alignment (Direct Corporate & Brand Authority):**
    - Removed all instances of individual real names (`Eng. Tarek Ahmed`, `م. طارق أحمد`) across content structures, page metadata, schemas, admin views, and internationalization dictionaries (`locales/en.json`, `locales/ar.json`).
    - Aligned attribution directly with corporate authority: **TAFAWOK Executive Leadership** (_القيادة التنفيذية لتفوق_), ensuring the enterprise brand is the sole speaking voice across all official statements, commercial guarantees, and direct communication channels.
    - Updated `/ceo-message` to "Executive Leadership Statement & Strategic Vision", refactored Schema.org JSON-LD founder entity to Organization, and sanitized all SEO meta keywords and descriptions.
    - **Database Reseeding & Comprehensive SQL Audit:** Re-executed [`scripts/seed.ts`](file:///Users/omartemsah/WebProjects/Tafawok/scripts/seed.ts) against the live Supabase PostgreSQL database, updating all records in `site_settings` (`ceo_profile`, `hse_charter`, `company_identity`), `properties`, `property_stores`, `commercial_disciplines`, `corporate_metrics`, `timeline_milestones`, `corporate_values`, and `investment_pillars`. Ran an automated full-table regex audit verifying **0 mentions** of individual names across every column in the entire database.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors** across entire codebase.
    - `npm run lint`: **0 errors** (all linter checks passing).
    - `npm run build`: **All 47 App Router dynamic and static routes compiled successfully** with Next.js Turbopack.

- **Milestone: Dynamic Database-Driven Public Pages & Nexus Homepage / Expand Showcase Management:**
  - **Dynamic Database Architecture Across All Public Pages:**
    - Refactored all public App Router routes (`/`, `/about`, `/ceo-message`, `/contact`, `/properties`, `/properties/[slug]`) and global navigation shell (`app/layout.tsx`, `Navbar`, `MobileNav`, `Footer`, `PropertyDropdown`) into asynchronous React Server Components fetching live, synchronized data directly from Supabase PostgreSQL via [`lib/content/cre-service.ts`](file:///Users/omartemsah/WebProjects/Tafawok/lib/content/cre-service.ts).
    - Preserved exact component hierarchy, styling tokens, animations, and responsive layouts: zero new sections added, zero visual disruption, purely transitioning data sources from static references to live database records with typed fallbacks to `DEFAULT_HOMEPAGE_SETTINGS` and `PROPERTIES`.
  - **Dynamic Interactive Scroll-Expand Showcase (`ScrollExpandShowcase.tsx`):**
    - The full-bleed scroll-expand canvas hero visual (`imageUrl`), section title, subtitle, target asset link, floating badge, overlay card headline, description, and the 3-column architectural specs matrix (`stats: [value, label, sub]`) are now dynamically fed from `site_settings.homepage_settings` in PostgreSQL.
  - **Dynamic Homepage & Public Sections Coverage:**
    - **Hero Section (`HeroSection.tsx`):** Dynamic primary headline, architectural subheadline, primary CTA text, and 3-part credentials strip.
    - **Metrics Section (`MetricsSection.tsx`):** Dynamic track record figures, values, labels, and descriptions.
    - **Featured Portfolio (`FeaturedProperties.tsx`):** Dynamic asset listings, badges, specs, and gallery thumbnails.
    - **Client Marquee (`ClientMarquee.tsx`):** Dynamic EPC & institutional partner logos and accreditation badges.
    - **Leadership Quote (`CeoQuoteSection.tsx`):** Dynamic executive quote, corporate vision, and institutional attribution.
    - **About Us Page (`app/about/page.tsx`):** Dynamic milestones timeline, investment thesis pillars, corporate values, HSE charter, and leadership contact coordinates.
    - **Executive Vision Page (`app/ceo-message/page.tsx`):** Dynamic executive address, foundational doctrine, and direct reach coordinates.
    - **Contact Page (`app/contact/page.tsx`):** Dynamic target property dropdown options populated directly from live active assets in `properties`.
  - **Nexus Admin Portal — Homepage & Showcase Management (`NexusHomepageTab.tsx`):**
    - Created dedicated admin control view at `/nexus-portal/homepage` integrated with sidebar navigation and dashboard quick actions.
    - **Interactive Canvas Visual Control:** Powered by [`MediaUploader`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/MediaUploader.tsx) supporting direct drag-and-drop file uploads to Supabase Storage, CDN link generation, real-time media preview, and manual URL input.
    - **Bilingual Content Editing:** Live EN/AR fields for hero headline, subheadline, CTA text, credentials, section headers, overlay card copy, and 3-column showcase statistics.
    - **Instant Revalidation:** Mutation via `saveSiteSettingAction("homepage_settings", ...)` immediately triggers Next.js tag-based cache revalidation across `/`, `/about`, `/ceo-message`, `/contact`, and `/properties`.
  - **Nexus Dashboard UX Refinement & Interactive Public Impact Guide (`PageImpactGuide.tsx`):**
    - Removed redundant hero header section containing the "Super Admin Suite" badge from [`components/nexus/NexusDashboardLayout.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDashboardLayout.tsx) and [`components/nexus/NexusDashboard.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDashboard.tsx), eliminating visual clutter above individual tabs.
    - Integrated shadcn `<HoverCard>` component (`components/ui/hover-card.tsx` via `@base-ui/react/preview-card`) and built [`components/nexus/PageImpactGuide.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/PageImpactGuide.tsx).
    - Added an intuitive Info icon (`(i)`) directly alongside the active section title in the sticky top header. On hover, displays an architectural guide detailing exactly what the current page controls, bullet points of every affected public URL and section, direct "Open in New Tab" preview action buttons, and administrator guidelines in both English and Arabic.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors** across entire codebase.
    - `npm run lint`: **0 errors, 0 warnings**.
    - `npm run build`: **Compiled 100% successfully** across all App Router static and dynamic routes.

- **Milestone 10: High-Fidelity Loading Skeletons & Universal shadcn Tooltip Adoption (2026-09-26):**
  - **Context & Requirement:**
    - Transitioning from static content to live backend data fetches in React Server Components necessitates immediate, jitter-free visual feedback during initial streaming, cache misses, and client route transitions.
    - The loading skeletons must be **perfect structural replicas of their respective page layouts** (exact grid systems, aspect ratios, responsive column splits, typography dimensions, and divider geometries) to eliminate layout shift (CLS).
    - Enforce the universal use of shadcn `<Tooltip>` across all interactive icon buttons and control surfaces, replacing native `title` attributes.
  - **Full Page Loading Skeleton Replicas Implemented (`loading.tsx`):**
    - **Homepage ([`app/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/loading.tsx)):** Mirrors HeroSection (pill badge, 2-line headline, subtitle, dual CTAs, 3-column credentials strip), 4-column metrics strip, 16:9 interactive scroll-expand showcase canvas with floating overlay card and 3-stat spec matrix, 4-column commercial disciplines cards, 3-column featured portfolio cards with aspect-video media skeletons, and 6-logo partner marquee strip.
    - **Commercial Properties Directory ([`app/properties/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/properties/loading.tsx)):** Mirrors directory hero headline, 3-column portfolio summary metric strip with vertical dividers (GLA, Parking, Active Hubs), category filter pill bar, search bar, and 3-column property card grid with spec badges.
    - **Property Detail Monograph ([`app/properties/[slug]/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/properties/[slug]/loading.tsx)):** Mirrors breadcrumb navigation, 16:9 cinematic gallery with 6-thumbnail strip, classification metadata, title/tagline, editorial narrative, MapPin address, 4-column divided architectural stats ribbon (GLA, Floors, Parking, BUA), action buttons, and technical specifications grid.
    - **About Us Monograph ([`app/about/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/about/loading.tsx)):** Mirrors monograph hero with 4 scale metrics, interactive vertical heritage timeline milestones, 3-pillar investment thesis grid, and HSE Zero-Harm charter container.
    - **Executive Statement ([`app/ceo-message/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/ceo-message/loading.tsx)):** Mirrors hero, dual-column address (portrait profile card on left + formal statement letter on right), and 3-column strategic doctrine.
    - **Contact & RFQ Portal ([`app/contact/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/contact/loading.tsx)):** Mirrors dual-column layout (7-column inquiry form card + 5-column executive owner reach card with emergency hours) and Cairo HQ map container. Also updated `components/contact/ContactPageClient.tsx` to use `<ContactLoading />` in client-side `Suspense` fallback.
    - **Nexus Dashboard Canvas & All Management Subpages:**
      - **Dashboard Overview ([`app/nexus-portal/(dashboard)/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/loading.tsx>)):** Mirrors 4 performance metric cards, table/form container, and management action bar.
      - **Super Admin Login ([`app/nexus-portal/login/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/login/loading.tsx)):** Mirrors centered obsidian glass card, logo, badge, and input fields.
      - **Commercial Assets ([`app/nexus-portal/(dashboard)/properties/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/properties/loading.tsx>)):** Mirrors header, "Add Commercial Asset" CTA, and 3-column asset cards grid with aspect-video thumbnails and stats.
      - **Retail Store Tenants ([`app/nexus-portal/(dashboard)/stores/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/stores/loading.tsx>)):** Mirrors header, "Add Store Tenant" CTA, property filter pill bar, and 3-column store tenant cards grid.
      - **Core Disciplines ([`app/nexus-portal/(dashboard)/disciplines/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/disciplines/loading.tsx>)):** Mirrors 2-column discipline cards grid with metric boxes and specs checklist.
      - **Homepage & Showcase Settings ([`app/nexus-portal/(dashboard)/homepage/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/homepage/loading.tsx>)):** Mirrors action toolbar, tabs bar, and media uploader card.
      - **Inquiries & RFQs ([`app/nexus-portal/(dashboard)/inquiries/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/inquiries/loading.tsx>)):** Mirrors status filter pill bar and inquiry cards list.
      - **Corporate Hero Metrics ([`app/nexus-portal/(dashboard)/metrics/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/metrics/loading.tsx>)):** Mirrors 4-column metric cards grid with value numbers and bilingual labels.
      - **Tier-1 Partners ([`app/nexus-portal/(dashboard)/partners/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/partners/loading.tsx>)):** Mirrors 3-column partner credential cards grid.
      - **Heritage Timeline ([`app/nexus-portal/(dashboard)/timeline/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/timeline/loading.tsx>)):** Mirrors 2-column milestone cards grid with year badges.
      - **Values & Investment Pillars ([`app/nexus-portal/(dashboard)/values/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/values/loading.tsx>)):** Mirrors dual 3-column grids for corporate values and investment pillars.
      - **Executive Statement ([`app/nexus-portal/(dashboard)/ceo/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/ceo/loading.tsx>)):** Mirrors header, 3-tab layout, and executive profile form card.
      - **Zero-Harm HSE Charter ([`app/nexus-portal/(dashboard)/hse/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/hse/loading.tsx>)):** Mirrors 3-column split (policy statement card + authority card + certifications).
      - **Company Coordinates ([`app/nexus-portal/(dashboard)/company/loading.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/company/loading.tsx>)):** Mirrors 2-column cards grid for entity credentials, HQ map, and channels.
  - **Universal shadcn `<Tooltip>` Integration:**
    - Corrected Base UI helper import in [`components/ui/tooltip.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/ui/tooltip.tsx) to resolve `cn` from `@/lib/utils`.
    - Wrapped the root application tree in [`app/layout.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/layout.tsx) with `<TooltipProvider delay={100}>` for global micro-interaction consistency.
    - Modernized [`components/nexus/MediaUploader.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/MediaUploader.tsx) to wrap media deletion buttons with `<Tooltip>`.
    - Modernized [`components/nexus/NexusDashboardLayout.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDashboardLayout.tsx) and [`components/nexus/NexusDashboard.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusDashboard.tsx) to wrap sidebar footer "View Live Site", "Sign Out", and header "Live Website" with bilingual `<Tooltip>`.
    - Modernized [`components/properties/PropertyGallery.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/properties/PropertyGallery.tsx) to wrap main showcase navigation arrows, lightbox modal close button, and lightbox navigation arrows with localized `<Tooltip>`.
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors**.
    - `npm run build`: **Compiled 100% successfully** across all 20 App Router routes.

- **Milestone 11: Official Corporate Profile Storage & Multi-Page Download Integration (2026-09-26):**
  - **Storage Bucket Infrastructure:**
    - Configured Supabase Storage bucket `tafawok-media` to support institutional documents and increased file limits (`file_size_limit = 209715200`).
    - Successfully uploaded the official corporate profile document ([`TRCC company profile (2021).pdf`](<file:///Users/omartemsah/Downloads/TRCC%20company%20profile%20(2021).pdf>)) to `tafawok-media/documents/tafawok-company-profile.pdf` (13.9 MB).
    - Verified Cloudflare CDN public endpoint returning `HTTP/2 200` with direct download stream.
    - Updated PostgreSQL `site_settings.company_identity` and `content/cre-data.ts` to export `COMPANY_PROFILE_URL`.
  - **Reusable `<DownloadProfileButton>` Component:**
    - Created [`components/shared/DownloadProfileButton.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/shared/DownloadProfileButton.tsx) with tailored institutional variants (`hero`, `about`, `contact`, `compact`).
    - Enforced shadcn `<Tooltip>` integration displaying bilingual file metadata (`PDF • 14 MB`).
  - **Public Pages Integration:**
    - **Homepage ([`components/home/HeroSection.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/home/HeroSection.tsx)):** Added secondary institutional CTA alongside the primary portfolio exploration button, with exact alignment with [`app/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/loading.tsx).
    - **About Us ([`components/about/AboutHeroSection.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/about/AboutHeroSection.tsx)):** Added prestigious download button below the corporate heritage narrative and synced with [`app/about/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/about/loading.tsx).
    - **Contact Us ([`components/contact/ContactPageClient.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/contact/ContactPageClient.tsx)):** Added executive corporate profile card in the right column alongside owner contact info, and synced with [`app/contact/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/contact/loading.tsx).
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors**.
    - `npm run build`: **Compiled 100% successfully** in 918ms across all routes.

- **Milestone 12: Nexus Media Library, Permanent Bucket Asset Deletion & Footer Profile Download (2026-09-26):**
  - **Nexus Media Library & Asset Manager (`/nexus-portal/media`):**
    - Built [`components/nexus/NexusMediaTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusMediaTab.tsx) and [`app/nexus-portal/(dashboard)/media/page.tsx`](<file:///Users/omartemsah/WebProjects/Tafawok/app/nexus-portal/(dashboard)/media/page.tsx>) registered in dashboard navigation (`NexusDashboardLayout.tsx` & `NexusDashboard.tsx`).
    - Added aggregate storage metrics (Total assets, Images, PDFs, Video tours, Total storage used).
    - Quick drag-and-drop uploader supporting destination folders (`general`, `documents`, `properties`, `stores`).
    - Instant filename search, media type filter tabs (Images, PDFs, Videos), and folder filter.
    - Card action toolbar: One-click CDN URL copying, direct file download in new tab, and permanent file deletion from the Supabase bucket with confirmation dialogs.
  - **Storage Upload & Deletion API Improvements:**
    - Updated [`app/api/nexus/upload/route.ts`](file:///Users/omartemsah/WebProjects/Tafawok/app/api/nexus/upload/route.ts) to support PDF documents (up to 50MB limit), recursive bucket asset listings, and URL/path-based permanent deletion via `auth.supabase.storage.from('tafawok-media').remove([path])`.
  - **Company Profile Uploader in Company Identity:**
    - Updated [`components/nexus/NexusCompanyIdentityTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusCompanyIdentityTab.tsx) with Card 3: "Corporate Profile & Marketing Portfolio (PDF / Media)", enabling admins to upload a different PDF profile or delete the existing one directly from the identity tab with automatic database synchronization.
  - **Enhanced Media Uploader with Bucket Deletion:**
    - Updated [`components/nexus/MediaUploader.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/MediaUploader.tsx) to support `acceptType="document"`, PDF preview with direct document view link, two-stage unlink vs. permanent bucket deletion, and loading spinners.
  - **Simplified Footer Profile Download Button:**
    - Added `"footer"` variant to [`components/shared/DownloadProfileButton.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/shared/DownloadProfileButton.tsx) with shadcn `<Tooltip>` integration and localized PDF badge.
    - Integrated simplified button into Column 1 of [`components/layout/Footer.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/layout/Footer.tsx) directly below the corporate accreditation credentials.
  - **Strict Bidirectional File Type Validation:**
    - Enforced rigorous bidirectional validation across client-side uploaders (`MediaUploader.tsx`, `NexusMediaTab.tsx`) and the backend API (`/api/nexus/upload`):
      - **Image-only slots** (Property hero visuals, showcase canvas, video posters) strictly reject videos and PDF documents with immediate feedback.
      - **Video-only slots** (Video tours) strictly reject images and PDF documents.
      - **Document-only slots** (Corporate Profile in Company Identity) strictly reject images and videos.
      - **Media Gallery slots** strictly reject documents (PDFs), allowing only images and video walkthroughs.
      - Server-side validation reads `acceptType` and target `folder`, returning HTTP 400 with specific error messages if mismatched.
  - **IDE Diagnostics & Linter Remediation:**
    - Resolved React Compiler effect cascading render error in [`NexusMediaTab.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/nexus/NexusMediaTab.tsx) via asynchronous state initialization.
    - Eliminated all `any` usages and unused variables in [`route.ts`](file:///Users/omartemsah/WebProjects/Tafawok/app/api/nexus/upload/route.ts) with strict `FileObject` typings from `@supabase/storage-js`.
    - Modernized CSS classes in [`tooltip.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/components/ui/tooltip.tsx), [`loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/loading.tsx), and [`properties/[slug]/loading.tsx`](file:///Users/omartemsah/WebProjects/Tafawok/app/properties/[slug]/loading.tsx) to canonical Tailwind v4 logical utilities (`aspect-video`, `rounded-xs`, `inset-s-*`, `inset-e-*`, `max-w-70`).
  - **Quality Gates Verification:**
    - `npx tsc --noEmit`: **0 errors**.
    - `npm run lint`: **0 warnings, 0 errors**.
    - `npm run build`: **Compiled 100% successfully** across all 21 App Router routes.
