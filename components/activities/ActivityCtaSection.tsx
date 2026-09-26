"use client"

import React from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { OWNER_DETAILS } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Phone, CalendarPlus } from "lucide-react"
import type { OwnerContact } from "@/types/cre"

interface ActivityCtaSectionProps {
  ownerDetails?: OwnerContact
}

export function ActivityCtaSection({
  ownerDetails = OWNER_DETAILS,
}: ActivityCtaSectionProps) {
  const { locale, t } = useLocaleStore()
  const isRtl = locale === "ar"

  const details = ownerDetails || OWNER_DETAILS
  const cleanPhone = details.phone.replace(/[^+\d]/g, "")

  return (
    <section
      id="activities-cta"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionFade direction="up" delay={0.05}>
          <div className="text-center">
            <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {t("activities.ctaTitle")}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("activities.ctaSubtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`tel:${cleanPhone}`}
                className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto"
              >
                <Phone className="size-4 rtl:-scale-x-100" />
                <span>{isRtl ? "اتصل بإدارة الفعاليات" : "Call Event Coordinators"}</span>
              </a>

              <Link
                href="/contact"
                className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-6 py-3.5 text-sm font-bold text-foreground transition-all hover:border-primary/50 hover:bg-secondary/40 active:scale-[0.98] sm:w-auto"
              >
                <CalendarPlus className="size-4 text-primary" />
                <span>{t("activities.ctaContactBtn")}</span>
              </Link>
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
