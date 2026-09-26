"use client"

import * as React from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Phone, MapPin, Tag } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { NexusStoreModal } from "@/components/nexus/NexusStoreModal"
import { deleteStoreAction } from "@/lib/content/actions"
import type { Property, StoreItem } from "@/types/cre"

interface NexusStoresTabProps {
  properties: Property[]
  onRefresh?: () => void
}

export function NexusStoresTab({ properties, onRefresh }: NexusStoresTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [selectedPropFilter, setSelectedPropFilter] =
    React.useState<string>("all")
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedStore, setSelectedStore] = React.useState<
    (StoreItem & { propertyId?: string }) | null
  >(null)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  // Flatten all stores with their property id & name
  const allStores = React.useMemo(() => {
    const list: Array<
      StoreItem & { propertyId: string; propertyName: string }
    > = []
    for (const p of properties) {
      if (p.stores) {
        for (const s of p.stores) {
          list.push({
            ...s,
            propertyId: p.id,
            propertyName: p.name.en,
          })
        }
      }
    }
    return list
  }, [properties])

  const filteredStores = React.useMemo(() => {
    if (selectedPropFilter === "all") return allStores
    return allStores.filter((s) => s.propertyId === selectedPropFilter)
  }, [allStores, selectedPropFilter])

  const handleCreate = () => {
    setSelectedStore(null)
    setModalOpen(true)
  }

  const handleEdit = (s: StoreItem & { propertyId: string }) => {
    setSelectedStore(s)
    setModalOpen(true)
  }

  const handleDelete = async (s: StoreItem) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete store "${s.name.en}"?`
    )
    if (!confirmed) return

    setDeletingId(s.id)
    try {
      await deleteStoreAction(s.id)
      toast.success(`Deleted ${s.name.en} successfully.`)
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete store."
      toast.error(message)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Retail Tenant Directory
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Manage bookstores, retail outlets, showrooms, unit allocations, and
            lease statuses.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="me-1.5 size-4" />
          Add Store Tenant
        </Button>
      </div>

      {/* Filter Tabs by Property */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        <Button
          variant={selectedPropFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedPropFilter("all")}
          className="text-xs"
        >
          All Assets ({allStores.length})
        </Button>

        {properties.map((p) => {
          const count = p.stores?.length || 0
          return (
            <Button
              key={p.id}
              variant={selectedPropFilter === p.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPropFilter(p.id)}
              className="text-xs"
            >
              {p.name.en} ({count})
            </Button>
          )
        })}
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((s) => (
          <Card
            key={s.id}
            className="border-border/80 bg-card/70 transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
          >
            <CardContent className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    {s.name.en}
                  </h3>
                  <p className="text-xs font-medium text-primary">
                    {s.name.ar}
                  </p>
                </div>
                <Badge
                  variant={s.status === "open" ? "default" : "outline"}
                  className="shrink-0 text-[10px] font-semibold uppercase"
                >
                  {s.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Tag className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate">{s.category.en}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-primary" />
                  <span>
                    {s.floor.en} {s.unitNumber ? `• ${s.unitNumber}` : ""}
                  </span>
                </div>
                {s.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="size-3.5 shrink-0 text-primary" />
                    <span>{s.phone}</span>
                  </div>
                )}
              </div>

              {s.description && (
                <p className="line-clamp-2 border-t border-border/40 pt-2 text-[11px] leading-relaxed text-muted-foreground">
                  {s.description.en}
                </p>
              )}

              <div className="flex items-center justify-between border-t border-border/60 pt-2 text-[11px]">
                <span className="max-w-37.5 truncate font-medium text-muted-foreground">
                  {s.propertyName}
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(s)}
                    className="h-6 px-2 text-[11px]"
                  >
                    <Pencil className="me-1 size-2.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(s)}
                    disabled={deletingId === s.id}
                    className="h-6 px-2 text-[11px] text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-2.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NexusStoreModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        properties={properties}
        defaultPropertyId={
          selectedPropFilter !== "all" ? selectedPropFilter : properties[0]?.id
        }
        store={selectedStore}
        onSaved={handleRefresh}
      />
    </div>
  )
}
