"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Save, Loader2, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { saveSiteSettingAction } from "@/lib/content/actions"
import type { HseCharter } from "@/types/cre"

const hseTabSchema = z.object({
  policyEn: z.string().min(10, "English policy statement is required"),
  policyAr: z.string().min(10, "Arabic policy statement is required"),
  signatoryNameEn: z.string().min(2, "Signatory English name is required"),
  signatoryNameAr: z.string().min(2, "Signatory Arabic name is required"),
  signatoryRoleEn: z.string().min(2, "Signatory English role is required"),
  signatoryRoleAr: z.string().min(2, "Signatory Arabic role is required"),
})

type HseTabFormData = z.infer<typeof hseTabSchema>

interface NexusHseTabProps {
  hseCharter: HseCharter
  onRefresh?: () => void
}

export function NexusHseTab({ hseCharter, onRefresh }: NexusHseTabProps) {
  const router = useRouter()
  const defaultValues: HseTabFormData = {
    policyEn: hseCharter.policyStatement.en,
    policyAr: hseCharter.policyStatement.ar,
    signatoryNameEn: hseCharter.signatory.name.en,
    signatoryNameAr: hseCharter.signatory.name.ar,
    signatoryRoleEn: hseCharter.signatory.role.en,
    signatoryRoleAr: hseCharter.signatory.role.ar,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HseTabFormData>({
    resolver: zodResolver(hseTabSchema),
    defaultValues,
  })

  const onSubmit = async (data: HseTabFormData) => {
    const updated: HseCharter = {
      ...hseCharter,
      policyStatement: { en: data.policyEn.trim(), ar: data.policyAr.trim() },
      signatory: {
        name: {
          en: data.signatoryNameEn.trim(),
          ar: data.signatoryNameAr.trim(),
        },
        role: {
          en: data.signatoryRoleEn.trim(),
          ar: data.signatoryRoleAr.trim(),
        },
      },
    }

    try {
      await saveSiteSettingAction("hse_charter", updated)
      toast.success("HSE Charter & Quality Policy updated successfully!")
      if (onRefresh) {
        onRefresh()
      } else {
        router.refresh()
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save HSE Charter."
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            HSE & Quality Governance Charter
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Zero-Harm policy, ISO quality certifications, and environmental
            safety charters.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="self-start bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:self-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="me-1.5 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="me-1.5 size-3.5" />
              Save Charter
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Policy Statement */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <ShieldCheck className="size-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">
                  Zero-Harm Policy Declaration
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Policy Statement (English)
                  </Label>
                  <Textarea rows={4} {...register("policyEn")} />
                  {errors.policyEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.policyEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    إعلان ميثاق السلامة (عربي)
                  </Label>
                  <Textarea rows={4} {...register("policyAr")} />
                  {errors.policyAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.policyAr.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <h3 className="text-sm font-bold text-foreground">
                  Charter Signatory / Executive Authority
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Signatory Name (English)
                  </Label>
                  <Input {...register("signatoryNameEn")} />
                  {errors.signatoryNameEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.signatoryNameEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    اسم المعتمد (عربي)
                  </Label>
                  <Input {...register("signatoryNameAr")} />
                  {errors.signatoryNameAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.signatoryNameAr.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Signatory Title (English)
                  </Label>
                  <Input {...register("signatoryRoleEn")} />
                  {errors.signatoryRoleEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.signatoryRoleEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    المسمى الوظيفي للمعتمد (عربي)
                  </Label>
                  <Input {...register("signatoryRoleAr")} />
                  {errors.signatoryRoleAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.signatoryRoleAr.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications Overview */}
        <div>
          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-sm font-bold text-foreground">
                Active ISO Certifications
              </h3>
              <p className="text-xs text-muted-foreground">
                Institutional compliance frameworks audited annually across all
                construction sites and operational commercial assets.
              </p>

              <div className="space-y-3 pt-2">
                {hseCharter.standards.map((s, idx) => (
                  <div
                    key={idx}
                    className="space-y-1 rounded-lg border border-border/60 bg-muted/30 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        {s.code}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {s.name}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-foreground">
                      {s.description.en}
                    </div>
                    <div className="text-[11px] text-primary" dir="rtl">
                      {s.description.ar}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
