import { Skeleton } from "@/components/ui/skeleton"

export default function PropertiesLoading() {
  return (
    <div className="relative flex flex-col bg-background">
      {/* Directory Page Hero Header Skeleton */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background py-16 sm:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-10 w-3/4 max-w-xl sm:h-12" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-4/5 max-w-lg" />
          </div>
        </div>
      </section>

      {/* Directory Content Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {/* Portfolio Overview Summary Strip Skeleton */}
          <div className="flex flex-col divide-y divide-border/60 py-2 sm:flex-row sm:items-stretch sm:divide-y-0">
            <div className="flex-1 py-4 text-start sm:py-0 sm:pe-8 space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-36 sm:h-10" />
            </div>

            <div className="hidden items-stretch self-stretch py-1 sm:flex">
              <div className="h-full w-px bg-border/70" />
            </div>

            <div className="flex-1 py-4 text-start sm:px-8 sm:py-0 space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-36 sm:h-10" />
            </div>

            <div className="hidden items-stretch self-stretch py-1 sm:flex">
              <div className="h-full w-px bg-border/70" />
            </div>

            <div className="flex-1 py-4 text-start sm:py-0 sm:ps-8 space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-8 w-36 sm:h-10" />
            </div>
          </div>

          {/* Filter & Search Bar Skeleton */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 rounded-xl border border-border/70 bg-secondary/30 p-1.5">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-lg" />
            </div>

            {/* Search Input */}
            <Skeleton className="h-10 w-full sm:w-80 rounded-xl" />
          </div>

          {/* 3-Column Property Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/80 bg-card/60"
              >
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-28 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-3 gap-2 border-y border-border/50 py-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg bg-primary/15" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
