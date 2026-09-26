"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Search,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CalendarDays,
} from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { cn } from "@/lib/utils"
import type { Activity } from "@/types/cre"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { MotionFade } from "@/components/motion/MotionFade"
import { Separator } from "@/components/ui/separator"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { ActivityCard } from "@/components/activities/ActivityCard"
import { ActivityCtaSection } from "@/components/activities/ActivityCtaSection"

interface ActivitiesPageClientProps {
  activities: Activity[]
}

export function ActivitiesPageClient({ activities }: ActivitiesPageClientProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [activeStatus, setActiveStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Dynamic chapters for PageLineSidebar
  const activityChapters = useMemo(() => {
    return [
      { id: "activities-hero", label: t("activities.chapterOverview") },
      { id: "activities-metrics", label: t("activities.chapterMetrics") },
      { id: "activities-spotlight", label: t("activities.chapterSpotlight") },
      { id: "activities-directory", label: t("activities.chapterDirectory") },
      { id: "activities-cta", label: t("activities.chapterCta") },
    ]
  }, [t])

  const categoryFilterTabs = [
    { id: "all", label: t("activities.allCategories") },
    { id: "launch", label: t("activities.catLaunch") },
    { id: "bazaar", label: t("activities.catBazaar") },
    { id: "corporate", label: t("activities.catCorporate") },
    { id: "exhibition", label: t("activities.catExhibition") },
    { id: "community", label: t("activities.catCommunity") },
  ]

  const statusFilterTabs = [
    { id: "all", label: t("activities.allStatuses") },
    { id: "ongoing", label: t("activities.statusOngoing") },
    { id: "upcoming", label: t("activities.statusUpcoming") },
    { id: "past", label: t("activities.statusPast") },
  ]

  // Metric counts
  const totalCount = activities.length
  const ongoingCount = useMemo(
    () => activities.filter((a) => a.status === "ongoing").length,
    [activities]
  )
  const upcomingCount = useMemo(
    () => activities.filter((a) => a.status === "upcoming").length,
    [activities]
  )
  const venueHubsCount = useMemo(() => {
    const venues = new Set(activities.map((a) => a.locationName.en))
    return Math.max(venues.size, 3)
  }, [activities])

  // Primary featured spotlight activity
  const featuredActivity = useMemo(() => {
    return (
      activities.find((a) => a.featured && a.status !== "past") ||
      activities.find((a) => a.featured) ||
      activities[0]
    )
  }, [activities])

  // Filtered directory items
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      // Category filter
      if (activeCategory !== "all" && act.category !== activeCategory) {
        return false
      }
      // Status filter
      if (activeStatus !== "all" && act.status !== activeStatus) {
        return false
      }
      // Search query
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase().trim()
      const titleEn = act.title.en.toLowerCase()
      const titleAr = act.title.ar.toLowerCase()
      const sumEn = act.summary.en.toLowerCase()
      const sumAr = act.summary.ar.toLowerCase()
      const locEn = act.locationName.en.toLowerCase()
      const locAr = act.locationName.ar.toLowerCase()

      return (
        titleEn.includes(query) ||
        titleAr.includes(query) ||
        sumEn.includes(query) ||
        sumAr.includes(query) ||
        locEn.includes(query) ||
        locAr.includes(query)
      )
    })
  }, [activities, activeCategory, activeStatus, searchQuery])

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

  return (
    <div className="relative flex flex-col">
      {/* Floating chapter navigation sidebar */}
      <PageLineSidebar
        items={activityChapters}
        title={isArabic ? "دليل الفعاليات" : "Directory"}
      />

      {/* Chapter 1: Architectural Monograph Header */}
      <section
        id="activities-hero"
        className="relative scroll-mt-20 overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background py-16 sm:py-20"
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFade direction="up" delay={0.05}>
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-bold tracking-wider text-primary uppercase">
                {t("activities.pageBadge")}
              </span>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("activities.pageTitle")}
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("activities.pageSubtitle")}
              </p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl space-y-12 sm:space-y-16 px-4 sm:px-6 lg:px-8">
          {/* Chapter 2: Activities Overview Summary Strip */}
          <section id="activities-metrics" className="scroll-mt-20">
            <MotionFade direction="up" delay={0.1}>
              <div className="flex flex-col divide-y divide-border/60 py-2 sm:flex-row sm:items-stretch sm:divide-y-0">
                {/* Metric 1: Total Activities */}
                <div className="flex-1 py-4 text-start sm:py-0 sm:pe-8">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("activities.metricsTotal")}
                  </span>
                  <p className="mt-1 text-2xl font-black text-foreground tabular-nums sm:text-3xl">
                    <BiDiIsolate>{totalCount}</BiDiIsolate>
                  </p>
                </div>

                <div
                  className="hidden items-stretch self-stretch py-1 sm:flex"
                  aria-hidden="true"
                >
                  <Separator
                    orientation="vertical"
                    className="h-full w-px bg-border/70"
                  />
                </div>

                {/* Metric 2: Active / Ongoing */}
                <div className="flex-1 py-4 text-start sm:px-8 sm:py-0">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("activities.metricsActive")}
                  </span>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-black text-foreground tabular-nums sm:text-3xl">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <BiDiIsolate>{ongoingCount}</BiDiIsolate>
                  </p>
                </div>

                <div
                  className="hidden items-stretch self-stretch py-1 sm:flex"
                  aria-hidden="true"
                >
                  <Separator
                    orientation="vertical"
                    className="h-full w-px bg-border/70"
                  />
                </div>

                {/* Metric 3: Upcoming Launches */}
                <div className="flex-1 py-4 text-start sm:px-8 sm:py-0">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("activities.metricsUpcoming")}
                  </span>
                  <p className="mt-1 text-2xl font-black text-foreground tabular-nums sm:text-3xl">
                    <BiDiIsolate>{upcomingCount}</BiDiIsolate>
                  </p>
                </div>

                <div
                  className="hidden items-stretch self-stretch py-1 sm:flex"
                  aria-hidden="true"
                >
                  <Separator
                    orientation="vertical"
                    className="h-full w-px bg-border/70"
                  />
                </div>

                {/* Metric 4: Commercial Venues */}
                <div className="flex-1 py-4 text-start sm:py-0 sm:ps-8">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                    {t("activities.metricsVenues")}
                  </span>
                  <p className="mt-1 text-2xl font-black text-foreground tabular-nums sm:text-3xl">
                    <BiDiIsolate>{venueHubsCount}</BiDiIsolate>
                  </p>
                </div>
              </div>
            </MotionFade>
          </section>

          {/* Chapter 3: Featured Spotlight Activity (Show when viewing default directory) */}
          {featuredActivity &&
            activeCategory === "all" &&
            activeStatus === "all" &&
            !searchQuery && (
              <section id="activities-spotlight" className="scroll-mt-20">
                <MotionFade direction="up" delay={0.15}>
                  <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card p-1 shadow-xs transition-all duration-300 hover:border-primary/60 hover:shadow-xl dark:bg-card/90">
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center">
                      {/* Media Left */}
                      <Link
                        href={`/activities/${featuredActivity.slug}`}
                        className="relative h-64 overflow-hidden rounded-xl sm:h-80 lg:col-span-6 lg:h-full lg:min-h-[380px] bg-muted"
                      >
                        <Image
                          src={featuredActivity.mainImage}
                          alt={t(featuredActivity.title)}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent lg:hidden" />

                        {/* Top tag */}
                        <div className="absolute start-3.5 top-3.5 flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                            <Sparkles className="size-3.5" />
                            <span>{t("activities.featuredBadge")}</span>
                          </span>
                        </div>
                      </Link>

                      {/* Editorial Right */}
                      <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-primary uppercase">
                              {t(
                                `activities.cat${featuredActivity.category.charAt(0).toUpperCase() + featuredActivity.category.slice(1)}`
                              )}
                            </span>
                            {featuredActivity.status === "ongoing" && (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </span>
                                <span>{t("activities.statusOngoing")}</span>
                              </span>
                            )}
                          </div>

                          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl transition-colors group-hover:text-primary">
                            <Link href={`/activities/${featuredActivity.slug}`}>
                              {t(featuredActivity.title)}
                            </Link>
                          </h2>

                          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm line-clamp-3">
                            {t(featuredActivity.summary)}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5 font-mono font-medium text-foreground">
                              <Calendar className="size-4 text-primary" />
                              <span dir="ltr">
                                <BiDiIsolate>
                                  {formatDates(
                                    featuredActivity.startDate,
                                    featuredActivity.endDate
                                  )}
                                </BiDiIsolate>
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <MapPin className="size-4 text-primary" />
                              <span>{t(featuredActivity.locationName)}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/activities/${featuredActivity.slug}`}
                            className="cursor-target inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95 sm:text-sm"
                          >
                            <span>{t("activities.viewDetails")}</span>
                            <ArrowIcon className="size-4" />
                          </Link>

                          {featuredActivity.actionUrl && (
                            <Link
                              href={featuredActivity.actionUrl}
                              className="cursor-target inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-4 text-xs font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-secondary/40 active:scale-95 sm:text-sm"
                            >
                              <span>
                                {featuredActivity.actionLabel
                                  ? t(featuredActivity.actionLabel)
                                  : t("activities.inquireAboutEvent")}
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionFade>
              </section>
            )}

          {/* Chapter 4: Filter Controls & Directory Grid */}
          <section id="activities-directory" className="scroll-mt-20 space-y-8">
            <MotionFade direction="up" delay={0.2}>
              <div className="space-y-4">
                {/* Category Tabs & Search Row */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  {/* Category Filter Tabs */}
                  <div className="flex flex-wrap gap-1.5 rounded-xl border border-border/70 bg-secondary/30 p-1.5">
                    {categoryFilterTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveCategory(tab.id)}
                        className={cn(
                          "cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all select-none",
                          activeCategory === tab.id
                            ? "bg-background text-primary shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full lg:w-80">
                    <Search className="absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t("activities.searchPlaceholder")}
                      className="w-full rounded-xl border border-border/80 bg-background py-2.5 ps-9 pe-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Secondary Status Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-semibold text-muted-foreground uppercase me-1">
                    {isArabic ? "تصفية حسب الحالة:" : "Status:"}
                  </span>
                  {statusFilterTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveStatus(tab.id)}
                      className={cn(
                        "cursor-pointer rounded-full border px-3 py-0.5 text-[11px] font-medium transition-all select-none",
                        activeStatus === tab.id
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:border-border"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </MotionFade>

            {/* Activities Directory Grid */}
            <MotionFade direction="up" delay={0.25}>
              {filteredActivities.length === 0 ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-8 text-center bg-card/40">
                  <CalendarDays className="size-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-base font-bold text-foreground">
                    {t("activities.noResults")}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory("all")
                      setActiveStatus("all")
                      setSearchQuery("")
                    }}
                    className="mt-3 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/90 cursor-pointer"
                  >
                    {isArabic ? "إعادة ضبط خيارات البحث والتصفية" : "Reset all filters & search"}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredActivities.map((activity, idx) => (
                    <ActivityCard
                      key={activity.id}
                      activity={activity}
                      priority={idx < 3}
                    />
                  ))}
                </div>
              )}
            </MotionFade>
          </section>
        </div>
      </div>

      {/* Chapter 5: Outreach & Event Coordination CTA */}
      <ActivityCtaSection />
    </div>
  )
}
