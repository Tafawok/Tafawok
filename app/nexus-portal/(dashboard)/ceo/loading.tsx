import { Skeleton } from "@/components/ui/skeleton"

export default function NexusCeoLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Save Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-72 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-36 rounded-lg bg-primary/20" />
      </div>

      {/* 3 Tabs Header */}
      <div className="grid w-full grid-cols-3 gap-2 rounded-lg border border-border/70 bg-muted/40 p-1">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>

      {/* Main Form Card Skeleton */}
      <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-5">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-10 w-full rounded-md" />
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
