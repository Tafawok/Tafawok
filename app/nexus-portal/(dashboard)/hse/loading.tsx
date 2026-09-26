import { Skeleton } from "@/components/ui/skeleton"

export default function NexusHseLoading() {
  return (
    <div className="space-y-6">
      {/* Header & Save Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-64 sm:h-8" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg bg-primary/20" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 cols): Policy & Authority */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-3">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-24 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-24 w-full rounded-md" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
            <div className="border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-52" />
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
        </div>

        {/* Right Column (1 col): Certifications */}
        <div>
          <div className="rounded-xl border border-border/80 bg-card/80 p-6 space-y-4">
            <div className="border-b border-border/60 pb-3">
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2"
                >
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
