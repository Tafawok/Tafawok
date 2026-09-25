import type { Metadata } from "next"
import { ContactPageClient } from "@/components/contact/ContactPageClient"
import { JsonLd } from "@/components/seo/JsonLd"
import { getBreadcrumbSchema } from "@/lib/seo/schema"

export const metadata: Metadata = {
  title: "Contact & Official RFQ | Executive Commercial Inquiries",
  description:
    "Direct engagement with TAFAWOK Real Estate Investment & Contracting Company. Connect with Eng. Tarek Ahmed (CEO), submit formal leasing RFQs, and coordinate meetings at our Cairo Executive Headquarters in Building 360, Fifth Settlement.",
  keywords: [
    "Contact TAFAWOK",
    "TAFAWOK RFQ",
    "Commercial Leasing Inquiry",
    "New Cairo Office Lease",
    "Eng Tarek Ahmed Phone",
    "Building 360 New Cairo",
    "Commercial Real Estate Developer Egypt",
    "اتصل بشركة تفوق",
    "تأجير مكاتب التجمع الخامس",
    "شركة تفوق للاستثمار العقاري والمقاولات",
    "مكتب التأجير التجاري",
  ],
  alternates: {
    canonical: "/contact",
    languages: {
      "ar-EG": "/contact",
      "en-US": "/contact",
      "x-default": "/contact",
    },
  },
  openGraph: {
    title: "Contact & Official RFQ | TAFAWOK Commercial Real Estate",
    description:
      "Direct engagement with TAFAWOK's executive ownership and commercial leasing desk. Submit inquiries for Building 360, Fagala Plaza, Mall ChillOut, and October Festival Mall.",
    type: "website",
    url: "https://tafawok.co/contact",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact TAFAWOK Commercial Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Official RFQ | TAFAWOK Commercial Real Estate",
    description:
      "Direct engagement with TAFAWOK's executive ownership and commercial leasing desk. Connect directly with Eng. Tarek Ahmed.",
    images: ["/og-image.png"],
  },
}

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact & Official RFQ", url: "/contact" },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ContactPageClient />
    </>
  )
}
