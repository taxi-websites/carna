import type { Metadata } from "next"
import type { Language } from "@/lib/constant"
import { SUPPORT, LANDING } from "@/lib/constant"
import { SupportForm } from "@/components/support-form"
import { Mail, Phone, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isArabic = lang === "ar"

  return {
    title: isArabic ? "الدعم والمساعدة" : "Support & Help",
    description: isArabic
      ? "تواصل مع فريق دعم كارنا للحصول على المساعدة والإجابة على استفساراتك"
      : "Get in touch with Carna support team for help and answers to your questions",
    alternates: {
      canonical: `https://carnaapp.com/${lang}/support`,
      languages: {
        en: "https://carnaapp.com/en/support",
        ar: "https://carnaapp.com/ar/support",
      },
    },
  }
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language
  const t = SUPPORT[language]
  const contactInfo = LANDING[language].contact
  const rtl = language === "ar"

  return (
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-muted/50 to-background py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">{t.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
                <CardDescription>{t.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <SupportForm lang={language} />
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.contactTitle}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.emailLabel2}</h3>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.phoneLabel}</h3>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-lg bg-primary/10 p-2">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.officeHours}</h3>
                      <p className="text-muted-foreground">{t.officeHoursTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Help Card */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {language === "en" ? "Need Quick Help?" : "تحتاج مساعدة سريعة؟"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {language === "en"
                      ? "Check out our FAQ section or browse through our help articles for instant answers."
                      : "تحقق من قسم الأسئلة الشائعة أو تصفح مقالات المساعدة للحصول على إجابات فورية."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
