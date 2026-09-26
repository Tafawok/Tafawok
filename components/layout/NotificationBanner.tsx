"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  X,
  MapPin,
  Calendar,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import type { NotificationBanner as BannerType } from "@/types/cre"

interface NotificationBannerProps {
  banner?: BannerType | null
}

const emptySubscribe = () => () => {}

export function NotificationBanner({ banner }: NotificationBannerProps) {
  const pathname = usePathname()
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const [localDismissed, setLocalDismissed] = React.useState(false)

  // Use official useSyncExternalStore for hydration-safe sessionStorage and expiration check
  const isDismissedOrExpired = React.useSyncExternalStore(
    emptySubscribe,
    () => {
      if (!banner?.id || !banner.isActive) return true
      try {
        const isDismissed =
          sessionStorage.getItem(`tafawok_banner_dismiss_${banner.id}`) === "1"
        if (isDismissed) return true
        const now = Date.now()
        const start = new Date(banner.startDate).getTime()
        const end = new Date(banner.endDate).getTime()
        return now < start || now > end
      } catch {
        return false
      }
    },
    () => true // Server snapshot returns true to prevent SSR hydration mismatch
  )

  if (!banner || !banner.isActive || isDismissedOrExpired || localDismissed) {
    return null
  }

  // Hide on admin portal
  if (pathname?.startsWith("/nexus-portal")) {
    return null
  }

  const handleDismiss = () => {
    setLocalDismissed(true)
    try {
      sessionStorage.setItem(`tafawok_banner_dismiss_${banner.id}`, "1")
    } catch {
      // storage unavailable
    }
  }

  // Format dates cleanly
  const formatDateRange = () => {
    try {
      const start = new Date(banner.startDate)
      const end = new Date(banner.endDate)
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      }
      const localeCode = isArabic ? "ar-EG" : "en-US"
      const startFormatted = start.toLocaleDateString(localeCode, options)
      const endFormatted = end.toLocaleDateString(localeCode, {
        ...options,
        year: "numeric",
      })
      return `${startFormatted} – ${endFormatted}`
    } catch {
      return null
    }
  }

  const dateRangeStr = formatDateRange()

  return (
    <div
      role="region"
      aria-label={t(banner.title)}
      className="relative z-50 w-full border-b border-primary/25 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 text-foreground backdrop-blur-md transition-all duration-300 dark:from-primary/25 dark:via-background dark:to-primary/20"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        {/* Left Content Area: Pulse Dot, Title, Message, Location, Dates */}
        <div className="flex flex-1 flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm">
          {/* Animated live pulse indicator */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>

          {/* Banner Title & Description */}
          <span className="font-semibold text-foreground">
            {t(banner.title)}
          </span>

          {banner.message && (
            <span className="hidden text-muted-foreground md:inline">
              — {t(banner.message)}
            </span>
          )}

          {/* Location Badge */}
          {banner.location && (
            <span className="hidden items-center gap-1 text-[11px] font-medium text-foreground/85 lg:inline-flex">
              <MapPin className="h-3 w-3 text-primary" />
              <span>{t(banner.location)}</span>
            </span>
          )}

          {/* Dates Badge */}
          {dateRangeStr && (
            <span className="hidden items-center gap-1 text-[11px] font-medium text-muted-foreground xl:inline-flex">
              <Calendar className="h-3 w-3 text-primary" />
              <span dir="ltr">{dateRangeStr}</span>
            </span>
          )}
        </div>

        {/* Right CTA Button & Dismiss Action */}
        <div className="flex shrink-0 items-center gap-2">
          {banner.linkUrl && (
            <Link
              href={banner.linkUrl}
              className="inline-flex h-7 items-center gap-1 rounded-md bg-primary px-2.5 text-[11px] font-semibold text-primary-foreground shadow-xs transition-transform duration-150 hover:bg-primary/90 active:scale-95 sm:h-7.5 sm:px-3 sm:text-xs"
            >
              <span>
                {banner.linkLabel
                  ? t(banner.linkLabel)
                  : t("activities.viewDetails")}
              </span>
              <ArrowIcon className="h-3 w-3" />
            </Link>
          )}

          {banner.dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label={t("banner.dismiss")}
              className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground active:scale-95"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
