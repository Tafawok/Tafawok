"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { CEO_PROFILE } from "@/content/cre-data"
import { MotionFade } from "@/components/motion/MotionFade"
import { Separator } from "@/components/ui/separator"
import { Quote } from "lucide-react"
import type { CeoProfile } from "@/types/cre"

interface CeoAddressSectionProps {
  profile?: CeoProfile
}

export function CeoAddressSection({
  profile = CEO_PROFILE,
}: CeoAddressSectionProps) {
  const { t } = useLocaleStore()
  const activeProfile = profile || CEO_PROFILE

  return (
    <section
      id="formal-address"
      className="relative scroll-mt-20 border-b border-border/70 py-16 sm:py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <MotionFade direction="up" delay={0.05}>
          <div className="flex items-center justify-end pb-4">
            <Quote className="size-6 rotate-180 text-primary/40" />
          </div>

          <Separator className="opacity-70" />

          {/* Salutation */}
          <div className="mt-8 text-base font-extrabold text-foreground sm:text-lg">
            {t(activeProfile.formalAddress.salutation)}
          </div>

          {/* Opening Thesis */}
          <div className="my-6 rounded-e-xl border-s-3 border-primary bg-muted/20 py-4 ps-6 pe-5">
            <blockquote className="text-base leading-relaxed font-bold text-foreground italic sm:text-lg">
              &ldquo;{t(activeProfile.formalAddress.opening)}&rdquo;
            </blockquote>
          </div>

          {/* Paragraphs */}
          <div className="mt-6 space-y-5 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
            {activeProfile.formalAddress.paragraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {t(para)}
              </p>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-foreground sm:text-base">
              {t(activeProfile.formalAddress.closing)}
            </p>
          </div>

          <Separator className="mt-8 opacity-70" />

          {/* Signature & Title Block (Typographic, No Avatar) */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="text-base font-black text-foreground sm:text-lg">
                {t(activeProfile.name)}
              </div>
              <div className="text-xs font-semibold text-primary">
                {t(activeProfile.role)}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {t(activeProfile.company)}
              </div>
            </div>

            <div className="rounded border border-border/80 px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
              {activeProfile.experienceYears}+ {t("ceoMessage.experienceYears")}
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  )
}
