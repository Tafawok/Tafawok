"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { AboutHeroSection } from "@/components/about/AboutHeroSection"
import { TimelineSection } from "@/components/about/TimelineSection"
import { InvestmentThesisSection } from "@/components/about/InvestmentThesisSection"
import { CorporateValuesSection } from "@/components/about/CorporateValuesSection"
import { HseSection } from "@/components/about/HseSection"
import { AboutCtaSection } from "@/components/about/AboutCtaSection"
import type {
  CorporateMetric,
  TimelineMilestone,
  InvestmentPillar,
  CorporateValue,
  HseCharter,
  OwnerContact,
} from "@/types/cre"

interface AboutUsClientProps {
  metrics?: CorporateMetric[]
  timeline?: TimelineMilestone[]
  pillars?: InvestmentPillar[]
  values?: CorporateValue[]
  hseCharter?: HseCharter
  ownerDetails?: OwnerContact
}

export function AboutUsClient({
  metrics,
  timeline,
  pillars,
  values,
  hseCharter,
  ownerDetails,
}: AboutUsClientProps) {
  const { locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const aboutChapters = [
    { id: "heritage", label: isRtl ? "نبذة عن الشركة" : "Heritage" },
    { id: "timeline", label: isRtl ? "المسيرة التاريخية" : "Timeline" },
    { id: "thesis", label: isRtl ? "فلسفة الاستثمار" : "Investment Thesis" },
    { id: "values", label: isRtl ? "القيم المؤسسية" : "Corporate Values" },
    { id: "hse", label: isRtl ? "ميثاق السلامة" : "Safety Charter" },
    { id: "outreach", label: isRtl ? "التواصل والشراكات" : "Partnerships" },
  ]

  return (
    <div className="relative flex flex-col">
      <PageLineSidebar items={aboutChapters} />
      <AboutHeroSection metrics={metrics} />
      <TimelineSection timeline={timeline} />
      <InvestmentThesisSection pillars={pillars} />
      <CorporateValuesSection values={values} />
      <HseSection hseCharter={hseCharter} />
      <AboutCtaSection ownerDetails={ownerDetails} />
    </div>
  )
}
