// components/download-redirect.tsx
"use client"

import { useEffect } from "react"
import { LANDING } from "@/lib/constant"
import type { Language } from "@/lib/constant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Apple, Smartphone } from "lucide-react"

type Platform = "ios" | "android" | "gallery" | "desktop"

const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "desktop"

  const ua = navigator.userAgent.toLowerCase()

  if (/huawei|honor/.test(ua)) return "gallery"
  if (/android/.test(ua)) return "android"
  if (/iphone|ipad|ipod|ios/.test(ua)) return "ios"

  return "desktop"
}

export default function DownloadRedirect({ lang }: { lang: Language }) {
  const links = LANDING[lang].downloads.driver
  const rtl = lang === "ar"

  useEffect(() => {
    const platform = detectPlatform()

    const target =
      platform === "ios"
        ? links.ios
        : platform === "gallery"
        ? links.gallery
        : links.android // android + desktop fallback

    // Redirect after a short delay to allow the page to render
    const timer = setTimeout(() => {
      window.location.href = target
    }, 1000)

    return () => clearTimeout(timer)
  }, [links])

  return (
    <main
      dir={rtl ? "rtl" : "ltr"}
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4"
    >
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Loader2 className="size-16 animate-spin text-primary" />
          </div>
          <CardTitle className="text-3xl md:text-4xl">
            {lang === "ar" ? "جارٍ التحميل..." : "Redirecting..."}
          </CardTitle>
          <CardDescription className="text-lg">
            {lang === "ar"
              ? "نقوم بتوجيهك إلى متجر التطبيقات المناسب لجهازك"
              : "We're directing you to the appropriate app store for your device"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {lang === "ar"
                ? "لم يتم التوجيه تلقائياً؟ اختر منصتك:"
                : "Not redirected automatically? Choose your platform:"}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={links.ios}>
                  <Apple className="size-5 mr-2" />
                  {lang === "ar" ? "آيفون" : "iPhone"}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={links.android}>
                  <Smartphone className="size-5 mr-2" />
                  {lang === "ar" ? "أندرويد" : "Android"}
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <a href={links.gallery}>
                  <Smartphone className="size-5 mr-2" />
                  {lang === "ar" ? "هواوي" : "Huawei"}
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}