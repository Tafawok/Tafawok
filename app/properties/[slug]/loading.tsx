import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyDetailLoading() {
  return (
    <div className="flex flex-col bg-background">
      {/* Property Hero Monograph Header Skeleton */}
      <section className="relative overflow-hidden border-b border-border/80 bg-background pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="container mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <span className="text-muted-foreground/40">/</span>
            <Skeleton className="h-4 w-20" />
            <span className="text-muted-foreground/40">/</span>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Unified Cinematic Hero Gallery Skeleton */}
          <div className="space-y-4">
            <Skeleton className="aspect-16/9 w-full rounded-2xl" />
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-video w-full rounded-lg" />
              ))}
            </div>
          </div>

          {/* Architectural Monograph Title & Narrative */}
          <div className="space-y-6 pt-4">
            {/* Classification line */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-36" />
              <span className="text-muted-foreground/40">•</span>
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-2/3 max-w-2xl sm:h-14" />
              <Skeleton className="h-5 w-1/2 max-w-md" />
            </div>

            {/* Narrative Description */}
            <div className="space-y-2 max-w-4xl">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-64" />
            </div>

            {/* Minimalist Editorial Architectural Stat Ribbon (4 columns) */}
            <div className="pt-2">
              <div className="grid grid-cols-2 divide-y divide-border/50 rounded-xl border border-border/70 bg-card/50 sm:grid-cols-4 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 space-y-2 text-start">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Skeleton className="h-11 w-48 rounded-xl bg-primary/20" />
              <Skeleton className="h-11 w-36 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Matrix Skeleton */}
      <section className="py-16 sm:py-20 border-b border-border/80">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-64" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border/70 bg-card/40 p-4 space-y-2"
              >
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-5 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
