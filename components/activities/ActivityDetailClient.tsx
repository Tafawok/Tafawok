"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Building2,
  Store,
  Compass,
  Users,
  CheckCircle2,
  CalendarPlus,
} from "lucide-react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { toast } from "sonner"
import type { Activity, ActivityCategory, ActivityStatus } from "@/types/cre"
import { PageLineSidebar } from "@/components/motion/PageLineSidebar"
import { MotionFade } from "@/components/motion/MotionFade"
import { BiDiIsolate } from "@/components/shared/FormattedUnit"
import { ActivityCard } from "@/components/activities/ActivityCard"
import { ActivityCtaSection } from "@/components/activities/ActivityCtaSection"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ActivityDetailClientProps {
  activity: Activity
  relatedActivities: Activity[]
}

const CATEGORY_ICONS: Record<ActivityCategory, React.ElementType> = {
  launch: Building2,
  bazaar: Store,
  exhibition: Compass,
  corporate: Users,
  community: Sparkles,
}

export function ActivityDetailClient({
  activity,
  relatedActivities,
}: ActivityDetailClientProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight
  const CategoryIcon = CATEGORY_ICONS[activity.category] || Building2

  // Chapter navigation items
  const chapters = useMemo(() => {
    const list = [
      { id: "activity-overview", label: isArabic ? "نظرة عامة" : "Overview" },
      { id: "activity-content", label: isArabic ? "تفاصيل الفعالية" : "Article" },
    ]
    if (activity.gallery && activity.gallery.length > 1) {
      list.push({
        id: "activity-gallery",
        label: isArabic ? "معرض الصور" : "Gallery",
      })
    }
    list.push({
      id: "activity-specs",
      label: isArabic ? "الموعد والمقر" : "Schedule & Venue",
    })
    if (relatedActivities.length > 0) {
      list.push({
        id: "activity-related",
        label: isArabic ? "فعاليات ذات صلة" : "Related",
      })
    }
    list.push({
      id: "activity-cta",
      label: isArabic ? "المشاركة والتنظيم" : "Inquire",
    })
    return list
  }, [isArabic, activity.gallery, relatedActivities.length])

  const formatDates = (startIso: string, endIso?: string) => {
    try {
      const start = new Date(startIso)
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
      const localeCode = isArabic ? "ar-EG" : "en-US"
      if (!endIso) return start.toLocaleDateString(localeCode, options)

      const end = new Date(endIso)
      const startStr = start.toLocaleDateString(localeCode, {
        month: "long",
        day: "numeric",
      })
      const endStr = end.toLocaleDateString(localeCode, options)
      return `${startStr} – ${endStr}`
    } catch {
      return startIso
    }
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href)
      toast.success(
        isArabic
          ? "تم نسخ رابط الفعالية بنجاح!"
          : "Activity link copied to clipboard!"
      )
    }
  }

  const renderStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case "ongoing":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t("activities.statusOngoing")}</span>
          </span>
        )
      case "upcoming":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Calendar className="size-3.5" />
            <span>{t("activities.statusUpcoming")}</span>
          </span>
        )
      case "past":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/80 px-3 py-1 text-xs font-medium text-muted-foreground">
            <CheckCircle2 className="size-3.5" />
            <span>{t("activities.statusPast")}</span>
          </span>
        )
    }
  }

  const dateScheduleStr = formatDates(activity.startDate, activity.endDate)
  const contentParagraphs = (t(activity.content) || "")
    .split(/\n\n+/)
    .filter(Boolean)

  return (
    <div className="relative flex flex-col">
      {/* Floating chapter navigation sidebar */}
      <PageLineSidebar
        items={chapters}
        title={isArabic ? "تصفح الفعالية" : "Activity"}
      />

      {/* Header & Overview Monograph */}
      <section
        id="activity-overview"
        className="relative scroll-mt-20 overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-8 pb-14 sm:pt-12 sm:pb-16"
      >
        <div className="container mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb row & Share Action */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />}>
                    {t("nav.home")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/activities" />}>
                    {t("nav.activities")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-50 truncate sm:max-w-none">
                    {t(activity.title)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/80 bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-secondary active:scale-95"
            >
              <Share2 className="size-3.5" />
              <span>{isArabic ? "مشاركة" : "Share"}</span>
            </button>
          </div>

          {/* Title Monograph */}
          <MotionFade direction="up" delay={0.05}>
            <div className="max-w-4xl space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/80 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                  <CategoryIcon className="size-3.5" />
                  <span>
                    {t(
                      `activities.cat${activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}`
                    )}
                  </span>
                </span>
                {renderStatusBadge(activity.status)}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {t(activity.title)}
              </h1>

              <p className="text-sm font-medium leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                {t(activity.summary)}
              </p>
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Main Body: Two Columns (Editorial Article & Sticky Schedule Card) */}
      <div className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Main Editorial Column */}
            <div className="space-y-10 lg:col-span-8">
              {/* Hero Photographic Banner */}
              <MotionFade direction="up" delay={0.1}>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-sm">
                  <Image
                    src={activity.mainImage}
                    alt={t(activity.title)}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              </MotionFade>

              {/* Chapter 2: Editorial Article Content */}
              <section id="activity-content" className="scroll-mt-20">
                <MotionFade direction="up" delay={0.15}>
                  <div className="prose prose-neutral dark:prose-invert max-w-none space-y-5 text-sm leading-relaxed sm:text-base">
                    {contentParagraphs.map((paragraph, idx) => (
                      <p key={idx} className="text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </MotionFade>
              </section>

              {/* Chapter 3: Gallery Section (if multiple images) */}
              {activity.gallery && activity.gallery.length > 1 && (
                <section
                  id="activity-gallery"
                  className="scroll-mt-20 space-y-4 border-t border-border/60 pt-8"
                >
                  <MotionFade direction="up" delay={0.2}>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {t("activities.galleryTitle")}
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {activity.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border/70 bg-muted"
                        >
                          <Image
                            src={img}
                            alt={`${t(activity.title)} - ${idx + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </MotionFade>
                </section>
              )}
            </div>

            {/* Right Sticky Event Specifications Column */}
            <aside
              id="activity-specs"
              className="space-y-6 lg:sticky lg:top-24 lg:col-span-4 scroll-mt-20"
            >
              <MotionFade direction="up" delay={0.15}>
                <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm dark:bg-card/90 space-y-6">
                  <div className="border-b border-border/60 pb-4">
                    <span className="font-mono text-xs font-bold text-primary uppercase">
                      {isArabic ? "بيانات الفعالية" : "Event Specifications"}
                    </span>
                    <h4 className="mt-1 text-base font-bold text-foreground">
                      {t(activity.title)}
                    </h4>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                      {t("activities.eventDate")}
                    </span>
                    <div className="flex items-start gap-2 text-xs font-medium text-foreground">
                      <Calendar className="size-4 shrink-0 text-primary mt-0.5" />
                      <span dir="ltr">
                        <BiDiIsolate>{dateScheduleStr}</BiDiIsolate>
                      </span>
                    </div>
                  </div>

                  {/* Venue Location */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                      {t("activities.eventLocation")}
                    </span>
                    <div className="flex items-start gap-2 text-xs font-medium text-foreground">
                      <MapPin className="size-4 shrink-0 text-primary mt-0.5" />
                      <div>
                        <p>{t(activity.locationName)}</p>
                        {activity.locationUrl && (
                          <a
                            href={activity.locationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                          >
                            <span>{t("activities.openInMaps")}</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-2">
                    {activity.actionUrl ? (
                      <Link
                        href={activity.actionUrl}
                        className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                      >
                        <CalendarPlus className="size-4" />
                        <span>
                          {activity.actionLabel
                            ? t(activity.actionLabel)
                            : t("activities.inquireAboutEvent")}
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-95"
                      >
                        <CalendarPlus className="size-4" />
                        <span>{t("activities.inquireAboutEvent")}</span>
                      </Link>
                    )}

                    <Link
                      href="/activities"
                      className="cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border/80 bg-background px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
                    >
                      <ArrowIcon className="size-3.5 rotate-180" />
                      <span>{t("activities.backToActivities")}</span>
                    </Link>
                  </div>
                </div>
              </MotionFade>
            </aside>
          </div>

          {/* Chapter 4: Related Activities Grid */}
          {relatedActivities.length > 0 && (
            <section
              id="activity-related"
              className="mt-16 sm:mt-24 scroll-mt-20 space-y-6 border-t border-border/70 pt-12 sm:pt-16"
            >
              <MotionFade direction="up" delay={0.1}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {t("activities.relatedActivities")}
                  </h3>
                  <Link
                    href="/activities"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>{t("activities.backToActivities")}</span>
                    <ArrowIcon className="size-3.5" />
                  </Link>
                </div>
              </MotionFade>

              <MotionFade direction="up" delay={0.15}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedActivities.map((relAct) => (
                    <ActivityCard key={relAct.id} activity={relAct} />
                  ))}
                </div>
              </MotionFade>
            </section>
          )}
        </div>
      </div>

      {/* Chapter 5: Outreach CTA */}
      <ActivityCtaSection />
    </div>
  )
}
