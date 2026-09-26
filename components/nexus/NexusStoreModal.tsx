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
import { saveStoreAction } from "@/lib/content/actions"
import {
  storeFormSchema,
  type StoreFormData,
} from "@/lib/validations/cre-schemas"
import type { Property, StoreItem } from "@/types/cre"
import { Loader2 } from "lucide-react"

interface NexusStoreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  properties: Property[]
  defaultPropertyId?: string
  store?: (StoreItem & { propertyId?: string }) | null
  onSaved: () => void
}

interface StoreFormContentProps {
  store?: (StoreItem & { propertyId?: string }) | null
  properties: Property[]
  defaultPropertyId?: string
  onSaved: () => void
  onClose: () => void
}

function StoreFormContent({
  store,
  properties,
  defaultPropertyId,
  onSaved,
  onClose,
}: StoreFormContentProps) {
  const isEditing = !!store
  const initialPropertyId =
    store?.propertyId || defaultPropertyId || properties[0]?.id || ""
  const id = store?.id || ""

  const defaultValues: StoreFormData = {
    propertyId: initialPropertyId,
    nameEn: store?.name?.en || "",
    nameAr: store?.name?.ar || "",
    categoryEn: store?.category?.en || (isEditing ? "" : "Stationery & Books"),
    categoryAr: store?.category?.ar || (isEditing ? "" : "أدوات مكتبية وكتب"),
    floorEn: store?.floor?.en || (isEditing ? "" : "Ground Floor"),
    floorAr: store?.floor?.ar || (isEditing ? "" : "الدور الأرضي"),
    unitNumber: store?.unitNumber || "",
    status: store?.status || "open",
    phone: store?.phone || "",
    descEn: store?.description?.en || "",
    descAr: store?.description?.ar || "",
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: StoreFormData) => {
    const slugPart = data.nameEn.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "store"
    const storeId = id.trim() ? id.trim() : `store-${slugPart}`

    const updatedStore: StoreItem = {
      id: storeId,
      name: { en: data.nameEn.trim(), ar: data.nameAr.trim() },
      category: { en: data.categoryEn.trim(), ar: data.categoryAr.trim() },
      floor: { en: data.floorEn.trim(), ar: data.floorAr.trim() },
      unitNumber: data.unitNumber?.trim() || undefined,
      status: data.status,
      phone: data.phone?.trim() || undefined,
      description:
        data.descEn || data.descAr
          ? { en: data.descEn?.trim() || "", ar: data.descAr?.trim() || "" }
          : undefined,
    }

    try {
      await saveStoreAction(data.propertyId, updatedStore)
      toast.success(
        isEditing ? "Store updated successfully!" : "Store added successfully!"
      )
      onSaved()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save store."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? `Edit Tenant: ${store?.name?.en}` : "Add Retail Tenant"}
        </DialogTitle>
        <DialogDescription>
          Assign store to a commercial plaza and configure bilingual
          directories.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="propertySelect" className="text-xs font-medium">
                Assigned Asset
              </Label>
              <select
                id="propertySelect"
                {...register("propertyId")}
                disabled={isEditing}
                className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name.en} ({p.id})
                  </option>
                ))}
              </select>
              {errors.propertyId && (
                <p className="text-[11px] text-destructive">
                  {errors.propertyId.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="statusSelect" className="text-xs font-medium">
                Lease / Open Status
              </Label>
              <select
                id="statusSelect"
                {...register("status")}
                className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-xs"
              >
                <option value="open">Open / Operating</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="leased">Leased</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="storeNameEn" className="text-xs font-medium">
                Store Name (English)
              </Label>
              <Input
                id="storeNameEn"
                {...register("nameEn")}
                placeholder="Bernasos Bookstore"
              />
              {errors.nameEn && (
                <p className="text-[11px] text-destructive">
                  {errors.nameEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label htmlFor="storeNameAr" className="text-xs font-medium">
                اسم المتجر (عربي)
              </Label>
              <Input
                id="storeNameAr"
                {...register("nameAr")}
                placeholder="مكتبة برناسوس"
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
              <Label htmlFor="storeCatEn" className="text-xs font-medium">
                Category (English)
              </Label>
              <Input
                id="storeCatEn"
                {...register("categoryEn")}
                placeholder="Stationery & Office Supplies"
              />
              {errors.categoryEn && (
                <p className="text-[11px] text-destructive">
                  {errors.categoryEn.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label htmlFor="storeCatAr" className="text-xs font-medium">
                التصنيف والنشاط (عربي)
              </Label>
              <Input
                id="storeCatAr"
                {...register("categoryAr")}
                placeholder="أدوات مكتبية ومدرسية"
              />
              {errors.categoryAr && (
                <p className="text-[11px] text-destructive">
                  {errors.categoryAr.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="storeFloorEn" className="text-xs font-medium">
                Floor (English)
              </Label>
              <Input
                id="storeFloorEn"
                {...register("floorEn")}
                placeholder="Ground Floor"
              />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label htmlFor="storeFloorAr" className="text-xs font-medium">
                الطابق (عربي)
              </Label>
              <Input
                id="storeFloorAr"
                {...register("floorAr")}
                placeholder="الدور الأرضي"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="unitNum" className="text-xs font-medium">
                Unit Number / Code
              </Label>
              <Input
                id="unitNum"
                {...register("unitNumber")}
                placeholder="G-04"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="storePhone" className="text-xs font-medium">
              Direct Phone / Hotline (Optional)
            </Label>
            <Input
              id="storePhone"
              {...register("phone")}
              placeholder="+20 100 123 4567"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="storeDescEn" className="text-xs font-medium">
                Description (English - Optional)
              </Label>
              <Textarea
                id="storeDescEn"
                rows={2}
                {...register("descEn")}
                placeholder="Leading book and stationery supplier..."
              />
            </div>
            <div className="space-y-1.5" dir="rtl">
              <Label htmlFor="storeDescAr" className="text-xs font-medium">
                الوصف والأنشطة (عربي - اختياري)
              </Label>
              <Textarea
                id="storeDescAr"
                rows={2}
                {...register("descAr")}
                placeholder="رواد الأدوات المكتبية والهندسية..."
              />
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
                <Loader2 className="me-1.5 size-3.5 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update Tenant"
            ) : (
              "Add Tenant"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusStoreModal({
  open,
  onOpenChange,
  properties,
  defaultPropertyId,
  store,
  onSaved,
}: NexusStoreModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-2xl">
        {open && (
          <StoreFormContent
            key={store?.id || "new-store"}
            store={store}
            properties={properties}
            defaultPropertyId={defaultPropertyId}
            onSaved={onSaved}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
