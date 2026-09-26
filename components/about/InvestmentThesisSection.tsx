"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CRE_INVESTMENT_THESIS } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import type { InvestmentPillar } from "@/types/cre"

interface InvestmentThesisSectionProps {
  pillars?: InvestmentPillar[]
}

export function InvestmentThesisSection({
  pillars = CRE_INVESTMENT_THESIS,
}: InvestmentThesisSectionProps) {
  const { t } = useLocaleStore()
  const displayPillars =
    pillars && pillars.length > 0 ? pillars : CRE_INVESTMENT_THESIS

  return (
    <section
      id="thesis"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <MotionFade direction="up" delay={0.05}>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("about.thesisTitle")}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("about.thesisSubtitle")}
            </p>
          </MotionFade>
        </div>

        {/* 4 Pillars of Excellence - Swiss Numbered Rows */}
        <div className="mt-12 divide-y divide-border/60">
          {displayPillars.map((pillar, idx) => (
            <MotionFade
              key={pillar.id}
              direction="up"
              delay={0.08 + idx * 0.04}
            >
              <div className="group -mx-2 grid grid-cols-1 gap-4 rounded-2xl px-2 py-6 transition-colors duration-200 hover:bg-muted/30 sm:-mx-4 sm:gap-6 sm:px-4 sm:py-8 md:grid-cols-12">
                {/* Column 1: Numeral & Metric */}
                <div className="flex items-start gap-4 md:col-span-3">
                  <span className="font-mono text-3xl font-black tracking-tighter text-primary/80">
                    {pillar.number}
                  </span>
                  <div>
                    <span className="font-mono text-sm font-bold text-primary">
                      {pillar.metric.value}
                    </span>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {t(pillar.metric.label)}
                    </div>
                  </div>
                </div>

                {/* Column 2: Title & Tagline */}
                <div className="md:col-span-4">
                  <h3 className="text-base font-extrabold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {t(pillar.title)}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-primary/90 sm:text-sm">
                    {t(pillar.tagline)}
                  </p>
                </div>

                {/* Column 3: Description Body */}
                <div className="md:col-span-5">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t(pillar.description)}
                  </p>
                </div>
              </div>
            </MotionFade>
          ))}
        </div>
      </div>
    </section>
  )
}
