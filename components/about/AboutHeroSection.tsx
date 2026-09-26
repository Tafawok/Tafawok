"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CORPORATE_METRICS } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { CounterTicker } from "@/components/motion/CounterTicker"
import { Separator } from "@/components/ui/separator"
import { DownloadProfileButton } from "@/components/shared/DownloadProfileButton"
import type { CorporateMetric } from "@/types/cre"

interface AboutHeroSectionProps {
  metrics?: CorporateMetric[]
}

export function AboutHeroSection({
  metrics = CORPORATE_METRICS,
}: AboutHeroSectionProps) {
  const { t } = useLocaleStore()
  const displayMetrics =
    metrics && metrics.length > 0 ? metrics : CORPORATE_METRICS

  return (
    <section
      id="heritage"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/70 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32"
    >
      {/* Background radial dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <MotionFade direction="up" delay={0.05}>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {t("about.title")}
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {t("about.subtitle")}
            </p>

            <div className="mt-8 flex justify-center">
              <DownloadProfileButton variant="about" />
            </div>
          </MotionFade>
        </div>

        {/* Corporate Metrics - Plain Text with Vertical Separator */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <MotionFade direction="up" delay={0.15}>
            <div className="flex flex-col divide-y divide-border/60 md:flex-row md:items-stretch md:divide-y-0">
              {displayMetrics.map((metric, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex-1 py-6 text-start first:ps-0 last:pe-0 md:px-8 md:py-2">
                    <div className="text-3xl font-extrabold text-foreground tabular-nums sm:text-4xl lg:text-5xl">
                      <CounterTicker
                        value={metric.value}
                        suffix={metric.suffix}
                      />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-foreground">
                      {t(metric.label)}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {t(metric.description)}
                    </p>
                  </div>

                  {idx < CORPORATE_METRICS.length - 1 && (
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
          </MotionFade>
        </div>
      </div>
    </section>
  )
}
