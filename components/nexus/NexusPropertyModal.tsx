"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { savePropertyAction } from "@/lib/content/actions"
import {
  propertyFormSchema,
  type PropertyFormData,
} from "@/lib/validations/cre-schemas"
import type { Property, PropertyType, PropertyStatus } from "@/types/cre"
import { Loader2 } from "lucide-react"

interface NexusPropertyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property?: Property | null
  onSaved: () => void
}

interface PropertyFormContentProps {
  property?: Property | null
  onSaved: () => void
  onClose: () => void
}

function PropertyFormContent({
  property,
  onSaved,
  onClose,
}: PropertyFormContentProps) {
  const isEditing = !!property

  const defaultValues: PropertyFormData = {
    id: property?.id || "",
    slug: property?.slug || "",
    nameEn: property?.name?.en || "",
    nameAr: property?.name?.ar || "",
    taglineEn: property?.tagline?.en || "",
    taglineAr: property?.tagline?.ar || "",
    type:
      (property?.type as "commercial" | "office" | "mixed-use" | "retail") ||
      "commercial",
    status:
      (property?.status as "operational" | "under-development" | "pipeline") ||
      "operational",
    categoryEn:
      property?.category?.en || (isEditing ? "" : "Commercial Retail Plaza"),
    categoryAr: property?.category?.ar || (isEditing ? "" : "مول تجاري متكامل"),
    descriptionEn: property?.description?.en || "",
    descriptionAr: property?.description?.ar || "",
    fullOverviewEn: property?.fullOverview?.en || "",
    fullOverviewAr: property?.fullOverview?.ar || "",
    mainImage: property?.mainImage || "",
    galleryText: (property?.gallery || []).join("\n"),
    videoSrc: property?.video?.src || "",
    videoPoster: property?.video?.poster || "",
    addressEn: property?.location?.address?.en || "",
    addressAr: property?.location?.address?.ar || "",
    cityEn: property?.location?.city?.en || (isEditing ? "" : "Cairo"),
    cityAr: property?.location?.city?.ar || (isEditing ? "" : "القاهرة"),
    lat: property?.location?.coordinates?.lat ?? 30.0139,
    lng: property?.location?.coordinates?.lng ?? 31.3486,
    mapsEmbedUrl: property?.location?.googleMapsEmbedUrl || "",
    mapsDirectUrl: property?.location?.googleMapsDirectUrl || "",
    phone: property?.contact?.phone || (isEditing ? "" : "+20 110 042 4829"),
    altPhone: property?.contact?.altPhone || "",
    email: property?.contact?.email || (isEditing ? "" : "info@tafawok.co"),
    leasingOfficeEn:
      property?.contact?.leasingOffice?.en ||
      (isEditing ? "" : "Commercial Leasing Directorate"),
    leasingOfficeAr:
      property?.contact?.leasingOffice?.ar ||
      (isEditing ? "" : "إدارة التأجير التجاري"),
    gla: property?.keyStats?.gla || "",
    builtUpArea: property?.keyStats?.builtUpArea || "",
    floorsEn:
      typeof property?.keyStats?.floors === "object"
        ? property.keyStats.floors.en
        : String(property?.keyStats?.floors || ""),
    floorsAr:
      typeof property?.keyStats?.floors === "object"
        ? property.keyStats.floors.ar
        : String(property?.keyStats?.floors || ""),
    parkingEn:
      typeof property?.keyStats?.parkingCapacity === "object"
        ? property.keyStats.parkingCapacity.en
        : String(property?.keyStats?.parkingCapacity || ""),
    parkingAr:
      typeof property?.keyStats?.parkingCapacity === "object"
        ? property.keyStats.parkingCapacity.ar
        : String(property?.keyStats?.parkingCapacity || ""),
    zoningEn:
      property?.keyStats?.zoning?.en ||
      (isEditing ? "" : "Commercial & Retail"),
    zoningAr:
      property?.keyStats?.zoning?.ar || (isEditing ? "" : "تجاري وترفيهي"),
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: PropertyFormData) => {
    const galleryUrls = data.galleryText
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0)

    const updatedProperty: Property = {
      id: data.id.trim().toLowerCase(),
      slug: data.slug.trim().toLowerCase(),
      name: { en: data.nameEn.trim(), ar: data.nameAr.trim() },
      tagline: {
        en: data.taglineEn?.trim() || "",
        ar: data.taglineAr?.trim() || "",
      },
      type: data.type as PropertyType,
      status: data.status as PropertyStatus,
      category: { en: data.categoryEn.trim(), ar: data.categoryAr.trim() },
      description: {
        en: data.descriptionEn.trim(),
        ar: data.descriptionAr.trim(),
      },
      fullOverview: {
        en: data.fullOverviewEn.trim(),
        ar: data.fullOverviewAr.trim(),
      },
      mainImage: data.mainImage.trim(),
      gallery: galleryUrls,
      video: data.videoSrc
        ? {
            src: data.videoSrc.trim(),
            poster: data.videoPoster?.trim() || "",
            title: { en: data.nameEn, ar: data.nameAr },
          }
        : undefined,
      location: {
        address: { en: data.addressEn.trim(), ar: data.addressAr.trim() },
        city: { en: data.cityEn.trim(), ar: data.cityAr.trim() },
        country: { en: "Egypt", ar: "مصر" },
        coordinates: { lat: Number(data.lat), lng: Number(data.lng) },
        googleMapsEmbedUrl: data.mapsEmbedUrl?.trim() || "",
        googleMapsDirectUrl: data.mapsDirectUrl?.trim() || "",
      },
      contact: {
        phone: data.phone.trim(),
        altPhone: data.altPhone?.trim() || undefined,
        email: data.email.trim(),
        leasingOffice: {
          en: data.leasingOfficeEn.trim(),
          ar: data.leasingOfficeAr.trim(),
        },
      },
      keyStats: {
        gla: data.gla.trim(),
        builtUpArea: data.builtUpArea.trim(),
        floors: { en: data.floorsEn.trim(), ar: data.floorsAr.trim() },
        parkingCapacity: {
          en: data.parkingEn.trim(),
          ar: data.parkingAr.trim(),
        },
        zoning: { en: data.zoningEn.trim(), ar: data.zoningAr.trim() },
      },
      specs: property?.specs || [],
      highlights: property?.highlights || [],
      amenities: property?.amenities || [],
      stores: property?.stores || [],
    }

    try {
      await savePropertyAction(updatedProperty)
      toast.success(
        isEditing
          ? "Property updated successfully!"
          : "Property created successfully!"
      )
      onSaved()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save property."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing
            ? `Edit Commercial Asset: ${property?.name?.en}`
            : "Add New Commercial Asset"}
        </DialogTitle>
        <DialogDescription>
          Configure bilingual details, architectural specifications, media
          assets, and location coordinates.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="text-xs">
                General & Meta
              </TabsTrigger>
              <TabsTrigger value="descriptions" className="text-xs">
                Bilingual Copy
              </TabsTrigger>
              <TabsTrigger value="media" className="text-xs">
                Media & Gallery
              </TabsTrigger>
              <TabsTrigger value="location-stats" className="text-xs">
                Location & Stats
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: BASIC INFO */}
            <TabsContent value="basic" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="id" className="text-xs font-medium">
                    Unique ID (e.g. fagala-plaza)
                  </Label>
                  <Input
                    id="id"
                    {...register("id")}
                    disabled={isEditing}
                    placeholder="fagala-plaza"
                  />
                  {errors.id && (
                    <p className="text-[11px] text-destructive">
                      {errors.id.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="slug" className="text-xs font-medium">
                    URL Slug (e.g. fagala-plaza)
                  </Label>
                  <Input
                    id="slug"
                    {...register("slug")}
                    placeholder="fagala-plaza"
                  />
                  {errors.slug && (
                    <p className="text-[11px] text-destructive">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="nameEn" className="text-xs font-medium">
                    Asset Name (English)
                  </Label>
                  <Input
                    id="nameEn"
                    {...register("nameEn")}
                    placeholder="Fagala Plaza"
                  />
                  {errors.nameEn && (
                    <p className="text-[11px] text-destructive">
                      {errors.nameEn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="nameAr" className="text-xs font-medium">
                    اسم الأصل التجاري (عربي)
                  </Label>
                  <Input
                    id="nameAr"
                    {...register("nameAr")}
                    placeholder="فجالة بلازا"
                  />
                  {errors.nameAr && (
                    <p className="text-[11px] text-destructive">
                      {errors.nameAr.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="taglineEn" className="text-xs font-medium">
                    Corporate Tagline (English)
                  </Label>
                  <Input
                    id="taglineEn"
                    {...register("taglineEn")}
                    placeholder="Prime Commercial Hub in Nasr City"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="taglineAr" className="text-xs font-medium">
                    الشعار التجاري (عربي)
                  </Label>
                  <Input
                    id="taglineAr"
                    {...register("taglineAr")}
                    placeholder="وجهة تجارية وإدارية رائدة بمدينة نصر"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="type" className="text-xs font-medium">
                    Development Type
                  </Label>
                  <select
                    id="type"
                    {...register("type")}
                    className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="office">Prime Office</option>
                    <option value="retail">Retail Hub</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="status" className="text-xs font-medium">
                    Execution Status
                  </Label>
                  <select
                    id="status"
                    {...register("status")}
                    className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs"
                  >
                    <option value="operational">Operational</option>
                    <option value="under-development">Under Development</option>
                    <option value="pipeline">Strategic Pipeline</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="categoryEn" className="text-xs font-medium">
                    Asset Category (English)
                  </Label>
                  <Input
                    id="categoryEn"
                    {...register("categoryEn")}
                    placeholder="Commercial Retail Plaza"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="categoryAr" className="text-xs font-medium">
                    تصنيف الأصل (عربي)
                  </Label>
                  <Input
                    id="categoryAr"
                    {...register("categoryAr")}
                    placeholder="مول تجاري متكامل"
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 2: BILINGUAL DESCRIPTIONS */}
            <TabsContent value="descriptions" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="descEn" className="text-xs font-medium">
                    Brief Description (English)
                  </Label>
                  <Textarea
                    id="descEn"
                    rows={3}
                    {...register("descriptionEn")}
                    placeholder="Short promotional description for cards and teasers..."
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="descAr" className="text-xs font-medium">
                    الوصف المختصر (عربي)
                  </Label>
                  <Textarea
                    id="descAr"
                    rows={3}
                    {...register("descriptionAr")}
                    placeholder="الوصف التعريفي للبطاقات ومقدمة الصفحة..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="fullEn" className="text-xs font-medium">
                    Full Architectural Overview (English)
                  </Label>
                  <Textarea
                    id="fullEn"
                    rows={6}
                    {...register("fullOverviewEn")}
                    placeholder="Detailed corporate breakdown and specifications..."
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="fullAr" className="text-xs font-medium">
                    التقرير المعماري الشامل (عربي)
                  </Label>
                  <Textarea
                    id="fullAr"
                    rows={6}
                    {...register("fullOverviewAr")}
                    placeholder="نص شامل يوضح المعايير الإنشائية والمميزات..."
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 3: MEDIA & GALLERY */}
            <TabsContent value="media" className="space-y-4 pt-4">
              <div className="space-y-1.5">
                <Label htmlFor="mainImage" className="text-xs font-medium">
                  Main Hero Image URL / Path
                </Label>
                <Input
                  id="mainImage"
                  {...register("mainImage")}
                  placeholder="/FagalaPlaza/ef0aed6e-0521-483c-886d-cf366d835f71.webp"
                />
                {errors.mainImage && (
                  <p className="text-[11px] text-destructive">
                    {errors.mainImage.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gallery" className="text-xs font-medium">
                  Photo Gallery URLs (One per line)
                </Label>
                <Textarea
                  id="gallery"
                  rows={5}
                  {...register("galleryText")}
                  placeholder="/FagalaPlaza/image1.webp&#10;/FagalaPlaza/image2.webp"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="videoSrc" className="text-xs font-medium">
                    Video Tour URL (.webm / .mp4)
                  </Label>
                  <Input
                    id="videoSrc"
                    {...register("videoSrc")}
                    placeholder="/FagalaPlaza/IMG_6803.webm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="videoPoster" className="text-xs font-medium">
                    Video Poster Thumbnail URL
                  </Label>
                  <Input
                    id="videoPoster"
                    {...register("videoPoster")}
                    placeholder="/FagalaPlaza/IMG_6803.webp"
                  />
                </div>
              </div>
            </TabsContent>

            {/* TAB 4: LOCATION & STATS */}
            <TabsContent value="location-stats" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="addressEn" className="text-xs font-medium">
                    Address (English)
                  </Label>
                  <Input
                    id="addressEn"
                    {...register("addressEn")}
                    placeholder="10th District, Nasr City, Cairo"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="addressAr" className="text-xs font-medium">
                    العنوان (عربي)
                  </Label>
                  <Input
                    id="addressAr"
                    {...register("addressAr")}
                    placeholder="الحي العاشر، مدينة نصر، القاهرة"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="cityEn" className="text-xs font-medium">
                    City / Region (English)
                  </Label>
                  <Input
                    id="cityEn"
                    {...register("cityEn")}
                    placeholder="Cairo"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="cityAr" className="text-xs font-medium">
                    المدينة / الإقليم (عربي)
                  </Label>
                  <Input
                    id="cityAr"
                    {...register("cityAr")}
                    placeholder="القاهرة"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="space-y-1.5">
                  <Label htmlFor="lat" className="text-xs font-medium">
                    Latitude
                  </Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    {...register("lat")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lng" className="text-xs font-medium">
                    Longitude
                  </Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    {...register("lng")}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium">
                    Leasing Phone
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+20 110 042 4829"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="altPhone" className="text-xs font-medium">
                    Alt Phone / WhatsApp
                  </Label>
                  <Input
                    id="altPhone"
                    {...register("altPhone")}
                    placeholder="+20 100 123 4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">
                    Contact Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="info@tafawok.co"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="leasingOfficeEn"
                    className="text-xs font-medium"
                  >
                    Leasing Office (English)
                  </Label>
                  <Input
                    id="leasingOfficeEn"
                    {...register("leasingOfficeEn")}
                    placeholder="Commercial Leasing Directorate"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label
                    htmlFor="leasingOfficeAr"
                    className="text-xs font-medium"
                  >
                    مكتب التأجير (عربي)
                  </Label>
                  <Input
                    id="leasingOfficeAr"
                    {...register("leasingOfficeAr")}
                    placeholder="إدارة التأجير التجاري"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="gla" className="text-xs font-medium">
                    GLA (e.g. 16,500 m²)
                  </Label>
                  <Input
                    id="gla"
                    {...register("gla")}
                    placeholder="16,500 m²"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="builtUp" className="text-xs font-medium">
                    Built-Up Area (e.g. 21,800 m²)
                  </Label>
                  <Input
                    id="builtUp"
                    {...register("builtUpArea")}
                    placeholder="21,800 m²"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="floorsEn" className="text-xs font-medium">
                    Floors (English)
                  </Label>
                  <Input
                    id="floorsEn"
                    {...register("floorsEn")}
                    placeholder="G + 4 Commercial Levels"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="floorsAr" className="text-xs font-medium">
                    الأدوار والارتفاعات (عربي)
                  </Label>
                  <Input
                    id="floorsAr"
                    {...register("floorsAr")}
                    placeholder="أرضي + 4 طوابق تجارية"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="parkingEn" className="text-xs font-medium">
                    Parking (English)
                  </Label>
                  <Input
                    id="parkingEn"
                    {...register("parkingEn")}
                    placeholder="420 Vehicles"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="parkingAr" className="text-xs font-medium">
                    المواقف والاستيعاب (عربي)
                  </Label>
                  <Input
                    id="parkingAr"
                    {...register("parkingAr")}
                    placeholder="420 مركبة"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="zoningEn" className="text-xs font-medium">
                    Zoning Classification (English)
                  </Label>
                  <Input
                    id="zoningEn"
                    {...register("zoningEn")}
                    placeholder="Commercial & Retail"
                  />
                </div>
                <div className="space-y-1.5" dir="rtl">
                  <Label htmlFor="zoningAr" className="text-xs font-medium">
                    التصنيف والتخصيص (عربي)
                  </Label>
                  <Input
                    id="zoningAr"
                    {...register("zoningAr")}
                    placeholder="تجاري وترفيهي"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="mapsEmbed" className="text-xs font-medium">
                    Google Maps Embed URL
                  </Label>
                  <Input
                    id="mapsEmbed"
                    {...register("mapsEmbedUrl")}
                    placeholder="https://maps.google.com/maps?..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="mapsDirect" className="text-xs font-medium">
                    Google Maps Direct Link
                  </Label>
                  <Input
                    id="mapsDirect"
                    {...register("mapsDirectUrl")}
                    placeholder="https://goo.gl/maps/..."
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
                <Loader2 className="me-1.5 size-3.5 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Asset"
            ) : (
              "Create Asset"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusPropertyModal({
  open,
  onOpenChange,
  property,
  onSaved,
}: NexusPropertyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-4xl">
        {open && (
          <PropertyFormContent
            key={property?.id || "new-property"}
            property={property}
            onSaved={onSaved}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
