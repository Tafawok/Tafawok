import { Skeleton } from "@/components/ui/skeleton"

export default function NexusInquiriesLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/80 bg-muted/30 p-1">
          <Skeleton className="h-7 w-16 rounded-md" />
          <Skeleton className="h-7 w-16 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
      </div>

      {/* Inquiries Cards List */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-border/80 bg-card/80 p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/60 pb-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-3.5 w-44" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              </div>
              <Skeleton className="h-3.5 w-24" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />

            <div className="flex items-center justify-between border-t border-border/50 pt-3">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
