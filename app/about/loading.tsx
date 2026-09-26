import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. About Hero Section Skeleton */}
      <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-secondary/40 via-background to-background pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-10 w-4/5 max-w-xl sm:h-14" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* 4 Scale Metrics */}
          <div className="grid grid-cols-2 gap-6 border-t border-border/60 pt-8 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-8 w-24 sm:h-10" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Heritage Timeline Section Skeleton */}
      <section className="py-20 sm:py-24 border-b border-border/80">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-80 sm:h-10" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex gap-6 rounded-xl border border-border/70 bg-card/40 p-6"
              >
                <Skeleton className="size-12 shrink-0 rounded-xl bg-primary/10" />
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Strategic Investment Thesis (3 Pillars) Skeleton */}
      <section className="py-20 sm:py-24 border-b border-border/80 bg-card/20">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-72 sm:h-10" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-4 rounded-xl border border-border/70 bg-card/60 p-6"
              >
                <Skeleton className="size-10 rounded-lg bg-primary/10" />
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HSE & Governance Charter Skeleton */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border/80 bg-card/50 p-8 sm:p-12 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-36 rounded-full" />
                <Skeleton className="h-8 w-64 sm:h-10" />
              </div>
              <Skeleton className="h-10 w-44 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
