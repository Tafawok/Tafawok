"use client"

import * as React from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  Building2,
  Zap,
  Factory,
  HardHat,
  Loader2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { savePartnerAction, deletePartnerAction } from "@/lib/content/actions"
import type { ClientPartner } from "@/types/cre"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const partnerModalSchema = z.object({
  name: z.string().min(2, "Partner name is required"),
  category: z.enum(["commercial", "energy", "epc", "manufacturer"]),
  country: z.string().min(2, "Country is required"),
})

type PartnerModalFormData = z.infer<typeof partnerModalSchema>

interface NexusPartnersTabProps {
  partners: ClientPartner[]
  onRefresh?: () => void
}

interface PartnerFormModalProps {
  partner?: ClientPartner | null
  index: number
  onRefresh: () => void
  onClose: () => void
}

function PartnerFormModal({
  partner,
  index,
  onRefresh,
  onClose,
}: PartnerFormModalProps) {
  const isEditing = !!partner

  const defaultValues: PartnerModalFormData = {
    name: partner?.name || "",
    category: partner?.category || "commercial",
    country: partner?.country || "Egypt",
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerModalFormData>({
    resolver: zodResolver(partnerModalSchema),
    defaultValues,
  })

  const onSubmit = async (data: PartnerModalFormData) => {
    const partnerId = `partner-${index + 1}`

    const updated: ClientPartner = {
      name: data.name.trim(),
      category: data.category,
      country: data.country.trim(),
    }

    try {
      await savePartnerAction(partnerId, updated, index)
      toast.success(
        isEditing
          ? "Partner updated successfully!"
          : "Partner created successfully!"
      )
      onRefresh()
      onClose()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to save partner."
      toast.error(message)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEditing ? `Edit Partner: ${partner?.name}` : "Add Tier-1 Partner"}
        </DialogTitle>
        <DialogDescription>
          Configure partner credentials, industrial sector, and country
          location.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <DialogBody className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Corporate Entity Name</Label>
            <Input {...register("name")} placeholder="Siemens Energy" />
            {errors.name && (
              <p className="text-[11px] text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Industry Category</Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-8 w-full text-xs">
                      <SelectValue placeholder="Select industry category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="commercial">Commercial / Retail</SelectItem>
                        <SelectItem value="energy">Energy & Infrastructure</SelectItem>
                        <SelectItem value="epc">EPC & Turnkey Contractor</SelectItem>
                        <SelectItem value="manufacturer">Industrial Manufacturer</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Country / Market</Label>
              <Input {...register("country")} placeholder="Egypt" />
              {errors.country && (
                <p className="text-[11px] text-destructive">
                  {errors.country.message}
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
            ) : isEditing ? (
              "Update Partner"
            ) : (
              "Add Partner"
            )}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}

export function NexusPartnersTab({
  partners,
  onRefresh,
}: NexusPartnersTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [selectedPartner, setSelectedPartner] =
    React.useState<ClientPartner | null>(null)
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const handleCreate = () => {
    setSelectedPartner(null)
    setSelectedIndex(partners.length)
    setModalOpen(true)
  }

  const handleEdit = (p: ClientPartner, idx: number) => {
    setSelectedPartner(p)
    setSelectedIndex(idx)
    setModalOpen(true)
  }

  const handleDelete = async (p: ClientPartner, idx: number) => {
    const partnerId = `partner-${idx + 1}`
    const confirmed = window.confirm(
      `Are you sure you want to delete partner "${p.name}"?`
    )
    if (!confirmed) return

    setDeletingId(partnerId)
    try {
      await deletePartnerAction(partnerId)
      toast.success(`Deleted ${p.name} successfully.`)
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete partner."
      toast.error(message)
    } finally {
      setDeletingId(null)
    }
  }

  const getCategoryIcon = (category: ClientPartner["category"]) => {
    switch (category) {
      case "energy":
        return <Zap className="size-3.5 text-amber-500" />
      case "epc":
        return <HardHat className="size-3.5 text-blue-500" />
      case "manufacturer":
        return <Factory className="size-3.5 text-purple-500" />
      default:
        return <Building2 className="size-3.5 text-emerald-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Strategic Clients & Partners
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Tier-1 institutional credentials across Energy, Industrial EPC, and
            Commercial Retail anchor tenants.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="self-start bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:self-auto"
        >
          <Plus className="me-1.5 size-3.5" />
          Add Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p, idx) => (
          <Card
            key={idx}
            className="flex flex-col justify-between border-border/80 bg-card/80 transition-all hover:border-primary/40"
          >
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-md border border-border/80 bg-muted/60 p-1.5">
                    {getCategoryIcon(p.category)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Globe className="size-3" />
                      <span>{p.country}</span>
                    </div>
                  </div>
                </div>

                <Badge variant="outline" className="text-[10px] capitalize">
                  {p.category}
                </Badge>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(p, idx)}
                  className="h-6 px-2 text-xs"
                >
                  <Pencil className="me-1 size-2.5" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(p, idx)}
                  disabled={deletingId === `partner-${idx + 1}`}
                  className="h-6 px-2 text-xs text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-2.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden p-0 sm:max-w-lg">
          {modalOpen && (
            <PartnerFormModal
              key={selectedPartner?.name || `partner-${selectedIndex}`}
              partner={selectedPartner}
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
