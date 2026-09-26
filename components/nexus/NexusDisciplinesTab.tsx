"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Pencil, CheckCircle, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
import { saveDisciplineAction } from "@/lib/content/actions"
import type { CommercialDiscipline } from "@/types/cre"

const disciplineModalSchema = z.object({
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  metricValue: z.string().min(1, "Metric value is required"),
  metricLabelEn: z.string().min(1, "Metric English label is required"),
  metricLabelAr: z.string().min(1, "Metric Arabic label is required"),
  featuresText: z.string(),
  iconName: z.enum(["building-2", "shopping-bag", "warehouse", "hard-hat"]),
})

type DisciplineModalFormData = z.infer<typeof disciplineModalSchema>

interface NexusDisciplinesTabProps {
  disciplines: CommercialDiscipline[]
  onRefresh?: () => void
}

interface DisciplineFormModalProps {
  discipline: CommercialDiscipline
  onRefresh: () => void
  onClose: () => void
}

function DisciplineFormModal({
  discipline,
  onRefresh,
  onClose,
}: DisciplineFormModalProps) {
  const defaultValues: DisciplineModalFormData = {
    titleEn: discipline.title.en,
    titleAr: discipline.title.ar,
    taglineEn: discipline.tagline.en,
    taglineAr: discipline.tagline.ar,
    descEn: discipline.description.en,
    descAr: discipline.description.ar,
    metricValue: discipline.keyMetric.value,
    metricLabelEn: discipline.keyMetric.label.en,
    metricLabelAr: discipline.keyMetric.label.ar,
    featuresText: discipline.features
      .map((f) => `${f.en} | ${f.ar}`)
      .join("\n"),
    iconName: discipline.iconName,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DisciplineModalFormData>({
    resolver: zodResolver(disciplineModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: DisciplineModalFormData) => {
    const parsedFeatures = data.featuresText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => {
        const parts = line.split("|")
        return {
          en: parts[0]?.trim() || line,
          ar: parts[1]?.trim() || parts[0]?.trim() || line,
        }
      })

    const updated: CommercialDiscipline = {
      ...discipline,
      title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
      tagline: { en: data.taglineEn.trim(), ar: data.taglineAr.trim() },
      description: { en: data.descEn.trim(), ar: data.descAr.trim() },
      keyMetric: {
        value: data.metricValue.trim(),
        label: { en: data.metricLabelEn.trim(), ar: data.metricLabelAr.trim() },
      },
      features: parsedFeatures,
      iconName: data.iconName,
    }

    try {
      await saveDisciplineAction(updated)
      toast.success("Discipline updated successfully!")
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update discipline."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Edit Commercial Discipline: {discipline.title.en}
        </DialogTitle>
        <DialogDescription>
          Update corporate copy, benchmark metrics, and features list.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Title (English)</Label>
              <Input {...register("titleEn")} />
              {errors.titleEn && (
                <p className="text-[11px] text-destructive">
                  {errors.titleEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">العنوان (عربي)</Label>
              <Input {...register("titleAr")} />
              {errors.titleAr && (
                <p className="text-[11px] text-destructive">
                  {errors.titleAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tagline (English)</Label>
              <Input {...register("taglineEn")} />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">
                الشعار الموجز (عربي)
              </Label>
              <Input {...register("taglineAr")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Description (English)
              </Label>
              <Textarea rows={4} {...register("descEn")} />
              {errors.descEn && (
                <p className="text-[11px] text-destructive">
                  {errors.descEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">
                الوصف التفصيلي (عربي)
              </Label>
              <Textarea rows={4} {...register("descAr")} />
              {errors.descAr && (
                <p className="text-[11px] text-destructive">
                  {errors.descAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Metric Value</Label>
              <Input {...register("metricValue")} placeholder="45,000 m²" />
              {errors.metricValue && (
                <p className="text-[11px] text-destructive">
                  {errors.metricValue.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Metric Label (EN)</Label>
              <Input
                {...register("metricLabelEn")}
                placeholder="Gross Leasable Area"
              />
              {errors.metricLabelEn && (
                <p className="text-[11px] text-destructive">
                  {errors.metricLabelEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">تسمية المؤشر (عربي)</Label>
              <Input
                {...register("metricLabelAr")}
                placeholder="إجمالي المساحة التأجيرية"
              />
              {errors.metricLabelAr && (
                <p className="text-[11px] text-destructive">
                  {errors.metricLabelAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Icon Selection</Label>
            <select
              {...register("iconName")}
              className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs"
            >
              <option value="building-2">Building 2 (Office)</option>
              <option value="shopping-bag">Shopping Bag (Retail)</option>
              <option value="warehouse">Warehouse (Industrial & Business Parks)</option>
              <option value="hard-hat">Hard Hat (Turnkey EPC)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Key Features (One per line: &quot;English | Arabic&quot;)
            </Label>
            <Textarea
              rows={4}
              {...register("featuresText")}
              placeholder="Grade-A corporate floorplates | مساحات إدارية من الفئة الأولى"
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
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusDisciplinesTab({
  disciplines,
  onRefresh,
}: NexusDisciplinesTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [selectedDiscipline, setSelectedDiscipline] =
    React.useState<CommercialDiscipline | null>(null)
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleEdit = (d: CommercialDiscipline) => {
    setSelectedDiscipline(d)
    setModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Core Commercial Disciplines
        </h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Strategic business pillars: Office Towers, Retail Hubs, Logistics
          Parks, and Turnkey EPC Contracting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {disciplines.map((d) => (
          <Card
            key={d.id}
            className="border-border/80 bg-card/80 transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-start justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  {d.title.en}
                </CardTitle>
                <p className="text-xs font-medium text-primary">{d.title.ar}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {d.tagline.en}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(d)}
                className="h-7 text-xs"
              >
                <Pencil className="me-1 size-3" />
                Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                {d.description.en}
              </p>

              <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 p-3">
                <div>
                  <div className="text-lg font-bold text-primary">
                    {d.keyMetric.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {d.keyMetric.label.en}
                  </div>
                </div>
                <div className="text-end" dir="rtl">
                  <div className="text-xs font-semibold text-foreground">
                    {d.keyMetric.label.ar}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    مؤشر الإنجاز
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Technical Specifications & Capabilities
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {d.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate">{f.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
          {modalOpen && selectedDiscipline && (
            <DisciplineFormModal
              key={selectedDiscipline.id}
              discipline={selectedDiscipline}
              onRefresh={handleRefresh}
              onClose={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
