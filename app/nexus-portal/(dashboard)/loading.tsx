import { Skeleton } from "@/components/ui/skeleton"

export default function NexusDashboardLoading() {
  return (
    <div className="space-y-6">
      {/* 4 Performance Metric Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card/60 p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="size-8 rounded-lg bg-primary/10" />
            </div>
            <Skeleton className="h-8 w-28 sm:h-9" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>

      {/* Main Content Card Skeleton */}
      <div className="rounded-xl border border-border/80 bg-card/50 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-72" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg bg-primary/20" />
          </div>
        </div>

        {/* Content Rows / Table Skeleton */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-4 rounded-lg border border-border/50 bg-muted/20 p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg bg-muted/60" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-20 rounded-md" />
                <Skeleton className="size-7 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
