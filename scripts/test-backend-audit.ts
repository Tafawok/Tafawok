import {
  propertyFormSchema,
  storeFormSchema,
  disciplineFormSchema,
  metricFormSchema,
  timelineFormSchema,
  corporateValueFormSchema,
  investmentPillarFormSchema,
  partnerFormSchema,
  activityFormSchema,
  bannerFormSchema,
  contactFormSchema,
} from "../lib/validations/cre-schemas"
import { apiSuccess, apiError } from "../lib/api/nexus-auth"

let passed = 0
let failed = 0

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    passed++
    console.log(`  ✓ ${testName}`)
  } else {
    failed++
    console.error(`  ✗ ${testName}${details ? ` - ${details}` : ""}`)
  }
}

async function runAuditTests() {
  console.log("=================================================================")
  console.log("BACKEND AUDIT VERIFICATION SUITE — TAFAWOK CRE PLATFORM")
  console.log("=================================================================\n")

  // -----------------------------------------------------------------------------
  // 1. Zod Validation & PostgreSQL Check Constraints Tests
  // -----------------------------------------------------------------------------
  console.log("▶ 1. Property Constraints & Validation Schema:")

  // Valid Property Types: office, retail, commercial, mixed-use, logistics
  const validPropertyTypes = ["office", "retail", "commercial", "mixed-use", "logistics"] as const
  for (const t of validPropertyTypes) {
    const res = propertyFormSchema.safeParse({
      id: "test-prop",
      slug: "test-prop",
      nameEn: "Test Property",
      nameAr: "عقار اختباري",
      taglineEn: "",
      taglineAr: "",
      type: t,
      status: "operational",
      categoryEn: "Commercial",
      categoryAr: "تجاري",
      descriptionEn: "",
      descriptionAr: "",
      fullOverviewEn: "",
      fullOverviewAr: "",
      mainImage: "/test.jpg",
      galleryText: "",
      videoSrc: "",
      videoPoster: "",
      addressEn: "",
      addressAr: "",
      cityEn: "",
      cityAr: "",
      lat: 30.0,
      lng: 31.0,
      mapsEmbedUrl: "",
      mapsDirectUrl: "",
      phone: "",
      altPhone: "",
      email: "test@tafawok.co",
      leasingOfficeEn: "",
      leasingOfficeAr: "",
      gla: "10,000",
      builtUpArea: "15,000",
      floorsEn: "",
      floorsAr: "",
      parkingEn: "",
      parkingAr: "",
      zoningEn: "",
      zoningAr: "",
    })
    assert(res.success, `Accepts valid property type '${t}'`)
  }

  // Invalid Property Type rejection
  const invalidTypeRes = propertyFormSchema.safeParse({
    id: "test-prop",
    slug: "test-prop",
    nameEn: "Test Property",
    nameAr: "عقار اختباري",
    taglineEn: "",
    taglineAr: "",
    type: "residential", // NOT ALLOWED in CRE
    status: "operational",
    categoryEn: "Commercial",
    categoryAr: "تجاري",
    descriptionEn: "",
    descriptionAr: "",
    fullOverviewEn: "",
    fullOverviewAr: "",
    mainImage: "/test.jpg",
    galleryText: "",
    videoSrc: "",
    videoPoster: "",
    addressEn: "",
    addressAr: "",
    cityEn: "",
    cityAr: "",
    lat: 30.0,
    lng: 31.0,
    mapsEmbedUrl: "",
    mapsDirectUrl: "",
    phone: "",
    altPhone: "",
    email: "test@tafawok.co",
    leasingOfficeEn: "",
    leasingOfficeAr: "",
    gla: "10,000",
    builtUpArea: "15,000",
    floorsEn: "",
    floorsAr: "",
    parkingEn: "",
    parkingAr: "",
    zoningEn: "",
    zoningAr: "",
  })
  assert(!invalidTypeRes.success, "Rejects invalid property type 'residential'")

  // Valid Property Statuses: operational, active, under-development, completed, pipeline
  const validPropertyStatuses = ["operational", "active", "under-development", "completed", "pipeline"] as const
  for (const s of validPropertyStatuses) {
    const res = propertyFormSchema.safeParse({
      id: "test-prop",
      slug: "test-prop",
      nameEn: "Test Property",
      nameAr: "عقار اختباري",
      taglineEn: "",
      taglineAr: "",
      type: "commercial",
      status: s,
      categoryEn: "Commercial",
      categoryAr: "تجاري",
      descriptionEn: "",
      descriptionAr: "",
      fullOverviewEn: "",
      fullOverviewAr: "",
      mainImage: "/test.jpg",
      galleryText: "",
      videoSrc: "",
      videoPoster: "",
      addressEn: "",
      addressAr: "",
      cityEn: "",
      cityAr: "",
      lat: 30.0,
      lng: 31.0,
      mapsEmbedUrl: "",
      mapsDirectUrl: "",
      phone: "",
      altPhone: "",
      email: "test@tafawok.co",
      leasingOfficeEn: "",
      leasingOfficeAr: "",
      gla: "10,000",
      builtUpArea: "15,000",
      floorsEn: "",
      floorsAr: "",
      parkingEn: "",
      parkingAr: "",
      zoningEn: "",
      zoningAr: "",
    })
    assert(res.success, `Accepts valid property status '${s}'`)
  }

  // -----------------------------------------------------------------------------
  console.log("\n▶ 2. Store Constraints & Validation Schema:")
  // Valid Store Statuses: open, coming_soon, leased
  for (const st of ["open", "coming_soon", "leased"] as const) {
    const res = storeFormSchema.safeParse({
      propertyId: "fagala-plaza",
      nameEn: "Alpha Store",
      nameAr: "متجر ألفا",
      categoryEn: "Retail",
      categoryAr: "تجزئة",
      floorEn: "Ground",
      floorAr: "الأرضي",
      unitNumber: "G-01",
      status: st,
      phone: "",
      descEn: "",
      descAr: "",
    })
    assert(res.success, `Accepts valid store status '${st}'`)
  }

  const invalidStoreStatus = storeFormSchema.safeParse({
    propertyId: "fagala-plaza",
    nameEn: "Alpha Store",
    nameAr: "متجر ألفا",
    categoryEn: "Retail",
    categoryAr: "تجزئة",
    floorEn: "Ground",
    floorAr: "الأرضي",
    unitNumber: "G-01",
    status: "closed_permanently",
    phone: "",
    descEn: "",
    descAr: "",
  })
  assert(!invalidStoreStatus.success, "Rejects invalid store status 'closed_permanently'")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 3. Partner Constraints & Validation Schema:")
  // Valid categories: energy, epc, commercial, manufacturer
  for (const c of ["energy", "epc", "commercial", "manufacturer"] as const) {
    const res = partnerFormSchema.safeParse({
      name: "Partner Test",
      category: c,
      country: "Egypt",
    })
    assert(res.success, `Accepts valid partner category '${c}'`)
  }

  const invalidPartnerCategory = partnerFormSchema.safeParse({
    name: "Partner Test",
    category: "technology",
    country: "Egypt",
  })
  assert(!invalidPartnerCategory.success, "Rejects invalid partner category 'technology'")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 4. Timeline Milestones Constraints & Validation Schema:")
  for (const sc of ["heritage", "infrastructure", "commercial", "expansion"] as const) {
    const res = timelineFormSchema.safeParse({
      year: "2020",
      titleEn: "Milestone Title",
      titleAr: "عنوان المحطة",
      badgeEn: "",
      badgeAr: "",
      descEn: "Detailed milestone description",
      descAr: "وصف مفصل للمحطة",
      scopeCategory: sc,
      highlightsText: "",
    })
    assert(res.success, `Accepts valid milestone scopeCategory '${sc}'`)
  }

  const invalidMilestoneScope = timelineFormSchema.safeParse({
    year: "2020",
    titleEn: "Milestone Title",
    titleAr: "عنوان المحطة",
    badgeEn: "",
    badgeAr: "",
    descEn: "Detailed milestone description",
    descAr: "وصف مفصل للمحطة",
    scopeCategory: "unauthorized_scope",
    highlightsText: "",
  })
  assert(!invalidMilestoneScope.success, "Rejects invalid milestone scopeCategory")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 5. Activities Constraints & Validation Schema:")
  const validActivityCategories = ["launch", "bazaar", "exhibition", "corporate", "community"] as const
  for (const cat of validActivityCategories) {
    const res = activityFormSchema.safeParse({
      id: "act-1",
      slug: "act-1",
      titleEn: "Activity Title",
      titleAr: "عنوان الفعالية",
      summaryEn: "",
      summaryAr: "",
      contentEn: "",
      contentAr: "",
      category: cat,
      status: "upcoming",
      startDate: "2026-10-15T10:00:00Z",
      locationEn: "Cairo",
      locationAr: "القاهرة",
      mainImage: "/image.jpg",
      gallery: [],
      featured: false,
      isPublished: true,
      sortOrder: 0,
    })
    assert(res.success, `Accepts valid activity category '${cat}'`)
  }

  const validActivityStatuses = ["upcoming", "ongoing", "past"] as const
  for (const st of validActivityStatuses) {
    const res = activityFormSchema.safeParse({
      id: "act-1",
      slug: "act-1",
      titleEn: "Activity Title",
      titleAr: "عنوان الفعالية",
      summaryEn: "",
      summaryAr: "",
      contentEn: "",
      contentAr: "",
      category: "launch",
      status: st,
      startDate: "2026-10-15T10:00:00Z",
      locationEn: "Cairo",
      locationAr: "القاهرة",
      mainImage: "/image.jpg",
      gallery: [],
      featured: false,
      isPublished: true,
      sortOrder: 0,
    })
    assert(res.success, `Accepts valid activity status '${st}'`)
  }

  const invalidActivityStatus = activityFormSchema.safeParse({
    id: "act-1",
    slug: "act-1",
    titleEn: "Activity Title",
    titleAr: "عنوان الفعالية",
    summaryEn: "",
    summaryAr: "",
    contentEn: "",
    contentAr: "",
    category: "launch",
    status: "cancelled",
    startDate: "2026-10-15T10:00:00Z",
    locationEn: "Cairo",
    locationAr: "القاهرة",
    mainImage: "/image.jpg",
  })
  assert(!invalidActivityStatus.success, "Rejects invalid activity status 'cancelled'")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 6. Notification Banners Constraints & Validation Schema:")
  const validBannerTypes = ["launch", "bazaar", "announcement", "urgent"] as const
  for (const bt of validBannerTypes) {
    const res = bannerFormSchema.safeParse({
      id: "ban-1",
      titleEn: "Banner Title",
      titleAr: "عنوان الشعار",
      messageEn: "Banner Message",
      messageAr: "رسالة الشعار",
      startDate: "2026-10-15T10:00:00Z",
      endDate: "2026-10-25T10:00:00Z",
      isActive: true,
      type: bt,
      dismissible: true,
      priority: 10,
    })
    assert(res.success, `Accepts valid banner type '${bt}'`)
  }

  const invalidBannerType = bannerFormSchema.safeParse({
    id: "ban-1",
    titleEn: "Banner Title",
    titleAr: "عنوان الشعار",
    messageEn: "Banner Message",
    messageAr: "رسالة الشعار",
    startDate: "2026-10-15T10:00:00Z",
    endDate: "2026-10-25T10:00:00Z",
    isActive: true,
    type: "marketing_popup",
    dismissible: true,
    priority: 10,
  })
  assert(!invalidBannerType.success, "Rejects invalid banner type 'marketing_popup'")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 7. Commercial Disciplines Constraints & Validation Schema:")
  const validDisciplineIcons = ["building-2", "shopping-bag", "warehouse", "hard-hat"] as const
  for (const ic of validDisciplineIcons) {
    const res = disciplineFormSchema.safeParse({
      titleEn: "Discipline",
      titleAr: "تخصص",
      taglineEn: "",
      taglineAr: "",
      descEn: "Description",
      descAr: "وصف",
      metricValue: "100%",
      metricLabelEn: "GLA",
      metricLabelAr: "المساحة",
      featuresText: "",
      iconName: ic,
    })
    assert(res.success, `Accepts valid discipline icon '${ic}'`)
  }

  const invalidDisciplineIcon = disciplineFormSchema.safeParse({
    titleEn: "Discipline",
    titleAr: "تخصص",
    taglineEn: "",
    taglineAr: "",
    descEn: "Description",
    descAr: "وصف",
    metricValue: "100%",
    metricLabelEn: "GLA",
    metricLabelAr: "المساحة",
    featuresText: "",
    iconName: "rocket",
  })
  assert(!invalidDisciplineIcon.success, "Rejects invalid discipline icon 'rocket'")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 8. Metric, Value, Pillar & Contact Form Schemas:")
  const validMetric = metricFormSchema.safeParse({
    value: 25,
    suffix: "+",
    labelEn: "Years Experience",
    labelAr: "سنوات خبرة",
    descEn: "Track record",
    descAr: "سجل حافل",
  })
  assert(validMetric.success, "metricFormSchema validates correct payload")

  const validValue = corporateValueFormSchema.safeParse({
    number: "01",
    titleEn: "Precision",
    titleAr: "الدقة",
    taglineEn: "Engineered excellence",
    taglineAr: "التميز الهندسي",
    descEn: "Core value description",
    descAr: "وصف القيمة الأساسية",
  })
  assert(validValue.success, "corporateValueFormSchema validates correct payload")

  const validPillar = investmentPillarFormSchema.safeParse({
    number: "01",
    titleEn: "Prime Locations",
    titleAr: "مواقع متميزة",
    taglineEn: "Strategic commercial sites",
    taglineAr: "مواقع تجارية استراتيجية",
    descEn: "Investment thesis",
    descAr: "أطروحة الاستثمار",
    metricVal: "100%",
    metricLabelEn: "Occupancy",
    metricLabelAr: "نسبة الإشغال",
  })
  assert(validPillar.success, "investmentPillarFormSchema validates correct payload")

  const validContact = contactFormSchema.safeParse({
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+201001234567",
    property: "Fagala Plaza",
    inquiryType: "leasing",
    message: "Inquiry requirements and scope details for commercial showroom leasing.",
  })
  assert(validContact.success, "contactFormSchema validates correct payload")

  // -----------------------------------------------------------------------------
  console.log("\n▶ 9. Standardized API Response Contracts:")
  const successRes = apiSuccess({ count: 5 }, 200, "Loaded successfully.")
  const successJson = await successRes.json()
  assert(successRes.status === 200, "apiSuccess returns HTTP 200")
  assert(successJson.success === true, "apiSuccess json has success: true")
  assert(successJson.data.count === 5, "apiSuccess payload matches")

  const errorRes = apiError("Invalid request", 400, { field: "id" })
  const errorJson = await errorRes.json()
  assert(errorRes.status === 400, "apiError returns HTTP 400")
  assert(errorJson.success === false, "apiError json has success: false")
  assert(errorJson.error === "Invalid request", "apiError error message matches")
  assert(errorJson.details.field === "id", "apiError details payload preserved")

  console.log("\n=================================================================")
  console.log(`AUDIT RESULTS: ${passed} passed, ${failed} failed`)
  console.log("=================================================================")

  if (failed > 0) {
    process.exit(1)
  }
}

runAuditTests().catch((e) => {
  console.error("Test runner failed:", e)
  process.exit(1)
})
