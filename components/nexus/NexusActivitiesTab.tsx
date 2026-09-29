"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Calendar,
  Sparkles,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  MapPin,
  Clock,
  Eye,
  EyeOff,
  Bell,
  Search,
  Building2,
  Store,
  Compass,
  Users,
  AlertTriangle,
} from "lucide-react"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { NexusActivityModal } from "@/components/nexus/NexusActivityModal"
import { NexusBannerModal } from "@/components/nexus/NexusBannerModal"
import {
  deleteActivityAction,
  toggleActivityPublishedAction,
  deleteNotificationBannerAction,
  toggleBannerActiveAction,
} from "@/lib/content/actions"
import { NotificationBanner as BannerPreviewComponent } from "@/components/layout/NotificationBanner"
import type {
  Activity,
  NotificationBanner,
  ActivityCategory,
} from "@/types/cre"

interface NexusActivitiesTabProps {
  initialActivities: Activity[]
  initialBanners: NotificationBanner[]
}

const CATEGORY_ICONS: Record<ActivityCategory, React.ElementType> = {
  launch: Building2,
  bazaar: Store,
  exhibition: Compass,
  corporate: Users,
  community: Sparkles,
}

export function NexusActivitiesTab({
  initialActivities,
  initialBanners,
}: NexusActivitiesTabProps) {
  const router = useRouter()

  const [activeTab, setActiveTab] = React.useState<"activities" | "banners">(
    "activities"
  )
  const [activitiesList, setActivitiesList] =
    React.useState<Activity[]>(initialActivities)
  const [bannersList, setBannersList] =
    React.useState<NotificationBanner[]>(initialBanners)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Synchronize state if props change without cascading effect renders
  const [prevInitial, setPrevInitial] = React.useState({
    activities: initialActivities,
    banners: initialBanners,
  })
  if (
    prevInitial.activities !== initialActivities ||
    prevInitial.banners !== initialBanners
  ) {
    setPrevInitial({ activities: initialActivities, banners: initialBanners })
    setActivitiesList(initialActivities)
    setBannersList(initialBanners)
  }

  // Modal States
  const [activityModalOpen, setActivityModalOpen] = React.useState(false)
  const [editingActivity, setEditingActivity] = React.useState<Activity | null>(
    null
  )

  const [bannerModalOpen, setBannerModalOpen] = React.useState(false)
  const [editingBanner, setEditingBanner] =
    React.useState<NotificationBanner | null>(null)

  // Delete Dialog States
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<{
    type: "activity" | "banner"
    id: string
    title: string
  } | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  // Filter activities
  const filteredActivities = React.useMemo(() => {
    if (!searchQuery.trim()) return activitiesList
    const q = searchQuery.toLowerCase().trim()
    return activitiesList.filter(
      (a) =>
        a.title.en.toLowerCase().includes(q) ||
        a.title.ar.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    )
  }, [activitiesList, searchQuery])

  // Delete Confirmation
  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)

    try {
      if (itemToDelete.type === "activity") {
        await deleteActivityAction(itemToDelete.id)
        setActivitiesList((prev) =>
          prev.filter((a) => a.id !== itemToDelete.id)
        )
        toast.success("Activity deleted successfully.")
      } else {
        await deleteNotificationBannerAction(itemToDelete.id)
        setBannersList((prev) => prev.filter((b) => b.id !== itemToDelete.id))
        toast.success("Banner deleted successfully.")
      }
      setDeleteDialogOpen(false)
      setItemToDelete(null)
      router.refresh()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete item.")
    } finally {
      setIsDeleting(false)
    }
  }

  // Toggle Activity Publication
  const handleTogglePublished = async (activity: Activity) => {
    const newStatus = !activity.isPublished
    try {
      await toggleActivityPublishedAction(activity.id, newStatus)
      setActivitiesList((prev) =>
        prev.map((a) =>
          a.id === activity.id ? { ...a, isPublished: newStatus } : a
        )
      )
      toast.success(
        newStatus
          ? "Activity published to live site!"
          : "Activity hidden from public site."
      )
      router.refresh()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to toggle status."
      )
    }
  }

  // Toggle Banner Active
  const handleToggleBannerActive = async (banner: NotificationBanner) => {
    const newStatus = !banner.isActive
    try {
      await toggleBannerActiveAction(banner.id, newStatus)
      setBannersList((prev) =>
        prev.map((b) =>
          b.id === banner.id ? { ...b, isActive: newStatus } : b
        )
      )
      toast.success(
        newStatus ? "Banner activated for live display!" : "Banner deactivated."
      )
      router.refresh()
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to toggle banner."
      )
    }
  }

  const formatShortDate = (dateIso?: string) => {
    if (!dateIso) return "-"
    try {
      return new Date(dateIso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch {
      return dateIso
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Activities, Bazaars & Announcement Banners
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Publish company happenings, retail expos, and configure
            time-scheduled top ribbons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "activities" ? (
            <Button
              onClick={() => {
                setEditingActivity(null)
                setActivityModalOpen(true)
              }}
              className="cursor-pointer gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create Activity</span>
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEditingBanner(null)
                setBannerModalOpen(true)
              }}
              className="cursor-pointer gap-1.5 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Create Announcement Banner</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-border">
        <button
          type="button"
          onClick={() => setActiveTab("activities")}
          className={`flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors select-none sm:text-sm ${
            activeTab === "activities"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Activities & Events ({activitiesList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("banners")}
          className={`flex cursor-pointer items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors select-none sm:text-sm ${
            activeTab === "banners"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Notification Banners ({bannersList.length})</span>
        </button>
      </div>

      {/* TAB 1: ACTIVITIES DIRECTORY */}
      {activeTab === "activities" && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-sm">
            <Search className="absolute start-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="h-9 w-full rounded-lg border border-border bg-background ps-9 pe-3 text-xs outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {filteredActivities.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground/60" />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  No activities found
                </p>
                <p className="text-xs text-muted-foreground">
                  Create your first company bazaar, launch, or event
                  announcement.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((act) => {
                const Icon = CATEGORY_ICONS[act.category] || Building2
                return (
                  <Card
                    key={act.id}
                    className={`overflow-hidden border transition-all ${
                      act.isPublished
                        ? "border-border"
                        : "border-amber-500/40 opacity-75"
                    }`}
                  >
                    <div className="relative aspect-[16/9] w-full bg-muted">
                      <Image
                        src={act.mainImage}
                        alt={act.title.en}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute start-2 top-2 flex items-center gap-1.5">
                        <Badge
                          variant="secondary"
                          className="gap-1 text-[10px] backdrop-blur-sm"
                        >
                          <Icon className="h-3 w-3" />
                          <span className="capitalize">{act.category}</span>
                        </Badge>
                        <Badge
                          variant={
                            act.status === "ongoing" ? "default" : "outline"
                          }
                          className="text-[10px] capitalize"
                        >
                          {act.status}
                        </Badge>
                      </div>

                      {act.featured && (
                        <div className="absolute end-2 top-2">
                          <Badge className="bg-amber-500 text-[10px] text-white">
                            <Sparkles className="me-1 h-2.5 w-2.5" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="space-y-3 p-4">
                      <div>
                        <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3 text-primary" />
                          <span>
                            {formatShortDate(act.startDate)}{" "}
                            {act.endDate
                              ? `– ${formatShortDate(act.endDate)}`
                              : ""}
                          </span>
                        </div>
                        <h3 className="mt-1 line-clamp-1 text-sm font-bold text-foreground">
                          {act.title.en}
                        </h3>
                        <p
                          className="font-arabic line-clamp-1 text-right text-[11px] text-muted-foreground"
                          dir="rtl"
                        >
                          {act.title.ar}
                        </p>
                      </div>

                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {act.summary.en}
                      </p>

                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3 text-primary" />
                        <span className="truncate">{act.locationName.en}</span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between border-t border-border/60 pt-3">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => handleTogglePublished(act)}
                            title={
                              act.isPublished
                                ? "Unpublish activity"
                                : "Publish activity"
                            }
                          >
                            {act.isPublished ? (
                              <Eye className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-amber-500" />
                            )}
                          </Button>

                          <a
                            href={`/activities/${act.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            title="Preview public page"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setEditingActivity(act)
                              setActivityModalOpen(true)
                            }}
                            title="Edit activity"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>

                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 cursor-pointer"
                            onClick={() => {
                              setItemToDelete({
                                type: "activity",
                                id: act.id,
                                title: act.title.en,
                              })
                              setDeleteDialogOpen(true)
                            }}
                            title="Delete activity"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NOTIFICATION BANNERS */}
      {activeTab === "banners" && (
        <div className="space-y-6">
          {/* Live Preview Box */}
          {bannersList.length > 0 && (
            <div className="space-y-2 rounded-xl border border-primary/30 bg-card p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-1 text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Live Ribbon Rendering Sample (Preview)
                </span>
                <span className="font-mono text-[11px]">
                  {bannersList.find((b) => b.isActive)
                    ? "Active Banner Enabled"
                    : "No Active Banner"}
                </span>
              </div>
              <div className="overflow-hidden rounded-lg border border-border">
                {bannersList.find((b) => b.isActive) ? (
                  <BannerPreviewComponent
                    banner={bannersList.find((b) => b.isActive)}
                  />
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Currently no banners are toggled active. Toggle a banner
                    below to activate the public ribbon.
                  </div>
                )}
              </div>
            </div>
          )}

          {bannersList.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-10 text-center">
                <Bell className="h-10 w-10 text-muted-foreground/60" />
                <p className="mt-3 text-sm font-semibold text-foreground">
                  No announcement banners
                </p>
                <p className="text-xs text-muted-foreground">
                  Create a banner to announce launches, active bazaars, or
                  events on the top of the site.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {bannersList.map((banner) => (
                <Card
                  key={banner.id}
                  className={`p-4 transition-all ${
                    banner.isActive
                      ? "border-primary/50 shadow-xs"
                      : "border-border/60 opacity-70"
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[10px] capitalize"
                        >
                          {banner.type}
                        </Badge>
                        <Badge
                          variant={banner.isActive ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {banner.isActive ? "Active on Site" : "Inactive"}
                        </Badge>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          Priority: {banner.priority}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-foreground">
                        {banner.title.en}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {banner.message.en}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="font-mono">
                          Schedule: {formatShortDate(banner.startDate)} –{" "}
                          {formatShortDate(banner.endDate)}
                        </span>
                        {banner.location && (
                          <span>• Location: {banner.location.en}</span>
                        )}
                        {banner.linkUrl && (
                          <span>• Target: {banner.linkUrl}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button
                        variant={banner.isActive ? "secondary" : "default"}
                        size="sm"
                        onClick={() => handleToggleBannerActive(banner)}
                        className="h-8 cursor-pointer text-xs"
                      >
                        {banner.isActive ? "Deactivate" : "Activate"}
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => {
                          setEditingBanner(banner)
                          setBannerModalOpen(true)
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 cursor-pointer"
                        onClick={() => {
                          setItemToDelete({
                            type: "banner",
                            id: banner.id,
                            title: banner.title.en,
                          })
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Activity Edit / Create Modal */}
      <NexusActivityModal
        open={activityModalOpen}
        onOpenChange={setActivityModalOpen}
        activity={editingActivity}
        onSaved={() => router.refresh()}
      />

      {/* Banner Edit / Create Modal */}
      <NexusBannerModal
        open={bannerModalOpen}
        onOpenChange={setBannerModalOpen}
        banner={editingBanner}
        onSaved={() => router.refresh()}
      />

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <AlertTriangle />
            </AlertDialogMedia>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong className="text-foreground">{itemToDelete?.title}</strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="danger"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
