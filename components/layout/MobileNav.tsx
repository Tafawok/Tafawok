"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  Building2,
  ShoppingBag,
  Store,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { useUiStore } from "@/stores/useUiStore"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { Logo } from "@/components/layout/Logo"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { PROPERTIES, OWNER_DETAILS, COMPANY_IDENTITY } from "@/content/cre-data"
import { cn } from "@/lib/utils"
import type { Property, OwnerContact, CompanyIdentity } from "@/types/cre"

const PROPERTY_ICONS: Record<string, React.ElementType> = {
  "fagala-plaza": ShoppingBag,
  "mall-chillout-el-shorouk": Building2,
  "october-festival-mall": Store,
}

interface MobileNavProps {
  properties?: Property[]
  ownerDetails?: OwnerContact
  identity?: CompanyIdentity
}

export function MobileNav({
  properties = PROPERTIES,
  ownerDetails = OWNER_DETAILS,
  identity = COMPANY_IDENTITY,
}: MobileNavProps) {
  const pathname = usePathname()
  const { mobileNavOpen, setMobileNavOpen } = useUiStore()
  const { locale, t } = useLocaleStore()
  const [propertiesExpanded, setPropertiesExpanded] = React.useState(true)
  const isArabic = locale === "ar"

  const displayProperties =
    properties && properties.length > 0 ? properties : PROPERTIES
  const details = ownerDetails || OWNER_DETAILS
  const activeIdentity = identity || COMPANY_IDENTITY

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight
  const close = () => setMobileNavOpen(false)

  return (
    <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetContent
        side={isArabic ? "right" : "left"}
        showCloseButton={false}
        className="flex h-full w-[90vw] flex-col gap-0 border-border/80 bg-background p-0 shadow-2xl sm:max-w-md"
      >
        {/* Accessible screen reader header */}
        <SheetHeader className="sr-only">
          <SheetTitle>{t("nav.mainNav")}</SheetTitle>
          <SheetDescription>{t("nav.navDesc")}</SheetDescription>
        </SheetHeader>

        {/* Top Header Bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-border/70 p-4 sm:px-6">
          <Logo onClick={close} />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6 sm:px-6">
          {/* Main Links */}
          <nav className="space-y-1">
            <Link
              href="/"
              onClick={close}
              className={cn(
                "block rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors",
                pathname === "/"
                  ? "bg-secondary font-bold text-foreground"
                  : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {t("nav.home")}
            </Link>

            <Link
              href="/about"
              onClick={close}
              className={cn(
                "block rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors",
                pathname === "/about"
                  ? "bg-secondary font-bold text-foreground"
                  : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {t("nav.aboutHeritage")}
            </Link>

            {/* Commercial Assets Section using shadcn Collapsible */}
            <Collapsible
              open={propertiesExpanded}
              onOpenChange={setPropertiesExpanded}
              className="py-1"
            >
              <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary/60">
                <span>{t("nav.properties")}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-200",
                    propertiesExpanded && "rotate-180 text-foreground"
                  )}
                />
              </CollapsibleTrigger>

              <CollapsibleContent className="ms-3.5 mt-1 space-y-1 border-s-2 border-border/60 ps-3">
                {displayProperties.map((prop) => {
                  const Icon = PROPERTY_ICONS[prop.slug] || Building2
                  const isActive = pathname === `/properties/${prop.slug}`
                  return (
                    <Link
                      key={prop.id}
                      href={`/properties/${prop.slug}`}
                      onClick={close}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors",
                        isActive
                          ? "bg-secondary/80 font-bold text-foreground"
                          : "text-foreground/75 hover:bg-secondary/50 hover:text-foreground"
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">{t(prop.name)}</span>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                        {prop.keyStats.gla}
                      </span>
                    </Link>
                  )
                })}
                <Link
                  href="/properties"
                  onClick={close}
                  className="inline-flex items-center gap-1.5 ps-3 pt-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>
                    {isArabic
                      ? "استعراض كافة الأصول"
                      : "View All Assets Directory"}
                  </span>
                  <ArrowIcon className="h-3 w-3" />
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Link
              href="/ceo-message"
              onClick={close}
              className={cn(
                "block rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors",
                pathname === "/ceo-message"
                  ? "bg-secondary font-bold text-foreground"
                  : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {t("nav.ceoVision")}
            </Link>

            <Link
              href="/contact"
              onClick={close}
              className={cn(
                "block rounded-lg px-3.5 py-2.5 text-base font-medium transition-colors",
                pathname === "/contact"
                  ? "bg-secondary font-bold text-foreground"
                  : "text-foreground/80 hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {t("nav.contactRfq")}
            </Link>
          </nav>

          <Separator />

          {/* Executive Contact Coordinates */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {t("nav.leasingDesk")}
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-foreground">
                  {t(details.name)}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {t(details.role)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5 shrink-0 text-primary" />
                <PhoneNumber
                  phone={details.phone}
                  showIcon={false}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                />
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3.5 w-3.5 shrink-0 text-primary" />
                <a
                  href={`mailto:${details.email}`}
                  className="truncate text-foreground transition-colors hover:text-primary"
                >
                  {details.email}
                </a>
              </div>

              <div className="flex items-start gap-2 pt-0.5 text-muted-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-[11px] leading-relaxed">
                  {t(activeIdentity.headquarters.address)}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Reach */}
            <div className="pt-1">
              <a
                href={`https://wa.me/${details.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  isArabic
                    ? "مرحباً، أود الاستفسار بخصوص الأصول التجارية لشركة تفوق."
                    : "Hello, I would like to inquire regarding TAFAWOK commercial properties."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border/80 bg-secondary/40 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary active:scale-[0.98]"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t("nav.whatsappOwner")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sheet Footer CTA */}
        <div className="shrink-0 border-t border-border/70 bg-card p-4 sm:px-6">
          <Link
            href="/contact"
            onClick={close}
            className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <span>{t("nav.submitInquiry")}</span>
            <ArrowIcon className="h-3.5 w-3.5 opacity-90" />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
