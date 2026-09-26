"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CEO_PROFILE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import type { CeoProfile } from "@/types/cre"

interface CeoDoctrineSectionProps {
  profile?: CeoProfile
}

export function CeoDoctrineSection({
  profile = CEO_PROFILE,
}: CeoDoctrineSectionProps) {
  const { t } = useLocaleStore()
  const activeProfile = profile || CEO_PROFILE

  return (
    <section
      id="strategic-doctrine"
      className="relative scroll-mt-20 border-b border-border/70 bg-card/30 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Unboxed Editorial */}
        <div className="max-w-3xl">
          <MotionFade direction="up" delay={0.05}>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t(activeProfile.strategicDoctrine.title)}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t(activeProfile.strategicDoctrine.subtitle)}
            </p>
          </MotionFade>
        </div>

        {/* 3 Pillars - Swiss Editorial Numbered Rows */}
        <div className="mt-12 divide-y divide-border/60 sm:mt-16">
          {activeProfile.strategicDoctrine.pillars.map((pillar, idx) => (
            <MotionFade
              key={pillar.number}
              direction="up"
              delay={0.08 + idx * 0.04}
            >
              <div className="group -mx-2 grid grid-cols-1 gap-4 rounded-2xl px-2 py-6 transition-colors duration-200 hover:bg-muted/30 sm:-mx-4 sm:gap-6 sm:px-4 sm:py-8 md:grid-cols-12">
                {/* Column 1: Large Numeral */}
                <div className="flex items-start gap-4 md:col-span-3">
                  <span className="font-mono text-3xl font-black tracking-tighter text-primary/80 sm:text-4xl">
                    {pillar.number}
                  </span>
                </div>

                {/* Column 2: Title */}
                <div className="md:col-span-4">
                  <h3 className="text-base font-extrabold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {t(pillar.title)}
                  </h3>
                </div>

                {/* Column 3: Narrative Description */}
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
