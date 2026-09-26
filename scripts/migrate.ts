import { Client } from "pg"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

async function run() {
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
    console.log("Connected to PostgreSQL database...")

    const migrationFile = path.resolve(
      process.cwd(),
      "supabase/migrations/20260926000000_create_tafawok_cre_schema.sql"
    )
    const sql = fs.readFileSync(migrationFile, "utf-8")

    console.log("Executing schema migration...")
    await client.query(sql)
    console.log("Schema migration executed successfully!")

    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)
    console.log(
      "Public tables in database:",
      res.rows.map((r) => r.table_name)
    )
  } catch (err) {
    console.error("Migration error:", err)
    process.exit(1)
  } finally {
    await client.end()
  }
}

run()
