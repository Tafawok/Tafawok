import { Skeleton } from "@/components/ui/skeleton"

export default function NexusValuesLoading() {
  return (
    <div className="space-y-10">
      {/* SECTION 1: CORPORATE VALUES SKELETON */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-8 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3.5 w-28" />
              </div>
              <Skeleton className="h-3.5 w-full border-t border-border/40 pt-2" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: INVESTMENT PILLARS SKELETON */}
      <div className="space-y-4 border-t border-border/60 pt-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-60 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-8 rounded-md" />
                <Skeleton className="h-6 w-14 rounded-md" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3.5 w-28" />
              </div>
              <Skeleton className="h-3.5 w-full border-t border-border/40 pt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
