"use client"

import * as React from "react"
import Link from "next/link"
import { Info, Sparkles, ArrowUpRight, Globe, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export interface PageImpactData {
  titleEn: string
  titleAr: string
  scopeEn: string
  scopeAr: string
  locations: {
    pageEn: string
    pageAr: string
    sectionEn: string
    sectionAr: string
    href: string
  }[]
  tipEn: string
  tipAr: string
}

export const PAGE_IMPACTS: Record<string, PageImpactData> = {
  homepage: {
    titleEn: "Homepage Hero, Showcase & Marquee",
    titleAr: "الرئيسية، الاستعراض التفاعلي وشريط الماركي",
    scopeEn:
      "Controls the public landing page hero statement, credentials proof strip, primary CTA button, and the interactive scroll-expand canvas image, titles, and 3-column specs matrix (GLA / BUA / Parking). Active properties automatically feed the sliding marquee ticker bands.",
    scopeAr:
      "يتحكم في العنوان المعماري الرئيسي، شريط مؤشرات الثقة، زر الاستكشاف، وصورة الصرح الممتدة تفاعلياً عند التمرير مع المواصفات المعمارية الثلاثية (GLA / BUA / Parking). كما تظهر الأصول النشطة تلقائياً في شريط الماركي المتحرك.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Hero Section & Credentials Strip",
        sectionAr: "العنوان الرئيسي وشريط مؤشرات الثقة",
        href: "/",
      },
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Interactive Scroll-Expand Showcase Canvas",
        sectionAr: "صورة واستعراض الصرح التفاعلي الممتد بكامل العرض",
        href: "/#showcase",
      },
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Continuous Parallax Marquee Bands",
        sectionAr: "شريط العبارات والأصول المتحركة عبر الصفحة",
        href: "/#marquee",
      },
    ],
    tipEn:
      "Uploading a new showcase image or changing stats updates the live landing page canvas instantly. Active properties automatically glide through the marquee ticker.",
    tipAr:
      "رفع صورة جديدة للصرح أو تعديل الأرقام المعمارية يظهر مباشرة على المشهد التفاعلي في الرئيسية، وتنزلق المشروعات النشطة في شريط الماركي.",
  },

  properties: {
    titleEn: "Commercial Assets Portfolio & Monograph",
    titleAr: "محفظة الأصول التجارية والصفحات المستقلة",
    scopeEn:
      "Full management of flagship commercial developments, unique URL slugs, architectural specs, hero photography, video tour streams, floor plans, retail tenant directories, and leasing availability tags.",
    scopeAr:
      "إدارة شاملة للمشروعات التجارية الكبرى، الروابط المستقلة (Slugs)، المواصفات الإنشائية، صور الواجهات، جولات الفيديو، المخططات، دليل المتاجر، وحالات التأجير.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Featured Commercial Assets Grid",
        sectionAr: "شبكة المشروعات التجارية البارزة",
        href: "/#portfolio",
      },
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Parallax Scroll Marquee Ticker",
        sectionAr: "شريط التمرير المتحرك لأصول الشركة",
        href: "/#marquee",
      },
      {
        pageEn: "Properties Directory",
        pageAr: "دليل المشروعات والأصول",
        sectionEn: "Full Catalog & Sector Filter (Office, Retail, Mixed-Use)",
        sectionAr: "دليل الأصول الشامل مع فلاتر القطاعات",
        href: "/properties",
      },
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Full Specs Monograph, Gallery, Video Tour & Floor Plans",
        sectionAr:
          "المواصفات المعمارية الكاملة، المعرض، جولة الفيديو، والمخططات",
        href: "/properties/mall-chillout-el-shorouk",
      },
      {
        pageEn: "Navigation Mega-Menu",
        pageAr: "القائمة العلوية الرئيسية",
        sectionEn: "Header Asset Selector Dropdown",
        sectionAr: "قائمة التصفح السريع للأصول التجارية",
        href: "/properties",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn: "Target Property Inquiry Dropdown Selector",
        sectionAr: "قائمة اختيار العقار المستهدف في نموذج الحجز",
        href: "/contact",
      },
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn: "Flagship Commercial Assets Navigation (Column 2)",
        sectionAr: "روابط الأصول التجارية البارزة بالتذييل (العمود 2)",
        href: "/#footer",
      },
    ],
    tipEn:
      "Adding or editing a property automatically updates its dedicated URL, navbar dropdown, contact inquiry options, footer links, and ticker bands.",
    tipAr:
      "إضافة أو تعديل أي صرح يحدث صفحته المستقلة وقوائم التصفح ونموذج الاستفسار وروابط التذييل وشريط الماركي تلقائياً.",
  },

  stores: {
    titleEn: "Retail Tenants, Brands & Directory",
    titleAr: "دليل المتاجر والعلامات التجارية بالمولات",
    scopeEn:
      "Manages brand tenants, retail categories, floor levels, unit numbers, logos, and operational leasing status (Open, Coming Soon, Leased) linked to parent commercial properties.",
    scopeAr:
      "إدارة العلامات التجارية والمستأجرين، الأدوار، أرقام الوحدات، الشعارات، وحالات التشغيل (مفتوح، قريباً، مؤجر) المرتبطة بالصروح التجارية.",
    locations: [
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Retail Tenants & Brands Directory Table",
        sectionAr: "جدول المتاجر والماركات التجارية بالمشروع",
        href: "/properties/mall-chillout-el-shorouk#stores",
      },
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Active Retail Brand Count Indicator Badge",
        sectionAr: "شارة عدد العلامات التجارية النشطة بالمول",
        href: "/properties/mall-chillout-el-shorouk",
      },
      {
        pageEn: "Nexus Dashboard",
        pageAr: "لوحة التحكم الرئيسية",
        sectionEn: "Total Active Retail Stores Metric Card",
        sectionAr: "بطاقة إجمالي المتاجر والعلامات المستأجرة",
        href: "/nexus-portal",
      },
    ],
    tipEn:
      "Tenants are grouped under their respective asset (e.g. Mall Chillout Alshrouk) and render in its dedicated directory.",
    tipAr:
      "المتاجر ترتبط بالمشروع المخصص لها وتظهر في جدول العلامات التجارية بصفحة المشروع وإحصائيات لوحة التحكم.",
  },

  disciplines: {
    titleEn: "Sectors & Disciplines",
    titleAr: "القطاعات والتخصصات الهندسية والتجارية",
    scopeEn:
      "Configures the core commercial sectors (Prime Office Developments, Destination Retail Hubs, Logistics & Business Parks, Turnkey EPC Execution), icon assignments, and capability descriptions.",
    scopeAr:
      "تحديد قطاعات التطوير التجاري (الأبراج الإدارية، المراكز التجارية، المجمعات اللوجستية، ومقاولات تسليم المفتاح) والأيقونات والمؤشرات.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Commercial Disciplines Grid & Capability Indicators",
        sectionAr: "قسم التخصصات والقطاعات التجارية بالرئيسية",
        href: "/#disciplines",
      },
      {
        pageEn: "Properties Directory",
        pageAr: "دليل المشروعات",
        sectionEn: "Discipline Categorization & Sector Taxonomy",
        sectionAr: "تصنيفات القطاعات وفلاتر المشروعات",
        href: "/properties",
      },
    ],
    tipEn:
      "Updates the 4 primary commercial discipline cards featured on the public homepage to communicate core capabilities.",
    tipAr:
      "يحدث بطاقات التخصصات الأربعة المعروضة في الصفحة الرئيسية لتوضيح القدرات التنفيذية للمستثمرين.",
  },

  metrics: {
    titleEn: "Corporate Scale & Institutional Metrics",
    titleAr: "المؤشرات القياسية وحجم الأعمال",
    scopeEn:
      "Maintains the institutional scale figures: proven years in business (25+ Yrs), commercial GLA capacity (64,500+ m²), specialized engineering workforce (50+ Engineers), and secure parking slots (1,320+ Slots).",
    scopeAr:
      "إدارة الأرقام المؤسسية المعتمدة: سنوات الخبرة (25+ عاماً)، المساحة التأجيرية الإجمالية (64,500+ م²)، الكادر الهندسي المتخصص (50+ مهندساً)، ومواقف السيارات المؤمنة (1,320+ موقف).",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Institutional Scale Metrics Strip",
        sectionAr: "شريط المؤشرات الرقمية التفاعلي بالرئيسية",
        href: "/#metrics",
      },
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Hero Scale Indicators & Track Record Callout",
        sectionAr: "مؤشرات الحجم والإنجاز في مقدمة صفحة من نحن",
        href: "/about",
      },
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn: "Proven Track Record & Regional Heritage Callout",
        sectionAr: "إشارة العراقة وسجل الإنجاز في التذييل",
        href: "/#footer",
      },
    ],
    tipEn:
      "These numerical indicators establish enterprise credibility for institutional tenants, investors, and EPC clients.",
    tipAr:
      "هذه الأرقام تبرز لتعزيز الثقة المؤسسية للمستثمرين في كل من الرئيسية وصفحة من نحن والتذييل.",
  },

  timeline: {
    titleEn: "Heritage Timeline & Milestones",
    titleAr: "مسيرة العراقة والتاريخ المؤسسي",
    scopeEn:
      "Controls chronological milestone cards highlighting regional expansions, Gulf contracts (Kuwait, KSA, UAE), civil piping and fresh-water megaprojects, and modern Egyptian commercial landmarks.",
    scopeAr:
      "التحكم في المحطات الزمنية لعراقة الشركة، التوسعات الإقليمية بالخليج العربي (الكويت، السعودية، الإمارات)، مشروعات البنية التحتية، والصروح التجارية بمصر.",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Interactive Heritage Timeline Section",
        sectionAr: "الخط الزمني التفاعلي لمسيرة الإنجازات والريادة",
        href: "/about#timeline",
      },
    ],
    tipEn:
      "Changes appear on the interactive timeline on the About Us page, complete with era badges and highlights.",
    tipAr:
      "التغييرات تظهر في قسم المسيرة التاريخية بصفحة من نحن مع التصنيفات الزمنية وشارات العراقة.",
  },

  values: {
    titleEn: "Investment Thesis & Corporate Values",
    titleAr: "القيم المؤسسية وركائز الاستثمار التجاري",
    scopeEn:
      "Defines the 3 commercial investment thesis pillars (Capital Efficiency, Structural Permanence, Operational Yield) and the 4 corporate values guiding engineering and development execution.",
    scopeAr:
      "تحديد ركائز أطروحة الاستثمار الثلاث (كفاءة رأس المال، البقاء الإنشائي، العائد التشغيلي) والقيم المؤسسية الأربع الحاكمة لجودة التنفيذ.",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Commercial Investment Thesis 3-Pillar Grid",
        sectionAr: "أطروحة الاستثمار التجاري والركائز الثلاث",
        href: "/about#thesis",
      },
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Corporate Core Values 4-Card Grid",
        sectionAr: "شبكة القيم المؤسسية الحاكمة الأربع",
        href: "/about#values",
      },
    ],
    tipEn:
      "Both the Strategic Pillars and Corporate Values are presented together on the About Us page to state TAFAWOK's operational philosophy.",
    tipAr:
      "ركائز الاستثمار والقيم المؤسسية تعرض سوياً في صفحة من نحن لبيان الفلسفة الاستثمارية والتشغيلية.",
  },

  partners: {
    titleEn: "Clients, Accreditations & Partners",
    titleAr: "الشركاء والعملاء والاعتمادات المؤسسية",
    scopeEn:
      "Manages institutional partner credentials, Petroleum & Energy sector affiliations, Tier-1 EPC partners, government entities, and commercial tenant brand logos.",
    scopeAr:
      "إدارة شركاء النجاح المؤسسيين، عملاء قطاع الطاقة والبترول، كبرى شركات المقاولات، الجهات الحكومية، وشعارات العلامات التجارية.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Infinite Client & Partner Marquee Strip",
        sectionAr: "شريط الشعارات المتحرك للشركاء والاعتمادات",
        href: "/#partners",
      },
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Institutional Credentials & Tier-1 Compliance Badges",
        sectionAr: "اعتمادات الجودة وتصنيف المقاولات من الفئة الأولى",
        href: "/about",
      },
    ],
    tipEn:
      "Logos and company names render in the smoothly animating continuous marquee on the public homepage to establish partnership depth.",
    tipAr:
      "الشعارات والأسماء تظهر في شريط الماركي المتحرك بسلاسة أسفل الصفحة الرئيسية لتوثيق قوة الشراكات.",
  },

  ceo: {
    titleEn: "Executive Leadership Statement & Direct Desk",
    titleAr: "بيان القيادة التنفيذية والمكتب التنفيذي المباشر",
    scopeEn:
      "Maintains executive leadership name (EN/AR), corporate role (EN/AR), direct phone line, secondary line, executive email, direct WhatsApp number, years of leadership (25+ Yrs), formal corporate address, salutation, paragraphs, and foundational strategic doctrine.",
    scopeAr:
      "إدارة الاسم التنفيذي، المنصب المؤسسي، الهاتف المباشر، الخط الإضافي، البريد التنفيذي، رقم الواتساب المباشر، سنوات القيادة، البيان الرسمي الكامل، والركائز الثلاث للحوكمة.",
    locations: [
      {
        pageEn: "CEO Message Page",
        pageAr: "صفحة بيان القيادة التنفيذية",
        sectionEn: "Full Official Address, Salutation & Executive Statement",
        sectionAr: "البيان الرسمي الكامل والكلمة الافتتاحية والتوقيع",
        href: "/ceo-message#formal-address",
      },
      {
        pageEn: "CEO Message Page",
        pageAr: "صفحة بيان القيادة التنفيذية",
        sectionEn: "Three Pillars of Executive Leadership Doctrine",
        sectionAr: "الركائز الثلاث للقيادة التنفيذية والحوكمة",
        href: "/ceo-message#doctrine",
      },
      {
        pageEn: "CEO Message Page",
        pageAr: "صفحة بيان القيادة التنفيذية",
        sectionEn: "Career Milestones & Infrastructure Experience",
        sectionAr: "المحطات المهنية وتاريخ المشروعات الكبرى",
        href: "/ceo-message#career",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn:
          "Executive Ownership Card (Name, Role, Direct Line, WhatsApp, 25+ Yrs Badge)",
        sectionAr:
          "بطاقة القيادة التنفيذية (الاسم، المنصب، الخط المباشر، الواتساب، شارة 25+ عاماً)",
        href: "/contact#owner-reach",
      },
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn:
          "Executive Leasing Desk (Column 4: Name, Role, Phone, WhatsApp)",
        sectionAr:
          "مكتب التأجير التنفيذي (العمود 4: الاسم، المنصب، الهاتف، وزر الواتساب)",
        href: "/#footer",
      },
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Executive Leadership Quote Card & Direct Contact CTA",
        sectionAr: "بطاقة اقتباس ورؤية القيادة التنفيذية بالرئيسية",
        href: "/#ceo",
      },
    ],
    tipEn:
      "Updating phone numbers, email, WhatsApp, or executive names here synchronizes immediately across the Contact Us card, CEO Message page, and Column 4 of the Footer.",
    tipAr:
      "تعديل أرقام الهواتف، البريد، الواتساب، أو الاسم هنا يتزامن فوراً عبر بطاقة صفحة اتصل بنا، صفحة بيان القيادة، والعمود الرابع في التذييل.",
  },

  company: {
    titleEn: "Headquarters, Contact Lines & Legal Identity",
    titleAr: "المقر الرئيسي، أرقام التواصل والهوية المؤسسية",
    scopeEn:
      "Maintains legal corporate entity naming (EN/AR), commercial registration credentials, Cairo HQ geographic address, official Google Maps direct & embed links, primary & secondary phone lines, fax, executive email, primary domain, and the official Corporate Profile PDF portfolio downloaded site-wide.",
    scopeAr:
      "إدارة الاسم القانوني، السجل التجاري، عنوان المقر الرئيسي بالقاهرة، روابط وخريطة جوجل مابس، الهواتف الرسمية، الفاكس، البريد الإلكتروني، والملف التعريفي المؤسسي (PDF) المتاح للتحميل عبر الموقع.",
    locations: [
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn:
          "Column 1: Corporate Licensing, Tier-1 Credentials & Profile Download",
        sectionAr:
          "العمود 1: الترخيص المؤسسي، تصنيف الفئة الأولى، وزر تحميل الملف التعريفي",
        href: "/#footer",
      },
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn:
          "Column 4: Executive Headquarters Address with Google Maps Link & Phone",
        sectionAr:
          "العمود 4: عنوان المقر الرئيسي مع رابط جوجل مابس والهواتف الرسمية",
        href: "/#footer",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn:
          "Executive Reach Card: Cairo HQ Coordinates with Direct Google Maps Link",
        sectionAr:
          "بطاقة التواصل التنفيذي: عنوان المقر الرئيسي ورابط الخريطة المباشر",
        href: "/contact#owner-reach",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn:
          "Interactive HQ Map Frame & Dynamic City / Corridor Connectivity Ribbon",
        sectionAr:
          "خريطة المقر التفاعلية وشريط الشرايين الحيوية المتكيف ديناميكياً",
        href: "/contact#cairo-hq",
      },
      {
        pageEn: "Homepage, About, Contact & Footer",
        pageAr: "الرئيسية، من نحن، اتصل بنا، والتذييل",
        sectionEn:
          "Corporate Profile Download Button with Live PDF File Metadata Tooltip",
        sectionAr: "زر تحميل الملف التعريفي المؤسسي مع تفاصيل حجم الملف (PDF)",
        href: "/",
      },
      {
        pageEn: "Entire Platform (SEO)",
        pageAr: "محركات البحث (SEO)",
        sectionEn: "Structured Organization & LocalBusiness JSON-LD Metadata",
        sectionAr: "بيانات المنشأة والعنوان المعتمدة لمحركات البحث JSON-LD",
        href: "/",
      },
    ],
    tipEn:
      "Modifying the Headquarters Address updates the Footer, the Contact Page Executive Card, and the Map frame simultaneously. Uploading a new PDF updates the download button across all 4 public pages.",
    tipAr:
      "تعديل عنوان المقر يحدث التذييل وبطاقة صفحة التواصل وإطار الخريطة في وقت واحد. ورفع ملف PDF جديد يحدث زر التحميل في جميع الصفحات الأربعة.",
  },

  media: {
    titleEn: "Media Library, CDN Assets & Bucket Deletion",
    titleAr: "مكتبة الوسائط، سحابة CDN وحذف الأصول",
    scopeEn:
      "Centralized repository for uploading, previewing, and permanently deleting images, video walkthroughs, and official PDF documents from the Supabase Storage CDN bucket (`tafawok-media`). Enforces strict bidirectional validation per slot.",
    scopeAr:
      "مستودع مركزي لرفع واستعراض وحذف الصور، الجولات المرئية، وملفات الـ PDF المؤسسية بشكل نهائي من سحابة التخزين (`tafawok-media`)، مع تطبيق التحقق الصارم من نوع الملف.",
    locations: [
      {
        pageEn: "Public Website Media",
        pageAr: "وسائط الموقع العام",
        sectionEn:
          "Homepage Hero Canvas, Video Tours, Galleries, and Store Logos",
        sectionAr:
          "واجهة الصرح الرئيسية، جولات الفيديو، معارض الصور، وشعارات المتاجر",
        href: "/",
      },
      {
        pageEn: "Storage Buckets",
        pageAr: "سحابة التخزين المباشرة",
        sectionEn:
          "Folder Segregation (general, documents, properties, stores)",
        sectionAr: "تنظيم المجلدات (عام، مستندات، مشروعات، ومتاجر)",
        href: "/nexus-portal/media",
      },
    ],
    tipEn:
      "Deleting a file permanently removes it from the Supabase storage bucket. Dedicated uploaders enforce strict file validation (images only, videos only, or PDFs only).",
    tipAr:
      "حذف أي ملف يحذفه نهائياً من سحابة التخزين. وحقول الرفع تطبق فحصاً صارماً لمنع رفع المستندات في أماكن الصور والعكس.",
  },

  hse: {
    titleEn: "HSE Executive Safety Charter & ISO Quality",
    titleAr: "ميثاق السلامة المهنية Zero-Harm وجودة ISO",
    scopeEn:
      "Controls the corporate Zero-Harm safety policy, signed executive safety charter, ISO quality compliance certifications (ISO 9001, ISO 45001, ISO 14001), OSHA, and NFPA standards.",
    scopeAr:
      "التحكم في سياسة السلامة المهنية Zero-Harm، ميثاق السلامة التنفيذي الموقع، ومعايير الجودة الدولية المعتمدة (ISO 9001, ISO 45001, ISO 14001, OSHA, NFPA).",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Signed Executive Safety Charter & ISO Accreditations",
        sectionAr: "ميثاق السلامة المهنية الموقع واعتمادات الجودة الهندسية",
        href: "/about#hse",
      },
    ],
    tipEn:
      "Guarantees that institutional clients and EPC partners see verified compliance standards on the About page.",
    tipAr:
      "يضمن اطلاع المستثمرين والشركاء على أحدث معايير السلامة والجودة المعتمدة في صفحة من نحن.",
  },

  inquiries: {
    titleEn: "Commercial Leasing RFQs & Inquiries Triage",
    titleAr: "استفسارات وحجوزات المساحات التجارية",
    scopeEn:
      "Central triage hub for reviewing, managing, and following up on commercial leasing RFQs, office inquiries, and partnership requests sent from public website forms.",
    scopeAr:
      "المركز الرئيسي لاستقبال وفرز ومتابعة طلبات استئجار المساحات التجارية، المكاتب الإدارية، واستفسارات الشراكة الواردة من نماذج الموقع.",
    locations: [
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn: "Public Commercial Inquiry & RFQ Form",
        sectionAr: "نموذج التواصل وحجز المساحات التجارية الرسمي",
        href: "/contact#inquiry-portal",
      },
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Direct Property Leasing Inquiries & Request Dialog",
        sectionAr: "طلبات التأجير والاستفسار المباشر عن المشروع",
        href: "/properties/mall-chillout-el-shorouk",
      },
    ],
    tipEn:
      "Inquiries submitted by website visitors land directly here with full contact details, target property selection, and timestamps.",
    tipAr:
      "أي استفسار يرسله زوار الموقع يظهر هنا مباشرة مع بيانات التواصل والمشروع المستهدف وتوقيت الإرسال.",
  },

  overview: {
    titleEn: "Nexus Executive Dashboard Cockpit",
    titleAr: "لوحة التحكم التنفيذية الشاملة",
    scopeEn:
      "Operational cockpit providing aggregate performance metrics across commercial assets, active stores, live inquiries, and quick management links.",
    scopeAr:
      "مركز القيادة والعمليات الذي يجمع إحصائيات الأصول التجارية، المتاجر النشطة، الاستفسارات الجديدة، والروابط السريعة لكافة الأقسام.",
    locations: [
      {
        pageEn: "Entire Public Platform",
        pageAr: "كامل المنصة الرقمية",
        sectionEn: "Central Data Hub for All 12 Public CRE Modules",
        sectionAr: "مركز البيانات الشامل لجميع أقسام المنصة التجارية",
        href: "/",
      },
    ],
    tipEn:
      "Use the overview cards to jump directly to managing any commercial module across the system.",
    tipAr:
      "استخدم بطاقات النظرة العامة للوصول المباشر وإدارة أي قطاع تجاري في المنصة.",
  },
}

