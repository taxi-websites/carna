import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

const locales = ["en", "ar"] as const
type Locale = (typeof locales)[number]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params

  const isArabic = lang === "ar"

  return {
    title: {
      default: isArabic ? "كارنا | منصة التكسي الذكية في سوريا" : "Carna | Smart Taxi & Ride Bidding Platform in Syria",
      template: isArabic ? "%s | كارنا" : "%s | Carna",
    },
    description: isArabic
      ? "كارنا منصة نقل ذكية في سوريا تربط الركاب والسائقين من خلال المزايدة الفورية والتفاوض على الأسعار."
      : "Carna is a smart taxi and transportation platform in Syria that connects passengers and drivers through real-time bidding and price negotiation.",
    keywords: [
      // English
      "taxi",
      "taxis",
      "taxi app",
      "ride hailing",
      "ride booking",
      "transportation services",
      "car service",
      "driver app",
      "passenger app",
      "ride bidding",
      "price negotiation",
      "bidding system",
      "ride sharing",
      "on demand taxi",
      "urban transport",
      "private transport",
      "car booking",
      "local taxi",
      "smart mobility",
      "transport platform",
      "middle east taxi",
      "syria taxi",
      "damascus taxi",
      "aleppo taxi",
      "homs taxi",
      "latakia taxi",
      // Arabic
      "تكسي",
      "تكاسي",
      "تاكسي",
      "خدمات نقل",
      "نقل ركاب",
      "سيارات أجرة",
      "تطبيق تكسي",
      "تطبيق نقل",
      "تطبيق سيارات",
      "مواصلات",
      "مفاصلة",
      "مزايدة",
      "مزايدة أسعار",
      "تفاوض على السعر",
      "حجز سيارة",
      "طلب سيارة",
      "تطبيق سائق",
      "تطبيق راكب",
      "نقل ذكي",
      "نقل حضري",
      "النقل في سوريا",
      "تكسي سوريا",
      "تاكسي دمشق",
      "تكاسي دمشق",
      "مواصلات سوريا",
    ],
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://carnaapp.com/${lang}`,
      languages: {
        en: "https://carnaapp.com/en",
        ar: "https://carnaapp.com/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SY" : "en_US",
      alternateLocale: isArabic ? "en_US" : "ar_SY",
      siteName: "Carna",
      title: isArabic ? "كارنا | منصة التكسي الذكية في سوريا" : "Carna | Smart Taxi & Ride Bidding Platform in Syria",
      description: isArabic
        ? "كارنا منصة نقل ذكية في سوريا تربط الركاب والسائقين من خلال المزايدة الفورية والتفاوض على الأسعار."
        : "Carna is a smart taxi and transportation platform in Syria that connects passengers and drivers through real-time bidding and price negotiation.",
      url: `https://carnaapp.com/${lang}`,
      images: [
        {
          url: "https://carnaapp.com/images/GOOGLE-ICON-01.png",
          width: 1200,
          height: 630,
          alt: "Carna",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isArabic ? "كارنا | منصة التكسي الذكية في سوريا" : "Carna | Smart Taxi & Ride Bidding Platform in Syria",
      description: isArabic
        ? "كارنا منصة نقل ذكية في سوريا تربط الركاب والسائقين من خلال المزايدة الفورية والتفاوض على الأسعار."
        : "Carna is a smart taxi and transportation platform in Syria that connects passengers and drivers through real-time bidding and price negotiation.",
      images: ["https://carnaapp.com/images/GOOGLE-ICON-01.png"],
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  // Validate locale
  if (!locales.includes(lang as Locale)) {
    notFound()
  }

  const isRTL = lang === "ar"

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
