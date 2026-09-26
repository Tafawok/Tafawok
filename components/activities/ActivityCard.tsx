"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  Store,
  Compass,
  Users,
  Sparkles,
  CheckCircle2,
} from "lucide-react"
import type { Activity, ActivityCategory, ActivityStatus } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  activity: Activity
  className?: string
  priority?: boolean
}

const CATEGORY_ICONS: Record<ActivityCategory, React.ElementType> = {
  launch: Building2,
  bazaar: Store,
  exhibition: Compass,
  corporate: Users,
  community: Sparkles,
}

export function ActivityCard({
  activity,
  className,
  priority = false,
}: ActivityCardProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight
  const CategoryIcon = CATEGORY_ICONS[activity.category] || Building2

  const formatDates = (startIso: string, endIso?: string) => {
    try {
      const start = new Date(startIso)
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
      const localeCode = isArabic ? "ar-EG" : "en-US"
      if (!endIso) return start.toLocaleDateString(localeCode, options)

      const end = new Date(endIso)
      const startStr = start.toLocaleDateString(localeCode, {
        month: "short",
        day: "numeric",
      })
      const endStr = end.toLocaleDateString(localeCode, options)
      return `${startStr} – ${endStr}`
    } catch {
      return startIso
    }
  }

  const renderStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case "ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 backdrop-blur-md dark:text-emerald-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span>{t("activities.statusOngoing")}</span>
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary backdrop-blur-md">
            <Calendar className="size-2.5" />
            <span>{t("activities.statusUpcoming")}</span>
          </span>
        )
      case "past":
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground backdrop-blur-md">
            <CheckCircle2 className="size-2.5" />
            <span>{t("activities.statusPast")}</span>
          </span>
        )
    }
  }

  const dateStr = formatDates(activity.startDate, activity.endDate)

  return (
    <article
      className={cn(
        "cursor-target group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:border-primary/60 hover:shadow-xl dark:bg-card/90",
        className
      )}
    >
      {/* Visual Asset Container */}
      <Link
        href={`/activities/${activity.slug}`}
        className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-muted"
      >
        <Image
          src={activity.mainImage}
          alt={t(activity.title)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />

        {/* Floating Architectural Tags */}
        <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-md border border-border/60 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-md">
            <CategoryIcon className="me-1.5 size-3.5 text-primary" />
            {t(
              `activities.cat${activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}`
            )}
          </span>
          {renderStatusBadge(activity.status)}
        </div>

        {/* Location chip pinned over bottom of image */}
        <div className="absolute inset-x-3.5 bottom-2.5 flex items-center gap-1.5 text-xs font-medium text-foreground/90 drop-shadow-xs">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span className="truncate">{t(activity.locationName)}</span>
        </div>
      </Link>

      {/* Card Body — Balanced, Tight, Architectural Spacing */}
      <div className="flex flex-1 flex-col justify-between p-5">
        {/* Upper Editorial Content */}
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl line-clamp-2">
            <Link href={`/activities/${activity.slug}`}>
              {t(activity.title)}
            </Link>
          </h3>

          <div className="mt-2 flex items-center gap-1.5 font-mono text-xs font-semibold text-primary/90">
            <Calendar className="size-3.5 shrink-0" />
            <span dir="ltr">
              <BiDiIsolate>{dateStr}</BiDiIsolate>
            </span>
          </div>

          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {t(activity.summary)}
          </p>
        </div>

        {/* Bottom Section: Footer & Direct Navigation */}
        <div className="mt-5 border-t border-border/60 pt-4 flex items-center justify-between gap-2">
          <Link
            href={`/activities/${activity.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
          >
            <span>{t("activities.viewDetails")}</span>
            <ArrowIcon className="size-3.5" />
          </Link>

          {activity.actionUrl && (
            <Link
              href={activity.actionUrl}
              className="text-[11px] font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
            >
              {activity.actionLabel
                ? t(activity.actionLabel)
                : t("activities.inquireAboutEvent")}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
