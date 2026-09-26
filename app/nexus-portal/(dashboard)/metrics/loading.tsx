import { Skeleton } from "@/components/ui/skeleton"

export default function NexusMetricsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-60 sm:h-8" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* 4-Column Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <Skeleton className="size-10 rounded-lg bg-primary/10" />
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-28" />
            </div>

            <div className="space-y-1.5 border-t border-border/60 pt-3">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
