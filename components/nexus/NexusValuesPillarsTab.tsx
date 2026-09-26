"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Pencil, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
import { saveValueAction, savePillarAction } from "@/lib/content/actions"
import type { CorporateValue, InvestmentPillar } from "@/types/cre"

const valueModalSchema = z.object({
  number: z.string().min(1, "Number is required"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
})

type ValueModalFormData = z.infer<typeof valueModalSchema>

const pillarModalSchema = z.object({
  number: z.string().min(1, "Number is required"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  metricVal: z.string().min(1, "Metric value is required"),
  metricLabelEn: z.string().min(1, "Metric English label is required"),
  metricLabelAr: z.string().min(1, "Metric Arabic label is required"),
})

type PillarModalFormData = z.infer<typeof pillarModalSchema>

interface NexusValuesPillarsTabProps {
  values: CorporateValue[]
  pillars: InvestmentPillar[]
  onRefresh?: () => void
}

interface ValueFormModalProps {
  value: CorporateValue
  onRefresh: () => void
  onClose: () => void
}

function ValueFormModal({ value, onRefresh, onClose }: ValueFormModalProps) {
  const defaultValues: ValueModalFormData = {
    number: value.number,
    titleEn: value.title.en,
    titleAr: value.title.ar,
    taglineEn: value.tagline.en,
    taglineAr: value.tagline.ar,
    descEn: value.description.en,
    descAr: value.description.ar,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ValueModalFormData>({
    resolver: zodResolver(valueModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: ValueModalFormData) => {
    const updated: CorporateValue = {
      ...value,
      number: data.number.trim(),
      title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
      tagline: {
        en: data.taglineEn?.trim() || "",
        ar: data.taglineAr?.trim() || "",
      },
      description: { en: data.descEn.trim(), ar: data.descAr.trim() },
    }

    try {
      await saveValueAction(updated)
      toast.success("Corporate value updated successfully!")
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save corporate value."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Value: {value.title.en}</DialogTitle>
        <DialogDescription>
          Configure corporate value statement and narrative.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Value Number (e.g. 01)
            </Label>
            <Input {...register("number")} />
            {errors.number && (
              <p className="text-[11px] text-destructive">
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Title (EN)</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tagline (EN)</Label>
              <Input {...register("taglineEn")} />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الشعار (عربي)</Label>
              <Input {...register("taglineAr")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Description (EN)</Label>
              <Textarea rows={3} {...register("descEn")} />
              {errors.descEn && (
                <p className="text-[11px] text-destructive">
                  {errors.descEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الوصف (عربي)</Label>
              <Textarea rows={3} {...register("descAr")} />
              {errors.descAr && (
                <p className="text-[11px] text-destructive">
                  {errors.descAr.message}
                </p>
              )}
            </div>
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
              "Save Value"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

interface PillarFormModalProps {
  pillar: InvestmentPillar
  onRefresh: () => void
  onClose: () => void
}

function PillarFormModal({ pillar, onRefresh, onClose }: PillarFormModalProps) {
  const defaultValues: PillarModalFormData = {
    number: pillar.number,
    titleEn: pillar.title.en,
    titleAr: pillar.title.ar,
    taglineEn: pillar.tagline.en,
    taglineAr: pillar.tagline.ar,
    descEn: pillar.description.en,
    descAr: pillar.description.ar,
    metricVal: pillar.metric.value,
    metricLabelEn: pillar.metric.label.en,
    metricLabelAr: pillar.metric.label.ar,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PillarModalFormData>({
    resolver: zodResolver(pillarModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: PillarModalFormData) => {
    const updated: InvestmentPillar = {
      ...pillar,
      number: data.number.trim(),
      title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
      tagline: {
        en: data.taglineEn?.trim() || "",
        ar: data.taglineAr?.trim() || "",
      },
      description: { en: data.descEn.trim(), ar: data.descAr.trim() },
      metric: {
        value: data.metricVal.trim(),
        label: { en: data.metricLabelEn.trim(), ar: data.metricLabelAr.trim() },
      },
    }

    try {
      await savePillarAction(updated)
      toast.success("Investment pillar updated successfully!")
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save investment pillar."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Pillar: {pillar.title.en}</DialogTitle>
        <DialogDescription>
          Configure investment thesis pillar and quantitative metric.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">
              Pillar Number (e.g. 01)
            </Label>
            <Input {...register("number")} />
            {errors.number && (
              <p className="text-[11px] text-destructive">
                {errors.number.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Title (EN)</Label>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tagline (EN)</Label>
              <Input {...register("taglineEn")} />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الشعار (عربي)</Label>
              <Input {...register("taglineAr")} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Metric Value</Label>
              <Input {...register("metricVal")} placeholder="100%" />
              {errors.metricVal && (
                <p className="text-[11px] text-destructive">
                  {errors.metricVal.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Metric Label (EN)</Label>
              <Input
                {...register("metricLabelEn")}
                placeholder="Self-Financed Projects"
              />
              {errors.metricLabelEn && (
                <p className="text-[11px] text-destructive">
                  {errors.metricLabelEn.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5" dir="rtl">
            <Label className="text-xs font-medium">تسمية المؤشر (عربي)</Label>
            <Input
              {...register("metricLabelAr")}
              placeholder="مشاريع ذاتية التمويل"
            />
            {errors.metricLabelAr && (
              <p className="text-[11px] text-destructive">
                {errors.metricLabelAr.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Description (EN)</Label>
              <Textarea rows={3} {...register("descEn")} />
              {errors.descEn && (
                <p className="text-[11px] text-destructive">
                  {errors.descEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الوصف (عربي)</Label>
              <Textarea rows={3} {...register("descAr")} />
              {errors.descAr && (
                <p className="text-[11px] text-destructive">
                  {errors.descAr.message}
                </p>
              )}
            </div>
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
              "Save Pillar"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusValuesPillarsTab({
  values,
  pillars,
  onRefresh,
}: NexusValuesPillarsTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [valModalOpen, setValModalOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] =
    React.useState<CorporateValue | null>(null)

  const [pillarModalOpen, setPillarModalOpen] = React.useState(false)
  const [selectedPillar, setSelectedPillar] =
    React.useState<InvestmentPillar | null>(null)

  const handleEditValue = (v: CorporateValue) => {
    setSelectedValue(v)
    setValModalOpen(true)
  }

  const handleEditPillar = (p: InvestmentPillar) => {
    setSelectedPillar(p)
    setPillarModalOpen(true)
  }

  return (
    <div className="space-y-10">
      {/* SECTION 1: CORPORATE VALUES */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Corporate Values & Charter
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Core principles defining operational discipline, client integrity,
            and institutional standards.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <Card
              key={v.id}
              className="flex flex-col justify-between border-border/80 bg-card/80 transition-all hover:border-primary/40"
            >
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                    {v.number}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditValue(v)}
                    className="h-6 px-2 text-xs"
                  >
                    <Pencil className="me-1 size-2.5" />
                    Edit
                  </Button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {v.title.en}
                  </h3>
                  <p className="text-xs font-medium text-primary">
                    {v.title.ar}
                  </p>
                </div>

                <p className="border-t border-border/40 pt-2 text-xs leading-relaxed text-muted-foreground">
                  {v.description.en}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* SECTION 2: INVESTMENT PILLARS */}
      <div className="space-y-4 border-t border-border/60 pt-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Investment Thesis Pillars
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Quantitative and structural parameters guiding asset acquisitions
            and commercial developments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <Card
              key={p.id}
              className="flex flex-col justify-between border-border/80 bg-card/80 transition-all hover:border-primary/40"
            >
              <CardContent className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                    {p.number}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPillar(p)}
                    className="h-6 px-2 text-xs"
                  >
                    <Pencil className="me-1 size-2.5" />
                    Edit
                  </Button>
                </div>

                <div>
                  <div className="text-xl font-extrabold text-primary">
                    {p.metric.value}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {p.metric.label.en}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {p.title.en}
                  </h3>
                  <p className="text-xs font-medium text-primary">
                    {p.title.ar}
                  </p>
                </div>

                <p className="border-t border-border/40 pt-2 text-xs leading-relaxed text-muted-foreground">
                  {p.description.en}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Value Edit Modal */}
      <Dialog open={valModalOpen} onOpenChange={setValModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-lg">
          {valModalOpen && selectedValue && (
            <ValueFormModal
              key={selectedValue.id}
              value={selectedValue}
              onRefresh={handleRefresh}
              onClose={() => setValModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Pillar Edit Modal */}
      <Dialog open={pillarModalOpen} onOpenChange={setPillarModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-lg">
          {pillarModalOpen && selectedPillar && (
            <PillarFormModal
              key={selectedPillar.id}
              pillar={selectedPillar}
              onRefresh={handleRefresh}
              onClose={() => setPillarModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
