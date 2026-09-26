"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Save, Loader2, Building, MapPin, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { saveSiteSettingAction } from "@/lib/content/actions"
import { MediaUploader } from "@/components/nexus/MediaUploader"
import type { CompanyIdentity } from "@/types/cre"

const companyIdentityTabSchema = z.object({
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  shortNameEn: z.string().min(2, "English short name is required"),
  shortNameAr: z.string().min(2, "Arabic short name is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  establishedYears: z.number().positive("Established years must be positive"),
  heritageDecades: z.number().positive("Heritage decades must be positive"),
  addressEn: z.string().min(3, "English address is required"),
  addressAr: z.string().min(3, "Arabic address is required"),
  mapsEmbed: z.string(),
  mapsLink: z.string(),
  primaryPhone: z.string().min(5, "Primary phone is required"),
  secondaryPhone: z.string(),
  fax: z.string(),
  email: z.string().email("Valid email is required"),
  primaryDomain: z.string().min(3, "Primary domain is required"),
  companyProfileUrl: z.string().optional(),
})

type CompanyIdentityTabFormData = z.infer<typeof companyIdentityTabSchema>

interface NexusCompanyIdentityTabProps {
  identity: CompanyIdentity
  onRefresh?: () => void
}

export function NexusCompanyIdentityTab({
  identity,
  onRefresh,
}: NexusCompanyIdentityTabProps) {
  const router = useRouter()
  const [profileUrl, setProfileUrl] = React.useState<string>(
    identity?.companyProfileUrl || ""
  )

  const defaultValues: CompanyIdentityTabFormData = {
    nameEn: identity?.name?.en || "",
    nameAr: identity?.name?.ar || "",
    shortNameEn: identity?.shortName?.en || "",
    shortNameAr: identity?.shortName?.ar || "",
    taglineEn: identity?.tagline?.en || "",
    taglineAr: identity?.tagline?.ar || "",
    establishedYears: identity?.establishedYears || 25,
    heritageDecades: identity?.heritageDecades || 5,
    addressEn: identity?.headquarters?.address?.en || "",
    addressAr: identity?.headquarters?.address?.ar || "",
    mapsEmbed: identity?.headquarters?.googleMapsEmbed || "",
    mapsLink: identity?.headquarters?.googleMapsLink || "",
    primaryPhone: identity?.contact?.primaryPhone || "",
    secondaryPhone: identity?.contact?.secondaryPhone || "",
    fax: identity?.contact?.fax || "",
    email: identity?.contact?.email || "",
    primaryDomain: identity?.contact?.primaryDomain || "",
    companyProfileUrl: identity?.companyProfileUrl || "",
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CompanyIdentityTabFormData>({
    resolver: zodResolver(companyIdentityTabSchema),
    defaultValues,
  })

  const onSubmit = async (data: CompanyIdentityTabFormData) => {
    const updated: CompanyIdentity = {
      name: { en: data.nameEn.trim(), ar: data.nameAr.trim() },
      shortName: { en: data.shortNameEn.trim(), ar: data.shortNameAr.trim() },
      tagline: {
        en: data.taglineEn?.trim() || "",
        ar: data.taglineAr?.trim() || "",
      },
      establishedYears: Number(data.establishedYears),
      heritageDecades: Number(data.heritageDecades),
      headquarters: {
        address: { en: data.addressEn.trim(), ar: data.addressAr.trim() },
        googleMapsEmbed: data.mapsEmbed?.trim() || "",
        googleMapsLink: data.mapsLink?.trim() || "",
      },
      contact: {
        primaryPhone: data.primaryPhone.trim(),
        secondaryPhone: data.secondaryPhone?.trim() || "",
        fax: data.fax?.trim() || "",
        email: data.email.trim(),
        primaryDomain: data.primaryDomain.trim(),
      },
      companyProfileUrl: profileUrl.trim() || undefined,
    }

    try {
      await saveSiteSettingAction("company_identity", updated)
      toast.success("Company identity, coordinates & profile document updated successfully!")
      if (onRefresh) {
        onRefresh()
      } else {
        router.refresh()
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update identity."
      toast.error(message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Company Identity & HQ Coordinates
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Official corporate entity name, New Cairo headquarters location, and
            investor relations contact coordinates.
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
              Save Coordinates
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* CARD 1: CORPORATE IDENTITY */}
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Building className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Official Corporate Entity
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Corporate Legal Name (English)
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
                  الاسم القانوني للشركة (عربي)
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
                  Brand / Short Name (English)
                </Label>
                <Input {...register("shortNameEn")} />
                {errors.shortNameEn && (
                  <p className="text-[11px] text-destructive">
                    {errors.shortNameEn.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5" dir="rtl">
                <Label className="text-xs font-medium">
                  الاسم التجاري المختصر (عربي)
                </Label>
                <Input {...register("shortNameAr")} />
                {errors.shortNameAr && (
                  <p className="text-[11px] text-destructive">
                    {errors.shortNameAr.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Corporate Tagline (English)
                </Label>
                <Input {...register("taglineEn")} />
              </div>
              <div className="space-y-1.5" dir="rtl">
                <Label className="text-xs font-medium">
                  الشعار المؤسسي (عربي)
                </Label>
                <Input {...register("taglineAr")} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Established Track Record (Years)
                </Label>
                <Input type="number" {...register("establishedYears", { valueAsNumber: true })} />
                {errors.establishedYears && (
                  <p className="text-[11px] text-destructive">
                    {errors.establishedYears.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Regional Heritage (Decades)
                </Label>
                <Input type="number" {...register("heritageDecades", { valueAsNumber: true })} />
                {errors.heritageDecades && (
                  <p className="text-[11px] text-destructive">
                    {errors.heritageDecades.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CARD 2: HEADQUARTERS & CONTACT */}
        <Card className="border-border/80 bg-card/80">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <MapPin className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                HQ Address & Contact Channels
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Headquarters Address (English)
                </Label>
                <Input {...register("addressEn")} />
                {errors.addressEn && (
                  <p className="text-[11px] text-destructive">
                    {errors.addressEn.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5" dir="rtl">
                <Label className="text-xs font-medium">
                  عنوان المقر الرئيسي (عربي)
                </Label>
                <Input {...register("addressAr")} />
                {errors.addressAr && (
                  <p className="text-[11px] text-destructive">
                    {errors.addressAr.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Primary Phone Number
                </Label>
                <Input {...register("primaryPhone")} />
                {errors.primaryPhone && (
                  <p className="text-[11px] text-destructive">
                    {errors.primaryPhone.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Secondary Phone / WhatsApp
                </Label>
                <Input {...register("secondaryPhone")} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Corporate Email</Label>
                <Input type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-[11px] text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">
                  Official Web Domain
                </Label>
                <Input {...register("primaryDomain")} />
                {errors.primaryDomain && (
                  <p className="text-[11px] text-destructive">
                    {errors.primaryDomain.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Google Maps Embed URL
              </Label>
              <Input {...register("mapsEmbed")} />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">
                Google Maps Direct Link
              </Label>
              <Input {...register("mapsLink")} />
            </div>
          </CardContent>
        </Card>

        {/* CARD 3: OFFICIAL COMPANY PROFILE & MEDIA ASSET */}
        <Card className="border-border/80 bg-card/80 lg:col-span-2">
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Corporate Profile & Marketing Portfolio (PDF / Media)
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    This official PDF document is downloaded by commercial tenants and institutional investors across the Homepage, About Us, Contact Us, and Global Footer.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-xs font-semibold text-foreground">
                  Upload or Replace Official Profile Document
                </Label>
                <MediaUploader
                  value={profileUrl}
                  onChange={(newUrl) => {
                    setProfileUrl(newUrl)
                    setValue("companyProfileUrl", newUrl, { shouldDirty: true })
                  }}
                  acceptType="document"
                  folder="documents"
                  aspectRatio="auto"
                />
              </div>

              <div className="space-y-4 rounded-xl border border-border/70 bg-muted/20 p-5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Site-Wide CDN Sync Status
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      {profileUrl ? "Live on Tafawok CDN" : "No Document Linked"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Storage Bucket:</span>
                    <span className="font-mono text-[11px] text-foreground">
                      tafawok-media/documents/
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-muted-foreground">Linked Pages:</span>
                    <span className="font-medium text-foreground">
                      Hero, About, Contact & Global Footer
                    </span>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
                  <strong className="text-foreground font-semibold">Pro-Tip:</strong> Uploading a new PDF document immediately updates the public download link site-wide. You can also use the red trash button on the preview above to permanently delete old assets from the Supabase bucket.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}
