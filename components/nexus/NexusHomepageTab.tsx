"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Save,
  Loader2,
  Sparkles,
  Image as ImageIcon,
  Building2,
  Layers,
  LayoutTemplate,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { saveSiteSettingAction } from "@/lib/content/actions"
import { MediaUploader } from "@/components/nexus/MediaUploader"
import type { HomepageSettings, Property } from "@/types/cre"

const homepageSchema = z.object({
  // Hero Section
  heroHeadlineEn: z.string().min(2, "English headline is required"),
  heroHeadlineAr: z.string().min(2, "Arabic headline is required"),
  heroSubtitleEn: z.string().min(5, "English subtitle is required"),
  heroSubtitleAr: z.string().min(5, "Arabic subtitle is required"),
  heroCtaTextEn: z.string().min(2, "English CTA text is required"),
  heroCtaTextAr: z.string().min(2, "Arabic CTA text is required"),
  credential1En: z.string().min(2, "Credential 1 English is required"),
  credential1Ar: z.string().min(2, "Credential 1 Arabic is required"),
  credential2En: z.string().min(2, "Credential 2 English is required"),
  credential2Ar: z.string().min(2, "Credential 2 Arabic is required"),
  credential3En: z.string().min(2, "Credential 3 English is required"),
  credential3Ar: z.string().min(2, "Credential 3 Arabic is required"),

  // Showcase Section
  showcaseSectionTitleEn: z
    .string()
    .min(2, "Section title English is required"),
  showcaseSectionTitleAr: z.string().min(2, "Section title Arabic is required"),
  showcaseSectionSubtitleEn: z
    .string()
    .min(5, "Section subtitle English is required"),
  showcaseSectionSubtitleAr: z
    .string()
    .min(5, "Section subtitle Arabic is required"),
  showcaseImageUrl: z.string().min(1, "Showcase image URL is required"),
  showcasePropertySlug: z.string().min(1, "Target property slug is required"),
  showcaseBadgeEn: z.string().min(2, "Badge English is required"),
  showcaseBadgeAr: z.string().min(2, "Badge Arabic is required"),
  showcaseTitleEn: z.string().min(2, "Title English is required"),
  showcaseTitleAr: z.string().min(2, "Title Arabic is required"),
  showcaseDescriptionEn: z.string().min(5, "Description English is required"),
  showcaseDescriptionAr: z.string().min(5, "Description Arabic is required"),

  // Stats
  statGlaLabelEn: z.string().min(1, "GLA label English is required"),
  statGlaLabelAr: z.string().min(1, "GLA label Arabic is required"),
  statGlaValue: z.string().min(1, "GLA value is required"),

  statBuaLabelEn: z.string().min(1, "BUA label English is required"),
  statBuaLabelAr: z.string().min(1, "BUA label Arabic is required"),
  statBuaValue: z.string().min(1, "BUA value is required"),

  statParkingLabelEn: z.string().min(1, "Parking label English is required"),
  statParkingLabelAr: z.string().min(1, "Parking label Arabic is required"),
  statParkingValue: z.string().min(1, "Parking value is required"),

  showcaseCtaTextEn: z.string().min(2, "Showcase CTA English is required"),
  showcaseCtaTextAr: z.string().min(2, "Showcase CTA Arabic is required"),
})

type HomepageFormData = z.infer<typeof homepageSchema>

interface NexusHomepageTabProps {
  initialSettings: HomepageSettings
  properties: Property[]
}

