import { Skeleton } from "@/components/ui/skeleton"

export default function NexusPropertiesLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Action Button */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-44 rounded-lg bg-primary/20" />
      </div>

      {/* 3-Column Asset Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-border/80 bg-card/80 space-y-4"
          >
            {/* Aspect Video Hero Thumbnail */}
            <div className="relative aspect-video w-full bg-muted/60 p-3 flex flex-col justify-between">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-md bg-primary/30" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>

            {/* Card Content & Stats */}
            <div className="p-4 space-y-4 pt-0">
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center justify-between border-t border-border/60 pt-3">
                <Skeleton className="h-8 w-20 rounded-md" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-8 rounded-md" />
                  <Skeleton className="size-8 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
