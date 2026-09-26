import { HomeClient } from "@/components/home/HomeClient"
import {
  getHomepageSettings,
  getCorporateMetrics,
  getProperties,
  getOwnerDetails,
  getClientPartners,
} from "@/lib/content/cre-service"

export default async function HomePage() {
  const [homepageSettings, metrics, properties, ownerDetails, partners] =
    await Promise.all([
      getHomepageSettings(),
      getCorporateMetrics(),
      getProperties(),
      getOwnerDetails(),
      getClientPartners(),
    ])

  return (
    <HomeClient
      homepageSettings={homepageSettings}
      metrics={metrics}
      properties={properties}
      ownerDetails={ownerDetails}
      partners={partners}
    />
  )
}
