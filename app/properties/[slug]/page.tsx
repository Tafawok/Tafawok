import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPropertyBySlug, getAllPropertySlugs } from "@/content/cre-data"
import { PropertyDetailClient } from "@/components/properties/PropertyDetailClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getPropertyJsonLd, getBreadcrumbSchema } from "@/lib/seo/schema"

interface PropertyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    return {
      title: "Property Not Found | TAFAWOK CRE",
    }
  }

  const pageTitle = `${property.name.en} (${property.name.ar}) — ${property.tagline.en}`
  const pageDescription = `${property.name.ar} — ${property.description.ar} | ${property.description.en}`
  const pageUrl = `https://tafawok.co/properties/${slug}`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      property.name.en,
      property.name.ar,
      property.location.city.en,
      property.location.city.ar,
      property.location.address.en,
      property.location.address.ar,
      "Commercial Real Estate Egypt",
      "TAFAWOK Leasing",
      "Retail Space Egypt",
      "Commercial Hub Cairo",
      "محلات تجارية",
      "مكاتب إدارية",
      "تأجير تجاري",
    ],
    alternates: {
      canonical: `/properties/${slug}`,
      languages: {
        "ar-EG": `/properties/${slug}`,
        "en-US": `/properties/${slug}`,
        "x-default": `/properties/${slug}`,
      },
    },
    openGraph: {
      title: `${property.name.en} | ${property.name.ar} — TAFAWOK CRE`,
      description: pageDescription,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: property.mainImage,
          width: 1200,
          height: 630,
          alt: property.name.en,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.name.en} | ${property.name.ar} — TAFAWOK CRE`,
      description: property.description.en,
      images: [property.mainImage],
    },
  }
}

export default async function PropertyDetailPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const propertySchema = getPropertyJsonLd(property)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Commercial Properties", url: "/properties" },
    { name: property.name.en, url: `/properties/${slug}` },
  ])

  return (
    <>
      <JsonLd data={propertySchema} />
      <JsonLd data={breadcrumbSchema} />
      <PropertyDetailClient property={property} />
    </>
  )
}
