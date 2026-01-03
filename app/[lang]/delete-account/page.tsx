import type { Metadata } from "next"
import type { Language } from "@/lib/constant"
import { DELETE_ACCOUNT } from "@/lib/constant"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { DeleteAccountForm } from "@/components/delete-account-form"
import { AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isArabic = lang === "ar"

  return {
    title: isArabic ? "حذف الحساب" : "Delete Account",
    description: isArabic ? "طلب حذف حسابك في كارنا بشكل دائم" : "Request to permanently delete your Carna account",
    alternates: {
      canonical: `https://carnaapp.com/${lang}/delete-account`,
      languages: {
        en: "https://carnaapp.com/en/delete-account",
        ar: "https://carnaapp.com/ar/delete-account",
      },
    },
  }
}

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language
  const t = DELETE_ACCOUNT[language]
  const rtl = language === "ar"

  return (
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen w-full">
      <Header lang={language} />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-destructive/5 to-background py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{t.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance mb-6">{t.subtitle}</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto text-pretty">{t.description}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              {/* Warning Alert */}
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="size-4" />
                <AlertDescription className="font-medium">{t.warning}</AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
                  <CardDescription>{t.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <DeleteAccountForm lang={language} />
                </CardContent>
              </Card>
            </div>

            {/* Information Sidebar - Takes 1 column */}
            <div className="space-y-6">
              <Card className="bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Info className="size-5 text-primary" />
                    <CardTitle className="text-lg">{t.info.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary shrink-0">
                      1
                    </div>
                    <p className="text-sm text-muted-foreground">{t.info.point1}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary shrink-0">
                      2
                    </div>
                    <p className="text-sm text-muted-foreground">{t.info.point2}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-6 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary shrink-0">
                      3
                    </div>
                    <p className="text-sm text-muted-foreground">{t.info.point3}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />
    </main>
  )
}
