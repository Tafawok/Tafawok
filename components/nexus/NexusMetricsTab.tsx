"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { TrendingUp, Pencil, Loader2 } from "lucide-react"
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
import { saveMetricAction } from "@/lib/content/actions"
import type { CorporateMetric } from "@/types/cre"

const metricModalSchema = z.object({
  value: z.number().positive("Value must be a positive number"),
  suffix: z.string(),
  labelEn: z.string().min(2, "English label is required"),
  labelAr: z.string().min(2, "Arabic label is required"),
  descEn: z.string(),
  descAr: z.string(),
})

type MetricModalFormData = z.infer<typeof metricModalSchema>

interface NexusMetricsTabProps {
  metrics: CorporateMetric[]
  onRefresh?: () => void
}

interface MetricFormModalProps {
  metric: CorporateMetric
  index: number
  onRefresh: () => void
  onClose: () => void
}

function MetricFormModal({
  metric,
  index,
  onRefresh,
  onClose,
}: MetricFormModalProps) {
  const defaultValues: MetricModalFormData = {
    value: metric.value,
    suffix: metric.suffix || "",
    labelEn: metric.label.en,
    labelAr: metric.label.ar,
    descEn: metric.description.en,
    descAr: metric.description.ar,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MetricModalFormData>({
    resolver: zodResolver(metricModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: MetricModalFormData) => {
    const metricId = `metric-${index + 1}`

    const updated: CorporateMetric = {
      value: Number(data.value),
      suffix: data.suffix?.trim() || "",
      label: { en: data.labelEn.trim(), ar: data.labelAr.trim() },
      description: {
        en: data.descEn?.trim() || "",
        ar: data.descAr?.trim() || "",
      },
    }

    try {
      await saveMetricAction(metricId, updated, index)
      toast.success("Corporate metric updated successfully!")
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update metric."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Metric: {metric.label.en}</DialogTitle>
        <DialogDescription>
          Modify the numerical value, suffix, bilingual titles, and
          descriptions.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Numerical Value</Label>
              <Input type="number" {...register("value", { valueAsNumber: true })} />
              {errors.value && (
                <p className="text-[11px] text-destructive">
                  {errors.value.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Suffix (e.g. &quot;+&quot;, &quot; m²&quot;)
              </Label>
              <Input {...register("suffix")} placeholder="+" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Label (English)</Label>
              <Input {...register("labelEn")} />
              {errors.labelEn && (
                <p className="text-[11px] text-destructive">
                  {errors.labelEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">التسمية (عربي)</Label>
              <Input {...register("labelAr")} />
              {errors.labelAr && (
                <p className="text-[11px] text-destructive">
                  {errors.labelAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Description (English)
              </Label>
              <Textarea rows={3} {...register("descEn")} />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label className="text-xs font-medium">الوصف (عربي)</Label>
              <Textarea rows={3} {...register("descAr")} />
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
              "Save Metric"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusMetricsTab({ metrics, onRefresh }: NexusMetricsTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [selectedMetric, setSelectedMetric] =
    React.useState<CorporateMetric | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleEdit = (m: CorporateMetric, idx: number) => {
    setSelectedMetric(m)
    setSelectedIndex(idx)
    setModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Corporate Hero Metrics
        </h2>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Live numerical track record displayed across the website hero and
          corporate credentials section.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <Card
            key={idx}
            className="flex flex-col justify-between border-border/80 bg-card/80 transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <CardContent className="space-y-4 p-5">
              <div className="flex items-start justify-between">
                <div className="rounded-lg border border-primary/20 bg-primary/10 p-2.5 text-primary">
                  <TrendingUp className="size-5" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(m, idx)}
                  className="h-7 text-xs"
                >
                  <Pencil className="me-1 size-3" />
                  Edit
                </Button>
              </div>

              <div>
                <div className="text-3xl font-extrabold tracking-tight text-foreground">
                  {m.value.toLocaleString()}
                  <span className="ms-0.5 text-xl font-bold text-primary">
                    {m.suffix}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">
                  {m.label.en}
                </h3>
                <p className="text-xs font-medium text-primary">{m.label.ar}</p>
              </div>

              <div className="space-y-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <p>{m.description.en}</p>
                <p className="text-[11px] text-muted-foreground/80" dir="rtl">
                  {m.description.ar}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-lg">
          {modalOpen && selectedMetric && (
            <MetricFormModal
              key={`metric-${selectedIndex}`}
              metric={selectedMetric}
              index={selectedIndex}
              onRefresh={handleRefresh}
              onClose={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
