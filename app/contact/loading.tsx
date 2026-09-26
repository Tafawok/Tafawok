import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. Contact Hero Header Skeleton */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-10 w-4/5 max-w-xl sm:h-14" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-lg" />
          </div>
        </div>
      </section>

      {/* 2. Main Dual-Column Content Skeleton */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:space-y-24 lg:px-8">
          {/* Row 1: Dual Column Inquiry Form & Owner Reach */}
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Inquiry Form Card (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-72" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-28 w-full rounded-lg" />
              </div>

              <Skeleton className="h-12 w-full rounded-xl bg-primary/20" />
            </div>

            {/* Right Column: Executive Owner Reach Card & Profile Download (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-border/80 bg-card/50 p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>

                <div className="space-y-4 pt-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl border border-border/60 bg-muted/20 p-4"
                    >
                      <Skeleton className="size-10 rounded-lg bg-primary/10" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-36" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-border/60 bg-primary/5 p-4 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>

              {/* Profile Download Card Skeleton */}
              <div className="rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3.5">
                  <Skeleton className="size-10 rounded-xl bg-primary/10" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-3.5 w-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border/60 pt-4">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-8 w-28 rounded-lg bg-primary/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Cairo HQ Map Skeleton */}
          <div className="rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="aspect-21/9 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
