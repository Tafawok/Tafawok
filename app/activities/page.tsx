import type { Metadata } from "next"
import { getActivities } from "@/lib/content/cre-service"
import { ActivitiesPageClient } from "@/components/activities/ActivitiesPageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Company Activities, Bazaars & Project Launches | TAFAWOK CRE",
  description:
    "Explore TAFAWOK's active commercial real estate developments, project launches, seasonal retail bazaars at Fagala Plaza and Mall ChillOut, and executive summits in Egypt.",
  keywords: [
    "TAFAWOK Activities",
    "Fagala Plaza Bazaar",
    "بازار فجالة بلازا",
    "Commercial Real Estate Launches Egypt",
    "Mall ChillOut Events",
    "October Festival Mall Launches",
    "Wholesale Stationery Expo",
    "معارض وأنشطة تفوق",
  ],
  alternates: {
    canonical: "/activities",
    languages: {
      "ar-EG": "/activities",
      "en-US": "/activities",
      "x-default": "/activities",
    },
  },
  openGraph: {
    title: "Company Activities & Commercial Events | TAFAWOK CRE",
    description:
      "Explore TAFAWOK's project launches, seasonal retail bazaars at Fagala Plaza, and commercial real estate forums in Egypt.",
    url: "/activities",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAFAWOK Activities & Commercial Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company Activities & Commercial Events | TAFAWOK CRE",
    description:
      "Explore TAFAWOK's project launches, seasonal retail bazaars at Fagala Plaza, and commercial real estate forums in Egypt.",
    images: ["/og-image.png"],
  },
}

export default async function ActivitiesPage() {
  const activities = await getActivities()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Activities & Events", url: "/activities" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ActivitiesPageClient activities={activities} />
    </>
  )
}
