import { Skeleton } from "@/components/ui/skeleton"

export default function CeoMessageLoading() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. Executive Vision Hero Skeleton */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-6 w-44 rounded-full" />
            <Skeleton className="h-10 w-4/5 max-w-xl sm:h-14" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>

      {/* 2. Formal Address Dual Column Skeleton */}
      <section className="py-16 sm:py-20 border-b border-border/80">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Executive Profile Card (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-border/80 bg-card/60 p-6 space-y-6">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="space-y-2 border-t border-border/50 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Formal Statement Letter (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-border/80 bg-card/40 p-8 sm:p-10 space-y-6">
              <Skeleton className="h-8 w-64" />
              <div className="space-y-3 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="pt-6 border-t border-border/50 flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Strategic Doctrine (3 Pillars) Skeleton */}
      <section className="py-16 sm:py-20 border-b border-border/80 bg-card/20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border/70 bg-card/60 p-6 space-y-3"
              >
                <Skeleton className="size-8 rounded-lg bg-primary/10" />
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
