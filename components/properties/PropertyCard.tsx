"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Building2, Car, MapPin } from "lucide-react"
import { Property, PropertyType } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

interface PropertyCardProps {
  property: Property
  className?: string
  priority?: boolean
}

export function PropertyCard({
  property,
  className,
  priority = false,
}: PropertyCardProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const propType: PropertyType = property.type || "office"

  const typeLabels: Record<PropertyType, { en: string; ar: string }> = {
    office: { en: "Corporate Office Hub", ar: "مجمع إداري للشركات" },
    retail: { en: "Destination Retail Mall", ar: "مركز تجاري ومول" },
    logistics: { en: "Logistics & Trade Complex", ar: "مجمع لوجستي وتجاري" },
  }

  return (
    <Link
      href={`/properties/${property.slug}`}
      className={cn(
        "cursor-target group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:border-primary/60 hover:shadow-xl dark:bg-card/90",
        className
      )}
    >
      {/* Visual Asset Container */}
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-muted">
        <Image
          src={property.mainImage}
          alt={t(property.name)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />

        {/* Floating Architectural Tags */}
        <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-md">
            <span className="me-1.5 size-1.5 rounded-full bg-primary" />
            {t(typeLabels[propType])}
          </span>
          <span className="inline-flex items-center rounded-md border border-border/60 bg-background/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground backdrop-blur-md">
            <BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate>
          </span>
        </div>

        {/* Location chip pinned over bottom of image */}
        <div className="absolute inset-x-3.5 bottom-2.5 flex items-center gap-1.5 text-xs font-medium text-foreground/90 drop-shadow-xs">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{t(property.location.address)}</span>
        </div>
      </div>

      {/* Card Body — Balanced, Tight, Architectural Spacing */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {/* Upper Editorial Content */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {t(property.name)}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs font-medium text-primary/90">
            {t(property.tagline)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {t(property.description)}
          </p>
        </div>

        {/* Bottom Section: Specs Matrix & Footer */}
        <div className="mt-4 pt-3.5 border-t border-border/60">
          {/* Architectural Specs Summary */}
          <div className="grid grid-cols-3 gap-1 rounded-lg border border-border/50 bg-muted/25 py-2 px-1 text-center">
            <div className="flex min-w-0 flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isArabic ? "المساحة التأجيرية" : "GLA"}
              </span>
              <span className="mt-0.5 font-mono text-xs font-bold text-foreground">
                <BiDiIsolate>{property.keyStats.gla}</BiDiIsolate>
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center border-x border-border/40 px-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {t("propertyCard.floorsLabel")}
              </span>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="mt-0.5 max-w-full truncate text-xs font-semibold text-foreground cursor-default">
                      {t(property.keyStats.floors)}
                    </span>
                  }
                />
                <TooltipContent side="top">
                  {t(property.keyStats.floors)}
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex min-w-0 flex-col items-center">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {isArabic ? "المساحة الإجمالية" : "BUA"}
              </span>
              <span className="mt-0.5 font-mono text-xs font-bold text-foreground">
                <BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate>
              </span>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Car className="size-3.5 text-muted-foreground/80" />
                <BiDiIsolate>{t(property.keyStats.parkingCapacity)}</BiDiIsolate>
              </span>
              {property.stores && (
                <span className="inline-flex items-center gap-1">
                  <Building2 className="size-3.5 text-muted-foreground/80" />
                  <span>
                    {property.stores.length} {t("propertiesPage.tenantsCount")}
                  </span>
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              <span>{t("propertiesPage.viewAsset")}</span>
              <ArrowIcon className="size-3.5 shrink-0" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
