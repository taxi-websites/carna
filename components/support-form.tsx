"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SUPPORT, type Language } from "@/lib/constant"
import { CheckCircle2, AlertCircle } from "lucide-react"

export function SupportForm({ lang }: { lang: Language }) {
  const t = SUPPORT[lang]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setStatus("idle")

  try {
    const res = await fetch(`/${lang}/api/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } else {
      setStatus("error")
    }
  } catch {
    setStatus("error")
  } finally {
    setIsSubmitting(false)
  }
}


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          {t.nameLabel}
        </label>
        <Input
          id="name"
          type="text"
          placeholder={t.namePlaceholder}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          {t.emailLabel}
        </label>
        <Input
          id="email"
          type="email"
          placeholder={t.emailPlaceholder}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          {t.subjectLabel}
        </label>
        <Input
          id="subject"
          type="text"
          placeholder={t.subjectPlaceholder}
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t.messageLabel}
        </label>
        <Textarea
          id="message"
          placeholder={t.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          disabled={isSubmitting}
          rows={5}
        />
      </div>

      {/* Status Messages */}
      {status === "success" && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-sm text-green-800 dark:text-green-300">
          <CheckCircle2 className="size-5 shrink-0" />
          <p>{t.successMessage}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-800 dark:text-red-300">
          <AlertCircle className="size-5 shrink-0" />
          <p>{t.errorMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t.submitting : t.submitButton}
      </Button>
    </form>
  )
}
