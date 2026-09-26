"use client"

import React from "react"
import Link from "next/link"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { UI_DICTIONARY, DEFAULT_HOMEPAGE_SETTINGS } from "@/content/cre-data"
import { buttonVariants } from "@/components/ui/button"
import { MotionFade } from "@/components/motion/MotionFade"
import { DownloadProfileButton } from "@/components/shared/DownloadProfileButton"
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import type { HomepageSettings } from "@/types/cre"

interface HeroSectionProps {
  hero?: HomepageSettings["hero"]
}

export function HeroSection({
  hero = DEFAULT_HOMEPAGE_SETTINGS.hero,
}: HeroSectionProps) {
  const { locale, t } = useLocaleStore()
  const isRtl = locale === "ar"
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const headline = hero?.headline
    ? t(hero.headline)
    : t(UI_DICTIONARY.home.heroTitle)
  const subheadline = hero?.subheadline
    ? t(hero.subheadline)
    : t(UI_DICTIONARY.home.heroSubtitle)
  const ctaText = hero?.ctaText
    ? t(hero.ctaText)
    : t(UI_DICTIONARY.home.exploreAssets)

  const credentials =
    hero?.credentials && hero.credentials.length > 0
      ? hero.credentials
      : DEFAULT_HOMEPAGE_SETTINGS.hero.credentials

  const getIcon = (index: number, iconName?: string) => {
    if (iconName === "ShieldCheck" || index === 1) {
      return <ShieldCheck className="size-3.5 shrink-0 text-primary" />
    }
    if (iconName === "TrendingUp" || index === 2) {
      return <TrendingUp className="size-3.5 shrink-0 text-primary" />
    }
    return <Building2 className="size-3.5 shrink-0 text-primary" />
  }

  return (
    <section
      id="hero"
      className="relative scroll-mt-20 overflow-hidden border-b border-border/70 bg-background pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-36"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Master Architectural Headline */}
          <MotionFade delay={0.1} direction="up">
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.06] xl:text-8xl">
              {headline}
            </h1>
          </MotionFade>

          {/* Subtitle with High-Caliber Authority */}
          <MotionFade delay={0.2} direction="up">
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
              {subheadline}
            </p>
          </MotionFade>

          {/* Focused Action CTAs */}
          <MotionFade delay={0.3} direction="up">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/properties"
                className={buttonVariants({
                  size: "lg",
                  className:
                    "cursor-target gap-2.5 rounded-xl px-8 py-6 text-sm font-bold shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]",
                })}
              >
                <span>{ctaText}</span>
                <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Link>

              <DownloadProfileButton variant="hero" />
            </div>
          </MotionFade>

          {/* Minimalist Credentials Strip (No Badges) */}
          <MotionFade delay={0.4} direction="up">
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground sm:mt-12 sm:text-sm">
              {credentials.map((cred, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    {getIcon(idx, cred.iconName)}
                    <span>{t(cred.label)}</span>
                  </div>
                  {idx < credentials.length - 1 && (
                    <span className="text-border" aria-hidden="true">
                      •
                    </span>
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
