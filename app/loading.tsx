import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <div className="flex flex-col bg-background">
      {/* 1. Hero Section Skeleton Replica */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden border-b border-border/80 px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-6">
          {/* Top Badge */}
          <Skeleton className="h-7 w-56 rounded-full border border-primary/20 bg-muted/60" />

          {/* Master Architectural Headline (2 lines) */}
          <div className="flex flex-col items-center space-y-3 w-full">
            <Skeleton className="h-12 w-11/12 max-w-3xl sm:h-16" />
            <Skeleton className="h-12 w-3/4 max-w-2xl sm:h-16" />
          </div>

          {/* Executive Subtitle & Positioning (2 lines) */}
          <div className="flex flex-col items-center space-y-2 pt-2 w-full">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-5/6 max-w-xl" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Skeleton className="h-12 w-48 rounded-xl bg-primary/20" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>

          {/* Minimalist Credentials Strip */}
          <div className="w-full max-w-3xl pt-12">
            <div className="grid grid-cols-1 gap-6 border-t border-border/60 pt-8 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Institutional Metrics Strip Skeleton */}
      <section className="border-b border-border/80 bg-card/40 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2 border-s border-border/60 ps-4">
                <Skeleton className="h-9 w-24 sm:h-11 sm:w-28" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Scroll-Expand Showcase Canvas Skeleton */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-9 w-96 sm:h-11" />
            <Skeleton className="h-4 w-80" />
          </div>

          {/* Full-bleed Canvas Frame */}
          <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-10 flex flex-col justify-end">
            <div className="max-w-xl space-y-4 rounded-xl border border-border/60 bg-background/80 p-6 backdrop-blur-md">
              <Skeleton className="h-5 w-40 rounded-full" />
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Commercial Disciplines Grid Skeleton */}
      <section className="border-t border-border/80 bg-card/30 py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-80 sm:h-10" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="space-y-4 rounded-xl border border-border/70 bg-card/60 p-6"
              >
                <Skeleton className="size-10 rounded-lg bg-primary/10" />
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="pt-4 border-t border-border/50 flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Commercial Assets Portfolio Skeleton */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl space-y-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-72 sm:h-10" />
              <Skeleton className="h-4 w-88" />
            </div>
            <Skeleton className="h-10 w-44 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-border/80 bg-card/60"
              >
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="space-y-3 p-5">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-4 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="grid grid-cols-3 gap-2 border-y border-border/50 py-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Client & Partner Marquee Skeleton */}
      <section className="border-t border-border/80 bg-card/20 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 overflow-hidden opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-10 w-36 shrink-0 rounded-md" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
