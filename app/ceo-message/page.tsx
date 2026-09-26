import type { Metadata } from "next"
import { CeoMessageClient } from "@/components/ceo/CeoMessageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Executive Leadership Statement & Strategic Vision | TAFAWOK CRE",
  description:
    "Read the official strategic address by TAFAWOK Executive Leadership. Direct corporate accountability, engineering excellence, and enduring commercial partnerships.",
  keywords: [
    "TAFAWOK Executive Leadership",
    "TAFAWOK Strategic Vision",
    "TAFAWOK Real Estate Investment",
    "Direct Executive Reach",
    "Commercial Real Estate Egypt",
    "Building 360",
    "بيان القيادة التنفيذية",
    "رؤية تفوق الاستراتيجية",
    "شركة تفوق للاستثمار العقاري والمقاولات",
  ],
  alternates: {
    canonical: "/ceo-message",
    languages: {
      "ar-EG": "/ceo-message",
      "en-US": "/ceo-message",
      "x-default": "/ceo-message",
    },
  },
  openGraph: {
    title: "Executive Leadership Statement & Strategic Vision | TAFAWOK CRE",
    description:
      "Official strategic address by TAFAWOK Executive Leadership on institutional CRE development, tangible asset value, and uncompromised engineering integrity.",
    type: "website",
    url: "/ceo-message",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAFAWOK Executive Leadership Statement | TAFAWOK CRE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Leadership Statement & Strategic Vision | TAFAWOK CRE",
    description:
      "Official strategic address by TAFAWOK Executive Leadership on institutional CRE development, tangible asset value, and uncompromised engineering integrity.",
    images: ["/og-image.png"],
  },
}

export default function CeoMessagePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Executive Leadership Statement", url: "/ceo-message" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CeoMessageClient />
    </>
  )
}
