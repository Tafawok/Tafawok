"use client"

import * as React from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  Loader2,
  UploadCloud,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Link as LinkIcon,
  Layers,
  Image as ImageIcon,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MediaUploader } from "@/components/nexus/MediaUploader"
import { saveActivityAction } from "@/lib/content/actions"
import { cn } from "@/lib/utils"
import type { Activity, ActivityCategory, ActivityStatus } from "@/types/cre"

interface NexusActivityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity?: Activity | null
  onSaved: () => void
}

interface ActivityFormContentProps {
  activity?: Activity | null
  onSaved: () => void
  onClose: () => void
}

function ActivityFormContent({
  activity,
  onSaved,
  onClose,
}: ActivityFormContentProps) {
  const isEditing = !!activity

  // Initial State from props
  const [submitting, setSubmitting] = React.useState(false)
  const [slug, setSlug] = React.useState(activity?.slug || "")
  const [titleEn, setTitleEn] = React.useState(activity?.title?.en || "")
  const [titleAr, setTitleAr] = React.useState(activity?.title?.ar || "")
  const [summaryEn, setSummaryEn] = React.useState(activity?.summary?.en || "")
  const [summaryAr, setSummaryAr] = React.useState(activity?.summary?.ar || "")
  const [contentEn, setContentEn] = React.useState(activity?.content?.en || "")
  const [contentAr, setContentAr] = React.useState(activity?.content?.ar || "")
  const [category, setCategory] = React.useState<ActivityCategory>(
    activity?.category || "launch"
  )
  const [status, setStatus] = React.useState<ActivityStatus>(
    activity?.status || "upcoming"
  )
  const [startDate, setStartDate] = React.useState(
    activity?.startDate ? activity.startDate.slice(0, 16) : ""
  )
  const [endDate, setEndDate] = React.useState(
    activity?.endDate ? activity.endDate.slice(0, 16) : ""
  )
  const [locationEn, setLocationEn] = React.useState(
    activity?.locationName?.en || ""
  )
  const [locationAr, setLocationAr] = React.useState(
    activity?.locationName?.ar || ""
  )
  const [locationUrl, setLocationUrl] = React.useState(
    activity?.locationUrl || ""
  )

  // Cover Image & Gallery state
  const [mainImage, setMainImage] = React.useState(
    activity?.mainImage || "/MallChilloutAlshrouk/IMG_5918.webp"
  )
  const [gallery, setGallery] = React.useState<string[]>(() => {
    if (activity?.gallery && activity.gallery.length > 0) {
      return activity.gallery
    }
    return activity?.mainImage ? [activity.mainImage] : []
  })

  // Quick URL & Bulk Add states
  const [newImageUrl, setNewImageUrl] = React.useState("")
  const [bulkUrlsText, setBulkUrlsText] = React.useState("")
  const [showBulkAdd, setShowBulkAdd] = React.useState(false)
  const [isUploadingGallery, setIsUploadingGallery] = React.useState(false)
  const galleryFileInputRef = React.useRef<HTMLInputElement | null>(null)

  const [actionUrl, setActionUrl] = React.useState(activity?.actionUrl || "")
  const [actionLabelEn, setActionLabelEn] = React.useState(
    activity?.actionLabel?.en || ""
  )
  const [actionLabelAr, setActionLabelAr] = React.useState(
    activity?.actionLabel?.ar || ""
  )
  const [featured, setFeatured] = React.useState(activity?.featured || false)
  const [isPublished, setIsPublished] = React.useState(
    activity?.isPublished ?? true
  )
  const [sortOrder, setSortOrder] = React.useState(activity?.sortOrder || 0)

  // Auto-generate slug from English title if creating new
  const handleTitleEnChange = (val: string) => {
    setTitleEn(val)
    if (!isEditing && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
      )
    }
  }

  // Gallery Handlers
  const handleAddImageUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = newImageUrl.trim()
    if (!trimmed) {
      toast.error("Please enter a valid image URL.")
      return
    }
    if (gallery.includes(trimmed)) {
      toast.error("This image URL is already in the gallery.")
      return
    }
    setGallery((prev) => [...prev, trimmed])
    setNewImageUrl("")
    toast.success("Image link added to gallery!")
  }

  const handleBulkAddUrls = () => {
    const lines = bulkUrlsText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
    if (lines.length === 0) {
      toast.error("Please enter at least one image URL.")
      return
    }
    const newItems = lines.filter((url) => !gallery.includes(url))
    if (newItems.length === 0) {
      toast.error("All entered URLs are already in the gallery.")
      return
    }
    setGallery((prev) => [...prev, ...newItems])
    setBulkUrlsText("")
    setShowBulkAdd(false)
    toast.success(`Added ${newItems.length} image(s) to gallery!`)
  }

  const handleGalleryFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploadingGallery(true)
    let uploadedCount = 0

    try {
      const newUrls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith("image/")) {
          toast.error(`"${file.name}" is not an image file. Skipped.`)
          continue
        }
        if (file.size > 20 * 1024 * 1024) {
          toast.error(`"${file.name}" exceeds 20MB limit. Skipped.`)
          continue
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "activities/gallery")
        formData.append("acceptType", "image")

        const res = await fetch("/api/nexus/upload", {
          method: "POST",
          body: formData,
        })
        const json = await res.json()
        if (res.ok && json.success && json.data?.url) {
          newUrls.push(json.data.url)
          uploadedCount++
        } else {
          toast.error(json.error || `Failed to upload "${file.name}"`)
        }
      }

      if (newUrls.length > 0) {
        setGallery((prev) => [...prev, ...newUrls])
        if (!mainImage) {
          setMainImage(newUrls[0])
        }
        toast.success(
          `Successfully uploaded ${uploadedCount} image(s) to gallery!`
        )
      }
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to upload gallery images."
      )
    } finally {
      setIsUploadingGallery(false)
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = ""
      }
    }
  }

  const handleRemoveGalleryImage = (index: number) => {
    const removedUrl = gallery[index]
    const updated = gallery.filter((_, i) => i !== index)
    setGallery(updated)
    if (mainImage === removedUrl) {
      setMainImage(updated[0] || "")
    }
    toast.success("Image removed from gallery.")
  }

  const handleSetAsCover = (url: string) => {
    setMainImage(url)
    toast.success("Set as main cover image!")
  }

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= gallery.length) return
    const updated = [...gallery]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp
    setGallery(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titleEn.trim() || !titleAr.trim()) {
      toast.error("Please provide both English and Arabic titles.")
      return
    }

    if (!slug.trim()) {
      toast.error("Please specify a URL slug for the activity.")
      return
    }

    if (!startDate) {
      toast.error("Please specify a start date.")
      return
    }

    const finalMainImage =
      mainImage.trim() || gallery[0] || "/MallChilloutAlshrouk/IMG_5918.webp"
    const finalGallery = gallery.length > 0 ? [...gallery] : [finalMainImage]
    if (!finalGallery.includes(finalMainImage)) {
      finalGallery.unshift(finalMainImage)
    }

    setSubmitting(true)

    try {
      const payload: Activity = {
        id: activity ? activity.id : slug.trim(),
        slug: slug.trim(),
        title: { en: titleEn.trim(), ar: titleAr.trim() },
        summary: { en: summaryEn.trim(), ar: summaryAr.trim() },
        content: { en: contentEn.trim(), ar: contentAr.trim() },
        category,
        status,
        startDate: new Date(startDate).toISOString(),
        endDate: endDate ? new Date(endDate).toISOString() : undefined,
        locationName: { en: locationEn.trim(), ar: locationAr.trim() },
        locationUrl: locationUrl.trim() || undefined,
        mainImage: finalMainImage,
        gallery: finalGallery,
        featured,
        isPublished,
        actionUrl: actionUrl.trim() || undefined,
        actionLabel:
          actionLabelEn.trim() || actionLabelAr.trim()
            ? {
                en: actionLabelEn.trim() || "Learn More",
                ar: actionLabelAr.trim() || "اعرف المزيد",
              }
            : undefined,
        sortOrder: Number(sortOrder) || 0,
      }

      await saveActivityAction(payload)
      toast.success(
        isEditing
          ? "Activity updated successfully!"
          : "Activity created successfully!"
      )
      onSaved()
      onClose()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save activity."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
      <DialogBody className="max-h-[75vh] space-y-5 overflow-y-auto px-1 py-2">
        {/* Slug, Category & Status Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="act-slug">URL Slug</Label>
            <Input
              id="act-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. chillout-phase-2-launch"
              required
            />
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="act-category">Category</Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val as ActivityCategory)}
            >
              <SelectTrigger id="act-category" className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="launch">Project Launch</SelectItem>
                  <SelectItem value="bazaar">Bazaar & Retail Expo</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="exhibition">Summit & Forum</SelectItem>
                  <SelectItem value="community">Community & ESG</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="act-status">Status</Label>
            <Select
              value={status}
              onValueChange={(val) => setStatus(val as ActivityStatus)}
            >
              <SelectTrigger id="act-status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing (Active Now)</SelectItem>
                  <SelectItem value="past">Completed / Past</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Title Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="act-title-en">Title (English)</Label>
            <Input
              id="act-title-en"
              value={titleEn}
              onChange={(e) => handleTitleEnChange(e.target.value)}
              placeholder="e.g. Grand Stationery Bazaar at Fagala Plaza"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-title-ar" className="text-right block" dir="rtl">
              العنوان (بالعربية)
            </Label>
            <Input
              id="act-title-ar"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="مثال: البازار السنوي للأدوات المكتبية بفجالة بلازا"
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Summary Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="act-sum-en">Summary (English)</Label>
            <Textarea
              id="act-sum-en"
              value={summaryEn}
              onChange={(e) => setSummaryEn(e.target.value)}
              rows={3}
              placeholder="Brief summary for directory cards..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-sum-ar" className="text-right block" dir="rtl">
              الملخص (بالعربية)
            </Label>
            <Textarea
              id="act-sum-ar"
              value={summaryAr}
              onChange={(e) => setSummaryAr(e.target.value)}
              rows={3}
              placeholder="ملخص موجز لبطاقات استعراض الفعاليات..."
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Full Content Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="act-cnt-en">Detailed Content (English)</Label>
            <Textarea
              id="act-cnt-en"
              value={contentEn}
              onChange={(e) => setContentEn(e.target.value)}
              rows={5}
              placeholder="Full article / event monograph..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-cnt-ar" className="text-right block" dir="rtl">
              المحتوى التفصيلي للمقال (بالعربية)
            </Label>
            <Textarea
              id="act-cnt-ar"
              value={contentAr}
              onChange={(e) => setContentAr(e.target.value)}
              rows={5}
              placeholder="المقال والبيان التفصيلي للفعالية..."
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Dates & Schedule */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="act-start">Start Date & Time</Label>
            <Input
              id="act-start"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-end">End Date & Time (Optional)</Label>
            <Input
              id="act-end"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="act-loc-en">Location Name (EN)</Label>
            <Input
              id="act-loc-en"
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              placeholder="e.g. Fagala Plaza, Nasr City"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-loc-ar" className="text-right block" dir="rtl">
              اسم المقر (بالعربية)
            </Label>
            <Input
              id="act-loc-ar"
              value={locationAr}
              onChange={(e) => setLocationAr(e.target.value)}
              placeholder="مثال: فجالة بلازا، مدينة نصر"
              dir="rtl"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-loc-url">Google Maps Direct Link</Label>
            <Input
              id="act-loc-url"
              value={locationUrl}
              onChange={(e) => setLocationUrl(e.target.value)}
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        {/* MEDIA & PHOTOGRAPHIC GALLERY SECTION */}
        <div className="space-y-4 rounded-xl border border-border/80 bg-secondary/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <ImageIcon className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">
                  Media & Photographic Record
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload image files or add direct web links for the activity cover and gallery showcase.
              </p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
              {gallery.length} Gallery {gallery.length === 1 ? "Image" : "Images"}
            </span>
          </div>

          {/* 1. Main Cover Image via MediaUploader */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-foreground">
              Main Cover Image (Upload File or Enter Link)
            </Label>
            <MediaUploader
              acceptType="image"
              value={mainImage}
              onChange={(url) => {
                setMainImage(url)
                if (url && !gallery.includes(url)) {
                  setGallery((prev) => [url, ...prev])
                }
              }}
              folder="activities/covers"
              aspectRatio="video"
            />
          </div>

          {/* 2. Gallery Photographic Showcase Manager */}
          <div className="space-y-3 pt-3 border-t border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-xs font-semibold text-foreground">
                Activity Media Gallery
              </Label>
              <div className="flex items-center gap-2">
                {/* Upload from device button */}
                <input
                  type="file"
                  ref={galleryFileInputRef}
                  onChange={handleGalleryFileUpload}
                  accept="image/jpeg,image/png,image/webp,image/svg+xml,image/avif,.jpg,.jpeg,.png,.webp,.svg,.avif"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={isUploadingGallery}
                  onClick={() => galleryFileInputRef.current?.click()}
                  className="h-8 gap-1.5 text-xs cursor-pointer shadow-xs"
                >
                  {isUploadingGallery ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="size-3.5 text-primary" />
                  )}
                  <span>
                    {isUploadingGallery ? "Uploading..." : "Upload Images"}
                  </span>
                </Button>

                {/* Bulk Paste URLs toggle button */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBulkAdd(!showBulkAdd)}
                  className="h-8 text-xs cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  <Layers className="size-3.5 me-1" />
                  <span>
                    {showBulkAdd ? "Hide Bulk Paste" : "Bulk Paste URLs"}
                  </span>
                </Button>
              </div>
            </div>

            {/* Quick Single URL input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute start-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddImageUrl()
                    }
                  }}
                  placeholder="Paste image link/URL (e.g. /MallChilloutAlshrouk/IMG_5918.webp or https://...)"
                  className="h-8 ps-8 text-xs"
                />
              </div>
              <Button
                type="button"
                size="sm"
                onClick={() => handleAddImageUrl()}
                className="h-8 text-xs cursor-pointer shrink-0"
              >
                <Plus className="size-3.5 me-1" />
                <span>Add Link</span>
              </Button>
            </div>

            {/* Bulk URLs Textarea (Collapsible) */}
            {showBulkAdd && (
              <div className="space-y-2 rounded-lg border border-border/70 bg-background p-3">
                <Label
                  htmlFor="bulk-urls"
                  className="text-[11px] font-semibold text-muted-foreground"
                >
                  Paste multiple image URLs (one URL per line):
                </Label>
                <Textarea
                  id="bulk-urls"
                  value={bulkUrlsText}
                  onChange={(e) => setBulkUrlsText(e.target.value)}
                  rows={3}
                  placeholder={
                    "/FagalaPlaza/bazaar-hall.webp\n/FagalaPlaza/bazaar-vendors.webp\nhttps://example.com/photo.jpg"
                  }
                  className="text-xs font-mono"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBulkAdd(false)}
                    className="h-7 text-xs cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleBulkAddUrls}
                    className="h-7 text-xs cursor-pointer"
                  >
                    Add All Lines to Gallery
                  </Button>
                </div>
              </div>
            )}

            {/* Gallery Thumbnail Grid */}
            {gallery.length === 0 ? (
              <div className="flex min-h-[120px] flex-col items-center justify-center rounded-lg border border-dashed border-border/80 bg-background/50 p-4 text-center">
                <ImageIcon className="size-8 text-muted-foreground/40" />
                <p className="mt-2 text-xs font-semibold text-foreground">
                  No images in gallery yet
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Upload images from your device or paste image links above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {gallery.map((imgUrl, idx) => {
                  const isCover = imgUrl === mainImage
                  return (
                    <div
                      key={`${imgUrl}-${idx}`}
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all",
                        isCover
                          ? "border-primary ring-1 ring-primary shadow-xs"
                          : "border-border/70 hover:border-border"
                      )}
                    >
                      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                        <Image
                          src={imgUrl}
                          alt={`Gallery image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, "left")}
                              className="rounded-md bg-background/80 p-1 text-foreground hover:bg-background cursor-pointer"
                              title="Move Left"
                            >
                              <ChevronLeft className="size-3.5" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(idx)}
                            className="rounded-md bg-destructive/80 p-1 text-destructive-foreground hover:bg-destructive cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                          {idx < gallery.length - 1 && (
                            <button
                              type="button"
                              onClick={() => handleMoveImage(idx, "right")}
                              className="rounded-md bg-background/80 p-1 text-foreground hover:bg-background cursor-pointer"
                              title="Move Right"
                            >
                              <ChevronRight className="size-3.5" />
                            </button>
                          )}
                        </div>

                        {/* Badges */}
                        <div className="absolute start-1.5 top-1.5 flex items-center gap-1">
                          <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-white">
                            #{idx + 1}
                          </span>
                          {isCover && (
                            <span className="inline-flex items-center gap-0.5 rounded bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                              <Star className="size-2.5 fill-current" />
                              Cover
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Set Cover Button */}
                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetAsCover(imgUrl)}
                          className="w-full border-t border-border/50 py-1 text-center text-[10px] font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
                        >
                          Set as Cover
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Target URL */}
        <div className="space-y-1.5">
          <Label htmlFor="act-action-url">Action Target URL (Optional)</Label>
          <Input
            id="act-action-url"
            value={actionUrl}
            onChange={(e) => setActionUrl(e.target.value)}
            placeholder="/properties/fagala-plaza or /contact"
          />
        </div>

        {/* Action Label Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="act-label-en">Action Button Label (EN)</Label>
            <Input
              id="act-label-en"
              value={actionLabelEn}
              onChange={(e) => setActionLabelEn(e.target.value)}
              placeholder="e.g. Reserve Space / View Property"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="act-label-ar" className="text-right block" dir="rtl">
              نص زر التفاعل (بالعربية)
            </Label>
            <Input
              id="act-label-ar"
              value={actionLabelAr}
              onChange={(e) => setActionLabelAr(e.target.value)}
              placeholder="مثال: استكشف الصرح / حجز مساحة"
              dir="rtl"
            />
          </div>
        </div>

        {/* Flags: Featured, Published, Sort Order */}
        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border/80 bg-secondary/30 p-4">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded accent-primary"
            />
            <span>Spotlight as Featured Activity</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded accent-primary"
            />
            <span>Published on Live Site</span>
          </label>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Label htmlFor="act-sort">Sort Priority:</Label>
            <Input
              id="act-sort"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-20 h-8"
            />
          </div>
        </div>
      </DialogBody>

      <DialogFooter className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="me-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : isEditing ? (
            "Save Changes"
          ) : (
            "Publish Activity"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function NexusActivityModal({
  open,
  onOpenChange,
  activity,
  onSaved,
}: NexusActivityModalProps) {
  const isEditing = !!activity

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl sm:max-w-4xl max-h-[92vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Activity / Event" : "Create New Activity / Event"}
          </DialogTitle>
          <DialogDescription>
            Publish company bazaars, project launches, and commercial exhibitions to the public activities feed.
          </DialogDescription>
        </DialogHeader>

        {open && (
          <ActivityFormContent
            key={activity?.id || "new-activity"}
            activity={activity}
            onSaved={onSaved}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
