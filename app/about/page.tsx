import type { Metadata } from "next"
import { AboutUsClient } from "@/components/about/AboutUsClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title:
    "About TAFAWOK | 25+ Years Corporate Heritage & Engineering Leadership",
  description:
    "Discover the corporate heritage of TAFAWOK Real Estate Investment & Contracting. Rooted in 5 decades of Gulf megaproject execution, we develop premier commercial offices, retail hubs, and logistics parks with strict Zero-Harm HSE compliance.",
  keywords: [
    "TAFAWOK Real Estate Investment",
    "About TAFAWOK",
    "Commercial Real Estate Developer Egypt",
    "TAFAWOK Leadership",
    "Gulf Construction Heritage",
    "Zero Harm HSE Policy",
    "New Cairo Commercial Developer",
    "شركة تفوق للاستثمار العقاري والمقاولات",
    "تاريخ شركة تفوق",
    "قيادة تفوق التنفيذية",
  ],
  alternates: {
    canonical: "/about",
    languages: {
      "ar-EG": "/about",
      "en-US": "/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "About TAFAWOK | Corporate Heritage & CRE Excellence",
    description:
      "Backed by 25+ years of multidisciplinary execution and five decades of regional Gulf heritage, TAFAWOK develops enduring commercial assets in Egypt.",
    type: "website",
    url: "/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About TAFAWOK Corporate Heritage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TAFAWOK | Corporate Heritage & CRE Excellence",
    description:
      "Backed by 25+ years of multidisciplinary execution and five decades of regional Gulf heritage, TAFAWOK develops enduring commercial assets in Egypt.",
    images: ["/og-image.png"],
  },
}

import {
  getCorporateMetrics,
  getCorporateTimeline,
  getInvestmentPillars,
  getCorporateValues,
  getHseCharter,
  getOwnerDetails,
} from "@/lib/content/cre-service"

export default async function AboutPage() {
  const [metrics, timeline, pillars, values, hseCharter, ownerDetails] =
    await Promise.all([
      getCorporateMetrics(),
      getCorporateTimeline(),
      getInvestmentPillars(),
      getCorporateValues(),
      getHseCharter(),
      getOwnerDetails(),
    ])

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AboutUsClient
        metrics={metrics}
        timeline={timeline}
        pillars={pillars}
        values={values}
        hseCharter={hseCharter}
        ownerDetails={ownerDetails}
      />
    </>
  )
}
