"use client"

import * as React from "react"
import { toast } from "sonner"
import {
  Mail,
  Building,
  CheckCircle2,
  Archive,
  Trash2,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/content/actions"
import type { Tables } from "@/types/database.types"

interface NexusInquiriesTabProps {
  inquiries: Tables<"inquiries">[]
  onRefresh?: () => void
}

export function NexusInquiriesTab({
  inquiries,
  onRefresh,
}: NexusInquiriesTabProps) {
  const router = useRouter()
  const handleRefresh = onRefresh || (() => router.refresh())
  const [filter, setFilter] = React.useState<
    "all" | "new" | "contacted" | "archived"
  >("all")
  const [loadingId, setLoadingId] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    if (filter === "all") return inquiries
    return inquiries.filter((i) => i.status === filter)
  }, [inquiries, filter])

  const handleStatusChange = async (
    id: string,
    status: "new" | "contacted" | "archived"
  ) => {
    setLoadingId(id)
    try {
      await updateInquiryStatusAction(id, status)
      toast.success(`Inquiry marked as ${status}.`)
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update inquiry status."
      toast.error(message)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry permanently?"
    )
    if (!confirmed) return

    setLoadingId(id)
    try {
      await deleteInquiryAction(id)
      toast.success("Inquiry deleted successfully.")
      handleRefresh()
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to delete inquiry."
      toast.error(message)
    } finally {
      setLoadingId(null)
    }
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="border-rose-500/30 bg-rose-500/20 text-[10px] text-rose-500">
            NEW
          </Badge>
        )
      case "contacted":
        return (
          <Badge className="border-amber-500/30 bg-amber-500/20 text-[10px] text-amber-500">
            CONTACTED
          </Badge>
        )
      case "archived":
        return (
          <Badge
            variant="outline"
            className="text-[10px] text-muted-foreground"
          >
            ARCHIVED
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Inquiries & Commercial RFQs ({inquiries.length})
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Live submissions received through the corporate contact portal and
            commercial leasing dialogs.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/80 bg-muted/30 p-1">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className="h-7 text-xs"
          >
            All ({inquiries.length})
          </Button>
          <Button
            variant={filter === "new" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("new")}
            className="h-7 text-xs"
          >
            New ({inquiries.filter((i) => i.status === "new").length})
          </Button>
          <Button
            variant={filter === "contacted" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("contacted")}
            className="h-7 text-xs"
          >
            Contacted (
            {inquiries.filter((i) => i.status === "contacted").length})
          </Button>
          <Button
            variant={filter === "archived" ? "default" : "ghost"}
            size="sm"
            onClick={() => setFilter("archived")}
            className="h-7 text-xs"
          >
            Archived ({inquiries.filter((i) => i.status === "archived").length})
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card className="border-border/60 bg-card/40 p-12 text-center">
          <MessageSquare className="mx-auto size-10 stroke-1 text-muted-foreground" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">
            No Inquiries Found
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {filter === "all"
              ? "No commercial inquiries have been submitted yet."
              : `No inquiries with status '${filter}' found.`}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="border-border/80 bg-card/80 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex flex-col justify-between gap-2 border-b border-border/60 pb-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {item.name}
                        </span>
                        {statusBadge(item.status)}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <a
                          href={`mailto:${item.email}`}
                          className="transition-colors hover:text-primary"
                        >
                          {item.email}
                        </a>
                        {item.phone && (
                          <>
                            <span>•</span>
                            <a
                              href={`tel:${item.phone}`}
                              className="transition-colors hover:text-primary"
                            >
                              {item.phone}
                            </a>
                          </>
                        )}
                        {item.company && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Building className="size-3 text-primary" />
                              {item.company}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end text-xs text-muted-foreground sm:self-center">
                    <Clock className="size-3 text-primary" />
                    <span>{new Date(item.created_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {item.interest_type && (
                    <Badge variant="outline" className="text-[10px]">
                      Type: {item.interest_type}
                    </Badge>
                  )}
                  {item.property_slug && (
                    <Badge
                      variant="outline"
                      className="border-primary/30 text-[10px] text-primary"
                    >
                      Asset: {item.property_slug}
                    </Badge>
                  )}
                </div>

                <div className="rounded-lg border border-border/40 bg-muted/30 p-3.5 text-xs leading-relaxed whitespace-pre-wrap text-foreground">
                  {item.message}
                </div>

                <div className="flex items-center justify-between border-t border-border/60 pt-3">
                  <div className="flex items-center gap-2">
                    {item.status !== "contacted" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "contacted")}
                        disabled={loadingId === item.id}
                        className="h-7 text-xs"
                      >
                        <CheckCircle2 className="me-1 size-3 text-emerald-500" />
                        Mark Contacted
                      </Button>
                    )}

                    {item.status !== "archived" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "archived")}
                        disabled={loadingId === item.id}
                        className="h-7 text-xs text-muted-foreground"
                      >
                        <Archive className="me-1 size-3" />
                        Archive
                      </Button>
                    )}

                    {item.status !== "new" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "new")}
                        disabled={loadingId === item.id}
                        className="h-7 text-xs text-muted-foreground"
                      >
                        Mark New
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    disabled={loadingId === item.id}
                    className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
