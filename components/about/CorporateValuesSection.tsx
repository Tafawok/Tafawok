"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CORPORATE_VALUES } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import {
  Users,
  ShieldCheck,
  Eye,
  Award,
  Landmark,
  Compass,
  HardHat,
} from "lucide-react"

import type { CorporateValue } from "@/types/cre"

const valueIconMap: Record<string, React.ElementType> = {
  users: Users,
  "shield-check": ShieldCheck,
  eye: Eye,
  award: Award,
  landmark: Landmark,
  compass: Compass,
  "hard-hat": HardHat,
}

interface CorporateValuesSectionProps {
  values?: CorporateValue[]
}

export function CorporateValuesSection({
  values = CORPORATE_VALUES,
}: CorporateValuesSectionProps) {
  const { t } = useLocaleStore()
  const displayValues = values && values.length > 0 ? values : CORPORATE_VALUES

  return (
    <section
      id="values"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header - Unboxed Editorial */}
        <div className="max-w-3xl">
          <MotionFade direction="up" delay={0.05}>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("about.valuesTitle")}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("about.valuesSubtitle")}
            </p>
          </MotionFade>
        </div>

        {/* Swiss Editorial Numbered Rows */}
        <div className="mt-12 divide-y divide-border/60 sm:mt-16">
          {displayValues.map((val, idx) => {
            const Icon = valueIconMap[val.iconName] || Award

            return (
              <MotionFade key={val.id} direction="up" delay={0.06 + idx * 0.03}>
                <div className="group -mx-2 grid grid-cols-1 gap-4 rounded-2xl px-2 py-6 transition-colors duration-200 hover:bg-muted/30 sm:-mx-4 sm:gap-6 sm:px-4 sm:py-8 md:grid-cols-12">
                  {/* Column 1: Numeral & Icon */}
                  <div className="flex items-start gap-4 md:col-span-3">
                    <span className="font-mono text-2xl font-black tracking-tighter text-primary/80 sm:text-3xl">
                      {val.number}
                    </span>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-4.5" />
                    </div>
                  </div>

                  {/* Column 2: Title & Tagline */}
                  <div className="md:col-span-4">
                    <h3 className="text-base font-extrabold text-foreground transition-colors group-hover:text-primary sm:text-lg">
                      {t(val.title)}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary/90 sm:text-sm">
                      {t(val.tagline)}
                    </p>
                  </div>

                  {/* Column 3: Rich Narrative Body */}
                  <div className="md:col-span-5">
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {t(val.description)}
                    </p>
                  </div>
                </div>
              </MotionFade>
            )
          })}
        </div>
      </div>
    </section>
  )
}
