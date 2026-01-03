"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendDeleteAccountRequest(formData: {
  phone: string
  email?: string
  reason: string
}) {
  try {
    if (!formData.phone || !formData.reason) {
      return {
        success: false,
        error: "Phone number and reason are required",
      }
    }

    // Validate phone number format
    const phoneRegex = /^\+96[23]\s?\d{1,3}\s?\d{3}\s?\d{3,4}$/
    if (!phoneRegex.test(formData.phone)) {
      return {
        success: false,
        error: "Invalid phone number format. Must start with +962 or +963",
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
              background-color: #fee2e2;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 20px;
              border-left: 4px solid #dc2626;
            }
            .header h2 {
              margin: 0;
              color: #dc2626;
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
            .reason-box {
              background-color: #f9fafb;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #dc2626;
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
            .warning {
              background-color: #fef3c7;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #f59e0b;
              margin-top: 20px;
              font-weight: 600;
              color: #92400e;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>⚠️ Account Deletion Request</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Phone Number:</div>
              <div class="value" dir="ltr">${formData.phone}</div>
            </div>
            ${
              formData.email
                ? `
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            `
                : ""
            }
            <div class="field">
              <div class="label">Reason for Deletion:</div>
              <div class="reason-box">${formData.reason}</div>
            </div>
          </div>
          <div class="warning">
            This is a permanent account deletion request. Please verify the user's identity before proceeding.
          </div>
          <div class="footer">
            This is an automated message from the Carna Account Deletion system.
          </div>
        </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: "Carna Account Deletion <onboarding@resend.dev>",
      to: ["info@carnaapp.com"],
      replyTo: formData.email || undefined,
      subject: `🚨 Account Deletion Request - ${formData.phone}`,
      html: htmlContent,
    })

    if (error) {
      return {
        success: false,
        error: error.message || "Failed to send request",
      }
    }

    return { success: true, data }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send request",
    }
  }
}
