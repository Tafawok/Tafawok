import { Client } from "pg"
import path from "path"
import dotenv from "dotenv"
import {
  PROPERTIES,
  COMMERCIAL_DISCIPLINES,
  CORPORATE_METRICS,
  CLIENT_PARTNERS,
  CORPORATE_TIMELINE,
  CORPORATE_VALUES,
  HSE_CHARTER,
  CRE_INVESTMENT_THESIS,
  CEO_PROFILE,
  COMPANY_IDENTITY,
  DEFAULT_HOMEPAGE_SETTINGS,
} from "../content/cre-data"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

async function seed() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error("Missing DATABASE_URL in .env.local")
    process.exit(1)
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    console.log("Connected to Supabase PostgreSQL database for seeding...")

    // 1. Seed Properties & Stores
    console.log(`Seeding ${PROPERTIES.length} properties...`)
    for (let i = 0; i < PROPERTIES.length; i++) {
      const p = PROPERTIES[i]
      await client.query(
        `INSERT INTO public.properties (
          id, slug, name, tagline, type, status, category, description,
          full_overview, main_image, gallery, video, location, contact,
          key_stats, specs, highlights, amenities, sort_order, is_published
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          name = EXCLUDED.name,
          tagline = EXCLUDED.tagline,
          type = EXCLUDED.type,
          status = EXCLUDED.status,
          category = EXCLUDED.category,
          description = EXCLUDED.description,
          full_overview = EXCLUDED.full_overview,
          main_image = EXCLUDED.main_image,
          gallery = EXCLUDED.gallery,
          video = EXCLUDED.video,
          location = EXCLUDED.location,
          contact = EXCLUDED.contact,
          key_stats = EXCLUDED.key_stats,
          specs = EXCLUDED.specs,
          highlights = EXCLUDED.highlights,
          amenities = EXCLUDED.amenities,
          sort_order = EXCLUDED.sort_order,
          is_published = EXCLUDED.is_published,
          updated_at = now();`,
        [
          p.id,
          p.slug,
          JSON.stringify(p.name),
          JSON.stringify(p.tagline),
          p.type || "retail",
          p.status || "active",
          JSON.stringify(p.category),
          JSON.stringify(p.description),
          JSON.stringify(p.fullOverview),
          p.mainImage,
          JSON.stringify(p.gallery || []),
          p.video ? JSON.stringify(p.video) : null,
          JSON.stringify(p.location),
          JSON.stringify(p.contact),
          JSON.stringify(p.keyStats),
          JSON.stringify(p.specs || []),
          JSON.stringify(p.highlights || []),
          JSON.stringify(p.amenities || []),
          i,
          true,
        ]
      )

      if (p.stores && p.stores.length > 0) {
        console.log(`  Seeding ${p.stores.length} stores for ${p.id}...`)
        for (let s = 0; s < p.stores.length; s++) {
          const store = p.stores[s]
          await client.query(
            `INSERT INTO public.property_stores (
              id, property_id, name, category, floor, unit_number, status, description, phone, sort_order
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO UPDATE SET
              property_id = EXCLUDED.property_id,
              name = EXCLUDED.name,
              category = EXCLUDED.category,
              floor = EXCLUDED.floor,
              unit_number = EXCLUDED.unit_number,
              status = EXCLUDED.status,
              description = EXCLUDED.description,
              phone = EXCLUDED.phone,
              sort_order = EXCLUDED.sort_order,
              updated_at = now();`,
            [
              store.id,
              p.id,
              JSON.stringify(store.name),
              JSON.stringify(store.category),
              JSON.stringify(store.floor),
              store.unitNumber || null,
              store.status,
              store.description ? JSON.stringify(store.description) : null,
              store.phone || null,
              s,
            ]
          )
        }
      }
    }

    // 2. Commercial Disciplines
    console.log(
      `Seeding ${COMMERCIAL_DISCIPLINES.length} commercial disciplines...`
    )
    for (let i = 0; i < COMMERCIAL_DISCIPLINES.length; i++) {
      const d = COMMERCIAL_DISCIPLINES[i]
      await client.query(
        `INSERT INTO public.commercial_disciplines (
          id, title, tagline, description, key_metric, features, icon_name, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          key_metric = EXCLUDED.key_metric,
          features = EXCLUDED.features,
          icon_name = EXCLUDED.icon_name,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [
          d.id,
          JSON.stringify(d.title),
          JSON.stringify(d.tagline),
          JSON.stringify(d.description),
          JSON.stringify(d.keyMetric),
          JSON.stringify(d.features || []),
          d.iconName,
          i,
        ]
      )
    }

    // 3. Corporate Metrics
    console.log(`Seeding ${CORPORATE_METRICS.length} corporate metrics...`)
    for (let i = 0; i < CORPORATE_METRICS.length; i++) {
      const m = CORPORATE_METRICS[i]
      const metricId = `metric-${i + 1}`
      await client.query(
        `INSERT INTO public.corporate_metrics (
          id, value, suffix, label, description, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          value = EXCLUDED.value,
          suffix = EXCLUDED.suffix,
          label = EXCLUDED.label,
          description = EXCLUDED.description,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [
          metricId,
          m.value,
          m.suffix,
          JSON.stringify(m.label),
          JSON.stringify(m.description),
          i,
        ]
      )
    }

    // 4. Timeline Milestones
    console.log(`Seeding ${CORPORATE_TIMELINE.length} timeline milestones...`)
    for (let i = 0; i < CORPORATE_TIMELINE.length; i++) {
      const t = CORPORATE_TIMELINE[i]
      const milestoneId = `milestone-${t.year}`
      await client.query(
        `INSERT INTO public.timeline_milestones (
          id, year, title, badge, description, highlights, scope_category, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          year = EXCLUDED.year,
          title = EXCLUDED.title,
          badge = EXCLUDED.badge,
          description = EXCLUDED.description,
          highlights = EXCLUDED.highlights,
          scope_category = EXCLUDED.scope_category,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [
          milestoneId,
          t.year,
          JSON.stringify(t.title),
          JSON.stringify(t.badge),
          JSON.stringify(t.description),
          JSON.stringify(t.highlights || []),
          t.scopeCategory,
          i,
        ]
      )
    }

    // 5. Corporate Values
    console.log(`Seeding ${CORPORATE_VALUES.length} corporate values...`)
    for (let i = 0; i < CORPORATE_VALUES.length; i++) {
      const v = CORPORATE_VALUES[i]
      await client.query(
        `INSERT INTO public.corporate_values (
          id, number, title, tagline, description, icon_name, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          number = EXCLUDED.number,
          title = EXCLUDED.title,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          icon_name = EXCLUDED.icon_name,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [
          v.id,
          v.number,
          JSON.stringify(v.title),
          JSON.stringify(v.tagline),
          JSON.stringify(v.description),
          v.iconName,
          i,
        ]
      )
    }

    // 6. Investment Pillars
    console.log(`Seeding ${CRE_INVESTMENT_THESIS.length} investment pillars...`)
    for (let i = 0; i < CRE_INVESTMENT_THESIS.length; i++) {
      const p = CRE_INVESTMENT_THESIS[i]
      await client.query(
        `INSERT INTO public.investment_pillars (
          id, number, title, tagline, description, metric, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          number = EXCLUDED.number,
          title = EXCLUDED.title,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          metric = EXCLUDED.metric,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [
          p.id,
          p.number,
          JSON.stringify(p.title),
          JSON.stringify(p.tagline),
          JSON.stringify(p.description),
          JSON.stringify(p.metric),
          i,
        ]
      )
    }

    // 7. Client Partners
    console.log(`Seeding ${CLIENT_PARTNERS.length} client partners...`)
    for (let i = 0; i < CLIENT_PARTNERS.length; i++) {
      const cp = CLIENT_PARTNERS[i]
      const partnerId = `partner-${i + 1}`
      await client.query(
        `INSERT INTO public.client_partners (
          id, name, category, country, sort_order
        ) VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          country = EXCLUDED.country,
          sort_order = EXCLUDED.sort_order,
          updated_at = now();`,
        [partnerId, cp.name, cp.category, cp.country, i]
      )
    }

    // 8. Site Settings (Singletons)
    console.log(
      "Seeding site settings (company_identity, ceo_profile, hse_charter, homepage_settings)..."
    )
    await client.query(
      `INSERT INTO public.site_settings (key, data)
      VALUES 
        ('company_identity', $1),
        ('ceo_profile', $2),
        ('hse_charter', $3),
        ('homepage_settings', $4)
      ON CONFLICT (key) DO UPDATE SET
        data = EXCLUDED.data,
        updated_at = now();`,
      [
        JSON.stringify(COMPANY_IDENTITY),
        JSON.stringify(CEO_PROFILE),
        JSON.stringify(HSE_CHARTER),
        JSON.stringify(DEFAULT_HOMEPAGE_SETTINGS),
      ]
    )

    console.log("ALL SEED DATA INSERTED SUCCESSFULLY INTO SUPABASE POSTGRESQL!")

    // Print summary counts
    const counts = await client.query(`
      SELECT 
        (SELECT count(*) FROM public.properties) as properties,
        (SELECT count(*) FROM public.property_stores) as stores,
        (SELECT count(*) FROM public.commercial_disciplines) as disciplines,
        (SELECT count(*) FROM public.corporate_metrics) as metrics,
        (SELECT count(*) FROM public.timeline_milestones) as milestones,
        (SELECT count(*) FROM public.corporate_values) as values,
        (SELECT count(*) FROM public.investment_pillars) as pillars,
        (SELECT count(*) FROM public.client_partners) as partners,
        (SELECT count(*) FROM public.site_settings) as settings;
    `)
    console.log("Database Row Counts:", counts.rows[0])
  } catch (err) {
    console.error("Seeding error:", err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

seed()
