"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, CheckCircle2, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import {
  saveMilestoneAction,
  deleteMilestoneAction,
} from "@/lib/content/actions"
import type { TimelineMilestone } from "@/types/cre"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const timelineModalSchema = z.object({
  year: z.string().min(4, "Year must be at least 4 digits"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  badgeEn: z.string(),
  badgeAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  scopeCategory: z.enum([
    "heritage",
    "infrastructure",
    "commercial",
    "expansion",
  ]),
  highlightsText: z.string(),
})

type TimelineModalFormData = z.infer<typeof timelineModalSchema>

interface NexusTimelineTabProps {
  milestones: TimelineMilestone[]
  onRefresh?: () => void
}

interface MilestoneFormModalProps {
  milestone?: TimelineMilestone | null
  onRefresh: () => void
  onClose: () => void
}

function MilestoneFormModal({
  milestone,
  onRefresh,
  onClose,
}: MilestoneFormModalProps) {
  const isEditing = !!milestone

  const defaultValues: TimelineModalFormData = {
    year: milestone?.year || "",
    titleEn: milestone?.title.en || "",
    titleAr: milestone?.title.ar || "",
    badgeEn: milestone?.badge?.en || "",
    badgeAr: milestone?.badge?.ar || "",
    descEn: milestone?.description.en || "",
    descAr: milestone?.description.ar || "",
    scopeCategory: milestone?.scopeCategory || "commercial",
    highlightsText: (milestone?.highlights || [])
      .map((h) => `${h.en} | ${h.ar}`)
      .join("\n"),
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TimelineModalFormData>({
    resolver: zodResolver(timelineModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: TimelineModalFormData) => {
    const parsedHighlights = data.highlightsText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .map((line) => {
        const parts = line.split("|")
        return {
          en: parts[0]?.trim() || line,
          ar: parts[1]?.trim() || parts[0]?.trim() || line,
        }
      })

    const milestoneId = `milestone-${data.year.trim()}`

    const updated: TimelineMilestone = {
      year: data.year.trim(),
      badge: { en: data.badgeEn.trim(), ar: data.badgeAr.trim() },
      title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
      description: { en: data.descEn.trim(), ar: data.descAr.trim() },
      scopeCategory: data.scopeCategory,
      highlights: parsedHighlights,
    }

    try {
      await saveMilestoneAction(milestoneId, updated)
      toast.success(
        isEditing
          ? "Milestone updated successfully!"
          : "Milestone created successfully!"
      )
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save milestone."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing
            ? `Edit Milestone: ${milestone?.year}`
            : "Add New Milestone"}
        </DialogTitle>
        <DialogDescription>
          Configure timeline year, bilingual scope, and operational highlights.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Year / Era (e.g. 1974, 2026)
              </Label>
              <Input {...register("year")} placeholder="1974" />
              {errors.year && (
                <p className="text-[11px] text-destructive">
                  {errors.year.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Badge (English)</Label>
              <Input
                {...register("badgeEn")}
                placeholder="Heritage Foundation"
              />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الشارة (عربي)</Label>
              <Input {...register("badgeAr")} placeholder="التأسيس والانطلاق" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Title (English)</Label>
              <Input
                {...register("titleEn")}
                placeholder="Foundational Commercial Contracting"
              />
              {errors.titleEn && (
                <p className="text-[11px] text-destructive">
                  {errors.titleEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">العنوان (عربي)</Label>
              <Input
                {...register("titleAr")}
                placeholder="تأسيس المقاولات وتطوير البنية"
              />
              {errors.titleAr && (
                <p className="text-[11px] text-destructive">
                  {errors.titleAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Core Scope Category</Label>
            <Controller
              control={control}
              name="scopeCategory"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-8 w-full text-xs">
                    <SelectValue placeholder="Select scope category..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                      <SelectItem value="heritage">Heritage & Founding</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure & Contracting</SelectItem>
                      <SelectItem value="expansion">Regional Expansion</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Narrative Description (English)
              </Label>
              <Textarea
                rows={3}
                {...register("descEn")}
                placeholder="Historic context of achievements during this era..."
              />
              {errors.descEn && (
                <p className="text-[11px] text-destructive">
                  {errors.descEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">
                السرد التاريخي (عربي)
              </Label>
              <Textarea
                rows={3}
                {...register("descAr")}
                placeholder="السياق التاريخي للإنجازات..."
              />
              {errors.descAr && (
                <p className="text-[11px] text-destructive">
                  {errors.descAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Highlights (One per line: &quot;English | Arabic&quot;)
            </Label>
            <Textarea
              rows={3}
              {...register("highlightsText")}
              placeholder="Over 150,000 m² executed | تنفيذ أكثر من 150 ألف متر مربع"
            />
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="me-2 size-3.5 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Milestone"
            ) : (
              "Create Milestone"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusTimelineTab({
  milestones,
  onRefresh,
}: NexusTimelineTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [selectedMilestone, setSelectedMilestone] =
    React.useState<TimelineMilestone | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const handleCreate = () => {
    setSelectedMilestone(null)
    setModalOpen(true)
  }

  const handleEdit = (m: TimelineMilestone) => {
    setSelectedMilestone(m)
    setModalOpen(true)
  }

  const handleDelete = async (m: TimelineMilestone) => {
    if (!confirm(`Are you sure you want to delete milestone ${m.year}?`)) return
    const milestoneId = `milestone-${m.year}`
    setDeletingId(milestoneId)

    try {
      await deleteMilestoneAction(milestoneId)
      toast.success("Milestone deleted successfully!")
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete milestone."
      toast.error(message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Heritage & Historical Timeline
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            50+ years of institutional engineering track record and commercial
            milestones since 1974.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="self-start bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:self-auto"
        >
          <Plus className="me-1.5 size-3.5" />
          Add Milestone
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {milestones.map((m) => (
          <Card
            key={m.year}
            className="flex flex-col justify-between border-border/80 bg-card/80 transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xl font-extrabold text-primary">
                    {m.year}
                  </div>
                  {m.badge && (
                    <Badge variant="outline" className="text-xs">
                      {m.badge.en}
                    </Badge>
                  )}
                </div>

                <Badge variant="secondary" className="text-[11px]">
                  {m.scopeCategory}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground">
                  {m.title.en}
                </h3>
                <p className="text-xs font-medium text-primary" dir="rtl">
                  {m.title.ar}
                </p>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                {m.description.en}
              </p>

              {m.highlights && m.highlights.length > 0 && (
                <div className="border-t border-border/60 pt-3">
                  <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Key Highlights
                  </div>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {m.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                        <span className="truncate">{h.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(m)}
                  className="h-7 text-xs"
                >
                  <Pencil className="me-1 size-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(m)}
                  disabled={deletingId === `milestone-${m.year}`}
                  className="h-7 text-xs text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
          {modalOpen && (
            <MilestoneFormModal
              key={selectedMilestone?.year || "new-milestone"}
              milestone={selectedMilestone}
              onRefresh={handleRefresh}
              onClose={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
