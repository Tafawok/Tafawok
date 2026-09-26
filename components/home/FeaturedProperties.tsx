"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES, UI_DICTIONARY } from "@/content/cre-data"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { MotionFade } from "@/components/motion/MotionFade"
import {
  AccordionGallery,
  type AccordionGalleryItem,
} from "@/components/motion/AccordionGallery"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import {
  ArrowRight,
  ArrowLeft,
  MapPin,
  Layers,
  ArrowUpRight,
} from "lucide-react"
import type { Property } from "@/types/cre"

interface FeaturedPropertiesProps {
  properties?: Property[]
}

export function FeaturedProperties({
  properties = PROPERTIES,
}: FeaturedPropertiesProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const displayProperties =
    properties && properties.length > 0 ? properties : PROPERTIES

  const galleryItems: AccordionGalleryItem[] = useMemo(() => {
    return displayProperties.slice(0, 5).map((prop) => ({
      image: prop.mainImage,
      label: isRtl
        ? `${prop.name.ar} — ${prop.location.city.ar} (${prop.keyStats.gla})`
        : `${prop.name.en} — ${prop.location.city.en} (${prop.keyStats.gla})`,
      link: `/properties/${prop.slug}`,
      alt: t(prop.name),
    }))
  }, [displayProperties, isRtl, t])

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/70 bg-muted/20 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <MotionFade delay={0.05} direction="up" className="max-w-2xl">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {t(UI_DICTIONARY.home.portfolioTitle)}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              {t(UI_DICTIONARY.home.portfolioSubtitle)}
            </p>
          </MotionFade>

          <MotionFade delay={0.15} direction="up">
            <Link
              href="/properties"
              className={buttonVariants({
                variant: "outline",
                className:
                  "gap-2 rounded-xl border-border bg-background/80 font-semibold shadow-xs transition-all hover:border-primary hover:text-primary active:scale-[0.98]",
              })}
            >
              <span>
                {isRtl
                  ? `استعراض كافة الأصول (${displayProperties.length} مجمعات)`
                  : `View Complete Directory (${displayProperties.length} Hubs)`}
              </span>
              <ArrowIcon className="size-4" />
            </Link>
          </MotionFade>
        </div>

        {/* 1. Interactive 3D Accordion Gallery */}
        {galleryItems.length > 0 && (
          <div className="mt-12">
            <AccordionGallery
              items={galleryItems}
              defaultIndex={0}
              expandRatio={0.52}
              height={480}
              gap={12}
              radius={24}
              trigger="hover"
              accentColor="oklch(0.553 0.195 38.402)"
              grayscale={true}
            />
          </div>
        )}

        {/* 2. Flagship Quick Cards with shadcn Card Composition */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayProperties.map((property, idx) => {
            return (
              <MotionFade
                key={property.id}
                delay={0.1 * (idx + 1)}
                direction="up"
                className="flex"
              >
                <Card className="cursor-target architectural-card group relative flex w-full flex-col justify-between overflow-hidden border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-primary">
                        0{idx + 1} {"//"} {t(property.category)}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {property.keyStats.gla}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                      {t(property.name)}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0 text-primary" />
                      <span>
                        {t(property.location.address)},{" "}
                        {t(property.location.city)}
                      </span>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 py-2">
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                      {t(property.description)}
                    </p>

                    {/* Quick Specs 2-Col Grid */}
                    <div className="grid grid-cols-2 gap-2 border-y border-border/60 py-3 text-xs">
                      <div>
                        <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                          {t("propertyCard.buaLabel")}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          <BiDiIsolate>
                            {property.keyStats.builtUpArea}
                          </BiDiIsolate>
                        </span>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-muted-foreground uppercase">
                          {t("propertyCard.parkingLabel")}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          <BiDiIsolate>
                            {typeof property.keyStats.parkingCapacity ===
                            "string"
                              ? property.keyStats.parkingCapacity
                              : t(property.keyStats.parkingCapacity)}
                          </BiDiIsolate>
                        </span>
                      </div>
                    </div>

                    {/* Highlights Strip */}
                    <div className="flex flex-wrap gap-1.5">
                      {property.highlights.slice(0, 3).map((hl, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1 rounded-md bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground"
                        >
                          <Layers className="size-2.5 text-primary" />
                          <span>{t(hl)}</span>
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-3 pb-5">
                    <Link
                      href={`/properties/${property.slug}`}
                      className="group/btn inline-flex w-full items-center justify-between rounded-xl border border-border/70 bg-card px-4 py-2.5 text-xs font-bold text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.99]"
                    >
                      <span>{t("home.viewPropertyDetails")}</span>
                      <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:group-hover/btn:-translate-x-0.5" />
                    </Link>
                  </CardFooter>
                </Card>
              </MotionFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
