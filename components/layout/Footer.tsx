"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  MapPin,
  Mail,
  ArrowUp,
  ArrowRight,
  ArrowLeft,
  Phone,
  MessageSquare,
} from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { useLocaleStore } from "@/stores/useLocaleStore"
import {
  COMPANY_IDENTITY,
  OWNER_DETAILS,
  PROPERTIES,
  UI_DICTIONARY,
} from "@/content/cre-data"

export function Footer() {
  const pathname = usePathname()
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (pathname?.startsWith("/nexus-portal")) {
    return null
  }

  return (
    <footer className="mt-auto w-full border-t border-border/80 bg-card text-card-foreground">
      {/* Main 4-Column Architectural Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Corporate Profile & Official Licensing */}
          <div className="space-y-4">
            <Logo />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(UI_DICTIONARY.footer.corporateDesc)}
            </p>

            <div className="space-y-1 border-s-2 border-primary/60 ps-3.5 pt-1">
              <span className="block text-[11px] font-bold text-foreground">
                {isArabic
                  ? "سجل تجاري وتصنيف مقاولات أول"
                  : "Tier-1 Licensed CRE & EPC Developer"}
              </span>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                {isArabic
                  ? "أكثر من 25 عاماً من الإنجاز وخمسة عقود من الخبرة الإقليمية."
                  : "25+ years track record backed by 5 decades of regional leadership."}
              </p>
            </div>
          </div>

          {/* Column 2: Flagship Commercial Assets */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t(UI_DICTIONARY.footer.propertiesNav)}
            </h4>
            <ul className="space-y-3">
              {PROPERTIES.map((prop) => (
                <li key={prop.id}>
                  <Link
                    href={`/properties/${prop.slug}`}
                    className="group block text-xs transition-colors"
                  >
                    <div className="font-semibold text-foreground transition-colors group-hover:text-primary">
                      {t(prop.name)}
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="shrink-0 font-mono font-medium whitespace-nowrap text-primary">
                        {prop.keyStats.gla}
                      </span>
                      <span className="text-muted-foreground/60">•</span>
                      <span className="truncate">{t(prop.category)}</span>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/properties"
                  className="group inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>
                    {isArabic
                      ? "استعراض كافة الأصول"
                      : "View All Properties Directory"}
                  </span>
                  <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate Directory */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t(UI_DICTIONARY.footer.quickLinks)}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("nav.aboutHeritage")}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("nav.properties")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ceo-message"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("nav.ceoVision")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("nav.contactRfq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Executive Leasing & Direct Reach */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-foreground uppercase">
              {t("nav.leasingDesk")}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-[11px] text-muted-foreground">
                  {t(OWNER_DETAILS.role)}
                </span>
                <span className="block font-bold text-foreground">
                  {t(OWNER_DETAILS.name)}
                </span>
              </div>

              <div className="space-y-2 border-t border-border/50 pt-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <PhoneNumber
                    phone={OWNER_DETAILS.phone}
                    showIcon={false}
                    className="font-semibold text-foreground transition-colors hover:text-primary"
                  />
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <a
                    href={`mailto:${OWNER_DETAILS.email}`}
                    className="truncate transition-colors hover:text-primary"
                  >
                    {OWNER_DETAILS.email}
                  </a>
                </div>

                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <a
                    href={COMPANY_IDENTITY.headquarters.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] leading-snug transition-colors hover:text-primary"
                  >
                    {t(COMPANY_IDENTITY.headquarters.address)}
                  </a>
                </div>
              </div>

              {/* Direct WhatsApp Reach */}
              <div className="pt-1">
                <a
                  href={`https://wa.me/${OWNER_DETAILS.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    isArabic
                      ? "مرحباً، أود الاستفسار بخصوص الأصول التجارية لشركة تفوق."
                      : "Hello, I would like to inquire regarding TAFAWOK commercial properties."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-secondary/50 px-3 py-1.5 text-[11px] font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary active:scale-95"
                >
                  <MessageSquare className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{t("nav.whatsappOwner")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Back-to-Top Bar */}
      <div className="border-t border-border/70 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
            {/* Copyright & License */}
            <div className="space-y-0.5 text-center md:text-start">
              <p>{t(UI_DICTIONARY.footer.copyright)}</p>
              <p className="text-[11px] text-muted-foreground/80">
                {t(UI_DICTIONARY.footer.licenseNote)}
              </p>
            </div>

            {/* Scroll-to-Top */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={t("nav.backToTop")}
                className="inline-flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-border/70 bg-background/50 px-3 text-xs font-semibold text-foreground transition-all hover:bg-secondary active:scale-95"
              >
                <span>{t("nav.backToTop")}</span>
                <ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
