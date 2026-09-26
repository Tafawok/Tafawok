import { Skeleton } from "@/components/ui/skeleton"

export default function NexusDisciplinesLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-7 w-64 sm:h-8" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* 2-Column Disciplines Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3.5 w-40" />
              </div>
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            {/* Metric Box */}
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 p-3">
              <div className="space-y-1">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="space-y-1 text-end">
                <Skeleton className="h-4 w-28 ms-auto" />
                <Skeleton className="h-3 w-16 ms-auto" />
              </div>
            </div>

            {/* Capabilities List */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-3 w-40" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
