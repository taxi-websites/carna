import { SupportEmailTemplate } from "@/components/email-template"
import { Resend } from "resend"
import { NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Carna Support <onboarding@resend.dev>", // Replace with your verified domain
      to: ["info@carnaapp.com"],
      replyTo: email,
      subject: `Support Request: ${subject}`,
      react: SupportEmailTemplate({ name, email, subject, message }),
    })

    if (error) {
      console.error("[v0] Resend error:", error)
      return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
