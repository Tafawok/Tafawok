import type { Metadata } from "next"
import { Cairo, Inter } from "next/font/google"
import { cookies } from "next/headers"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/layout/LanguageProvider"
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar"
import { TargetCursor } from "@/components/motion/TargetCursor"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { cn } from "@/lib/utils"
import type { Locale } from "@/types/cre"
import { JsonLd } from "@/components/seo/JsonLd"
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/schema"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import {
  getProperties,
  getCompanyIdentity,
  getOwnerDetails,
} from "@/lib/content/cre-service"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
})

const organizationSchema = getOrganizationSchema()
const webSiteSchema = getWebSiteSchema()

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.tafawok.co"
  ),
  title: {
    template: "%s | TAFAWOK Real Estate Investment & Contracting",
    default:
      "TAFAWOK — Commercial Real Estate Investment & Contracting Co. | شركة تفوق",
  },
  description:
    "TAFAWOK Real Estate Investment & Contracting (شركة تفوق للاستثمار العقاري والمقاولات) — Premier developer and turnkey contractor of commercial real estate assets in Egypt: Fagala Plaza in Nasr City, Mall ChillOut in El Shorouk, and October Festival Mall on Gamal Abdel Nasser Axis.",
  keywords: [
    "Commercial Real Estate Egypt",
    "TAFAWOK",
    "TAFAWOK Real Estate Investment",
    "Contracting Company Egypt",
    "Building 360 New Cairo",
    "Fagala Plaza Nasr City",
    "Mall ChillOut El Shorouk",
    "October Festival Mall",
    "Turnkey EPC Contracting",
    "Commercial Leasing Cairo",
    "Stationery Wholesale Plaza",
    "شركة تفوق للاستثمار العقاري والمقاولات",
    "تفوق العقارية",
    "مكاتب التجمع الخامس",
    "فجالة بلازا مدينة نصر",
    "مول شل أوت الشروق",
    "مول أكتوبر فيستيفال",
    "استثمار عقاري تجاري مصر",
    "محلات تجارية للإيجار",
    "قيادة تفوق التنفيذية",
  ],
  authors: [{ name: "TAFAWOK Real Estate Investment & Contracting" }],
  creator: "TAFAWOK Real Estate Investment & Contracting",
  publisher: "TAFAWOK Real Estate Investment & Contracting",
  category: "Commercial Real Estate",
  classification: "Commercial Real Estate Investment & Contracting",
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      "en-US": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.tafawok.co",
    siteName: "TAFAWOK Real Estate Investment & Contracting",
    title:
      "TAFAWOK — Commercial Real Estate Investment & Contracting Co. | شركة تفوق",
    description:
      "Premier developer and contractor of commercial real estate developments in Egypt. Explore Fagala Plaza (Nasr City), Mall ChillOut (El Shorouk), and October Festival Mall.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TAFAWOK Real Estate Investment & Contracting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "TAFAWOK — Commercial Real Estate Investment & Contracting Co. | شركة تفوق",
    description:
      "Premier developer and contractor of commercial real estate developments in Egypt: Fagala Plaza, Mall ChillOut, and October Festival Mall.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  icons: {
    icon: [
      { url: "/Tafawok_Logo_NoWord.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: ["/Tafawok_Logo_NoWord.svg"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const rawLocale = cookieStore.get("tafawok_locale")?.value
  const locale: Locale =
    rawLocale === "en" || rawLocale === "ar" ? rawLocale : "ar"

  const rawTheme = cookieStore.get("tafawok_theme")?.value
  const theme =
    rawTheme === "light" || rawTheme === "dark" || rawTheme === "system"
      ? rawTheme
      : "system"

  const isRtl = locale === "ar"

  const [properties, identity, ownerDetails] = await Promise.all([
    getProperties(),
    getCompanyIdentity(),
    getOwnerDetails(),
  ])

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        inter.variable,
        cairo.variable,
        isRtl ? "font-arabic" : "font-sans",
        theme === "dark" ? "dark" : ""
      )}
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
        <ThemeProvider defaultTheme={theme}>
          <Toaster position="top-center" />
          <ScrollProgressBar />
          <TargetCursor />
          <LanguageProvider initialLocale={locale}>
            <div className="flex min-h-screen flex-col">
              <Navbar
                properties={properties}
                ownerDetails={ownerDetails}
                identity={identity}
              />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer
                properties={properties}
                ownerDetails={ownerDetails}
                identity={identity}
              />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
