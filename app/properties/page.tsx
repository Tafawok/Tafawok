import type { Metadata } from "next"
import { getProperties } from "@/lib/content/cre-service"
import { PropertiesDirectoryClient } from "@/components/properties/PropertiesDirectoryClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Commercial Properties & Real Estate Developments",
  description:
    "Explore TAFAWOK's premier commercial real estate developments in Egypt — Fagala Plaza in Nasr City, Mall ChillOut in El Shorouk, and October Festival Mall on Gamal Abdel Nasser Axis in the Northern Expansions. Prime wholesale stationery plazas, destination retail malls, and brand showrooms.",
  keywords: [
    "Commercial Real Estate Egypt",
    "Fagala Plaza Nasr City",
    "فجالة بلازا مدينة نصر",
    "Mall ChillOut El Shorouk",
    "مول شل أوت الشروق",
    "October Festival Mall",
    "مول أكتوبر فيستيفال",
    "محور جمال عبد الناصر",
    "التوسعات الشمالية 6 أكتوبر",
    "Stationery Wholesale Egypt",
    "أدوات مكتبية ومدرسية جملة",
    "Seoudi Supermarket El Shorouk",
    "سعودي ماركت الشروق",
    "Z Arcade Egypt",
    "Commercial Leasing Cairo",
    "محلات تجارية للإيجار",
  ],
  alternates: {
    canonical: "/properties",
    languages: {
      "ar-EG": "/properties",
      "en-US": "/properties",
      "x-default": "/properties",
    },
  },
  openGraph: {
    title: "Commercial Properties & Real Estate Developments | TAFAWOK CRE",
    description:
      "Explore TAFAWOK's flagship commercial developments in Egypt: Fagala Plaza (Nasr City), Mall ChillOut (El Shorouk), and October Festival Mall (6th of October).",
    url: "/properties",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAFAWOK Commercial Real Estate Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Properties & Real Estate Developments | TAFAWOK CRE",
    description:
      "Explore TAFAWOK's flagship commercial developments in Egypt: Fagala Plaza, Mall ChillOut, and October Festival Mall.",
    images: ["/og-image.png"],
  },
}

export default async function PropertiesPage() {
  const properties = await getProperties()
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Commercial Properties", url: "/properties" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PropertiesDirectoryClient properties={properties} />
    </>
  )
}
