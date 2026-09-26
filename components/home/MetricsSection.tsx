"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CORPORATE_METRICS } from "@/content/cre-data"
import { CounterTicker } from "@/components/motion/CounterTicker"
import { MotionFade } from "@/components/motion/MotionFade"
import { Separator } from "@/components/ui/separator"
import type { CorporateMetric } from "@/types/cre"

interface MetricsSectionProps {
  metrics?: CorporateMetric[]
}

export function MetricsSection({
  metrics = CORPORATE_METRICS,
}: MetricsSectionProps) {
  const { t } = useLocaleStore()
  const displayMetrics =
    metrics && metrics.length > 0 ? metrics : CORPORATE_METRICS

  return (
    <section
      id="metrics"
      className="relative scroll-mt-20 border-b border-border/70 bg-card/30 py-12 md:py-16"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Plain Text Minimalist Metrics Strip with Vertical Separators */}
        <div className="flex flex-col divide-y divide-border/60 py-2 md:flex-row md:items-stretch md:divide-y-0">
          {displayMetrics.map((metric, index) => (
            <React.Fragment key={index}>
              <MotionFade
                delay={0.06 + index * 0.04}
                direction="up"
                className="flex-1 py-5 text-start first:ps-0 last:pe-0 md:px-8 md:py-0"
              >
                <div className="flex flex-col justify-start">
                  <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {t(metric.label)}
                  </span>
                  <p className="mt-1.5 text-2xl font-black text-foreground tabular-nums sm:text-3xl lg:text-4xl">
                    <CounterTicker
                      value={metric.value}
                      suffix={metric.suffix}
                      suffixClassName="text-primary font-bold"
                    />
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t(metric.description)}
                  </p>
                </div>
              </MotionFade>

              {index < displayMetrics.length - 1 && (
                <div
                  className="hidden items-stretch self-stretch py-2 md:flex"
                  aria-hidden="true"
                >
                  <Separator
                    orientation="vertical"
                    className="h-full w-px bg-border/70"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
