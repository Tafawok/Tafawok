"use client"

import React, { useState } from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CORPORATE_TIMELINE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimelineMilestone } from "@/types/cre"

interface TimelineSectionProps {
  timeline?: TimelineMilestone[]
}

export function TimelineSection({
  timeline = CORPORATE_TIMELINE,
}: TimelineSectionProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const displayTimeline =
    timeline && timeline.length > 0 ? timeline : CORPORATE_TIMELINE

  const categories = [
    { id: "all", label: isRtl ? "كافة المراحل" : "Full Timeline" },
    { id: "heritage", label: isRtl ? "إرث الخليج" : "Gulf Heritage" },
    {
      id: "infrastructure",
      label: isRtl ? "المشروعات الكبرى" : "Megaprojects",
    },
    { id: "commercial", label: isRtl ? "الأصول التجارية" : "Commercial CRE" },
    { id: "expansion", label: isRtl ? "المستقبل" : "Future Horizon" },
  ]

  const filteredTimeline = displayTimeline.filter((item) => {
    if (activeCategory === "all") return true
    return item.scopeCategory === activeCategory
  })

  return (
    <section
      id="timeline"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <MotionFade direction="up" delay={0.05}>
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("about.timelineTitle")}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("about.timelineSubtitle")}
            </p>
          </MotionFade>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 active:scale-[0.98]",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Axis */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* Central Line */}
          <div className="absolute inset-s-4 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-linear-to-b from-primary/80 via-primary/30 to-transparent sm:inset-s-1/2" />

          <div className="space-y-10 sm:space-y-16">
            {filteredTimeline.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col items-start sm:flex-row sm:items-center",
                    isEven ? "sm:flex-row-reverse" : ""
                  )}
                >
                  {/* Timeline Marker Node */}
                  <div className="absolute inset-s-4 z-10 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background shadow-xs sm:inset-s-1/2">
                    <span className="size-2.5 rounded-full bg-primary" />
                  </div>

                  {/* Content Card */}
                  <div
                    className={cn(
                      "w-full ps-12 sm:w-1/2 sm:ps-0",
                      isEven ? "sm:ps-10 sm:pe-0" : "sm:ps-0 sm:pe-10"
                    )}
                  >
                    <MotionFade
                      direction={isEven ? "left" : "right"}
                      delay={0.1}
                    >
                      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md">
                        {/* Year & Scope Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 font-mono text-xs font-extrabold text-primary">
                            {item.year}
                          </span>
                          <span className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                            {t(item.badge)}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-4 text-base font-extrabold text-foreground sm:text-lg">
                          {t(item.title)}
                        </h3>

                        {/* Narrative Description */}
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {t(item.description)}
                        </p>

                        {/* Highlights checklist */}
                        <div className="mt-4 space-y-2 border-t border-border/60 pt-4">
                          {item.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2 text-xs text-foreground/90"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span>{t(highlight)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </MotionFade>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
