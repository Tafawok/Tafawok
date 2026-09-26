"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Building2,
  ShoppingBag,
  Store,
  Phone,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { PROPERTIES } from "@/content/cre-data"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PhoneNumber } from "@/components/shared/PhoneNumber"
import { cn } from "@/lib/utils"
import type { Property } from "@/types/cre"

interface PropertyDropdownProps {
  className?: string
  properties?: Property[]
  onItemClick?: () => void
}

const PROPERTY_ICONS: Record<string, React.ElementType> = {
  "fagala-plaza": ShoppingBag,
  "mall-chillout-el-shorouk": Building2,
  "october-festival-mall": Store,
}

export function PropertyDropdown({
  className,
  properties = PROPERTIES,
  onItemClick,
}: PropertyDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const displayProperties =
    properties && properties.length > 0 ? properties : PROPERTIES
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const handleLinkClick = () => {
    setOpen(false)
    onItemClick?.()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 select-none hover:bg-secondary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none xl:px-3.5 xl:text-sm",
          open
            ? "bg-secondary/80 font-semibold text-foreground"
            : "text-foreground/75",
          className
        )}
      >
        <span>{t("nav.properties")}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ease-out",
            open && "rotate-180 text-foreground"
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="center"
        sideOffset={8}
        className="w-[92vw] max-w-155 overflow-hidden rounded-2xl border border-border bg-background p-4 text-foreground shadow-2xl sm:w-145"
      >
        {/* Header summary */}
        <div className="mb-2 flex items-center justify-between border-b border-border/50 px-2 py-1.5">
          <div>
            <span className="text-xs font-semibold tracking-wider text-primary uppercase">
              {t("propertyDropdown.title")}
            </span>
            <p className="text-[11px] text-muted-foreground">
              {t("propertyDropdown.subtitle")}
            </p>
          </div>
          <Link
            href="/properties"
            onClick={handleLinkClick}
            className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>{t("propertyDropdown.viewAll")}</span>
            <ArrowIcon className="h-3 w-3 transition-transform duration-150 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>

        {/* Flagship Properties List */}
        <div className="space-y-1.5">
          {displayProperties.map((prop) => {
            const Icon = PROPERTY_ICONS[prop.slug] || Building2
            return (
              <Link
                key={prop.id}
                href={`/properties/${prop.slug}`}
                onClick={handleLinkClick}
                className="group flex cursor-pointer items-start gap-3 rounded-xl border border-transparent p-2.5 transition-all duration-150 hover:border-border/60 hover:bg-secondary/70"
              >
                {/* Thumbnail Image */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted">
                  <Image
                    src={prop.mainImage}
                    alt={t(prop.name)}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-s-1 bottom-1 text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                      {t(prop.name)}
                    </h4>
                    <span className="font-mono text-[11px] font-semibold text-primary">
                      {prop.keyStats.gla}
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                    {t(prop.tagline)}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] font-medium text-muted-foreground/80">
                    <span>{t(prop.category)}</span>
                    <span>•</span>
                    <span>{t(prop.location.city)}</span>
                    <span>•</span>
                    <span className="font-mono font-medium text-foreground">
                      {t("propertyCard.buaLabel")}: {prop.keyStats.builtUpArea}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <Separator className="my-2" />

        {/* Bottom Fast Action Bar */}
        <div className="flex flex-col items-center justify-between gap-2 px-1 pt-1 text-xs sm:flex-row">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Phone className="phone-icon h-3 w-3 text-primary" />
            <span>{t("propertyDropdown.leasingDesk")}</span>
            <PhoneNumber
              phone="+20 110 042 4829"
              showIcon={false}
              className="font-semibold text-foreground hover:text-primary"
            />
          </div>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            <span>{t("propertyDropdown.scheduleTour")}</span>
            <ArrowIcon className="h-3 w-3" />
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
