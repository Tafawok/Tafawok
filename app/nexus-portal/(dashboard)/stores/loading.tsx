import { Skeleton } from "@/components/ui/skeleton"

export default function NexusStoresLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-7 w-60 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-40 rounded-lg bg-primary/20" />
      </div>

      {/* Property Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-3">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-md" />
        <Skeleton className="h-8 w-36 rounded-md" />
      </div>

      {/* 3-Column Stores Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card/70 p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-28" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            <div className="space-y-2 pt-2 border-t border-border/60">
              <div className="flex items-center gap-2">
                <Skeleton className="size-3.5 rounded" />
                <Skeleton className="h-3.5 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-3.5 rounded" />
                <Skeleton className="h-3.5 w-28" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-1.5 border-t border-border/60 pt-3">
              <Skeleton className="size-7 rounded-md" />
              <Skeleton className="size-7 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
