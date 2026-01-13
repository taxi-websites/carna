"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DELETE_ACCOUNT, type Language } from "@/lib/constant"
import { toast } from "sonner"

export function DeleteAccountForm({ lang }: { lang: Language }) {
  const t = DELETE_ACCOUNT[lang]
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState("+962 ")
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState("")

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Always ensure it starts with +962 or +963
    if (!value.startsWith("+962") && !value.startsWith("+963")) {
      value = "+962 "
    }

    setPhone(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate phone format
      if (!phone.startsWith("+962") && !phone.startsWith("+963")) {
        toast.error(t.phoneError)
        setLoading(false)
        return
      }

      const result = await sendDeleteAccountRequest({
        phone: phone.trim(),
        email: email.trim() || undefined,
        reason: reason.trim(),
      })

      if (result.success) {
        toast.success(t.successMessage)
        // Reset form
        setPhone("+962 ")
        setEmail("")
        setReason("")
      } else {
        toast.error(result.error || t.errorMessage)
      }
    } catch (error) {
      toast.error(t.errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone">{t.phoneLabel}</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder={t.phonePlaceholder}
          required
          dir="ltr"
          className="text-left"
        />
        <p className="text-xs text-muted-foreground">
          {lang === "en"
            ? "Must start with +962 (Jordan)"
            : "يجب أن يبدأ بـ +962 (الأردن)"}
        </p>
      </div>

      {/* Email (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="email">
          {t.emailLabel} <span className="text-xs text-muted-foreground font-normal">({t.emailOptional})</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          dir="ltr"
          className="text-left"
        />
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason">{t.reasonLabel}</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={t.reasonPlaceholder}
          required
          rows={6}
          className="resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={loading} className="w-full" size="lg" variant="destructive">
        {loading ? t.submitting : t.submitButton}
      </Button>
    </form>
  )
}
