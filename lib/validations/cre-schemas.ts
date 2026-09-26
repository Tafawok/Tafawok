import { z } from "zod"

// 1. PUBLIC CONTACT & INQUIRY FORM
export const contactFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(6, "Phone must be at least 6 digits"),
  property: z.string().min(1, "Please select an asset"),
  inquiryType: z.enum(["leasing", "investment", "turnkey", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// 2. NEXUS PORTAL LOGIN FORM
export const nexusLoginSchema = z.object({
  email: z.string().email("Please provide a valid administrator email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type NexusLoginFormData = z.infer<typeof nexusLoginSchema>

// 3. COMMERCIAL PROPERTY ASSET FORM
export const propertyFormSchema = z.object({
  id: z.string().min(2, "Asset ID is required (e.g. fagala-plaza)"),
  slug: z.string().min(2, "URL Slug is required"),
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  type: z.enum(["commercial", "office", "mixed-use", "retail"]),
  status: z.enum(["operational", "under-development", "pipeline"]),
  categoryEn: z.string().min(1, "English category is required"),
  categoryAr: z.string().min(1, "Arabic category is required"),
  descriptionEn: z.string(),
  descriptionAr: z.string(),
  fullOverviewEn: z.string(),
  fullOverviewAr: z.string(),
  mainImage: z.string().min(1, "Hero image path is required"),
  galleryText: z.string(),
  videoSrc: z.string(),
  videoPoster: z.string(),
  addressEn: z.string(),
  addressAr: z.string(),
  cityEn: z.string(),
  cityAr: z.string(),
  lat: z.number(),
  lng: z.number(),
  mapsEmbedUrl: z.string(),
  mapsDirectUrl: z.string(),
  phone: z.string(),
  altPhone: z.string(),
  email: z.string().email("Valid contact email is required"),
  leasingOfficeEn: z.string(),
  leasingOfficeAr: z.string(),
  gla: z.string(),
  builtUpArea: z.string(),
  floorsEn: z.string(),
  floorsAr: z.string(),
  parkingEn: z.string(),
  parkingAr: z.string(),
  zoningEn: z.string(),
  zoningAr: z.string(),
})

export type PropertyFormData = z.infer<typeof propertyFormSchema>

// 4. RETAIL STORE / TENANT FORM
export const storeFormSchema = z.object({
  propertyId: z.string().min(1, "Assigned property is required"),
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  categoryEn: z.string().min(2, "English category is required"),
  categoryAr: z.string().min(2, "Arabic category is required"),
  floorEn: z.string().min(1, "English floor is required"),
  floorAr: z.string().min(1, "Arabic floor is required"),
  unitNumber: z.string(),
  status: z.enum(["open", "coming_soon", "leased"]),
  phone: z.string(),
  descEn: z.string(),
  descAr: z.string(),
})

export type StoreFormData = z.infer<typeof storeFormSchema>

// 5. COMMERCIAL DISCIPLINE FORM
export const disciplineFormSchema = z.object({
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  metricValue: z.string().min(1, "Metric value is required"),
  metricLabelEn: z.string().min(1, "Metric English label is required"),
  metricLabelAr: z.string().min(1, "Metric Arabic label is required"),
  featuresText: z.string(),
  iconName: z.enum(["building-2", "store", "factory", "hammer"]),
})

export type DisciplineFormData = z.infer<typeof disciplineFormSchema>

// 6. CORPORATE HERO METRIC FORM
export const metricFormSchema = z.object({
  value: z.number().positive("Value must be a positive number"),
  suffix: z.string(),
  labelEn: z.string().min(2, "English label is required"),
  labelAr: z.string().min(2, "Arabic label is required"),
  descEn: z.string(),
  descAr: z.string(),
})

export type MetricFormData = z.infer<typeof metricFormSchema>

// 7. TIMELINE MILESTONE FORM
export const timelineFormSchema = z.object({
  year: z.string().min(4, "Year must be at least 4 digits"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  badgeEn: z.string(),
  badgeAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  scopeCategory: z.enum([
    "heritage",
    "infrastructure",
    "commercial",
    "expansion",
  ]),
  highlightsText: z.string(),
})

export type TimelineFormData = z.infer<typeof timelineFormSchema>

// 8. CORPORATE VALUE FORM
export const corporateValueFormSchema = z.object({
  number: z.string().min(1, "Number is required"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
})

export type CorporateValueFormData = z.infer<typeof corporateValueFormSchema>

// 9. INVESTMENT PILLAR FORM
export const investmentPillarFormSchema = z.object({
  number: z.string().min(1, "Number is required"),
  titleEn: z.string().min(2, "English title is required"),
  titleAr: z.string().min(2, "Arabic title is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  descEn: z.string().min(2, "English description is required"),
  descAr: z.string().min(2, "Arabic description is required"),
  metricVal: z.string().min(1, "Metric value is required"),
  metricLabelEn: z.string().min(1, "Metric English label is required"),
  metricLabelAr: z.string().min(1, "Metric Arabic label is required"),
})

export type InvestmentPillarFormData = z.infer<
  typeof investmentPillarFormSchema
>

// 10. CLIENT PARTNER FORM
export const partnerFormSchema = z.object({
  name: z.string().min(2, "Partner name is required"),
  category: z.enum(["commercial", "energy", "epc", "manufacturer"]),
  country: z.string().min(2, "Country is required"),
})

export type PartnerFormData = z.infer<typeof partnerFormSchema>

// 11. CEO PROFILE FORM
export const ceoProfileFormSchema = z.object({
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  roleEn: z.string().min(2, "English role is required"),
  roleAr: z.string().min(2, "Arabic role is required"),
  educationEn: z.string(),
  educationAr: z.string(),
  experienceYears: z.number().positive("Experience years must be positive"),
  heritageDecades: z.number().positive("Heritage decades must be positive"),
  phone: z.string().min(5, "Direct phone is required"),
  altPhone: z.string(),
  email: z.string().email("Valid email is required"),
  whatsapp: z.string(),
  salutationEn: z.string(),
  salutationAr: z.string(),
  openingEn: z.string(),
  openingAr: z.string(),
  paragraphsTextEn: z.string(),
  paragraphsTextAr: z.string(),
  closingEn: z.string(),
  closingAr: z.string(),
})

export type CeoProfileFormData = z.infer<typeof ceoProfileFormSchema>

// 12. COMPANY IDENTITY & COORDINATES FORM
export const companyIdentityFormSchema = z.object({
  nameEn: z.string().min(2, "English name is required"),
  nameAr: z.string().min(2, "Arabic name is required"),
  shortNameEn: z.string().min(2, "English short name is required"),
  shortNameAr: z.string().min(2, "Arabic short name is required"),
  taglineEn: z.string(),
  taglineAr: z.string(),
  establishedYears: z.number().positive("Established years must be positive"),
  heritageDecades: z.number().positive("Heritage decades must be positive"),
  addressEn: z.string().min(3, "English address is required"),
  addressAr: z.string().min(3, "Arabic address is required"),
  mapsEmbed: z.string(),
  mapsLink: z.string(),
  primaryPhone: z.string().min(5, "Primary phone is required"),
  secondaryPhone: z.string(),
  fax: z.string(),
  email: z.string().email("Valid email is required"),
  primaryDomain: z.string().min(3, "Primary domain is required"),
})

export type CompanyIdentityFormData = z.infer<typeof companyIdentityFormSchema>

// 13. HSE CHARTER FORM
export const hseCharterFormSchema = z.object({
  policyEn: z.string().min(10, "English policy statement is required"),
  policyAr: z.string().min(10, "Arabic policy statement is required"),
  signatoryNameEn: z.string().min(2, "Signatory English name is required"),
  signatoryNameAr: z.string().min(2, "Signatory Arabic name is required"),
  signatoryRoleEn: z.string().min(2, "Signatory English role is required"),
  signatoryRoleAr: z.string().min(2, "Signatory Arabic role is required"),
})

export type HseCharterFormData = z.infer<typeof hseCharterFormSchema>
