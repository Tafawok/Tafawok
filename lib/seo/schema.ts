import { Property } from "@/types/cre"
import { COMPANY_IDENTITY, OWNER_DETAILS } from "@/content/cre-data"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tafawok.co"

/**
 * Generates Schema.org Organization, GeneralContractor, and RealEstateAgent metadata
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "RealEstateAgent", "GeneralContractor"],
    "@id": `${BASE_URL}/#organization`,
    name: COMPANY_IDENTITY.name.en,
    alternateName: [
      COMPANY_IDENTITY.name.ar,
      COMPANY_IDENTITY.shortName.en,
      COMPANY_IDENTITY.shortName.ar,
    ],
    legalName: COMPANY_IDENTITY.name.en,
    url: BASE_URL,
    logo: `${BASE_URL}/Tafawok_Logo.svg`,
    image: `${BASE_URL}/Tafawok.webp`,
    description:
      "Enterprise commercial real estate developer and turnkey EPC contractor in Egypt. Specialized in prime corporate office parks, destination retail centers, wholesale trading plazas, and integrated logistics assets.",
    founder: {
      "@type": "Person",
      name: OWNER_DETAILS.name.en,
      alternateName: OWNER_DETAILS.name.ar,
      jobTitle: OWNER_DETAILS.role.en,
      telephone: OWNER_DETAILS.phone,
      email: OWNER_DETAILS.email,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 360, Industrial Area, Fifth Settlement",
      addressLocality: "New Cairo",
      addressRegion: "Cairo Governorate",
      postalCode: "11835",
      addressCountry: "EG",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: COMPANY_IDENTITY.contact.primaryPhone.replace(/\s+/g, ""),
        contactType: "sales",
        areaServed: "EG",
        availableLanguage: ["Arabic", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: COMPANY_IDENTITY.contact.secondaryPhone.replace(/\s+/g, ""),
        contactType: "customer service",
        areaServed: "EG",
        availableLanguage: ["Arabic", "English"],
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    sameAs: [COMPANY_IDENTITY.headquarters.googleMapsLink],
  }
}

/**
 * Generates Schema.org WebSite metadata with multilingual context
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: COMPANY_IDENTITY.name.en,
    alternateName: COMPANY_IDENTITY.name.ar,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: ["ar-EG", "en-US"],
  }
}

/**
 * Generates Schema.org BreadcrumbList metadata
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

/**
 * Generates Schema.org Place, ShoppingCenter, or CommercialBuilding metadata for individual assets
 */
export function getPropertyJsonLd(property: Property) {
  const propertyUrl = `${BASE_URL}/properties/${property.slug}`
  const imageUrl = property.mainImage.startsWith("http")
    ? property.mainImage
    : `${BASE_URL}${property.mainImage}`

  return {
    "@context": "https://schema.org",
    "@type": ["Place", "ShoppingCenter", "CommercialBuilding"],
    "@id": `${propertyUrl}#property`,
    name: `${property.name.en} | ${property.name.ar}`,
    alternateName: property.name.ar,
    description: property.description.en,
    url: propertyUrl,
    image: imageUrl,
    telephone: property.contact.phone.replace(/\s+/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location.address.en,
      addressLocality: property.location.city.en,
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.coordinates.lat,
      longitude: property.location.coordinates.lng,
    },
    hasMap: property.location.googleMapsDirectUrl,
    amenityFeature: property.highlights.map((h) => ({
      "@type": "LocationFeatureSpecification",
      name: h.en,
      value: true,
    })),
    department: property.stores.map((s) => ({
      "@type": "Store",
      name: `${s.name.en} (${s.name.ar})`,
      department: s.category.en,
    })),
  }
}
