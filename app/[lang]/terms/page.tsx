import { TERMS_EN, TERMS_AR } from "@/lib/constant"
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
    title: isArabic ? "الشروط والأحكام" : "Terms & Conditions",
    description: isArabic
      ? "الشروط والأحكام الخاصة باستخدام منصة كارنا للنقل الذكي"
      : "Terms and Conditions for using Carna smart transportation platform",
    alternates: {
      canonical: `https://carnaapp.com/${lang}/terms`,
      languages: {
        en: "https://carnaapp.com/en/terms",
        ar: "https://carnaapp.com/ar/terms",
      },
    },
  }
}

export default async function TermsPage({
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
        titleEn="Terms & Conditions"
        titleAr="الشروط والأحكام"
        contentEn={TERMS_EN}
        contentAr={TERMS_AR}
      />
      <Footer language={language} />
    </main>
  )
}
