import { Client } from "pg"
import path from "path"
import dotenv from "dotenv"
import {
  ACTIVITIES,
  NOTIFICATION_BANNERS,
  DEFAULT_MAINTENANCE_SETTINGS,
} from "../content/cre-data"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

async function run() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error("Missing DATABASE_URL")
    process.exit(1)
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    console.log("Connected to PostgreSQL for activities and banner seeding...")

    for (const act of ACTIVITIES) {
      await client.query(
        `INSERT INTO public.activities (
          id, slug, title, summary, content, category, status,
          start_date, end_date, location_name, location_url,
          main_image, gallery, featured, is_published,
          action_url, action_label, sort_order, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          summary = EXCLUDED.summary,
          content = EXCLUDED.content,
          category = EXCLUDED.category,
          status = EXCLUDED.status,
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date,
          location_name = EXCLUDED.location_name,
          location_url = EXCLUDED.location_url,
          main_image = EXCLUDED.main_image,
          gallery = EXCLUDED.gallery,
          featured = EXCLUDED.featured,
          is_published = EXCLUDED.is_published,
          action_url = EXCLUDED.action_url,
          action_label = EXCLUDED.action_label,
          sort_order = EXCLUDED.sort_order`,
        [
          act.id,
          act.slug,
          JSON.stringify(act.title),
          JSON.stringify(act.summary),
          JSON.stringify(act.content),
          act.category,
          act.status,
          act.startDate,
          act.endDate || null,
          JSON.stringify(act.locationName),
          act.locationUrl || null,
          act.mainImage,
          JSON.stringify(act.gallery),
          act.featured,
          act.isPublished,
          act.actionUrl || null,
          act.actionLabel ? JSON.stringify(act.actionLabel) : null,
          act.sortOrder,
          act.createdAt || new Date().toISOString(),
        ]
      )
    }
    console.log("Activities seeded successfully!")

    for (const b of NOTIFICATION_BANNERS) {
      await client.query(
        `INSERT INTO public.notification_banners (
          id, title, message, badge, location, start_date, end_date,
          is_active, type, link_url, link_label, dismissible, priority
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          message = EXCLUDED.message,
          badge = EXCLUDED.badge,
          location = EXCLUDED.location,
          start_date = EXCLUDED.start_date,
          end_date = EXCLUDED.end_date,
          is_active = EXCLUDED.is_active,
          type = EXCLUDED.type,
          link_url = EXCLUDED.link_url,
          link_label = EXCLUDED.link_label,
          dismissible = EXCLUDED.dismissible,
          priority = EXCLUDED.priority`,
        [
          b.id,
          JSON.stringify(b.title),
          JSON.stringify(b.message),
          JSON.stringify(b.badge),
          b.location ? JSON.stringify(b.location) : null,
          b.startDate,
          b.endDate,
          b.isActive,
          b.type,
          b.linkUrl || null,
          b.linkLabel ? JSON.stringify(b.linkLabel) : null,
          b.dismissible,
          b.priority,
        ]
      )
    }
    console.log("Notification banners seeded successfully!")

    await client.query(
      `INSERT INTO public.site_settings (key, data, updated_at)
       VALUES ('maintenance_mode', $1, now())
       ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [JSON.stringify(DEFAULT_MAINTENANCE_SETTINGS)]
    )
    console.log("Maintenance mode setting seeded successfully!")
  } catch (err) {
    console.error("Seeding error:", err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

run()
