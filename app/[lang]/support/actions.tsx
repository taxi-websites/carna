"use server"

<<<<<<< HEAD
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

=======
>>>>>>> c0b5e7fbc88c1fcb9406545000be6d80f0a18dc6
export async function sendSupportEmail(formData: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
<<<<<<< HEAD
    console.log("[v0] Attempting to send email with data:", formData)

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
            }
            .header h2 {
              margin: 0;
              color: #1a1a1a;
            }
            .content {
              background-color: #ffffff;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: 600;
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .value {
              color: #1a1a1a;
              font-size: 16px;
            }
            .message-box {
              background-color: #f9fafb;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #3b82f6;
              margin-top: 10px;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              font-size: 14px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>New Support Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${formData.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${formData.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${formData.message}</div>
            </div>
          </div>
          <div class="footer">
            This is an automated message from the Carna Support form.
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "Carna Support <onboarding@resend.dev>", // Replace with your verified domain
      to: ["info@carnaapp.com"],
      replyTo: formData.email,
      subject: `Support Request: ${formData.subject}`,
      html: htmlContent,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return {
        success: false,
        error: error.message || "Failed to send email",
      }
    }

    console.log("[v0] Email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.log("[v0] Error in sendSupportEmail:", error)
=======
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to send email")
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error("Error in sendSupportEmail:", error)
>>>>>>> c0b5e7fbc88c1fcb9406545000be6d80f0a18dc6
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    }
  }
}
