"use client"

import React from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { COMPANY_IDENTITY } from "@/content/cre-data"
import {
  ExternalLink,
  MapPin,
  Navigation,
  Car,
  Plane,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

import type { CompanyIdentity } from "@/types/cre"

interface HqMapProps {
  className?: string
  identity?: CompanyIdentity
}

export function HqMap({
  className = "",
  identity = COMPANY_IDENTITY,
}: HqMapProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const activeIdentity = identity || COMPANY_IDENTITY

  // Headquarters is located at Company HQ (New Cairo)
  const location = {
    address: activeIdentity.headquarters.address,
    city: { en: "New Cairo", ar: "القاهرة الجديدة" },
    country: { en: "Egypt", ar: "مصر" },
    coordinates: { lat: 30.0135, lng: 31.4287 },
    googleMapsEmbedUrl: activeIdentity.headquarters.googleMapsEmbed,
    googleMapsDirectUrl: activeIdentity.headquarters.googleMapsLink,
  }

  const arterialPillars = [
    {
      icon: Car,
      label: t("contactPage.arterial1"),
      sub: isRtl
        ? "شريان القاهرة الجديدة الرئيسي"
        : "New Cairo Central Corridor",
    },
    {
      icon: Plane,
      label: t("contactPage.arterial2"),
      sub: isRtl
        ? "سفر واستقبال الوفود المؤسسية"
        : "Corporate Delegations Access",
    },
    {
      icon: Building2,
      label: t("contactPage.arterial3"),
      sub: isRtl
        ? "ربط مباشر بالحي المالي والحكومي"
        : "Direct Link to Government District",
    },
  ]

  return (
    <div className={cn("space-y-8", className)}>
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
            {t("contactPage.hqBadge")}
          </span>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {t("contactPage.hqTitle")}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("contactPage.hqSubtitle")}
          </p>
        </div>

        {location.googleMapsDirectUrl && (
          <a
            href={location.googleMapsDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
          >
            <ExternalLink className="size-3.5" />
            <span>{t("contactPage.directionsBtn")}</span>
          </a>
        )}
      </div>

      {/* Arterial Connectivity Ribbon */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {arterialPillars.map((pillar, idx) => {
          const Icon = pillar.icon
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-card/40 p-4 transition-all hover:border-primary/40 hover:bg-card/70"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-foreground sm:text-sm">
                  {pillar.label}
                </h4>
                <p className="truncate text-[11px] text-muted-foreground">
                  {pillar.sub}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Embedded Architectural Map Frame */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
        <div className="relative h-95 w-full sm:h-115 lg:h-125">
          <iframe
            title={t("contactPage.hqTitle")}
            src={location.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full contrast-125 grayscale dark:hue-rotate-180 dark:invert"
          />

          {/* Map Overlay Card (Floating in start corner) */}
          <div className="absolute inset-s-4 top-4 z-10 max-w-xs rounded-xl border border-border/80 bg-background/95 p-4 shadow-lg backdrop-blur-md sm:inset-s-6 sm:top-6 sm:p-5">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <span className="block text-[10px] font-bold tracking-wider text-primary uppercase">
                  TAFAWOK Executive Office
                </span>
                <p className="mt-1 text-xs leading-snug font-bold text-foreground">
                  {t(location.address)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {t(location.city)}, {t(location.country)}
                </p>

                {location.googleMapsDirectUrl && (
                  <a
                    href={location.googleMapsDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-primary hover:underline"
                  >
                    <Navigation className="size-3" />
                    <span>{t("contactPage.directionsBtn")}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
