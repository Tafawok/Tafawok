import { Skeleton } from "@/components/ui/skeleton"

export default function NexusLoginLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-background">
      {/* Top Header Utility Bar */}
      <header className="absolute inset-x-4 top-4 z-20 flex items-center justify-between sm:inset-x-8">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
      </header>

      {/* Centered Obsidian Glass Card Skeleton */}
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-8 shadow-2xl backdrop-blur-xl space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <Skeleton className="h-6 w-32 rounded-full border border-primary/20 bg-primary/10" />
            <Skeleton className="h-10 w-44 rounded-lg" />
            <div className="space-y-2 w-full pt-1">
              <Skeleton className="h-7 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <Skeleton className="h-10 w-full rounded-lg bg-primary/20 mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
