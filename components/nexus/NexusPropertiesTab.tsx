"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Store,
  Building2,
  Calendar,
  Layers,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { NexusPropertyModal } from "@/components/nexus/NexusPropertyModal"
import { deletePropertyAction } from "@/lib/content/actions"
import type { Property } from "@/types/cre"

interface NexusPropertiesTabProps {
  properties: Property[]
  onRefresh?: () => void
}

export function NexusPropertiesTab({
  properties,
  onRefresh,
}: NexusPropertiesTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selectedProperty, setSelectedProperty] =
    React.useState<Property | null>(null)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const handleCreate = () => {
    setSelectedProperty(null)
    setModalOpen(true)
  }

  const handleEdit = (p: Property) => {
    setSelectedProperty(p)
    setModalOpen(true)
  }

  const handleDelete = async (p: Property) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${p.name.en}"? All associated retail store records will also be removed.`
    )
    if (!confirmed) return

    setDeletingId(p.id)
    try {
      await deletePropertyAction(p.id)
      toast.success(`Deleted ${p.name.en} successfully.`)
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete property."
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
            Commercial Asset Flagships
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Manage flagship real estate developments, retail plazas,
            specifications, and media tours.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="me-1.5 size-4" />
          Add Commercial Asset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => {
          const storeCount = p.stores?.length || 0

          return (
            <Card
              key={p.id}
              className="group overflow-hidden border-border/80 bg-card/80 transition-all hover:border-primary/40 hover:shadow-xl"
            >
              {/* Asset Hero Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {p.mainImage ? (
                  <Image
                    src={p.mainImage}
                    alt={p.name.en}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    <Building2 className="size-10 stroke-1" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-s-3 top-3 flex gap-1.5">
                  <Badge className="bg-primary text-[10px] font-semibold text-primary-foreground">
                    {p.type?.toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/20 bg-black/40 text-[10px] text-white backdrop-blur-md"
                  >
                    {p.status}
                  </Badge>
                </div>

                <div className="absolute inset-s-3 inset-e-3 bottom-3 text-white">
                  <h3 className="text-base leading-tight font-bold drop-shadow-sm">
                    {p.name.en}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/80">
                    {p.tagline.en}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">
                      {p.location?.city?.en || "Cairo"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Store className="size-3.5 shrink-0 text-primary" />
                    <span>{storeCount} Stores</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="size-3.5 shrink-0 text-primary" />
                    <span>GLA: {p.keyStats?.gla || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 shrink-0 text-primary" />
                    <span>{p.gallery?.length || 0} Photos</span>
                  </div>
                </div>

                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {p.description.en}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <Link
                    href={`/properties/${p.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="size-3" />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(p)}
                      className="h-7 px-2.5 text-xs"
                    >
                      <Pencil className="me-1 size-3" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(p)}
                      disabled={deletingId === p.id}
                      className="h-7 px-2 text-xs text-destructive hover:border-destructive/40 hover:bg-destructive/10"
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <NexusPropertyModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        property={selectedProperty}
        onSaved={handleRefresh}
      />
    </div>
  )
}
