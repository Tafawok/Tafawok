import { Skeleton } from "@/components/ui/skeleton"

export default function NexusTimelineLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-36 rounded-lg bg-primary/20" />
      </div>

      {/* 2-Column Milestones Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-18 rounded-xl" />
                <Skeleton className="h-6 w-32 rounded-md" />
              </div>
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>

            <div className="space-y-1.5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-3">
              <Skeleton className="h-7 w-16 rounded-md" />
              <Skeleton className="h-7 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
