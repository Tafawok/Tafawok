import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getActivityBySlug, getActivities } from "@/lib/content/cre-service"
import { ActivityDetailClient } from "@/components/activities/ActivityDetailClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const dynamic = "force-dynamic"

interface ActivityPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params
  const activity = await getActivityBySlug(slug)

  if (!activity) {
    return {
      title: "Activity Not Found | TAFAWOK CRE",
    }
  }

  const title = `${activity.title.en} (${activity.title.ar}) | TAFAWOK Activities`
  const description = `${activity.summary.en} — ${activity.summary.ar}`

  return {
    title,
    description,
    openGraph: {
      title: `${activity.title.ar} / ${activity.title.en} | TAFAWOK CRE`,
      description,
      url: `/activities/${activity.slug}`,
      images: [
        {
          url: activity.mainImage,
          width: 1200,
          height: 630,
          alt: activity.title.en,
        },
      ],
    },
    alternates: {
      canonical: `/activities/${activity.slug}`,
      languages: {
        "ar-EG": `/activities/${activity.slug}`,
        "en-US": `/activities/${activity.slug}`,
        "x-default": `/activities/${activity.slug}`,
      },
    },
  }
}

export default async function ActivityDetailPage({ params }: ActivityPageProps) {
  const { slug } = await params
  const [activity, allActivities] = await Promise.all([
    getActivityBySlug(slug),
    getActivities(),
  ])

  if (!activity) {
    notFound()
  }

  const relatedActivities = allActivities
    .filter((a) => a.id !== activity.id && a.isPublished)
    .slice(0, 3)

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Activities & Events", url: "/activities" },
    { name: activity.title.en, url: `/activities/${activity.slug}` },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ActivityDetailClient
        activity={activity}
        relatedActivities={relatedActivities}
      />
    </>
  )
}