export function NexusHomepageTab({
  initialSettings,
  properties,
}: NexusHomepageTabProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = React.useState(false)

  const defaultValues: HomepageFormData = {
    heroHeadlineEn: initialSettings?.hero?.headline?.en || "",
    heroHeadlineAr: initialSettings?.hero?.headline?.ar || "",
    heroSubtitleEn: initialSettings?.hero?.subheadline?.en || "",
    heroSubtitleAr: initialSettings?.hero?.subheadline?.ar || "",
    heroCtaTextEn:
      initialSettings?.hero?.ctaText?.en || "Explore Commercial Portfolio",
    heroCtaTextAr:
      initialSettings?.hero?.ctaText?.ar || "استكشف محفظة المشروعات",
    credential1En:
      initialSettings?.hero?.credentials?.[0]?.label?.en ||
      "3 Flagship Commercial Assets",
    credential1Ar:
      initialSettings?.hero?.credentials?.[0]?.label?.ar ||
      "3 أصول تجارية كبرى مملوكة",
    credential2En:
      initialSettings?.hero?.credentials?.[1]?.label?.en ||
      "25+ Years Proven Track Record",
    credential2Ar:
      initialSettings?.hero?.credentials?.[1]?.label?.ar ||
      "سجل إنجاز يمتد لـ 25+ عاماً",
    credential3En:
      initialSettings?.hero?.credentials?.[2]?.label?.en ||
      "64,500+ m² Commercial GLA",
    credential3Ar:
      initialSettings?.hero?.credentials?.[2]?.label?.ar ||
      "مساحات تأجير تفوق 64,500 م²",

    showcaseSectionTitleEn:
      initialSettings?.showcase?.sectionTitle?.en ||
      "Commercial Architecture at Institutional Scale",
    showcaseSectionTitleAr:
      initialSettings?.showcase?.sectionTitle?.ar ||
      "مساحات تجارية بحجم طموحك المؤسسي",
    showcaseSectionSubtitleEn:
      initialSettings?.showcase?.sectionSubtitle?.en ||
      "Scroll down to expand the stage and explore Mall Chillout Alshrouk in New Cairo / Al Shrouk",
    showcaseSectionSubtitleAr:
      initialSettings?.showcase?.sectionSubtitle?.ar ||
      "مرر لفتح المشهد المعماري بالكامل واكتشاف تفاصيل صرح مول تشيل أوت الشروق في الشروق / القاهرة الجديدة",
    showcaseImageUrl:
      initialSettings?.showcase?.imageUrl ||
      "/MallChilloutAlshrouk/IMG_5918.webp",
    showcasePropertySlug:
      initialSettings?.showcase?.propertySlug || "mall-chillout-el-shorouk",
    showcaseBadgeEn:
      initialSettings?.showcase?.badge?.en ||
      "Suez Road, New Cairo / Al Shrouk",
    showcaseBadgeAr:
      initialSettings?.showcase?.badge?.ar ||
      "طريق السويس، القاهرة الجديدة / الشروق",
    showcaseTitleEn:
      initialSettings?.showcase?.title?.en || "Mall Chillout Alshrouk",
    showcaseTitleAr:
      initialSettings?.showcase?.title?.ar || "مول تشيل أوت الشروق",
    showcaseDescriptionEn: initialSettings?.showcase?.description?.en || "",
    showcaseDescriptionAr: initialSettings?.showcase?.description?.ar || "",

    statGlaLabelEn: initialSettings?.showcase?.stats?.gla?.label?.en || "GLA",
    statGlaLabelAr:
      initialSettings?.showcase?.stats?.gla?.label?.ar || "المساحة التأجيرية",
    statGlaValue: initialSettings?.showcase?.stats?.gla?.value || "24,000 m²",

    statBuaLabelEn: initialSettings?.showcase?.stats?.bua?.label?.en || "BUA",
    statBuaLabelAr:
      initialSettings?.showcase?.stats?.bua?.label?.ar || "المساحة الإجمالية",
    statBuaValue: initialSettings?.showcase?.stats?.bua?.value || "38,500 m²",

    statParkingLabelEn:
      initialSettings?.showcase?.stats?.parking?.label?.en ||
      "Parking Capacity",
    statParkingLabelAr:
      initialSettings?.showcase?.stats?.parking?.label?.ar || "مواقف السيارات",
    statParkingValue:
      initialSettings?.showcase?.stats?.parking?.value || "450+ Vehicles",

    showcaseCtaTextEn:
      initialSettings?.showcase?.ctaText?.en || "View Property Details",
    showcaseCtaTextAr:
      initialSettings?.showcase?.ctaText?.ar || "استعراض تفاصيل الصرح",
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<HomepageFormData>({
    resolver: zodResolver(homepageSchema),
    defaultValues,
  })

  const onSubmit = async (values: HomepageFormData) => {
    setIsSaving(true)
    try {
      const updatedSettings: HomepageSettings = {
        hero: {
          headline: { en: values.heroHeadlineEn, ar: values.heroHeadlineAr },
          subheadline: { en: values.heroSubtitleEn, ar: values.heroSubtitleAr },
          ctaText: { en: values.heroCtaTextEn, ar: values.heroCtaTextAr },
          credentials: [
            {
              label: { en: values.credential1En, ar: values.credential1Ar },
              iconName: "Building2",
            },
            {
              label: { en: values.credential2En, ar: values.credential2Ar },
              iconName: "ShieldCheck",
            },
            {
              label: { en: values.credential3En, ar: values.credential3Ar },
              iconName: "TrendingUp",
            },
          ],
        },
        showcase: {
          sectionTitle: {
            en: values.showcaseSectionTitleEn,
            ar: values.showcaseSectionTitleAr,
          },
          sectionSubtitle: {
            en: values.showcaseSectionSubtitleEn,
            ar: values.showcaseSectionSubtitleAr,
          },
          imageUrl: values.showcaseImageUrl,
          propertySlug: values.showcasePropertySlug,
          badge: { en: values.showcaseBadgeEn, ar: values.showcaseBadgeAr },
          title: { en: values.showcaseTitleEn, ar: values.showcaseTitleAr },
          description: {
            en: values.showcaseDescriptionEn,
            ar: values.showcaseDescriptionAr,
          },
          stats: {
            gla: {
              label: { en: values.statGlaLabelEn, ar: values.statGlaLabelAr },
              value: values.statGlaValue,
            },
            bua: {
              label: { en: values.statBuaLabelEn, ar: values.statBuaLabelAr },
              value: values.statBuaValue,
            },
            parking: {
              label: {
                en: values.statParkingLabelEn,
                ar: values.statParkingLabelAr,
              },
              value: values.statParkingValue,
            },
          },
          ctaText: {
            en: values.showcaseCtaTextEn,
            ar: values.showcaseCtaTextAr,
          },
        },
      }

      await saveSiteSettingAction("homepage_settings", updatedSettings)
      toast.success(
        "Homepage & Showcase settings successfully saved and published!"
      )
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error(
        err instanceof Error ? err.message : "Failed to save homepage settings"
      )
    } finally {
      setIsSaving(false)
    }
  }

  // Helper when admin picks a property to autofill title, badge, and specs
  const handleSelectProperty = (slug: string) => {
    setValue("showcasePropertySlug", slug)
    const matched = properties.find((p) => p.slug === slug)
    if (matched) {
      setValue("showcaseTitleEn", matched.name.en)
      setValue("showcaseTitleAr", matched.name.ar)
      setValue(
        "showcaseBadgeEn",
        `${matched.location.address.en}, ${matched.location.city.en}`
      )
      setValue(
        "showcaseBadgeAr",
        `${matched.location.address.ar}، ${matched.location.city.ar}`
      )
      setValue("showcaseDescriptionEn", matched.description.en)
      setValue("showcaseDescriptionAr", matched.description.ar)
      if (matched.keyStats) {
        if (matched.keyStats.gla) setValue("statGlaValue", matched.keyStats.gla)
        if (matched.keyStats.builtUpArea)
          setValue("statBuaValue", matched.keyStats.builtUpArea)
        if (matched.keyStats.parkingCapacity) {
          const cap =
            typeof matched.keyStats.parkingCapacity === "string"
              ? matched.keyStats.parkingCapacity
              : matched.keyStats.parkingCapacity.en
          setValue("statParkingValue", cap)
        }
      }
      toast.info(`Synced showcase details with "${matched.name.en}"`)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Homepage & Interactive Showcase
            </h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete administrative control over the public landing page:
            interactive expand image canvas, flagship showcase, and hero
            credentials.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => window.open("/#showcase", "_blank")}
            className="gap-2"
          >
            <ExternalLink className="size-4" />
            <span>Preview Showcase</span>
          </Button>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSaving}
            className="gap-2 px-5"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            <span>Save & Publish</span>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs defaultValue="showcase" className="w-full">
          <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="showcase" className="gap-2">
              <ImageIcon className="size-4" />
              <span>Expand Image Showcase</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="gap-2">
              <LayoutTemplate className="size-4" />
              <span>Hero & Credentials</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: EXPAND IMAGE SHOWCASE */}
          <TabsContent value="showcase" className="space-y-6">
            {/* Card 1: The Interactive Image */}
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-2 border-b pb-3">
                  <ImageIcon className="size-5 text-primary" />
                  <h2 className="text-base font-bold text-foreground">
                    Interactive Showcase Image / Visual Asset
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">
                  This image is rendered on the homepage canvas and expands
                  smoothly to fill the screen as the visitor scrolls down.
                  Upload high-resolution architectural photography (WebP or JPG
                  recommended).
                </p>

                <div className="max-w-2xl">
                  <Label className="mb-2 block text-xs font-semibold">
                    Showcase Canvas Image
                  </Label>
                  <Controller
                    name="showcaseImageUrl"
                    control={control}
                    render={({ field }) => (
                      <MediaUploader
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                        folder="showcase"
                        label="Upload / Select Showcase Image"
                        acceptType="all"
                        aspectRatio="video"
                      />
                    )}
                  />
                  {errors.showcaseImageUrl && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.showcaseImageUrl.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Section Titles & Linked Property */}
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center gap-2 border-b pb-3">
                  <Building2 className="size-5 text-primary" />
                  <h2 className="text-base font-bold text-foreground">
                    Section Header & Linked Flagship Asset
                  </h2>
                </div>

                {/* Section Titles */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="showcaseSectionTitleEn">
                      Section Headline (English)
                    </Label>
                    <Input
                      id="showcaseSectionTitleEn"
                      {...register("showcaseSectionTitleEn")}
                      placeholder="e.g. Commercial Architecture at Institutional Scale"
                    />
                    {errors.showcaseSectionTitleEn && (
                      <p className="text-xs text-destructive">
                        {errors.showcaseSectionTitleEn.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseSectionTitleAr">
                      عنوان القسم (عربي)
                    </Label>
                    <Input
                      id="showcaseSectionTitleAr"
                      {...register("showcaseSectionTitleAr")}
                      placeholder="مثال: مساحات تجارية بحجم طموحك المؤسسي"
                    />
                    {errors.showcaseSectionTitleAr && (
                      <p className="text-xs text-destructive">
                        {errors.showcaseSectionTitleAr.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="showcaseSectionSubtitleEn">
                      Section Subtitle / Scroll Prompt (English)
                    </Label>
                    <Input
                      id="showcaseSectionSubtitleEn"
                      {...register("showcaseSectionSubtitleEn")}
                      placeholder="e.g. Scroll down to expand the stage and explore Mall Chillout Alshrouk"
                    />
                    {errors.showcaseSectionSubtitleEn && (
                      <p className="text-xs text-destructive">
                        {errors.showcaseSectionSubtitleEn.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseSectionSubtitleAr">
                      وصف القسم ودليل التمرير (عربي)
                    </Label>
                    <Input
                      id="showcaseSectionSubtitleAr"
                      {...register("showcaseSectionSubtitleAr")}
                      placeholder="مثال: مرر لفتح المشهد المعماري بالكامل واكتشاف تفاصيل الصرح"
                    />
                    {errors.showcaseSectionSubtitleAr && (
                      <p className="text-xs text-destructive">
                        {errors.showcaseSectionSubtitleAr.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Property Linking Selector */}
                <div className="space-y-3 border-t pt-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Label className="text-sm font-bold">
                        Linked Commercial Property
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Selecting a property auto-populates the overlay specs,
                        title, and routes the &quot;View Property Details&quot;
                        button directly to its page.
                      </p>
                    </div>

                    <div className="w-full sm:w-72">
                      <Controller
                        name="showcasePropertySlug"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(val) => {
                              if (val) {
                                field.onChange(val)
                                handleSelectProperty(val)
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Property" />
                            </SelectTrigger>
                            <SelectContent>
                              {properties.map((p) => (
                                <SelectItem key={p.slug} value={p.slug}>
                                  {p.name.en} ({p.name.ar})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Expanded Stage Overlay Content */}
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center gap-2 border-b pb-3">
                  <Layers className="size-5 text-primary" />
                  <h2 className="text-base font-bold text-foreground">
                    Expanded Canvas Overlay Content
                  </h2>
                </div>

                {/* Location Badge */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="showcaseBadgeEn">
                      Location Badge (English)
                    </Label>
                    <Input
                      id="showcaseBadgeEn"
                      {...register("showcaseBadgeEn")}
                      placeholder="e.g. Suez Road, New Cairo / Al Shrouk"
                    />
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseBadgeAr">شارة الموقع (عربي)</Label>
                    <Input
                      id="showcaseBadgeAr"
                      {...register("showcaseBadgeAr")}
                      placeholder="طريق السويس، القاهرة الجديدة / الشروق"
                    />
                  </div>
                </div>

                {/* Overlay Title */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="showcaseTitleEn">
                      Overlay Asset Title (English)
                    </Label>
                    <Input
                      id="showcaseTitleEn"
                      {...register("showcaseTitleEn")}
                      placeholder="e.g. Mall Chillout Alshrouk"
                    />
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseTitleAr">
                      اسم الصرح في البطاقة (عربي)
                    </Label>
                    <Input
                      id="showcaseTitleAr"
                      {...register("showcaseTitleAr")}
                      placeholder="مول تشيل أوت الشروق"
                    />
                  </div>
                </div>

                {/* Overlay Narrative Description */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="showcaseDescriptionEn">
                      Narrative Description (English)
                    </Label>
                    <Textarea
                      id="showcaseDescriptionEn"
                      rows={3}
                      {...register("showcaseDescriptionEn")}
                      placeholder="Asset narrative on the expanded canvas..."
                    />
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseDescriptionAr">
                      الوصف التعريفي للصرح (عربي)
                    </Label>
                    <Textarea
                      id="showcaseDescriptionAr"
                      rows={3}
                      {...register("showcaseDescriptionAr")}
                      placeholder="نبذة الصرح المعماري على بطاقة العرض..."
                    />
                  </div>
                </div>

                {/* 3 Key Specs Matrix */}
                <div className="border-t pt-4">
                  <Label className="mb-3 block text-sm font-bold">
                    Showcase 3-Column Specifications Matrix
                  </Label>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Stat 1: GLA */}
                    <div className="space-y-2 rounded-xl border bg-muted/20 p-3.5">
                      <span className="text-xs font-bold text-primary">
                        Indicator 1 (GLA)
                      </span>
                      <Input
                        {...register("statGlaValue")}
                        placeholder="Value (e.g. 24,000 m²)"
                        className="font-mono text-sm font-bold"
                      />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Input
                          {...register("statGlaLabelEn")}
                          placeholder="Label EN"
                        />
                        <Input
                          {...register("statGlaLabelAr")}
                          placeholder="Label AR"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Stat 2: BUA */}
                    <div className="space-y-2 rounded-xl border bg-muted/20 p-3.5">
                      <span className="text-xs font-bold text-primary">
                        Indicator 2 (BUA)
                      </span>
                      <Input
                        {...register("statBuaValue")}
                        placeholder="Value (e.g. 38,500 m²)"
                        className="font-mono text-sm font-bold"
                      />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Input
                          {...register("statBuaLabelEn")}
                          placeholder="Label EN"
                        />
                        <Input
                          {...register("statBuaLabelAr")}
                          placeholder="Label AR"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Stat 3: Parking */}
                    <div className="space-y-2 rounded-xl border bg-muted/20 p-3.5">
                      <span className="text-xs font-bold text-primary">
                        Indicator 3 (Parking)
                      </span>
                      <Input
                        {...register("statParkingValue")}
                        placeholder="Value (e.g. 450+ Vehicles)"
                        className="font-mono text-sm font-bold"
                      />
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <Input
                          {...register("statParkingLabelEn")}
                          placeholder="Label EN"
                        />
                        <Input
                          {...register("statParkingLabelAr")}
                          placeholder="Label AR"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button Text */}
                <div className="grid grid-cols-1 gap-4 border-t pt-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="showcaseCtaTextEn">
                      Button Action Text (English)
                    </Label>
                    <Input
                      id="showcaseCtaTextEn"
                      {...register("showcaseCtaTextEn")}
                      placeholder="View Property Details"
                    />
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="showcaseCtaTextAr">
                      نص زر الانتقال (عربي)
                    </Label>
                    <Input
                      id="showcaseCtaTextAr"
                      {...register("showcaseCtaTextAr")}
                      placeholder="استعراض تفاصيل الصرح"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: HERO & CREDENTIALS */}
          <TabsContent value="hero" className="space-y-6">
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center gap-2 border-b pb-3">
                  <LayoutTemplate className="size-5 text-primary" />
                  <h2 className="text-base font-bold text-foreground">
                    Hero Section Headlines & Action
                  </h2>
                </div>

                {/* Main Headline */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="heroHeadlineEn">
                      Master Architectural Headline (English)
                    </Label>
                    <Textarea
                      id="heroHeadlineEn"
                      rows={2}
                      {...register("heroHeadlineEn")}
                      placeholder="Commercial Real Estate Developed for Generational Permanence"
                    />
                    {errors.heroHeadlineEn && (
                      <p className="text-xs text-destructive">
                        {errors.heroHeadlineEn.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="heroHeadlineAr">
                      العنوان المعماري الرئيسي (عربي)
                    </Label>
                    <Textarea
                      id="heroHeadlineAr"
                      rows={2}
                      {...register("heroHeadlineAr")}
                      placeholder="أصول تجارية مطورة للبقاء والنمو عبر الأجيال"
                    />
                    {errors.heroHeadlineAr && (
                      <p className="text-xs text-destructive">
                        {errors.heroHeadlineAr.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtitle */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="heroSubtitleEn">
                      Executive Subtitle & Positioning (English)
                    </Label>
                    <Textarea
                      id="heroSubtitleEn"
                      rows={3}
                      {...register("heroSubtitleEn")}
                      placeholder="Institutional CRE developer and turnkey engineering contractor..."
                    />
                    {errors.heroSubtitleEn && (
                      <p className="text-xs text-destructive">
                        {errors.heroSubtitleEn.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="heroSubtitleAr">
                      الوصف التنفيذي وموقع السوق (عربي)
                    </Label>
                    <Textarea
                      id="heroSubtitleAr"
                      rows={3}
                      {...register("heroSubtitleAr")}
                      placeholder="مطور رائد للمشروعات التجارية الكبرى ومقاولات تسليم المفتاح..."
                    />
                    {errors.heroSubtitleAr && (
                      <p className="text-xs text-destructive">
                        {errors.heroSubtitleAr.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* CTA Button Text */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="heroCtaTextEn">
                      Explore CTA Button Text (English)
                    </Label>
                    <Input
                      id="heroCtaTextEn"
                      {...register("heroCtaTextEn")}
                      placeholder="Explore Commercial Portfolio"
                    />
                  </div>
                  <div className="space-y-2" dir="rtl">
                    <Label htmlFor="heroCtaTextAr">
                      نص زر الاستكشاف الرئيسي (عربي)
                    </Label>
                    <Input
                      id="heroCtaTextAr"
                      {...register("heroCtaTextAr")}
                      placeholder="استكشف محفظة المشروعات"
                    />
                  </div>
                </div>

                {/* Minimalist Credentials Strip */}
                <div className="space-y-4 border-t pt-4">
                  <div>
                    <Label className="text-sm font-bold">
                      Credentials Strip Bullets (3 Items)
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Appears beneath the hero CTA button as an institutional
                      proof strip.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* Item 1 */}
                    <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-[11px] text-muted-foreground">
                          Credential 1 (English)
                        </Label>
                        <Input
                          {...register("credential1En")}
                          className="mt-1"
                        />
                      </div>
                      <div dir="rtl">
                        <Label className="text-[11px] text-muted-foreground">
                          المؤشر الأول (عربي)
                        </Label>
                        <Input
                          {...register("credential1Ar")}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-[11px] text-muted-foreground">
                          Credential 2 (English)
                        </Label>
                        <Input
                          {...register("credential2En")}
                          className="mt-1"
                        />
                      </div>
                      <div dir="rtl">
                        <Label className="text-[11px] text-muted-foreground">
                          المؤشر الثاني (عربي)
                        </Label>
                        <Input
                          {...register("credential2Ar")}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="grid grid-cols-1 gap-3 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2">
                      <div>
                        <Label className="text-[11px] text-muted-foreground">
                          Credential 3 (English)
                        </Label>
                        <Input
                          {...register("credential3En")}
                          className="mt-1"
                        />
                      </div>
                      <div dir="rtl">
                        <Label className="text-[11px] text-muted-foreground">
                          المؤشر الثالث (عربي)
                        </Label>
                        <Input
                          {...register("credential3Ar")}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