interface PageImpactGuideProps {
  activeId: string
  isArabic?: boolean
  className?: string
}

export function PageImpactGuide({
  activeId,
  isArabic = false,
  className,
}: PageImpactGuideProps) {
  const data = PAGE_IMPACTS[activeId] || PAGE_IMPACTS.overview

  return (
    <HoverCard>
      <HoverCardTrigger
        className={cn(
          "inline-flex size-7 cursor-pointer items-center justify-center rounded-lg border border-border/70 bg-card/60 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:outline-none",
          className
        )}
        aria-label={
          isArabic
            ? "دليل تأثير التغييرات على الموقع العام"
            : "Website impact guide"
        }
      >
        <Info className="size-4" />
      </HoverCardTrigger>

      <HoverCardContent
        align={isArabic ? "end" : "start"}
        side="bottom"
        sideOffset={8}
        className="z-50 w-80 space-y-3.5 border-border/80 bg-popover/95 p-4 text-xs shadow-2xl backdrop-blur-md sm:w-105"
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Globe className="size-3.5" />
            </div>
            <span className="text-xs font-bold text-foreground sm:text-sm">
              {isArabic ? data.titleAr : data.titleEn}
            </span>
          </div>
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary"
          >
            <Sparkles className="me-1 size-2.5" />
            {isArabic ? "تأثير الموقع المباشر" : "Public Impact"}
          </Badge>
        </div>

        {/* Scope Description */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            <Layers className="size-3 text-primary" />
            <span>
              {isArabic ? "ما يتم التحكم به هنا:" : "What You Control:"}
            </span>
          </div>
          <p className="text-[12px] leading-relaxed font-normal text-foreground/90">
            {isArabic ? data.scopeAr : data.scopeEn}
          </p>
        </div>

        {/* Affected Pages & Components */}
        <div className="space-y-1.5 border-t border-border/50 pt-2.5">
          <span className="block text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {isArabic
              ? "المواقع المتأثرة في الموقع العام:"
              : "Where It Appears On Live Site:"}
          </span>

          <div className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
            {data.locations.map((loc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-muted/30 p-2 transition-colors hover:bg-muted/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11.5px] font-semibold text-foreground">
                    {isArabic ? loc.pageAr : loc.pageEn}
                  </div>
                  <div className="truncate text-[10.5px] text-muted-foreground">
                    {isArabic ? loc.sectionAr : loc.sectionEn}
                  </div>
                </div>

                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Link
                        href={loc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 rounded border border-border/80 bg-background px-2 py-1 text-[10.5px] font-medium text-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
                        aria-label={
                          isArabic ? "فتح في نافذة جديدة" : "Open in new tab"
                        }
                      />
                    }
                  >
                    <span>{isArabic ? "معاينة" : "View"}</span>
                    <ArrowUpRight className="size-3" />
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {isArabic ? "فتح في نافذة جديدة" : "Open in new tab"}
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        {/* Pro-Tip Footer Note */}
        <div className="rounded-md border border-t border-primary/20 bg-primary/5 p-2 text-[11px] leading-normal text-muted-foreground">
          <span className="me-1 font-semibold text-primary">
            {isArabic ? "إرشاد للمسؤول:" : "Admin Guide:"}
          </span>
          {isArabic ? data.tipAr : data.tipEn}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
