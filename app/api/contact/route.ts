import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface ContactPayload {
  name: string
  email: string
  phone: string
  property?: string
  inquiryType: string
  message: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>
    const { name, email, phone, property, inquiryType, message } = body

    // 1. Validation
    const errors: Record<string, string> = {}

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      errors.name = "Full name is required (minimum 3 characters)."
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid corporate email address is required."
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      errors.phone = "A valid contact phone number is required."
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.message =
        "Inquiry specifications and requirements must be at least 10 characters."
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please correct the highlighted fields.",
          errors,
        },
        { status: 400 }
      )
    }

    const cleanPayload: ContactPayload = {
      name: name!.trim(),
      email: email!.trim().toLowerCase(),
      phone: phone!.trim(),
      property: property?.trim() || "All Properties / General Inquiry",
      inquiryType: inquiryType?.trim() || "Commercial Inquiry",
      message: message!.trim(),
    }

    // Persist to Supabase database
    try {
      const { createClient } = await import("@/lib/supabase/server")
      const supabase = await createClient()
      await supabase.from("inquiries").insert({
        name: cleanPayload.name,
        email: cleanPayload.email,
        phone: cleanPayload.phone,
        interest_type: cleanPayload.inquiryType,
        property_slug: cleanPayload.property,
        message: cleanPayload.message,
        status: "new",
      })
    } catch (dbErr) {
      console.error("[INQUIRIES_DB_PERSIST_ERROR]", dbErr)
    }

    // 2. SMTP Environment Check
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10)
    const smtpSecure = process.env.SMTP_SECURE === "true"
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL || "info@tafawok.co"

    // Safe Dev-Mode Preview Fallback
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.log(
        "\n================================================================================"
      )
      console.log(
        " [TAFAWOK_DEV_PREVIEW] Official Inquiry Received (SMTP Unconfigured)"
      )
      console.log(
        "================================================================================"
      )
      console.log("Timestamp:     ", new Date().toISOString())
      console.log("Sender Name:   ", cleanPayload.name)
      console.log("Email:         ", cleanPayload.email)
      console.log("Phone:         ", cleanPayload.phone)
      console.log("Property:      ", cleanPayload.property)
      console.log("Inquiry Type:  ", cleanPayload.inquiryType)
      console.log("Message:       \n", cleanPayload.message)
      console.log(
        "================================================================================\n"
      )

      return NextResponse.json(
        {
          success: true,
          previewMode: true,
          message:
            "Inquiry successfully received in dev preview mode. To deliver live emails, configure SMTP environment variables.",
        },
        { status: 200 }
      )
    }

    // 3. Live SMTP Dispatch
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #f2f2f2; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #14161a; border: 1px solid #282c34; border-radius: 12px; overflow: hidden; }
          .header { background: linear-gradient(135deg, #a46338 0%, #7d441e 100%); padding: 24px 32px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #ffffff; }
          .header p { margin: 4px 0 0 0; font-size: 12px; color: rgba(255, 255, 255, 0.85); letter-spacing: 0.02em; }
          .body { padding: 32px; }
          .field-group { margin-bottom: 20px; border-bottom: 1px solid #22262d; padding-bottom: 16px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9aa0a6; margin-bottom: 4px; font-weight: 600; }
          .field-value { font-size: 15px; color: #ffffff; font-weight: 600; }
          .message-box { background-color: #0e1013; border: 1px solid #282c34; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #e1e3e6; white-space: pre-wrap; }
          .footer { background-color: #0c0e11; padding: 16px 32px; font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid #22262d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>TAFAWOK Commercial Real Estate</h1>
            <p>New Commercial Inquiry // Executive Desk Notification</p>
          </div>
          <div class="body">
            <div class="field-group">
              <div class="field-label">Sender Name</div>
              <div class="field-value">${cleanPayload.name}</div>
            </div>
            <div class="field-group">
              <div class="field-label">Corporate Email</div>
              <div class="field-value"><a href="mailto:${cleanPayload.email}" style="color: #c9804e; text-decoration: none;">${cleanPayload.email}</a></div>
            </div>
            <div class="field-group">
              <div class="field-label">Contact Phone</div>
              <div class="field-value"><a href="tel:${cleanPayload.phone}" style="color: #c9804e; text-decoration: none;">${cleanPayload.phone}</a></div>
            </div>
            <div class="field-group">
              <div class="field-label">Interested Property / Asset</div>
              <div class="field-value">${cleanPayload.property}</div>
            </div>
            <div class="field-group">
              <div class="field-label">Inquiry Classification</div>
              <div class="field-value">${cleanPayload.inquiryType}</div>
            </div>
            <div class="field-group" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
              <div class="field-label">Inquiry Requirements & Scope</div>
              <div class="message-box">${cleanPayload.message}</div>
            </div>
          </div>
          <div class="footer">
            TAFAWOK Real Estate Investment & Contracting Company &bull; Cairo Executive Office &bull; Fifth Settlement
          </div>
        </div>
      </body>
      </html>
    `

    await transporter.sendMail({
      from: `"TAFAWOK CRE Portal" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: cleanPayload.email,
      subject: `[TAFAWOK RFQ] ${cleanPayload.inquiryType}: ${cleanPayload.name} — ${cleanPayload.property}`,
      html: htmlContent,
      text: `TAFAWOK Commercial Real Estate - New Inquiry\n\nName: ${cleanPayload.name}\nEmail: ${cleanPayload.email}\nPhone: ${cleanPayload.phone}\nProperty: ${cleanPayload.property}\nClassification: ${cleanPayload.inquiryType}\n\nMessage:\n${cleanPayload.message}`,
    })

    return NextResponse.json(
      {
        success: true,
        message:
          "Inquiry successfully dispatched to the executive leasing desk.",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[TAFAWOK_SMTP_ERROR]", error)
    return NextResponse.json(
      {
        success: false,
        message:
          "An error occurred while transmitting your inquiry. Please try again or reach our executive desk directly by phone.",
      },
      { status: 500 }
    )
  }
}
