"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Save, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { saveSiteSettingAction } from "@/lib/content/actions"
import type { CeoProfile } from "@/types/cre"

const ceoProfileSchema = z.object({
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  roleEn: z.string().min(2, "English role is required"),
  roleAr: z.string().min(2, "Arabic role is required"),
  educationEn: z.string(),
  educationAr: z.string(),
  experienceYears: z.number().positive("Experience years must be positive"),
  heritageDecades: z.number().positive("Heritage decades must be positive"),
  phone: z.string().min(5, "Direct phone is required"),
  altPhone: z.string(),
  email: z.string().email("Valid email is required"),
  whatsapp: z.string(),
  salutationEn: z.string(),
  salutationAr: z.string(),
  openingEn: z.string(),
  openingAr: z.string(),
  paragraphsTextEn: z.string(),
  paragraphsTextAr: z.string(),
  closingEn: z.string(),
  closingAr: z.string(),
})

type CeoProfileFormData = z.infer<typeof ceoProfileSchema>

interface NexusCeoTabProps {
  ceoProfile: CeoProfile
  onRefresh?: () => void
}

export function NexusCeoTab({ ceoProfile, onRefresh }: NexusCeoTabProps) {
  const router = useRouter()
  const defaultValues: CeoProfileFormData = {
    nameEn: ceoProfile.name.en,
    nameAr: ceoProfile.name.ar,
    roleEn: ceoProfile.role.en,
    roleAr: ceoProfile.role.ar,
    educationEn: ceoProfile.education.en,
    educationAr: ceoProfile.education.ar,
    experienceYears: ceoProfile.experienceYears,
    heritageDecades: ceoProfile.regionalHeritageDecades,
    phone: ceoProfile.directReach.phone,
    altPhone: ceoProfile.directReach.altPhone,
    email: ceoProfile.directReach.email,
    whatsapp: ceoProfile.directReach.whatsapp,
    salutationEn: ceoProfile.formalAddress.salutation.en,
    salutationAr: ceoProfile.formalAddress.salutation.ar,
    openingEn: ceoProfile.formalAddress.opening.en,
    openingAr: ceoProfile.formalAddress.opening.ar,
    paragraphsTextEn: ceoProfile.formalAddress.paragraphs
      .map((p) => p.en)
      .join("\n\n---\n\n"),
    paragraphsTextAr: ceoProfile.formalAddress.paragraphs
      .map((p) => p.ar)
      .join("\n\n---\n\n"),
    closingEn: ceoProfile.formalAddress.closing.en,
    closingAr: ceoProfile.formalAddress.closing.ar,
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CeoProfileFormData>({
    resolver: zodResolver(ceoProfileSchema),
    defaultValues,
  })

  const onSubmit = async (data: CeoProfileFormData) => {
    const parasEn = data.paragraphsTextEn
      .split("\n\n---\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
    const parasAr = data.paragraphsTextAr
      .split("\n\n---\n\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)

    const combinedParas = parasEn.map((en, i) => ({
      en,
      ar: parasAr[i] || parasAr[0] || en,
    }))

    const updated: CeoProfile = {
      ...ceoProfile,
      name: { en: data.nameEn.trim(), ar: data.nameAr.trim() },
      role: { en: data.roleEn.trim(), ar: data.roleAr.trim() },
      education: { en: data.educationEn.trim(), ar: data.educationAr.trim() },
      experienceYears: Number(data.experienceYears),
      regionalHeritageDecades: Number(data.heritageDecades),
      directReach: {
        ...ceoProfile.directReach,
        phone: data.phone.trim(),
        altPhone: data.altPhone?.trim() || "",
        email: data.email.trim(),
        whatsapp: data.whatsapp?.trim() || "",
      },
      formalAddress: {
        salutation: {
          en: data.salutationEn.trim(),
          ar: data.salutationAr.trim(),
        },
        opening: { en: data.openingEn.trim(), ar: data.openingAr.trim() },
        paragraphs: combinedParas,
        closing: { en: data.closingEn.trim(), ar: data.closingAr.trim() },
      },
    }

    try {
      await saveSiteSettingAction("ceo_profile", updated)
      toast.success("CEO Profile & Address updated successfully!")
      if (onRefresh) {
        onRefresh()
      } else {
        router.refresh()
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save CEO profile."
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Executive Leadership & CEO Vision
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Eng. Tarek Ahmed&apos;s executive credentials, formal address,
            direct office reach, and corporate vision.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="self-start bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:self-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="me-1.5 size-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="me-1.5 size-3.5" />
              Save CEO Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="text-xs">
            Executive Profile
          </TabsTrigger>
          <TabsTrigger value="contact" className="text-xs">
            Direct Office Reach
          </TabsTrigger>
          <TabsTrigger value="address" className="text-xs">
            Formal Address & Letter
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: EXECUTIVE PROFILE */}
        <TabsContent value="profile" className="space-y-4 pt-4">
          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Executive Name (English)
                  </Label>
                  <Input {...register("nameEn")} />
                  {errors.nameEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.nameEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    اسم القيادة التنفيذية (عربي)
                  </Label>
                  <Input {...register("nameAr")} />
                  {errors.nameAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.nameAr.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Corporate Role / Title (English)
                  </Label>
                  <Input {...register("roleEn")} />
                  {errors.roleEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.roleEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    المسمى الوظيفي (عربي)
                  </Label>
                  <Input {...register("roleAr")} />
                  {errors.roleAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.roleAr.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Academic Credentials (English)
                  </Label>
                  <Input {...register("educationEn")} />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    المؤهل الأكاديمي (عربي)
                  </Label>
                  <Input {...register("educationAr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Years of Experience
                  </Label>
                  <Input
                    type="number"
                    {...register("experienceYears", { valueAsNumber: true })}
                  />
                  {errors.experienceYears && (
                    <p className="text-[11px] text-destructive">
                      {errors.experienceYears.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Regional Heritage Decades
                  </Label>
                  <Input
                    type="number"
                    {...register("heritageDecades", { valueAsNumber: true })}
                  />
                  {errors.heritageDecades && (
                    <p className="text-[11px] text-destructive">
                      {errors.heritageDecades.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: DIRECT REACH */}
        <TabsContent value="contact" className="space-y-4 pt-4">
          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Direct Executive Phone
                  </Label>
                  <Input {...register("phone")} />
                  {errors.phone && (
                    <p className="text-[11px] text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Secondary Executive Line
                  </Label>
                  <Input {...register("altPhone")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Official Executive Email
                  </Label>
                  <Input type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-[11px] text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Executive WhatsApp Coordination
                  </Label>
                  <Input {...register("whatsapp")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: FORMAL ADDRESS & LETTER */}
        <TabsContent value="address" className="space-y-4 pt-4">
          <Card className="border-border/80 bg-card/80">
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Salutation (English)
                  </Label>
                  <Input {...register("salutationEn")} />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    التحية والاستهلال (عربي)
                  </Label>
                  <Input {...register("salutationAr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Opening Sentence (English)
                  </Label>
                  <Textarea rows={2} {...register("openingEn")} />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    جملة الافتتاحية (عربي)
                  </Label>
                  <Textarea rows={2} {...register("openingAr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Letter Paragraphs (English - separate paragraphs with
                    &quot;---&quot;)
                  </Label>
                  <Textarea rows={8} {...register("paragraphsTextEn")} />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    فقرات الرسالة (عربي - افصل بين الفقرات بـ &quot;---&quot;)
                  </Label>
                  <Textarea rows={8} {...register("paragraphsTextAr")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">
                    Closing Salutation (English)
                  </Label>
                  <Input {...register("closingEn")} />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label className="text-xs font-medium">
                    خاتمة الخطاب (عربي)
                  </Label>
                  <Input {...register("closingAr")} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  )
}
