import { NextRequest } from "next/server"
import { GET as getProperties, POST as postProperty } from "../app/api/nexus/properties/route"
import { GET as getSingleProperty } from "../app/api/nexus/properties/[id]/route"
import { GET as getStores, POST as postStore } from "../app/api/nexus/stores/route"
import { GET as getDisciplines, POST as postDiscipline } from "../app/api/nexus/disciplines/route"
import { GET as getMetrics, POST as postMetric } from "../app/api/nexus/metrics/route"
import { GET as getPartners, POST as postPartner } from "../app/api/nexus/partners/route"
import { GET as getTimeline, POST as postTimeline } from "../app/api/nexus/timeline/route"
import { GET as getValues, POST as postValue } from "../app/api/nexus/values/route"
import { GET as getPillars, POST as postPillar } from "../app/api/nexus/pillars/route"
import { GET as getSetting } from "../app/api/nexus/settings/[key]/route"
import { POST as postContact } from "../app/api/contact/route"
import { GET as getInquiries } from "../app/api/nexus/inquiries/route"

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

async function runRouteTests() {
  console.log("=================================================================")
  console.log("LIVE API ROUTE INVOCATION SUITE — TAFAWOK CRE PLATFORM")
  console.log("=================================================================\n")

  // 1. GET /api/nexus/properties
  console.log("▶ Testing GET /api/nexus/properties:")
  {
    const req = new NextRequest("http://localhost:3000/api/nexus/properties")
    const res = await getProperties(req)
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(json.success === true, "JSON response has success: true")
    assert(Array.isArray(json.data.properties), "Returns properties array")
    assert(json.data.properties.length > 0, `Contains ${json.data.properties.length} properties`)
  }

  // 2. GET /api/nexus/properties/[id]
  console.log("\n▶ Testing GET /api/nexus/properties/[id]:")
  {
    const req = new NextRequest("http://localhost:3000/api/nexus/properties/fagala-plaza")
    const res = await getSingleProperty(req, {
      params: Promise.resolve({ id: "fagala-plaza" }),
    })
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200 for existing property")
    assert(json.data.property.id === "fagala-plaza", "Returns correct property ID")

    const reqNotFound = new NextRequest("http://localhost:3000/api/nexus/properties/non-existent")
    const resNotFound = await getSingleProperty(reqNotFound, {
      params: Promise.resolve({ id: "non-existent" }),
    })
    assert(resNotFound.status === 404, "Returns HTTP 404 for non-existent property")
  }

  // 3. GET /api/nexus/stores
  console.log("\n▶ Testing GET /api/nexus/stores:")
  {
    const req = new NextRequest("http://localhost:3000/api/nexus/stores")
    const res = await getStores(req)
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.stores), "Returns stores array")
    assert(json.data.stores.length > 0, `Contains ${json.data.stores.length} stores`)
  }

  // 4. GET /api/nexus/disciplines
  console.log("\n▶ Testing GET /api/nexus/disciplines:")
  {
    const res = await getDisciplines()
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.disciplines), "Returns commercial disciplines")
    assert(json.data.disciplines.length >= 4, "Contains all 4 CRE disciplines")
  }

  // 5. GET /api/nexus/metrics
  console.log("\n▶ Testing GET /api/nexus/metrics:")
  {
    const res = await getMetrics()
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.metrics), "Returns corporate metrics")
  }

  // 6. GET /api/nexus/partners
  console.log("\n▶ Testing GET /api/nexus/partners:")
  {
    const req = new NextRequest("http://localhost:3000/api/nexus/partners")
    const res = await getPartners(req)
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.partners), "Returns client partners")
  }

  // 7. GET /api/nexus/timeline
  console.log("\n▶ Testing GET /api/nexus/timeline:")
  {
    const res = await getTimeline()
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.milestones), "Returns timeline milestones")
  }

  // 8. GET /api/nexus/values
  console.log("\n▶ Testing GET /api/nexus/values:")
  {
    const res = await getValues()
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.values), "Returns corporate values")
  }

  // 9. GET /api/nexus/pillars
  console.log("\n▶ Testing GET /api/nexus/pillars:")
  {
    const res = await getPillars()
    const json = await res.json()
    assert(res.status === 200, "Returns HTTP 200")
    assert(Array.isArray(json.data.pillars), "Returns investment pillars")
  }

  // 10. GET /api/nexus/settings/[key]
  console.log("\n▶ Testing GET /api/nexus/settings/[key]:")
  const settingsKeys = [
    "ceo_profile",
    "company_identity",
    "hse_charter",
    "homepage_settings",
    "maintenance_mode",
  ]
  for (const k of settingsKeys) {
    const req = new NextRequest(`http://localhost:3000/api/nexus/settings/${k}`)
    const res = await getSetting(req, { params: Promise.resolve({ key: k }) })
    const json = await res.json()
    assert(res.status === 200, `Setting '${k}' returns HTTP 200`)
    assert(json.data.data !== undefined, `Setting '${k}' contains data payload`)
  }

  // 11. POST /api/contact (Public Inquiry Submission)
  console.log("\n▶ Testing POST /api/contact:")
  {
    // Empty body
    const emptyReq = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "",
      headers: { "Content-Type": "application/json" },
    })
    const emptyRes = await postContact(emptyReq)
    assert(emptyRes.status === 400, "Empty contact submission returns HTTP 400")

    // Malformed JSON body
    const malformedReq = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "{ not valid json ",
      headers: { "Content-Type": "application/json" },
    })
    const malformedRes = await postContact(malformedReq)
    assert(malformedRes.status === 400, "Malformed contact submission returns HTTP 400")

    // Null JSON body
    const nullReq = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: "null",
      headers: { "Content-Type": "application/json" },
    })
    const nullRes = await postContact(nullReq)
    assert(nullRes.status === 400, "Null contact submission returns HTTP 400")

    // Invalid submission
    const badReq = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "A", email: "invalid", message: "short" }),
      headers: { "Content-Type": "application/json" },
    })
    const badRes = await postContact(badReq)
    const badJson = await badRes.json()
    assert(badRes.status === 400, "Validation failure returns HTTP 400")
    assert(badJson.success === false, "Bad submission returns success: false")
    assert(badJson.errors.email !== undefined, "Returns specific email error")

    // Valid submission (in preview mode if SMTP unconfigured)
    const goodReq = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: "Eng. Ahmed Hesham",
        email: "ahmed@example.com",
        phone: "+201001234567",
        property: "Fagala Plaza",
        inquiryType: "Leasing Inquiry",
        message: "We would like to lease a 250 m² retail showroom on the ground floor.",
      }),
      headers: { "Content-Type": "application/json" },
    })
    const goodRes = await postContact(goodReq)
    const goodJson = await goodRes.json()
    assert(goodRes.status === 200, "Valid contact submission returns HTTP 200")
    assert(goodJson.success === true, "Valid contact submission returns success: true")
  }

  // 12. Authentication Enforcement on Protected Routes (HTTP 401 on Unauthorized)
  console.log("\n▶ Testing Auth Gate on Protected Nexus Routes:")
  {
    // Unauthenticated POST /api/nexus/properties
    const unauthPropReq = new NextRequest("http://localhost:3000/api/nexus/properties", {
      method: "POST",
      body: JSON.stringify({ id: "unauth-prop" }),
    })
    const unauthPropRes = await postProperty(unauthPropReq)
    assert(unauthPropRes.status === 401, "POST /api/nexus/properties returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/stores
    const unauthStoreReq = new NextRequest("http://localhost:3000/api/nexus/stores", {
      method: "POST",
      body: JSON.stringify({ propertyId: "p-1", store: { id: "s-1" } }),
    })
    const unauthStoreRes = await postStore(unauthStoreReq)
    assert(unauthStoreRes.status === 401, "POST /api/nexus/stores returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/disciplines
    const unauthDiscReq = new NextRequest("http://localhost:3000/api/nexus/disciplines", {
      method: "POST",
      body: JSON.stringify({ id: "d-1" }),
    })
    const unauthDiscRes = await postDiscipline(unauthDiscReq)
    assert(unauthDiscRes.status === 401, "POST /api/nexus/disciplines returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/metrics
    const unauthMetricReq = new NextRequest("http://localhost:3000/api/nexus/metrics", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const unauthMetricRes = await postMetric(unauthMetricReq)
    assert(unauthMetricRes.status === 401, "POST /api/nexus/metrics returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/partners
    const unauthPartnerReq = new NextRequest("http://localhost:3000/api/nexus/partners", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const unauthPartnerRes = await postPartner(unauthPartnerReq)
    assert(unauthPartnerRes.status === 401, "POST /api/nexus/partners returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/timeline
    const unauthTimelineReq = new NextRequest("http://localhost:3000/api/nexus/timeline", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const unauthTimelineRes = await postTimeline(unauthTimelineReq)
    assert(unauthTimelineRes.status === 401, "POST /api/nexus/timeline returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/values
    const unauthValueReq = new NextRequest("http://localhost:3000/api/nexus/values", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const unauthValueRes = await postValue(unauthValueReq)
    assert(unauthValueRes.status === 401, "POST /api/nexus/values returns HTTP 401 Unauthorized")

    // Unauthenticated POST /api/nexus/pillars
    const unauthPillarReq = new NextRequest("http://localhost:3000/api/nexus/pillars", {
      method: "POST",
      body: JSON.stringify({}),
    })
    const unauthPillarRes = await postPillar(unauthPillarReq)
    assert(unauthPillarRes.status === 401, "POST /api/nexus/pillars returns HTTP 401 Unauthorized")

    // Unauthenticated GET /api/nexus/inquiries
    const unauthInqReq = new NextRequest("http://localhost:3000/api/nexus/inquiries")
    const unauthInqRes = await getInquiries(unauthInqReq)
    assert(unauthInqRes.status === 401, "GET /api/nexus/inquiries returns HTTP 401 Unauthorized")

    // Unauthenticated GET /api/nexus/activities
    const { GET: getActivitiesAdmin, POST: postActivity } = await import("../app/api/nexus/activities/route")
    const unauthActReq = new NextRequest("http://localhost:3000/api/nexus/activities")
    const unauthActRes = await getActivitiesAdmin(unauthActReq)
    assert(unauthActRes.status === 401, "GET /api/nexus/activities returns HTTP 401 Unauthorized")

    const unauthPostActReq = new NextRequest("http://localhost:3000/api/nexus/activities", {
      method: "POST",
      body: JSON.stringify({ activity: { id: "a-1" } }),
    })
    const unauthPostActRes = await postActivity(unauthPostActReq)
    assert(unauthPostActRes.status === 401, "POST /api/nexus/activities returns HTTP 401 Unauthorized")

    // Unauthenticated GET & POST /api/nexus/banners
    const { GET: getBannersAdmin, POST: postBanner } = await import("../app/api/nexus/banners/route")
    const unauthBanReq = new NextRequest("http://localhost:3000/api/nexus/banners")
    const unauthBanRes = await getBannersAdmin(unauthBanReq)
    assert(unauthBanRes.status === 401, "GET /api/nexus/banners returns HTTP 401 Unauthorized")

    const unauthPostBanReq = new NextRequest("http://localhost:3000/api/nexus/banners", {
      method: "POST",
      body: JSON.stringify({ banner: { id: "b-1" } }),
    })
    const unauthPostBanRes = await postBanner(unauthPostBanReq)
    assert(unauthPostBanRes.status === 401, "POST /api/nexus/banners returns HTTP 401 Unauthorized")

    // Unauthenticated GET & DELETE /api/nexus/upload
    const { GET: getUploads, DELETE: deleteUpload } = await import("../app/api/nexus/upload/route")
    const unauthUploadReq = new NextRequest("http://localhost:3000/api/nexus/upload")
    const unauthUploadRes = await getUploads(unauthUploadReq)
    assert(unauthUploadRes.status === 401, "GET /api/nexus/upload returns HTTP 401 Unauthorized")

    const unauthDelUploadReq = new NextRequest("http://localhost:3000/api/nexus/upload?path=test.jpg", {
      method: "DELETE",
    })
    const unauthDelUploadRes = await deleteUpload(unauthDelUploadReq)
    assert(unauthDelUploadRes.status === 401, "DELETE /api/nexus/upload returns HTTP 401 Unauthorized")
    // Dynamic [id] routes unauthenticated checks:
    const { PUT: putProp, DELETE: delProp } = await import("../app/api/nexus/properties/[id]/route")
    assert((await putProp(new NextRequest("http://localhost:3000/api/nexus/properties/p1", { method: "PUT" }), { params: Promise.resolve({ id: "p1" }) })).status === 401, "PUT /api/nexus/properties/[id] returns 401")
    assert((await delProp(new NextRequest("http://localhost:3000/api/nexus/properties/p1", { method: "DELETE" }), { params: Promise.resolve({ id: "p1" }) })).status === 401, "DELETE /api/nexus/properties/[id] returns 401")

    const { PUT: putStore, DELETE: delStore } = await import("../app/api/nexus/stores/[id]/route")
    assert((await putStore(new NextRequest("http://localhost:3000/api/nexus/stores/s1", { method: "PUT" }), { params: Promise.resolve({ id: "s1" }) })).status === 401, "PUT /api/nexus/stores/[id] returns 401")
    assert((await delStore(new NextRequest("http://localhost:3000/api/nexus/stores/s1", { method: "DELETE" }), { params: Promise.resolve({ id: "s1" }) })).status === 401, "DELETE /api/nexus/stores/[id] returns 401")

    const { PUT: putDisc, DELETE: delDisc } = await import("../app/api/nexus/disciplines/[id]/route")
    assert((await putDisc(new NextRequest("http://localhost:3000/api/nexus/disciplines/d1", { method: "PUT" }), { params: Promise.resolve({ id: "d1" }) })).status === 401, "PUT /api/nexus/disciplines/[id] returns 401")
    assert((await delDisc(new NextRequest("http://localhost:3000/api/nexus/disciplines/d1", { method: "DELETE" }), { params: Promise.resolve({ id: "d1" }) })).status === 401, "DELETE /api/nexus/disciplines/[id] returns 401")

    const { PUT: putMetric, DELETE: delMetric } = await import("../app/api/nexus/metrics/[id]/route")
    assert((await putMetric(new NextRequest("http://localhost:3000/api/nexus/metrics/m1", { method: "PUT" }), { params: Promise.resolve({ id: "m1" }) })).status === 401, "PUT /api/nexus/metrics/[id] returns 401")
    assert((await delMetric(new NextRequest("http://localhost:3000/api/nexus/metrics/m1", { method: "DELETE" }), { params: Promise.resolve({ id: "m1" }) })).status === 401, "DELETE /api/nexus/metrics/[id] returns 401")

    const { PUT: putPartner, DELETE: delPartner } = await import("../app/api/nexus/partners/[id]/route")
    assert((await putPartner(new NextRequest("http://localhost:3000/api/nexus/partners/part1", { method: "PUT" }), { params: Promise.resolve({ id: "part1" }) })).status === 401, "PUT /api/nexus/partners/[id] returns 401")
    assert((await delPartner(new NextRequest("http://localhost:3000/api/nexus/partners/part1", { method: "DELETE" }), { params: Promise.resolve({ id: "part1" }) })).status === 401, "DELETE /api/nexus/partners/[id] returns 401")

    const { PUT: putTimeline, DELETE: delTimeline } = await import("../app/api/nexus/timeline/[id]/route")
    assert((await putTimeline(new NextRequest("http://localhost:3000/api/nexus/timeline/t1", { method: "PUT" }), { params: Promise.resolve({ id: "t1" }) })).status === 401, "PUT /api/nexus/timeline/[id] returns 401")
    assert((await delTimeline(new NextRequest("http://localhost:3000/api/nexus/timeline/t1", { method: "DELETE" }), { params: Promise.resolve({ id: "t1" }) })).status === 401, "DELETE /api/nexus/timeline/[id] returns 401")

    const { PUT: putValue, DELETE: delValue } = await import("../app/api/nexus/values/[id]/route")
    assert((await putValue(new NextRequest("http://localhost:3000/api/nexus/values/v1", { method: "PUT" }), { params: Promise.resolve({ id: "v1" }) })).status === 401, "PUT /api/nexus/values/[id] returns 401")
    assert((await delValue(new NextRequest("http://localhost:3000/api/nexus/values/v1", { method: "DELETE" }), { params: Promise.resolve({ id: "v1" }) })).status === 401, "DELETE /api/nexus/values/[id] returns 401")

    const { PUT: putPillar, DELETE: delPillar } = await import("../app/api/nexus/pillars/[id]/route")
    assert((await putPillar(new NextRequest("http://localhost:3000/api/nexus/pillars/pil1", { method: "PUT" }), { params: Promise.resolve({ id: "pil1" }) })).status === 401, "PUT /api/nexus/pillars/[id] returns 401")
    assert((await delPillar(new NextRequest("http://localhost:3000/api/nexus/pillars/pil1", { method: "DELETE" }), { params: Promise.resolve({ id: "pil1" }) })).status === 401, "DELETE /api/nexus/pillars/[id] returns 401")

    const { PUT: putSetting } = await import("../app/api/nexus/settings/[key]/route")
    assert((await putSetting(new NextRequest("http://localhost:3000/api/nexus/settings/ceo_profile", { method: "PUT" }), { params: Promise.resolve({ key: "ceo_profile" }) })).status === 401, "PUT /api/nexus/settings/[key] returns 401")

    const { GET: getInquiryById, PATCH: patchInquiry, DELETE: delInquiry } = await import("../app/api/nexus/inquiries/[id]/route")
    assert((await getInquiryById(new NextRequest("http://localhost:3000/api/nexus/inquiries/inq1"), { params: Promise.resolve({ id: "inq1" }) })).status === 401, "GET /api/nexus/inquiries/[id] returns 401")
    assert((await patchInquiry(new NextRequest("http://localhost:3000/api/nexus/inquiries/inq1", { method: "PATCH" }), { params: Promise.resolve({ id: "inq1" }) })).status === 401, "PATCH /api/nexus/inquiries/[id] returns 401")
    assert((await delInquiry(new NextRequest("http://localhost:3000/api/nexus/inquiries/inq1", { method: "DELETE" }), { params: Promise.resolve({ id: "inq1" }) })).status === 401, "DELETE /api/nexus/inquiries/[id] returns 401")

    const { GET: getActById, PUT: putAct, PATCH: patchAct, DELETE: delAct } = await import("../app/api/nexus/activities/[id]/route")
    assert((await getActById(new NextRequest("http://localhost:3000/api/nexus/activities/a1"), { params: Promise.resolve({ id: "a1" }) })).status === 401, "GET /api/nexus/activities/[id] returns 401")
    assert((await putAct(new NextRequest("http://localhost:3000/api/nexus/activities/a1", { method: "PUT" }), { params: Promise.resolve({ id: "a1" }) })).status === 401, "PUT /api/nexus/activities/[id] returns 401")
    assert((await patchAct(new NextRequest("http://localhost:3000/api/nexus/activities/a1", { method: "PATCH" }), { params: Promise.resolve({ id: "a1" }) })).status === 401, "PATCH /api/nexus/activities/[id] returns 401")
    assert((await delAct(new NextRequest("http://localhost:3000/api/nexus/activities/a1", { method: "DELETE" }), { params: Promise.resolve({ id: "a1" }) })).status === 401, "DELETE /api/nexus/activities/[id] returns 401")

    const { GET: getBanById, PUT: putBan, PATCH: patchBan, DELETE: delBan } = await import("../app/api/nexus/banners/[id]/route")
    assert((await getBanById(new NextRequest("http://localhost:3000/api/nexus/banners/b1"), { params: Promise.resolve({ id: "b1" }) })).status === 401, "GET /api/nexus/banners/[id] returns 401")
    assert((await putBan(new NextRequest("http://localhost:3000/api/nexus/banners/b1", { method: "PUT" }), { params: Promise.resolve({ id: "b1" }) })).status === 401, "PUT /api/nexus/banners/[id] returns 401")
    assert((await patchBan(new NextRequest("http://localhost:3000/api/nexus/banners/b1", { method: "PATCH" }), { params: Promise.resolve({ id: "b1" }) })).status === 401, "PATCH /api/nexus/banners/[id] returns 401")
    assert((await delBan(new NextRequest("http://localhost:3000/api/nexus/banners/b1", { method: "DELETE" }), { params: Promise.resolve({ id: "b1" }) })).status === 401, "DELETE /api/nexus/banners/[id] returns 401")

    const { POST: postUpload } = await import("../app/api/nexus/upload/route")
    assert((await postUpload(new NextRequest("http://localhost:3000/api/nexus/upload", { method: "POST" }))).status === 401, "POST /api/nexus/upload returns 401")
  }

  // 13. safeParseJson Edge Cases
  console.log("\n▶ Testing safeParseJson edge cases:")
  {
    const { safeParseJson } = await import("../lib/api/nexus-auth")

    // Empty body
    const emptyReq = new Request("http://localhost/test", { method: "POST", body: "" })
    const emptyRes = await safeParseJson(emptyReq)
    assert(!emptyRes.success && emptyRes.error.includes("empty"), "Rejects empty body")

    // Syntax error
    const syntaxReq = new Request("http://localhost/test", { method: "POST", body: "{ invalid json " })
    const syntaxRes = await safeParseJson(syntaxReq)
    assert(!syntaxRes.success && syntaxRes.error.includes("Malformed JSON"), "Rejects malformed JSON")

    // Null JSON
    const nullReq = new Request("http://localhost/test", { method: "POST", body: "null" })
    const nullRes = await safeParseJson(nullReq)
    assert(!nullRes.success && nullRes.error.includes("valid JSON object"), "Rejects null JSON body")

    // Array JSON
    const arrayReq = new Request("http://localhost/test", { method: "POST", body: "[1, 2, 3]" })
    const arrayRes = await safeParseJson(arrayReq)
    assert(!arrayRes.success && arrayRes.error.includes("valid JSON object"), "Rejects array JSON body")

    // Valid Object
    const validReq = new Request("http://localhost/test", { method: "POST", body: JSON.stringify({ ok: true }) })
    const validRes = await safeParseJson<{ ok: boolean }>(validReq)
    assert(validRes.success && validRes.data.ok === true, "Accepts valid JSON object")
  }

  console.log("\n=================================================================")
  console.log(`ROUTE TEST RESULTS: ${passed} passed, ${failed} failed`)
  console.log("=================================================================")

  if (failed > 0) {
    process.exit(1)
  }
}

runRouteTests().catch((e) => {
  console.error("Route test execution failed:", e)
  process.exit(1)
})
