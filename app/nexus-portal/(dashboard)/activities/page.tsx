import {
  getAllActivitiesForAdmin,
  getNotificationBanners,
} from "@/lib/content/cre-service"
import { NexusActivitiesTab } from "@/components/nexus/NexusActivitiesTab"

export const dynamic = "force-dynamic"

export default async function NexusActivitiesPage() {
  const [activities, banners] = await Promise.all([
    getAllActivitiesForAdmin(),
    getNotificationBanners(),
  ])

  return (
    <NexusActivitiesTab
      initialActivities={activities}
      initialBanners={banners}
    />
  )
}
