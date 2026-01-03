interface SupportEmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export function SupportEmailTemplate({ name, email, subject, message }: SupportEmailTemplateProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "600px" }}>
      <h1 style={{ color: "#333", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>
        New Support Request from Carna Website
      </h1>

      <div style={{ marginTop: "20px" }}>
        <p style={{ margin: "10px 0" }}>
          <strong>Name:</strong> {name}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Email:</strong> {email}
        </p>
        <p style={{ margin: "10px 0" }}>
          <strong>Subject:</strong> {subject}
        </p>
        <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
          <strong>Message:</strong>
          <p style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>{message}</p>
        </div>
      </div>

      <div
        style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #eee", color: "#666", fontSize: "12px" }}
      >
        <p>This email was sent from the Carna support form.</p>
      </div>
    </div>
  )
}
