"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SmartDownloadButton from "./smart-download-button"
import { LANDING } from "@/lib/constant"
import { cn } from "@/lib/utils"
import { Globe, ChevronDown, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function Header({ lang }: { lang: "en" | "ar" }) {
  const legal = LANDING[lang].legal
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const currentLanguage = languages.find((l) => l.code === lang) || languages[0]
  const currentPath = pathname.replace(/^\/(en|ar)/, "")

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full border-b backdrop-blur-md transition-all duration-300",
        scrolled ? "bg-background/90 shadow-md" : "bg-background/70 shadow-none",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300",
          scrolled ? "py-2" : "py-3",
        )}
      >
        {/* LEFT */}
        <div className="flex items-center gap-12">
          {/* BRAND */}
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 h-12 w-12",
              )}
            >
              <Image
                src="/images/GOOGLE-ICON-01.png"
                alt="Carna logo"
                width={96}
                height={96}
                className="h-full w-full object-contain rounded-lg p-1"
                priority
              />
            </div>

            <div className={cn("font-bold transition-all duration-300", scrolled ? "text-lg" : "text-xl")}>Carna</div>
          </Link>

          {/* NAV (desktop only) */}
          <nav className="hidden sm:flex gap-6 text-sm opacity-80">
            <Link href={`/${lang}/terms`} className="hover:opacity-100 transition-opacity">
              {legal.termsLabel}
            </Link>
            <Link href={`/${lang}/privacy-policy`} className="hover:opacity-100 transition-opacity">
              {legal.privacyLabel}
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex  items-center gap-3 shrink-0">
          <DropdownMenu  open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger  asChild>
              <Button
                variant="ghost"
                size="lg"
                className="flex   items-center gap-1.5 h-9  rounded-full px-2 hover:bg-muted/80"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[180px] rounded-2xl p-2 shadow-lg">
              <div className="px-2 pb-2 pt-1 text-xs font-medium text-muted-foreground">Choose language</div>

              {languages.map((language) => (
                <DropdownMenuItem key={language.code} asChild>
                  <Link
                    href={`/${language.code}${currentPath || ""}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5",
                      lang === language.code && "bg-muted",
                    )}
                  >
                    <span className="mr-1 text-base">{language.flag}</span>
                    <span className="flex-1">{language.name}</span>
                    {lang === language.code && <Check className="w-4 h-4 text-primary" />}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <SmartDownloadButton lang={lang} />
        </div>
      </div>
    </header>
  )
}
