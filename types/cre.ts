/**
 * TAFAWOK Commercial Real Estate (CRE) Type Definitions
 */

export interface LocalizedString {
  en: string
  ar: string
}

export type Locale = "en" | "ar"

export interface PropertySpec {
  label: LocalizedString
  value: string
  unit?: LocalizedString
  iconName?: string
}

export interface StoreItem {
  id: string
  name: LocalizedString
  category: LocalizedString
  floor: LocalizedString
  unitNumber?: string
  status: "open" | "coming_soon" | "leased"
  description?: LocalizedString
  phone?: string
}

export type Store = StoreItem

export type PropertyType = "office" | "retail" | "logistics"
export type PropertyStatus = "active" | "completed" | "pipeline"

export interface PropertyVideo {
  src: string
  poster?: string
  title?: LocalizedString
}

export interface Property {
  id: string
  slug: string
  name: LocalizedString
  tagline: LocalizedString
  type?: PropertyType
  status?: PropertyStatus
  category: LocalizedString
  description: LocalizedString
  fullOverview: LocalizedString
  mainImage: string
  gallery: string[]
  video?: PropertyVideo
  location: {
    address: LocalizedString
    city: LocalizedString
    country: LocalizedString
    coordinates: {
      lat: number
      lng: number
    }
    googleMapsEmbedUrl: string
    googleMapsDirectUrl: string
  }
  contact: {
    phone: string
    altPhone?: string
    email: string
    leasingOffice: LocalizedString
  }
  keyStats: {
    gla: string // Gross Leasable Area
    builtUpArea: string
    floors: LocalizedString | string
    parkingCapacity: LocalizedString | string
    zoning: LocalizedString
  }
  specs: PropertySpec[]
  highlights: LocalizedString[]
  stores: StoreItem[]
  amenities: LocalizedString[]
}

export interface CompanyIdentity {
  name: LocalizedString
  shortName: LocalizedString
  tagline: LocalizedString
  establishedYears: number
  heritageDecades: number
  headquarters: {
    address: LocalizedString
    googleMapsEmbed: string
    googleMapsLink: string
  }
  contact: {
    primaryPhone: string
    secondaryPhone: string
    fax: string
    email: string
    primaryDomain: string
  }
}

export interface OwnerContact {
  name: LocalizedString
  role: LocalizedString
  company: LocalizedString
  experience: LocalizedString
  phone: string
  altPhone: string
  email: string
  whatsapp: string
  headquarters: LocalizedString
  visionSnippet: LocalizedString
}

export interface NavItem {
  key: string
  href: string
  label: LocalizedString
  subItems?: {
    href: string
    label: LocalizedString
    description?: LocalizedString
  }[]
}

export interface CorporateMetric {
  value: number
  suffix: string
  label: LocalizedString
  description: LocalizedString
}

export interface ClientPartner {
  name: string
  category: "energy" | "epc" | "commercial" | "manufacturer"
  country: string
}

export interface CommercialDiscipline {
  id: string
  title: LocalizedString
  tagline: LocalizedString
  description: LocalizedString
  keyMetric: {
    value: string
    label: LocalizedString
  }
  features: LocalizedString[]
  iconName: "building-2" | "shopping-bag" | "warehouse" | "hard-hat"
}

export interface TimelineMilestone {
  year: string
  title: LocalizedString
  badge: LocalizedString
  description: LocalizedString
  highlights: LocalizedString[]
  scopeCategory: "heritage" | "infrastructure" | "commercial" | "expansion"
}

export interface CorporateValue {
  id: string
  number: string
  title: LocalizedString
  tagline: LocalizedString
  description: LocalizedString
  iconName: string
}

export interface HsePrinciple {
  id: string
  title: LocalizedString
  description: LocalizedString
  standardCode?: string
}

export interface HseCharter {
  policyStatement: LocalizedString
  signatory: {
    name: LocalizedString
    role: LocalizedString
  }
  principles: HsePrinciple[]
  standards: {
    name: string
    code: string
    description: LocalizedString
  }[]
}

export interface InvestmentPillar {
  id: string
  number: string
  title: LocalizedString
  tagline: LocalizedString
  description: LocalizedString
  metric: {
    value: string
    label: LocalizedString
  }
}

export interface CeoMilestone {
  period: string
  role: LocalizedString
  scope: LocalizedString
  highlight: LocalizedString
}

export interface CeoProfile {
  name: LocalizedString
  role: LocalizedString
  company: LocalizedString
  education: LocalizedString
  experienceYears: number
  regionalHeritageDecades: number
  formalAddress: {
    salutation: LocalizedString
    opening: LocalizedString
    paragraphs: LocalizedString[]
    closing: LocalizedString
  }
  strategicDoctrine: {
    title: LocalizedString
    subtitle: LocalizedString
    pillars: {
      number: string
      title: LocalizedString
      description: LocalizedString
    }[]
  }
  careerMilestones: CeoMilestone[]
  directReach: OwnerContact
}
