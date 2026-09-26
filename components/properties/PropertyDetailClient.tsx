"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { Property, PropertyType } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PropertyGallery } from "@/components/properties/PropertyGallery"
import { PropertySpecs } from "@/components/properties/PropertySpecs"
import { StoreDirectory } from "@/components/properties/StoreDirectory"
import { PropertyMap } from "@/components/properties/PropertyMap"
import { PropertyLeasingCard } from "@/components/properties/PropertyLeasingCard"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { MotionFade } from "@/components/motion/MotionFade"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

interface PropertyDetailClientProps {
  property: Property
}

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const propType: PropertyType = property.type || "office"

  const chapters = useMemo(() => {
    const list = [
      { id: "property-overview", label: isRtl ? "نظرة عامة" : "Overview" },
      { id: "property-specs", label: isRtl ? "المواصفات" : "Technical Specs" },
    ]
    if (property.stores && property.stores.length > 0) {
      list.push({
        id: "property-directory",
        label: isRtl ? "دليل المستأجرين" : "Tenants",
      })
    }
    list.push(
      { id: "property-location", label: isRtl ? "الموقع" : "Location" },
      { id: "property-leasing", label: isRtl ? "مكتب التأجير" : "Leasing" }
    )
    return list
  }, [isRtl, property.stores])

  const typeLabels: Record<PropertyType, { en: string; ar: string }> = {
    office: { en: "Corporate Office Hub", ar: "مجمع إداري للشركات" },
    retail: { en: "Destination Retail Mall", ar: "مركز تجاري ومول" },
    logistics: { en: "Logistics & Trade Complex", ar: "مجمع لوجستي وتجاري" },
  }

  const cleanPhone = property.contact.phone.replace(/[^+\d]/g, "")

  return (
    <div className="flex flex-col">
      <PageLineSidebar
        items={chapters}
        title={isRtl ? "تصفح العقار" : "Property"}
      />

      {/* Property Hero: Architectural Monograph Header */}
      <section
        id="property-overview"
        className="relative scroll-mt-20 overflow-hidden border-b border-border/80 bg-background pt-8 pb-14 sm:pt-12 sm:pb-16"
      >
        <div className="container mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  {t("nav.home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/properties" />}>
                  {t("nav.properties")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-50 truncate sm:max-w-none">
                  {t(property.name)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Unified Cinematic Hero Gallery */}
          <MotionFade direction="up" delay={0.05}>
            <PropertyGallery property={property} showHeading={false} />
          </MotionFade>

          {/* Architectural Monograph Title, Narrative & Specs */}
          <MotionFade direction="up" delay={0.15}>
            <div className="space-y-6">
              {/* Classification metadata line */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <span className="text-primary">{t(typeLabels[propType])}</span>
                <span>•</span>
                <span>{t(property.keyStats.zoning)}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                  {t(property.name)}
                </h1>
                <p className="mt-2 text-base font-medium text-primary sm:text-lg">
                  {t(property.tagline)}
                </p>
              </div>

              {/* Narrative Editorial Description */}
              <p className="max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(property.description)}
              </p>

              {/* Location with MapPin */}
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{t(property.location.address)}</span>
              </div>

              {/* Minimalist Editorial Architectural Stat Ribbon */}
              <div className="pt-4">
                <div className="grid grid-cols-2 divide-y divide-border/50 rounded-xl border border-border/70 bg-card/50 backdrop-blur-xs sm:grid-cols-4 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
                  <div className="p-4 text-start">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase">
                      {t("propertyDetail.usableGlaLabel")}
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground tabular-nums sm:text-lg">
                      <BiDiIsolate>{property.keyStats.gla}</BiDiIsolate>
                    </p>
                  </div>

                  <div className="p-4 text-start">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase">
                      {t("propertyDetail.elevationLabel")}
                    </span>
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <p className="mt-1 truncate text-xs font-bold text-foreground sm:text-sm cursor-default">
                            {t(property.keyStats.floors)}
                          </p>
                        }
                      />
                      <TooltipContent side="top">
                        {t(property.keyStats.floors)}
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <div className="p-4 text-start">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase">
                      {t("propertyDetail.parkingSlotsLabel")}
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground tabular-nums sm:text-lg">
                      <BiDiIsolate>
                        {t(property.keyStats.parkingCapacity)}
                      </BiDiIsolate>
                    </p>
                  </div>

                  <div className="p-4 text-start">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase">
                      {t("propertyDetail.builtUpAreaLabel")}
                    </span>
                    <p className="mt-1 text-base font-bold text-foreground tabular-nums sm:text-lg">
                      <BiDiIsolate>{property.keyStats.builtUpArea}</BiDiIsolate>
                    </p>
                  </div>
                </div>
              </div>

              {/* Discreet Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/contact?property=${property.slug}`}
                  className="cursor-target inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <span>{t("propertyDetail.inquireLease")}</span>
                </Link>

                <a
                  href={`tel:${cleanPhone}`}
                  className="cursor-target inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background px-5 py-3 text-xs font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Phone className="size-3.5 text-primary rtl:-scale-x-100" />
                  <span>{t("propertyDetail.callNow")}</span>
                </a>

                {property.location.googleMapsDirectUrl && (
                  <a
                    href={property.location.googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/40 px-5 py-3 text-xs font-semibold text-muted-foreground transition-all hover:border-border hover:text-foreground"
                  >
                    <MapPin className="size-3.5 text-primary" />
                    <span>{t("propertyDetail.getDirections")}</span>
                  </a>
                )}
              </div>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Main Detail Content Sections */}
      <div className="py-14 sm:py-20">
        <div className="container mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {/* Section 1: Architectural & Engineering Specs */}
          <section id="property-specs" className="scroll-mt-20">
            <MotionFade direction="up">
              <PropertySpecs property={property} />
            </MotionFade>
          </section>

          {/* Section 2: Stores & Tenants Directory (if applicable) */}
          {property.stores && property.stores.length > 0 && (
            <section id="property-directory" className="scroll-mt-20">
              <MotionFade direction="up">
                <StoreDirectory property={property} />
              </MotionFade>
            </section>
          )}

          {/* Section 3: Location & Arterial Accessibility */}
          <section id="property-location" className="scroll-mt-20">
            <MotionFade direction="up">
              <PropertyMap property={property} />
            </MotionFade>
          </section>

          {/* Section 4: Commercial Leasing & Executive Stewardship */}
          <section id="property-leasing" className="scroll-mt-20">
            <MotionFade direction="up">
              <PropertyLeasingCard property={property} />
            </MotionFade>
          </section>
        </div>
      </div>
    </div>
  )
}
