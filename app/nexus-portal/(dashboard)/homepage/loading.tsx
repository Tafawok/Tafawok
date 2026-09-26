import { Skeleton } from "@/components/ui/skeleton"

export default function NexusHomepageLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Action Toolbar */}
      <div className="flex flex-col gap-4 border-b border-border/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-80 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-36 rounded-md" />
          <Skeleton className="h-9 w-36 rounded-md bg-primary/20" />
        </div>
      </div>

      {/* Tabs Header */}
      <div className="grid w-full max-w-md grid-cols-2 gap-2 rounded-lg border border-border/70 bg-muted/40 p-1">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>

      {/* Card 1: Interactive Canvas Media Uploader Replica */}
      <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-4 w-3/4 max-w-xl" />
        <div className="max-w-2xl space-y-2 pt-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="aspect-video w-full rounded-xl border border-dashed border-border/80 bg-muted/20" />
        </div>
      </div>

      {/* Card 2: Section Titles & Meta Card */}
      <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-5 w-56" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
