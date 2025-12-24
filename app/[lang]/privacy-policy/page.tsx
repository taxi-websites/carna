import { PRIVACY_EN, PRIVACY_AR } from "@/lib/constant"
import TwoLanguageLegalPage from "@/components/two-language-legal-page"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import type { Language } from "@/lib/constant"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isArabic = lang === "ar"

  return {
    title: isArabic ? "سياسة الخصوصية" : "Privacy Policy",
    description: isArabic
      ? "سياسة الخصوصية لمنصة كارنا - كيف نجمع ونستخدم ونحمي بياناتك الشخصية"
      : "Carna's Privacy Policy - How we collect, use, and protect your personal data",
    alternates: {
      canonical: `https://carnaapp.com/${lang}/privacy-policy`,
      languages: {
        en: "https://carnaapp.com/en/privacy-policy",
        ar: "https://carnaapp.com/ar/privacy-policy",
      },
    },
  }
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language

  return (
    <main>
      <Header lang={language} />
      <TwoLanguageLegalPage
        titleEn="Privacy Policy"
        titleAr="سياسة الخصوصية"
        contentEn={PRIVACY_EN}
        contentAr={PRIVACY_AR}
      />
      <Footer language={language} />
    </main>
  )
}
