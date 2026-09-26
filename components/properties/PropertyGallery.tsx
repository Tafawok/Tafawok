"use client"

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, X, Play } from "lucide-react"
import { Property } from "@/types/cre"
import { useLocaleStore } from "@/stores/useLocaleStore"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface GalleryMediaItem {
  id: string
  type: "image" | "video"
  src: string
  poster?: string
  title?: string
}

interface PropertyGalleryProps {
  property: Property
  className?: string
  showHeading?: boolean
}

export function PropertyGallery({
  property,
  className,
  showHeading = true,
}: PropertyGalleryProps) {
  const { locale, t } = useLocaleStore()
  const isArabic = locale === "ar"

  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const lightboxVideoRef = useRef<HTMLVideoElement>(null)

  // Build unified media items list (flagship image first, video tour second, followed by photos)
  const mediaItems: GalleryMediaItem[] = useMemo(() => {
    const items: GalleryMediaItem[] = []
    const seen = new Set<string>()

    // 1. Flagship primary cover image (guarantees instantaneous LCP)
    if (property.mainImage) {
      items.push({
        id: property.mainImage,
        type: "image",
        src: property.mainImage,
      })
      seen.add(property.mainImage)
    }

    // 2. Official Video Tour (if defined on property)
    if (property.video?.src && !seen.has(property.video.src)) {
      items.push({
        id: property.video.src,
        type: "video",
        src: property.video.src,
        poster: property.video.poster || property.mainImage,
        title: property.video.title ? t(property.video.title) : undefined,
      })
      seen.add(property.video.src)
    }

    // 3. Process gallery array
    ;(property.gallery || []).forEach((src) => {
      if (seen.has(src)) return
      seen.add(src)

      const isVid = /\.(webm|mp4|mov|ogg)$/i.test(src)
      if (isVid) {
        items.push({
          id: src,
          type: "video",
          src,
          poster: property.video?.poster || src.replace(/\.(webm|mp4|mov|ogg)$/i, ".webp"),
          title: property.video?.title ? t(property.video.title) : undefined,
        })
      } else {
        items.push({
          id: src,
          type: "image",
          src,
        })
      }
    })

    return items
  }, [property, t])

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const activeItem = mediaItems[activeIndex] || mediaItems[0]
  const videoIndex = mediaItems.findIndex((m) => m.type === "video")
  const hasVideo = videoIndex !== -1

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length)
  }, [mediaItems.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }, [mediaItems.length])

  // Pause playback when navigating away from video
  useEffect(() => {
    if (activeItem?.type !== "video") {
      mainVideoRef.current?.pause()
      lightboxVideoRef.current?.pause()
    }
  }, [activeItem])

  // Pause lightbox video when modal closes
  useEffect(() => {
    if (!lightboxOpen) {
      lightboxVideoRef.current?.pause()
    }
  }, [lightboxOpen])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        if (isArabic) handlePrev()
        else handleNext()
      } else if (e.key === "ArrowLeft") {
        if (isArabic) handleNext()
        else handlePrev()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [lightboxOpen, isArabic, handleNext, handlePrev])

  return (
    <div className={cn("space-y-4", className)}>
      {showHeading && (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("propertyDetail.galleryTitle")}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("propertyGallery.gallerySubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasVideo && (
              <button
                onClick={() => setActiveIndex(videoIndex)}
                className={cn(
                  "cursor-target inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all",
                  activeIndex === videoIndex
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-primary/50 bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                <Play className="size-3.5 fill-current" />
                <span>{t("propertyGallery.videoTour")}</span>
              </button>
            )}

            <button
              onClick={() => setLightboxOpen(true)}
              className="cursor-target inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-secondary/40 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
            >
              <Maximize2 className="size-3.5 text-primary" />
              <span>{t("propertyGallery.fullscreenBtn")}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Feature Showcase Container */}
      <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/80 bg-neutral-950 sm:aspect-21/9">
        {activeItem.type === "video" ? (
          <div className="relative flex h-full w-full items-center justify-center bg-black">
            <video
              ref={mainVideoRef}
              key={activeItem.src}
              src={activeItem.src}
              poster={activeItem.poster}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <>
            <Image
              key={activeItem.src}
              src={activeItem.src}
              alt={`${t(property.name)} - ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
              priority
              loading="eager"
              className="cursor-pointer object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              onClick={() => setLightboxOpen(true)}
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
          </>
        )}

        {/* Video Tour Live Pill Badge */}
        {activeItem.type === "video" && (
          <div className="pointer-events-none absolute inset-s-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/75 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{activeItem.title || t("propertyGallery.videoBadge")}</span>
          </div>
        )}

        {/* Floating Controls for Frameless Display (showHeading = false) */}
        {!showHeading && (
          <div className="pointer-events-none absolute inset-x-4 top-4 z-10 flex items-center justify-between">
            {hasVideo && activeItem.type !== "video" ? (
              <button
                onClick={() => setActiveIndex(videoIndex)}
                className="cursor-target pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-black/90"
              >
                <Play className="size-3.5 fill-primary text-primary" />
                <span>{t("propertyGallery.videoTour")}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setLightboxOpen(true)}
              className="cursor-target pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black/90"
            >
              <Maximize2 className="size-3.5 text-primary" />
              <span>{t("propertyGallery.fullscreenBtn")}</span>
            </button>
          </div>
        )}

        {/* Floating Navigation Controls on Main Showcase */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-4 z-10 flex items-center justify-between text-white transition-all",
            activeItem.type === "video" ? "bottom-14 sm:bottom-16" : "bottom-4"
          )}
        >
          <span className="pointer-events-auto rounded-full bg-black/70 px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md shadow-md">
            {activeIndex + 1} {t("propertyGallery.imageOf")} {mediaItems.length}
            {activeItem.type === "video" && (
              <span className="text-primary-foreground font-sans ms-1.5 font-bold">
                • {t("propertyGallery.videoBadge")}
              </span>
            )}
          </span>

          <div className="pointer-events-auto flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={handlePrev}
                    aria-label={t("propertyGallery.prev")}
                    className="flex size-9 items-center justify-center rounded-full bg-black/70 text-white shadow-md backdrop-blur-md transition-colors hover:bg-primary cursor-pointer"
                  />
                }
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
              </TooltipTrigger>
              <TooltipContent side="top">
                {t("propertyGallery.prev")}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={handleNext}
                    aria-label={t("propertyGallery.next")}
                    className="flex size-9 items-center justify-center rounded-full bg-black/70 text-white shadow-md backdrop-blur-md transition-colors hover:bg-primary cursor-pointer"
                  />
                }
              >
                <ChevronRight className="size-4 rtl:rotate-180" />
              </TooltipTrigger>
              <TooltipContent side="top">
                {t("propertyGallery.next")}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip (Images + Video Posters with Play Badge) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:gap-3">
        {mediaItems.map((item, idx) => (
          <button
            key={item.id || idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "group relative aspect-16/10 h-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:h-18",
              activeIndex === idx
                ? "border-primary opacity-100 shadow-md ring-1 ring-primary/40"
                : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={
              item.type === "video"
                ? `${t("propertyGallery.videoBadge")} ${idx + 1}`
                : `Thumbnail ${idx + 1}`
            }
          >
            <Image
              src={item.type === "video" ? item.poster || property.mainImage : item.src}
              alt={item.type === "video" ? item.title || "Video tour" : `Thumbnail ${idx + 1}`}
              width={160}
              height={100}
              loading="eager"
              className="h-full w-full object-cover"
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors group-hover:bg-black/25">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md sm:size-7">
                  <Play className="size-3 fill-current ms-0.5 sm:size-3.5" />
                </div>
                <span className="mt-1 rounded bg-black/80 px-1.5 py-0.2 font-mono text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
                  {t("propertyGallery.videoBadge")}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* shadcn Dialog Full-Screen Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[92vh] max-h-[92vh] w-[96vw] max-w-[96vw] flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-background/98 p-0 shadow-2xl backdrop-blur-2xl sm:w-[92vw] sm:max-w-6xl"
        >
          <DialogTitle className="sr-only">
            {t(property.name)} — {t("propertyDetail.galleryTitle")}
          </DialogTitle>
          <DialogDescription className="sr-only">
            High-resolution architectural photography & video tour showcase
          </DialogDescription>

          {/* Top Bar with Counter, Media Type & Close */}
          <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-6 py-3.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-primary">
                {activeIndex + 1} / {mediaItems.length}
              </span>
              <span className="text-xs text-muted-foreground">
                • {t(property.name)}
              </span>
              {activeItem.type === "video" && (
                <span className="ms-2 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  {activeItem.title || t("propertyGallery.videoBadge")}
                </span>
              )}
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={() => setLightboxOpen(false)}
                    aria-label={t("propertyGallery.close")}
                    className="flex size-9 items-center justify-center rounded-lg border border-border/70 bg-secondary/80 text-foreground transition-colors hover:border-primary/40 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  />
                }
              >
                <X className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("propertyGallery.close")}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Main Modal Media Area with Navigation Arrows */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 sm:p-4">
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={handlePrev}
                    aria-label={t("propertyGallery.prev")}
                    className="cursor-target absolute inset-s-4 z-20 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  />
                }
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </TooltipTrigger>
              <TooltipContent side="top">
                {t("propertyGallery.prev")}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    onClick={handleNext}
                    aria-label={t("propertyGallery.next")}
                    className="cursor-target absolute inset-e-4 z-20 flex size-11 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                  />
                }
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </TooltipTrigger>
              <TooltipContent side="top">
                {t("propertyGallery.next")}
              </TooltipContent>
            </Tooltip>

            <div className="relative flex h-full w-full items-center justify-center">
              {activeItem.type === "video" ? (
                <div className="relative flex h-full w-full items-center justify-center bg-black/95 rounded-lg overflow-hidden">
                  <video
                    ref={lightboxVideoRef}
                    key={`lightbox-${activeItem.src}`}
                    src={activeItem.src}
                    poster={activeItem.poster}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={activeItem.src}
                    alt={`${t(property.name)} - ${activeIndex + 1}`}
                    fill
                    sizes="(max-width: 1200px) 95vw, 1200px"
                    className="object-contain select-none"
                    priority
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Filmstrip Thumbnails in Lightbox */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto border-t border-border/60 bg-muted/20 p-3">
            {mediaItems.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "group relative h-12 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all select-none sm:h-14 sm:w-20",
                  activeIndex === idx
                    ? "border-primary shadow-sm ring-1 ring-primary/40 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <Image
                  src={item.type === "video" ? item.poster || property.mainImage : item.src}
                  alt={item.type === "video" ? item.title || "Video" : `Thumbnail ${idx + 1}`}
                  width={160}
                  height={112}
                  className="h-full w-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs">
                      <Play className="size-2.5 fill-current ms-0.5" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
