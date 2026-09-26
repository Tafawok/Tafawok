"use client"

import * as React from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { saveNotificationBannerAction } from "@/lib/content/actions"
import type { NotificationBanner, NotificationBannerType } from "@/types/cre"

interface NexusBannerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  banner?: NotificationBanner | null
  onSaved: () => void
}

interface BannerFormContentProps {
  banner?: NotificationBanner | null
  onSaved: () => void
  onClose: () => void
}

function BannerFormContent({
  banner,
  onSaved,
  onClose,
}: BannerFormContentProps) {
  const isEditing = !!banner

  const [submitting, setSubmitting] = React.useState(false)
  const [id] = React.useState(() => banner?.id || `banner-${Date.now()}`)
  const [titleEn, setTitleEn] = React.useState(banner?.title?.en || "")
  const [titleAr, setTitleAr] = React.useState(banner?.title?.ar || "")
  const [messageEn, setMessageEn] = React.useState(banner?.message?.en || "")
  const [messageAr, setMessageAr] = React.useState(banner?.message?.ar || "")
  const [locationEn, setLocationEn] = React.useState(
    banner?.location?.en || ""
  )
  const [locationAr, setLocationAr] = React.useState(
    banner?.location?.ar || ""
  )
  const [type, setType] = React.useState<NotificationBannerType>(
    banner?.type || "bazaar"
  )

  const [startDate, setStartDate] = React.useState(() => {
    if (banner?.startDate) return banner.startDate.slice(0, 16)
    return new Date().toISOString().slice(0, 16)
  })
  const [endDate, setEndDate] = React.useState(() => {
    if (banner?.endDate) return banner.endDate.slice(0, 16)
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  })
  const [linkUrl, setLinkUrl] = React.useState(banner?.linkUrl || "")
  const [linkLabelEn, setLinkLabelEn] = React.useState(
    banner?.linkLabel?.en || "Explore Details"
  )
  const [linkLabelAr, setLinkLabelAr] = React.useState(
    banner?.linkLabel?.ar || "استعراض التفاصيل"
  )
  const [priority, setPriority] = React.useState(banner?.priority ?? 10)
  const [dismissible, setDismissible] = React.useState(
    banner?.dismissible ?? true
  )
  const [isActive, setIsActive] = React.useState(banner?.isActive ?? true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!titleEn.trim() || !titleAr.trim()) {
      toast.error("Please provide both English and Arabic titles.")
      return
    }

    if (!startDate || !endDate) {
      toast.error("Please provide start and end dates.")
      return
    }

    setSubmitting(true)

    try {
      const payload: NotificationBanner = {
        id: banner ? banner.id : id.trim(),
        title: { en: titleEn.trim(), ar: titleAr.trim() },
        message: { en: messageEn.trim(), ar: messageAr.trim() },
        location:
          locationEn.trim() || locationAr.trim()
            ? { en: locationEn.trim(), ar: locationAr.trim() }
            : undefined,
        type,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        linkUrl: linkUrl.trim() || undefined,
        linkLabel:
          linkLabelEn.trim() || linkLabelAr.trim()
            ? { en: linkLabelEn.trim() || "Details", ar: linkLabelAr.trim() || "التفاصيل" }
            : undefined,
        priority: Number(priority) || 0,
        dismissible,
        isActive,
      }

      await saveNotificationBannerAction(payload)
      toast.success(isEditing ? "Banner updated successfully!" : "Banner created successfully!")
      onSaved()
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save banner.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogBody className="max-h-[70vh] space-y-4 overflow-y-auto px-1 py-2">
        {/* Banner Category / Type */}
        <div className="space-y-1.5">
          <Label htmlFor="ban-type">Banner Category / Type</Label>
          <Select
            value={type}
            onValueChange={(val) => setType(val as NotificationBannerType)}
          >
            <SelectTrigger id="ban-type" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="bazaar">Bazaar / Expo</SelectItem>
                <SelectItem value="launch">Project Launch</SelectItem>
                <SelectItem value="announcement">Announcement</SelectItem>
                <SelectItem value="urgent">Urgent Notice</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Title Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ban-title-en">Headline (English)</Label>
            <Input
              id="ban-title-en"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Grand Wholesale Stationery Bazaar at Fagala Plaza"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ban-title-ar" className="text-right block" dir="rtl">
              العنوان الرئيسي (بالعربية)
            </Label>
            <Input
              id="ban-title-ar"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="مثال: انطلاق فعاليات البازار السنوي بفجالة بلازا"
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Message Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ban-msg-en">Sub-message / Dates (English)</Label>
            <Input
              id="ban-msg-en"
              value={messageEn}
              onChange={(e) => setMessageEn(e.target.value)}
              placeholder="e.g. Ongoing through Oct 15! Explore 60+ wholesale showrooms."
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ban-msg-ar" className="text-right block" dir="rtl">
              الرسالة التوضيحية (بالعربية)
            </Label>
            <Input
              id="ban-msg-ar"
              value={messageAr}
              onChange={(e) => setMessageAr(e.target.value)}
              placeholder="مثال: مستمر حتى 15 أكتوبر! اكتشف أكثر من 60 صالة عرض."
              dir="rtl"
              required
            />
          </div>
        </div>

        {/* Location Bilingual */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ban-loc-en">Location Pin (EN - Optional)</Label>
            <Input
              id="ban-loc-en"
              value={locationEn}
              onChange={(e) => setLocationEn(e.target.value)}
              placeholder="e.g. Fagala Plaza, Nasr City"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ban-loc-ar" className="text-right block" dir="rtl">
              الموقع الجغرافي (بالعربية)
            </Label>
            <Input
              id="ban-loc-ar"
              value={locationAr}
              onChange={(e) => setLocationAr(e.target.value)}
              placeholder="مثال: فجالة بلازا، مدينة نصر"
              dir="rtl"
            />
          </div>
        </div>

        {/* Date Range Scheduling */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ban-start">Active From (Date & Time)</Label>
            <Input
              id="ban-start"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ban-end">Active To (Date & Time)</Label>
            <Input
              id="ban-end"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Target Link & CTA Labels */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="ban-url">Target Link URL</Label>
            <Input
              id="ban-url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="/activities/fagala-stationery-bazaar"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="ban-btn-en">Button Label (EN)</Label>
            <Input
              id="ban-btn-en"
              value={linkLabelEn}
              onChange={(e) => setLinkLabelEn(e.target.value)}
              placeholder="e.g. Learn More"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-1">
            <Label htmlFor="ban-btn-ar" className="text-right block" dir="rtl">
              نص الزر (بالعربية)
            </Label>
            <Input
              id="ban-btn-ar"
              value={linkLabelAr}
              onChange={(e) => setLinkLabelAr(e.target.value)}
              placeholder="مثال: التفاصيل"
              dir="rtl"
            />
          </div>
        </div>

        {/* Controls: Active, Dismissible, Priority */}
        <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border/80 bg-secondary/30 p-4">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-4 w-4 rounded accent-primary"
            />
            <span>Active (Will display during scheduled dates)</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={dismissible}
              onChange={(e) => setDismissible(e.target.checked)}
              className="h-4 w-4 rounded accent-primary"
            />
            <span>Dismissible by visitor</span>
          </label>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <Label htmlFor="ban-priority">Priority:</Label>
            <Input
              id="ban-priority"
              type="number"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
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
            "Save Banner"
          ) : (
            "Create Banner"
          )}
        </Button>
      </DialogFooter>
    </form>
  )
}

export function NexusBannerModal({
  open,
  onOpenChange,
  banner,
  onSaved,
}: NexusBannerModalProps) {
  const isEditing = !!banner

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Configure Notification Banner" : "New Announcement Banner"}
          </DialogTitle>
          <DialogDescription>
            Banners automatically appear at the top of all public pages for set calendar date windows.
          </DialogDescription>
        </DialogHeader>

        {open && (
          <BannerFormContent
            key={banner?.id || "new-banner"}
            banner={banner}
            onSaved={onSaved}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
