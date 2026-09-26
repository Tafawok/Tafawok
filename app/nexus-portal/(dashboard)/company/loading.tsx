import { Skeleton } from "@/components/ui/skeleton"

export default function NexusCompanyLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Save Button */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-7 w-72 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg bg-primary/20" />
      </div>

      {/* 2-Column Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Card 1: Official Corporate Entity */}
        <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-5 w-44" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
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

        {/* Card 2: HQ Coordinates & Maps */}
        <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-5 w-48" />
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

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}
