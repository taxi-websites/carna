// app/[lang]/download/page.tsx
import type { Metadata } from "next"
import type { Language } from "@/lib/constant"
import { LANDING } from "@/lib/constant"
import DownloadRedirect from "@/components/download-redirect-passenger"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isArabic = lang === "ar"

  return {
    title: isArabic ? "تحميل التطبيق" : "Download App",
    description: isArabic
      ? "حمّل تطبيق كارنا على جهازك وابدأ رحلتك معنا"
      : "Download Carna app on your device and start your journey with us",
    alternates: {
      canonical: `https://carnaapp.com/${lang}/passenger`,
      languages: {
        en: "https://carnaapp.com/en/passenger",
        ar: "https://carnaapp.com/ar/passenger",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SY" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SY",
      siteName: "Carna",
      title: isArabic ? "تحميل تطبيق كارنا" : "Download Carna App",
      description: isArabic
        ? "حمّل تطبيق كارنا على جهازك وابدأ رحلتك معنا"
        : "Download Carna app on your device and start your journey with us",
      url: `https://carnaapp.com/${lang}/passenger`,
    },
  }
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language

  return <DownloadRedirect lang={language} />
}