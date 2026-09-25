import type { Metadata } from "next"
import { CeoMessageClient } from "@/components/ceo/CeoMessageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "CEO Message & Strategic Vision | Eng. Tarek Ahmed | TAFAWOK",
  description:
    "Read the official strategic address by Eng. Tarek Ahmed, CEO & Company Owner of TAFAWOK Real Estate Investment & Contracting. Direct executive accountability, engineering excellence, and enduring commercial partnerships.",
  keywords: [
    "Eng Tarek Ahmed",
    "CEO Message TAFAWOK",
    "TAFAWOK Real Estate Investment",
    "Direct Owner Reach",
    "Commercial Real Estate Egypt",
    "Building 360",
    "رسالة الرئيس التنفيذي",
    "المهندس طارق أحمد",
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
    title: "CEO Message & Strategic Vision | Eng. Tarek Ahmed | TAFAWOK CRE",
    description:
      "Direct executive address by Eng. Tarek Ahmed on institutional CRE development, tangible asset value, and uncompromised engineering integrity.",
    type: "website",
    url: "https://tafawok.co/ceo-message",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eng. Tarek Ahmed — CEO Message | TAFAWOK CRE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEO Message & Strategic Vision | Eng. Tarek Ahmed | TAFAWOK CRE",
    description:
      "Direct executive address by Eng. Tarek Ahmed on institutional CRE development, tangible asset value, and uncompromised engineering integrity.",
    images: ["/og-image.png"],
  },
}

export default function CeoMessagePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "CEO Strategic Address", url: "/ceo-message" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CeoMessageClient />
    </>
  )
}
