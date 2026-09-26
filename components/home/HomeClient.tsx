"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { HeroSection } from "@/components/home/HeroSection"
import { MetricsSection } from "@/components/home/MetricsSection"
import { ScrollExpandShowcase } from "@/components/home/ScrollExpandShowcase"
import { FeaturedProperties } from "@/components/home/FeaturedProperties"
import { CeoQuoteSection } from "@/components/home/CeoQuoteSection"
import { ParallaxScrollBands } from "@/components/motion/ParallaxScrollBands"
import { ClientMarquee } from "@/components/home/ClientMarquee"
import type {
  HomepageSettings,
  CorporateMetric,
  Property,
  OwnerContact,
  ClientPartner,
} from "@/types/cre"

interface HomeClientProps {
  homepageSettings?: HomepageSettings
  metrics?: CorporateMetric[]
  properties?: Property[]
  ownerDetails?: OwnerContact
  partners?: ClientPartner[]
}

export function HomeClient({
  homepageSettings,
  metrics,
  properties,
  ownerDetails,
  partners,
}: HomeClientProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const homeChapters = [
    { id: "hero", label: isRtl ? "الرئيسية" : "Overview" },
    { id: "metrics", label: isRtl ? "المؤشرات" : "Metrics" },
    { id: "showcase", label: isRtl ? "الأصول" : "Showcase" },
    { id: "portfolio", label: isRtl ? "المشروعات" : "Portfolio" },
    { id: "leadership", label: isRtl ? "القيادة" : "Leadership" },
    { id: "partners", label: isRtl ? "الشركاء" : "Partners" },
  ]

  return (
    <div className="relative flex w-full flex-col">
      <PageLineSidebar items={homeChapters} />
      <HeroSection hero={homepageSettings?.hero} />
      <MetricsSection metrics={metrics} />
      <ScrollExpandShowcase
        showcase={homepageSettings?.showcase}
        properties={properties}
      />
      <FeaturedProperties properties={properties} />
      <CeoQuoteSection ownerDetails={ownerDetails} />
      <ParallaxScrollBands />
      <ClientMarquee partners={partners} />
    </div>
  )
}
