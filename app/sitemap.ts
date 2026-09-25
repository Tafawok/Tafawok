import type { MetadataRoute } from "next"
import { getAllPropertySlugs } from "@/content/cre-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tafawok.co"
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          ar: `${baseUrl}`,
          en: `${baseUrl}`,
        },
      },
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/properties`,
          en: `${baseUrl}/properties`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/about`,
          en: `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/ceo-message`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ar: `${baseUrl}/ceo-message`,
          en: `${baseUrl}/ceo-message`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ar: `${baseUrl}/contact`,
          en: `${baseUrl}/contact`,
        },
      },
    },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = getAllPropertySlugs().map(
    (slug) => ({
      url: `${baseUrl}/properties/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${baseUrl}/properties/${slug}`,
          en: `${baseUrl}/properties/${slug}`,
        },
      },
    })
  )

  return [...staticRoutes, ...propertyRoutes]
}
