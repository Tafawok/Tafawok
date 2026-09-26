"use client"

import { useLocaleStore } from "@/stores/useLocaleStore"
import { CLIENT_PARTNERS, UI_DICTIONARY } from "@/content/cre-data"
import { Marquee } from "@/components/motion/Marquee"
import { MotionFade } from "@/components/motion/MotionFade"
import { Building2, Flame, Wrench, Factory } from "lucide-react"
import type { ClientPartner } from "@/types/cre"

interface ClientMarqueeProps {
  partners?: ClientPartner[]
}

export function ClientMarquee({
  partners = CLIENT_PARTNERS,
}: ClientMarqueeProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"
  const displayPartners =
    partners && partners.length > 0 ? partners : CLIENT_PARTNERS

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "energy":
        return isRtl ? "طاقة وبترول" : "Energy & Petrochemicals"
      case "epc":
        return isRtl ? "مقاولات كبرى" : "Tier-1 EPC Contracting"
      case "commercial":
        return isRtl ? "سلاسل تجزئة كبرى" : "Anchor Commercial Retail"
      case "manufacturer":
        return isRtl ? "مصنّع ومورد عالمي" : "Industrial Manufacturer"
      default:
        return category
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "energy":
        return <Flame className="size-3.5 text-primary" />
      case "epc":
        return <Wrench className="size-3.5 text-primary" />
      case "commercial":
        return <Building2 className="size-3.5 text-primary" />
      case "manufacturer":
      default:
        return <Factory className="size-3.5 text-primary" />
    }
  }

  return (
    <section
      id="partners"
      className="relative scroll-mt-20 border-b border-border/70 bg-card/50 py-16 md:py-24"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionFade
          delay={0.05}
          direction="up"
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t(UI_DICTIONARY.home.clientsTitle)}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t(UI_DICTIONARY.home.clientsSubtitle)}
          </p>
        </MotionFade>

        {/* Marquee Row 1 */}
        <div className="mt-12">
          <Marquee duration={38} pauseOnHover={true} className="py-2">
            {displayPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-3.5 rounded-xl border border-border/80 bg-background/80 px-5 py-3.5 shadow-xs transition-colors hover:border-primary/50 hover:bg-background"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/60">
                  {getCategoryIcon(partner.category)}
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground">
                    {partner.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{getCategoryLabel(partner.category)}</span>
                    <span>•</span>
                    <span className="font-medium text-foreground/70">
                      {partner.country}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
