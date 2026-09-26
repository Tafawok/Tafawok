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
    titleEn: "Homepage & Expand Showcase",
    titleAr: "الرئيسية والاستعراض التفاعلي",
    scopeEn:
      "Controls the public landing page hero statement, credentials proof strip, primary CTA button, and the interactive scroll-expand canvas image, titles, and 3-column specs matrix.",
    scopeAr:
      "يتحكم في العنوان المعماري الرئيسي، شريط مؤشرات الثقة، زر الاستكشاف، وصورة الصرح الممتدة تفاعلياً عند التمرير مع المواصفات المعمارية الثلاثية (GLA / BUA / Parking).",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Hero Section & Credentials",
        sectionAr: "العنوان الرئيسي وشريط المؤشرات",
        href: "/",
      },
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Interactive Scroll-Expand Showcase",
        sectionAr: "صورة واستعراض الصرح التفاعلي الممتد",
        href: "/#showcase",
      },
    ],
    tipEn:
      "Uploading a new showcase image or changing stats updates the live landing page canvas instantly.",
    tipAr:
      "رفع صورة جديدة للصرح أو تعديل الأرقام المعمارية يظهر مباشرة على المشهد التفاعلي في الرئيسية.",
  },

  properties: {
    titleEn: "Commercial Assets Portfolio",
    titleAr: "محفظة الأصول التجارية",
    scopeEn:
      "Controls flagship commercial developments, retail plazas, architectural specifications, visual galleries, video tour streams, and leasing status tags.",
    scopeAr:
      "يتحكم في تفاصيل المشروعات التجارية الكبرى، مولات التجزئة، المواصفات الإنشائية، معارض الصور، جولات الفيديو، وحالات التأجير.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Featured Commercial Assets Grid",
        sectionAr: "بطاقات المشروعات في الرئيسية",
        href: "/#portfolio",
      },
      {
        pageEn: "Properties Directory",
        pageAr: "دليل المشروعات والأصول",
        sectionEn: "Full Catalog & Sector Filter",
        sectionAr: "كاتالوج الأصول وفلاتر القطاعات",
        href: "/properties",
      },
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Full Specs, Gallery & Video Tour",
        sectionAr: "المواصفات، المعرض، وجولة الفيديو",
        href: "/properties/mall-chillout-el-shorouk",
      },
      {
        pageEn: "Navigation Mega-Menu",
        pageAr: "القائمة العلوية الرئيسية",
        sectionEn: "Header Asset Selector Dropdown",
        sectionAr: "قائمة استعراض الأصول السريعة",
        href: "/properties",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn: "Target Property Inquiry Dropdown",
        sectionAr: "قائمة اختيار العقار في نموذج التواصل",
        href: "/contact",
      },
    ],
    tipEn:
      "Adding or editing a property automatically updates its slug page, navbar dropdown, and public inquiry options.",
    tipAr:
      "إضافة أو تعديل أي صرح تجاري يحدث صفحته المستقلة وقوائم التصفح ونموذج الاستفسار تلقائياً.",
  },

  stores: {
    titleEn: "Retail Directory & Mall Tenants",
    titleAr: "دليل المتاجر والعلامات التجارية",
    scopeEn:
      "Manages brand tenants, floor levels, unit numbers, retail categories, and operational leasing status (Open, Coming Soon, Leased) linked to parent commercial properties.",
    scopeAr:
      "إدارة العلامات التجارية والمستأجرين في المولات، أرقام الوحدات، الأدوار، التصنيفات، وحالات التشغيل المربوطة بكل صرح تجاري.",
    locations: [
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Retail Tenant & Brand Directory",
        sectionAr: "دليل المستأجرين والماركات في المول",
        href: "/properties/mall-chillout-el-shorouk",
      },
    ],
    tipEn:
      "Tenants are grouped under their respective asset (e.g. Mall Chillout Alshrouk) and render in its dedicated directory.",
    tipAr:
      "المتاجر ترتبط بالمشروع المخصص لها وتظهر في جدول العلامات التجارية بصفحة المشروع.",
  },

  disciplines: {
    titleEn: "Sectors & Disciplines",
    titleAr: "القطاعات والتخصصات الهندسية",
    scopeEn:
      "Configures the core commercial sectors (Office Towers, Retail Hubs, Logistics & Business Parks, Turnkey EPC), icon assignments, and capability indicators.",
    scopeAr:
      "تحديد قطاعات التطوير التجاري (الأبراج الإدارية، المراكز التجارية، المجمعات اللوجستية، ومقاولات تسليم المفتاح) والأيقونات والمؤشرات.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Commercial Disciplines Showcase",
        sectionAr: "قسم التخصصات والقطاعات التجارية",
        href: "/#disciplines",
      },
    ],
    tipEn:
      "Updates the 4 primary commercial discipline cards featured on the public homepage.",
    tipAr: "يحدث بطاقات التخصصات الأربعة المعروضة في الصفحة الرئيسية.",
  },

  metrics: {
    titleEn: "Corporate Scale & Metrics",
    titleAr: "المؤشرات القياسية وحجم الأعمال",
    scopeEn:
      "Maintains the institutional scale figures: proven years in business, commercial GLA capacity, engineering workforce count, and heritage milestones.",
    scopeAr:
      "إدارة الأرقام المؤسسية المعتمدة: سنوات الخبرة، المساحة التأجيرية الإجمالية GLA، حجم المهندسين، وسنوات الإنجاز.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Institutional Scale Metrics Strip",
        sectionAr: "شريط المؤشرات الرقمية التفاعلي",
        href: "/#metrics",
      },
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Hero Scale Indicators",
        sectionAr: "مؤشرات الحجم والإنجاز في المقدمة",
        href: "/about",
      },
    ],
    tipEn:
      "These numerical indicators appear prominently to establish institutional credibility across the public platform.",
    tipAr:
      "هذه الأرقام تبرز لتعزيز الثقة المؤسسية للمستثمرين في كل من الرئيسية وصفحة من نحن.",
  },

  timeline: {
    titleEn: "Heritage Timeline",
    titleAr: "مسيرة العراقة والتاريخ",
    scopeEn:
      "Controls chronological milestone cards highlighting regional expansions, Gulf contracts, civil infrastructure heritage, and modern commercial landmarks.",
    scopeAr:
      "التحكم في المحطات الزمنية لعراقة الشركة، التوسعات الإقليمية بالخليج، مشروعات البنية التحتية، والصروح التجارية الكبرى.",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Interactive Heritage Timeline",
        sectionAr: "الخط الزمني التفاعلي لمسيرة الإنجازات",
        href: "/about#timeline",
      },
    ],
    tipEn:
      "Changes appear on the interactive timeline on the About Us page, complete with category badges.",
    tipAr:
      "التغييرات تظهر في قسم المسيرة التاريخية بصفحة من نحن مع التصنيفات الزمنية.",
  },

  values: {
    titleEn: "Values & Strategic Pillars",
    titleAr: "القيم المؤسسية وركائز الاستثمار",
    scopeEn:
      "Defines the 3 commercial investment thesis pillars (Capital Efficiency, Structural Permanence, Yield) and the 4 corporate values guiding execution.",
    scopeAr:
      "تحديد ركائز أطروحة الاستثمار الثلاث (كفاءة رأس المال، البقاء الإنشائي، العائد التشغيلي) والقيم الحاكمة للتنفيذ.",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Investment Thesis Pillars",
        sectionAr: "أطروحة الاستثمار التجاري والركائز",
        href: "/about#thesis",
      },
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "Corporate Core Values Grid",
        sectionAr: "شبكة القيم المؤسسية الحاكمة",
        href: "/about#values",
      },
    ],
    tipEn:
      "Both the Strategic Pillars and Corporate Values are presented together on the About Us page.",
    tipAr:
      "ركائز الاستثمار والقيم المؤسسية تعرض سوياً في صفحة من نحن لبيان الفلسفة التشغيلية.",
  },

  partners: {
    titleEn: "Clients & EPC Partners",
    titleAr: "الشركاء والعملاء والاعتمادات",
    scopeEn:
      "Manages institutional partner credentials, Petroleum & Energy sector affiliations, Tier-1 EPC partners, and commercial client logos.",
    scopeAr:
      "إدارة شركاء النجاح المؤسسيين، عملاء قطاع الطاقة والبترول، كبرى شركات المقاولات، وشعارات العلامات التجارية.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Infinite Client & Partner Marquee",
        sectionAr: "شريط الشعارات المتحرك للشركاء والاعتمادات",
        href: "/#partners",
      },
    ],
    tipEn:
      "Logos and names render in the smoothly animating continuous marquee on the public homepage.",
    tipAr:
      "الشعارات والأسماء تظهر في شريط الماركي المتحرك بسلاسة أسفل الصفحة الرئيسية.",
  },

  ceo: {
    titleEn: "Executive Leadership Statement",
    titleAr: "بيان القيادة التنفيذية",
    scopeEn:
      "Maintains the executive leadership address, foundational governance doctrine, corporate vision, and executive direct reach contact coordinates.",
    scopeAr:
      "إدارة الكلمة الرسمية للقيادة التنفيذية لتفوق، المبادئ التأسيسية للحوكمة، والرؤية الاستراتيجية للتطوير التجاري.",
    locations: [
      {
        pageEn: "Homepage",
        pageAr: "الصفحة الرئيسية",
        sectionEn: "Executive Leadership Quote Card",
        sectionAr: "بطاقة اقتباس ورؤية القيادة بالرئيسية",
        href: "/#ceo",
      },
      {
        pageEn: "CEO Message Page",
        pageAr: "صفحة بيان القيادة التنفيذية",
        sectionEn: "Full Official Address & Governance Doctrine",
        sectionAr: "البيان الرسمي الكامل والمبادئ الحاكمة",
        href: "/ceo-message",
      },
    ],
    tipEn:
      "The message represents the official voice of TAFAWOK Executive Leadership across both routes.",
    tipAr:
      "البيان يمثل الصوت الرسمي للقيادة التنفيذية لتفوق في كل من الصفحة الرئيسية والصفحة المخصصة.",
  },

  company: {
    titleEn: "Headquarters & Identity Coordinates",
    titleAr: "المقر الرئيسي والهوية المؤسسية",
    scopeEn:
      "Maintains legal entity naming, registration numbers, Cairo HQ geographic coordinates, official phone lines, emails, and the official corporate profile PDF portfolio downloaded site-wide.",
    scopeAr:
      "إدارة الاسم القانوني، السجل التجاري، إحداثيات المقر الرئيسي بالقاهرة، الهواتف الرسمية، والملف التعريفي المؤسسي (PDF) المتاح للتحميل عبر المنصة.",
    locations: [
      {
        pageEn: "Homepage, About, Contact & Footer",
        pageAr: "الرئيسية، من نحن، اتصل بنا، والتذييل",
        sectionEn: "Corporate Profile Download Button & Metadata",
        sectionAr: "زر تحميل الملف التعريفي المؤسسي والبيانات",
        href: "/",
      },
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn: "Headquarters Coordinates & Interactive Map",
        sectionAr: "بيانات المقر الرئيسي وخريطة الموقع التفاعلية",
        href: "/contact",
      },
      {
        pageEn: "Global Footer",
        pageAr: "تذييل الموقع (جميع الصفحات)",
        sectionEn: "Corporate Licensing, Address & Working Hours",
        sectionAr: "بيانات الترخيص، العنوان، وساعات العمل",
        href: "/#footer",
      },
    ],
    tipEn:
      "HQ coordinates and the official company profile PDF sync automatically across the Homepage, About, Contact, Footer, and SEO schema.",
    tipAr:
      "بيانات المقر والملف التعريفي تتزامن تلقائياً في الصفحة الرئيسية، من نحن، اتصل بنا، التذييل، ومحركات البحث.",
  },

  media: {
    titleEn: "Media Library & CDN Assets",
    titleAr: "مكتبة الوسائط وأصول CDN",
    scopeEn:
      "Centralized repository for uploading, previewing, and permanently deleting images, video tours, and official PDF documents from the Supabase Storage CDN bucket.",
    scopeAr:
      "مستودع مركزي لرفع واستعراض وحذف الصور، الجولات المرئية، وملفات الـ PDF المؤسسية بشكل نهائي من سحابة التخزين.",
    locations: [
      {
        pageEn: "Entire Public Platform",
        pageAr: "كافة صفحات المنصة التجارية",
        sectionEn: "Towers, Showcase Hero, Directory, and Downloads",
        sectionAr: "الأبراج التجارية، الاستعراض الرئيسي، الدليل، والتحميلات",
        href: "/",
      },
    ],
    tipEn:
      "Deleting an image or document from the bucket is permanent and will immediately affect any public pages referencing its CDN URL.",
    tipAr:
      "حذف أي صورة أو ملف من السحابة هو إجراء نهائي وسيؤثر فوراً على أي صفحة ترتبط برابط الملف.",
  },

  hse: {
    titleEn: "HSE & Governance Charter",
    titleAr: "ميثاق السلامة والصحة المهنية والجودة",
    scopeEn:
      "Controls the corporate Zero-Harm safety policy, ISO quality compliance standards, site inspection charters, and quality guarantees.",
    scopeAr:
      "التحكم في سياسة السلامة المهنية Zero-Harm، معايير الجودة الدولية ISO، ومواثيق الفحص الهندسي والرقابة.",
    locations: [
      {
        pageEn: "About Us Page",
        pageAr: "صفحة من نحن",
        sectionEn: "HSE & Commercial Quality Compliance",
        sectionAr: "ميثاق السلامة المهنية والجودة الهندسية",
        href: "/about#hse",
      },
    ],
    tipEn:
      "Guarantees that institutional clients and tenants see up-to-date compliance standards on the About page.",
    tipAr:
      "يضمن اطلاع المستثمرين والشركاء على أحدث معايير السلامة والجودة المعتمدة في صفحة من نحن.",
  },

  inquiries: {
    titleEn: "Commercial Inquiries & Tenant Leads",
    titleAr: "استفسارات المستثمرين والمستأجرين",
    scopeEn:
      "Central triage hub for reviewing, managing, and following up on commercial leasing inquiries and partnership requests sent from the public website.",
    scopeAr:
      "المركز الرئيسي لاستقبال وفرز ومتابعة طلبات استئجار المساحات التجارية واستفسارات المستثمرين الواردة من الموقع.",
    locations: [
      {
        pageEn: "Contact Us Page",
        pageAr: "صفحة التواصل",
        sectionEn: "Public Commercial Inquiry Desk Form",
        sectionAr: "نموذج التواصل وحجز المساحات التجارية",
        href: "/contact",
      },
      {
        pageEn: "Asset Detail Pages",
        pageAr: "صفحات المشروعات المستقلة",
        sectionEn: "Direct Property Leasing Inquiries",
        sectionAr: "طلبات التأجير والاستفسار عن المشروعات",
        href: "/properties/mall-chillout-el-shorouk",
      },
    ],
    tipEn:
      "Inquiries submitted by website visitors land directly here with property interest and contact details.",
    tipAr:
      "أي استفسار يرسله زوار الموقع يظهر هنا مباشرة مع بيانات التواصل والمشروع المستهدف.",
  },

  overview: {
    titleEn: "Nexus Executive Dashboard",
    titleAr: "لوحة التحكم التنفيذية الشاملة",
    scopeEn:
      "Operational cockpit providing aggregate performance metrics across commercial assets, active stores, live inquiries, and quick management links.",
    scopeAr:
      "مركز القيادة والعمليات الذي يجمع إحصائيات الأصول التجارية، المتاجر النشطة، الاستفسارات الجديدة، والروابط السريعة.",
    locations: [
      {
        pageEn: "Entire Public Platform",
        pageAr: "كامل المنصة الرقمية",
        sectionEn: "Central Data Hub for All 12 Public Modules",
        sectionAr: "مركز البيانات الشامل لجميع أقسام المنصة",
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
        title={
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

                <Link
                  href={loc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 rounded border border-border/80 bg-background px-2 py-1 text-[10.5px] font-medium text-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-primary hover:text-primary-foreground"
                  title={isArabic ? "فتح في نافذة جديدة" : "Open in new tab"}
                >
                  <span>{isArabic ? "معاينة" : "View"}</span>
                  <ArrowUpRight className="size-3" />
                </Link>
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
