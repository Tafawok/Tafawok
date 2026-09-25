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
