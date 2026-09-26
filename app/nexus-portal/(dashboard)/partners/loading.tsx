import { Skeleton } from "@/components/ui/skeleton"

export default function NexusPartnersLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg bg-primary/20" />
      </div>

      {/* 3-Column Partners Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-xl border border-border/80 bg-card/80 p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Skeleton className="size-8 rounded-md bg-muted/60" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border/60 pt-2">
              <Skeleton className="h-6 w-14 rounded-md" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
