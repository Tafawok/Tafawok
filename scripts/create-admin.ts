import { Client } from "pg"
import { createClient } from "@supabase/supabase-js"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

async function createAdmin() {
  const connectionString = process.env.DATABASE_URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!connectionString || !supabaseUrl || !supabaseKey) {
    console.error("Missing environment variables")
    process.exit(1)
  }

  const pgClient = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  })

  await pgClient.connect()
  console.log("Connected to PostgreSQL for admin creation...")

  const userEmail = process.env.ADMIN_EMAIL || "admin@tafawok.co"
  const userPassword = process.env.ADMIN_PASSWORD
  if (!userPassword) {
    console.error("ADMIN_PASSWORD environment variable is required.")
    process.exit(1)
  }

  const checkUser = await pgClient.query(
    "SELECT id, email FROM auth.users WHERE email = $1",
    [userEmail]
  )

  let userId: string

  if (checkUser.rows.length === 0) {
    console.log(`Creating user ${userEmail} in auth.users...`)
    const insertRes = await pgClient.query(
      `INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at
      ) VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        $1,
        crypt($2, gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}'::jsonb,
        '{"name":"Super Admin","role":"super_admin"}'::jsonb,
        now(),
        now()
      ) RETURNING id;`,
      [userEmail, userPassword]
    )

    userId = insertRes.rows[0].id

    console.log(`Creating identity for user ${userId}...`)
    await pgClient.query(
      `INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
      ) VALUES (
        $1::text,
        $2::uuid,
        jsonb_build_object('sub', $1::text, 'email', $3::text),
        'email',
        $1::text,
        now(),
        now(),
        now()
      );`,
      [userId, userId, userEmail]
    )
  } else {
    userId = checkUser.rows[0].id
    console.log(
      `Updating password for existing user ${userEmail} (${userId})...`
    )
    await pgClient.query(
      `UPDATE auth.users 
       SET encrypted_password = crypt($2, gen_salt('bf')),
           email_confirmed_at = COALESCE(email_confirmed_at, now()),
           updated_at = now()
       WHERE id = $1;`,
      [userId, userPassword]
    )
  }

  console.log(`Ensuring ${userEmail} in public.admin_users...`)
  await pgClient.query(
    `INSERT INTO public.admin_users (id, email, role)
     VALUES ($1, $2, 'super_admin')
     ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, role = 'super_admin';`,
    [userId, userEmail]
  )

  console.log("Admin records configured in PostgreSQL successfully!")
  await pgClient.end()

  // Verify authentication via public Supabase API
  console.log("Testing Supabase Auth API login...")
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userEmail,
    password: userPassword,
  })

  if (error) {
    console.error("Auth test failed:", error.message)
    process.exit(1)
  } else {
    console.log("AUTHENTICATION VERIFIED SUCCESSFULLY!")
    console.log("User:", data.user?.email)
    console.log("Session established:", !!data.session?.access_token)
  }
}

createAdmin()
