"use client"

import Link from "next/link"
import { Instagram, Mail, Facebook, MapPin } from "lucide-react"
import { LANDING, type Language } from "@/lib/constant"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface FooterProps {
  language: Language
  className?: string
}

export function Footer({ language, className }: FooterProps) {
  const t = LANDING[language]
  const isArabic = language === "ar"

  const brandName = t.brand
  const brandDescription = t.footer.brandDescription

  const socialLinks = [
    {
      icon: <Instagram className="h-6 w-6" />,
      href: t.social.instagram,
      label: t.footer.instagram,
    },
    {
      icon: <Facebook className="h-6 w-6" />,
      href: t.social.facebook,
      label: t.footer.facebook,
    },
    {
      icon: <Mail className="h-6 w-6" />,
      href: `mailto:${t.contact.email}`,
      label: t.footer.email,
    },
  ]

  const navLinks = [
    { label: t.footer.terms, href: `${t.legal.terms}?lang=${language}` },
    { label: t.footer.privacy, href: `${t.legal.privacy}?lang=${language}` },
  ]

  return (
    <section className={cn("relative mt-0 w-full overflow-hidden", className)}>
      <footer dir={isArabic ? "rtl" : "ltr"} className="bg-background relative mt-20">
        <div className="relative mx-auto flex min-h-[30rem] max-w-7xl flex-col justify-between p-4 py-10 sm:min-h-[35rem] md:min-h-[40rem]">
          {/* ========================= */}
          {/* MAIN COLUMN (VERY CLEAN) */}
          {/* ========================= */}
          <div className="mb-12 flex w-full flex-col items-center sm:mb-20 md:mb-0">
            <div className="flex flex-1 flex-col items-center space-y-2">
              {/* BRAND NAME — EXTREMELY BOLD */}
              <span className="text-primary text-4xl sm:text-5xl md:text-6xl font-extrabold">{brandName}</span>

              {/* DESCRIPTION — LIGHTER BUT CLEAN */}
              <p className="text-muted-foreground w-full max-w-sm px-4 text-center sm:w-96 sm:px-0 text-base sm:text-lg font-medium leading-relaxed">
                {brandDescription}
              </p>
            </div>

            {/* SOCIAL */}
            {socialLinks.length > 0 && (
              <div className="mt-5 mb-10 flex gap-6 sm:gap-8">
                {socialLinks.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                  >
                    <div className="h-6 w-6 sm:h-7 sm:w-7 duration-300 hover:scale-110">{item.icon}</div>
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
            {/* LOCATION */}
<div className="mt-6 flex max-w-md flex-col items-center gap-2 px-4 text-center">
  <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
    <MapPin className="h-4 w-4" />
    <span>{t.footer.location.label}</span>
  </div>

  <Link
    href={t.footer.location.mapUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
  >
    {t.footer.location.address}
  </Link>
</div>


            {/* NAV LINKS */}
            {navLinks.length > 0 && (
              <div className="text-muted-foreground flex max-w-full flex-wrap justify-center gap-6 px-4 text-sm sm:text-base font-medium">
                {navLinks.map((item, i) => (
                  <Link key={i} href={item.href} className="hover:text-foreground duration-300 hover:font-semibold">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CREDIT ROW */}
          <div className="mt-20 flex flex-col items-center justify-center gap-2 px-4 md:mt-24 md:flex-row md:items-center md:justify-between md:gap-1 md:px-0">
            <p className="text-muted-foreground text-center text-base md:text-left">
              ©2026 {brandName}. {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved"}.
            </p>

            <div className="text-center text-xs opacity-70 md:text-right">
              {isArabic
                ? "تم التطوير بواسطة Psycho Agency — www.psycho.agency"
                : "Developed by Psycho Agency — www.psycho.agency"}
            </div>
          </div>

          {/* LOGO BUBBLE */}
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center rounded-3xl border-2 p-3 bg-background/60 border-border backdrop-blur-sm drop-shadow-[0_0px_20px_rgba(0,0,0,0.5)] hover:border-primary transition-colors md:bottom-20 dark:drop-shadow-[0_0px_20px_rgba(255,255,255,0.3)]">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl   transition-all overflow-hidden">
              <Image
                src="/images/GOOGLE-ICON-01.png"
                alt={`${brandName} logo`}
                width={96}
                height={96}
                className="h-full w-full rounded-3xl object-contain p-1 drop-shadow-lg"
                priority
              />
            </div>
          </div>

          {/* HUGE BACKGROUND TEXT */}
          <div
            className="pointer-events-none absolute bottom-40 left-1/2 -translate-x-1/2 px-4 text-center leading-none font-extrabold tracking-tighter text-transparent bg-gradient-to-b from-foreground/10 via-primary/20 to-transparent bg-clip-text select-none z-[5] md:bottom-32"
            style={{
              fontSize: "clamp(3rem, 12vw, 10rem)",
              maxWidth: "95vw",
            }}
          >
            {brandName.toUpperCase()}
          </div>

          {/* Divider line */}
          <div className="via-border absolute bottom-32 left-1/2 h-1 w-full -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent backdrop-blur-sm sm:bottom-34" />

          {/* Shadow */}
          <div className="absolute bottom-28 h-24 w-full bg-gradient-to-t from-background via-background/80 to-background/40 blur-[1em]" />
        </div>
      </footer>
    </section>
  )
}
