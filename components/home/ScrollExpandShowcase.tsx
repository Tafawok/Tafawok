"use client"

import React from "react"
import Link from "next/link"
import { ScrollExpand } from "@/components/motion/ScrollExpand"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES, DEFAULT_HOMEPAGE_SETTINGS } from "@/content/cre-data"
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import type { HomepageSettings, Property } from "@/types/cre"

interface ScrollExpandShowcaseProps {
  showcase?: HomepageSettings["showcase"]
  properties?: Property[]
}

export function ScrollExpandShowcase({
  showcase = DEFAULT_HOMEPAGE_SETTINGS.showcase,
  properties = PROPERTIES,
}: ScrollExpandShowcaseProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  // Resolve target property for fallback and routing
  const matchedProperty = React.useMemo(() => {
    return (
      properties.find((p) => p.slug === showcase.propertySlug) ||
      properties[1] ||
      properties[0] ||
      PROPERTIES[1]
    )
  }, [properties, showcase.propertySlug])

  const targetSlug =
    showcase.propertySlug || matchedProperty?.slug || "mall-chillout-el-shorouk"
  const showcaseImage =
    showcase.imageUrl ||
    matchedProperty?.mainImage ||
    "/MallChilloutAlshrouk/IMG_5918.webp"

  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const sectionHeadline = showcase.sectionTitle
    ? t(showcase.sectionTitle)
    : isArabic
      ? "مساحات تجارية بحجم طموحك المؤسسي"
      : "Commercial Architecture at Institutional Scale"

  const sectionSubtitle = showcase.sectionSubtitle
    ? t(showcase.sectionSubtitle)
    : isArabic
      ? `مرر لفتح المشهد المعماري بالكامل واكتشاف تفاصيل صرح ${t(matchedProperty.name)} في ${t(matchedProperty.location.city)}`
      : `Scroll down to expand the stage and explore ${t(matchedProperty.name)} in ${t(matchedProperty.location.city)}`

  const badgeText = showcase.badge
    ? t(showcase.badge)
    : t(matchedProperty.location.address)
  const overlayTitle = showcase.title
    ? t(showcase.title)
    : t(matchedProperty.name)
  const overlayDesc = showcase.description
    ? t(showcase.description)
    : t(matchedProperty.description)

  const glaLabel = showcase.stats?.gla?.label
    ? t(showcase.stats.gla.label)
    : "GLA"
  const glaValue =
    showcase.stats?.gla?.value || matchedProperty.keyStats?.gla || "24,000 m²"

  const buaLabel = showcase.stats?.bua?.label
    ? t(showcase.stats.bua.label)
    : t("propertyCard.buaLabel")
  const buaValue =
    showcase.stats?.bua?.value ||
    matchedProperty.keyStats?.builtUpArea ||
    "38,500 m²"

  const parkingLabel = showcase.stats?.parking?.label
    ? t(showcase.stats.parking.label)
    : t("propertyCard.parkingLabel")
  const parkingValue =
    showcase.stats?.parking?.value ||
    (typeof matchedProperty.keyStats?.parkingCapacity === "string"
      ? matchedProperty.keyStats.parkingCapacity
      : matchedProperty.keyStats?.parkingCapacity
        ? t(matchedProperty.keyStats.parkingCapacity)
        : "450+ Vehicles")

  const ctaLabel = showcase.ctaText
    ? t(showcase.ctaText)
    : t("home.viewPropertyDetails")

  return (
    <section
      id="showcase"
      className="relative w-full scroll-mt-20 bg-background"
    >
      {/* Outer Section Header */}
      <div className="container mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-3xl text-2xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {sectionHeadline}
          </h2>

          <p className="mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm">
            {sectionSubtitle}
          </p>
        </div>
      </div>

      {/* The ScrollExpand Interactive Canvas */}
      <ScrollExpand
        src={showcaseImage}
        alt={overlayTitle}
        title={overlayTitle}
        scrollHint={t("home.scrollToExpand")}
        useWindowScroll
        startWidth={isMobile ? 86 : 52}
        startHeight={isMobile ? 54 : 64}
        startRadius={isMobile ? 18 : 28}
        endRadius={0}
        mediaZoom={1.3}
        scrollDistance={1.0}
        holdDistance={0.25}
        smoothing={0.12}
        overlayScrim={0.65}
        className="w-full"
      >
        <div className="mx-auto max-w-4xl px-3 text-center text-white sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 font-mono text-[11px] font-bold tracking-wider text-white backdrop-blur-md sm:text-xs">
            <MapPin className="size-3 shrink-0 text-primary sm:size-3.5" />
            <span>{badgeText}</span>
          </div>

          {/* Title & Narrative Frosted Dark Overlay Card */}
          <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-white/15 bg-black/60 px-5 py-4 shadow-2xl backdrop-blur-md sm:mt-5 sm:px-8 sm:py-6 md:rounded-3xl">
            <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
              {overlayTitle}
            </h3>

            <p className="mx-auto mt-2 max-w-2xl text-xs leading-relaxed text-white/90 drop-shadow-sm sm:mt-3 sm:text-base md:text-lg">
              {overlayDesc}
            </p>
          </div>

          {/* Quick Specs Matrix — 3 Col Grid on Mobile, Flex on Tablet/Desktop */}
          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md sm:rounded-2xl sm:px-5 sm:py-3">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">
                {glaLabel}
              </span>
              <span className="font-mono text-xs font-black text-white sm:text-2xl">
                <BiDiIsolate>{glaValue}</BiDiIsolate>
              </span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md sm:rounded-2xl sm:px-5 sm:py-3">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">
                {buaLabel}
              </span>
              <span className="font-mono text-xs font-black text-white sm:text-2xl">
                <BiDiIsolate>{buaValue}</BiDiIsolate>
              </span>
            </div>

            <div className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-md sm:rounded-2xl sm:px-5 sm:py-3">
              <span className="block font-mono text-[10px] text-white/70 sm:text-xs">
                {parkingLabel}
              </span>
              <span className="font-mono text-xs font-black text-white sm:text-2xl">
                <BiDiIsolate>{parkingValue}</BiDiIsolate>
              </span>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="mt-6 flex items-center justify-center gap-4 sm:mt-8">
            <Link
              href={`/properties/${targetSlug}`}
              className="cursor-target inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              <span>{ctaLabel}</span>
              <ArrowIcon className="size-4" />
            </Link>
          </div>
        </div>
      </ScrollExpand>
    </section>
  )
}
