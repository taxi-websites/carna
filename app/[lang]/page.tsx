import Header from "@/components/header"
import { Footer } from "@/components/footer"
import HomeHero from "@/components/home-hero"
import type { Language } from "@/lib/constant"

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language

  return (
    <main dir={language === "ar" ? "rtl" : "ltr"} className="w-full">
      <Header lang={language} />
      <HomeHero lang={language} />
      <Footer language={language} />
    </main>
  )
}
