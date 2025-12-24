"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SmartDownloadButton from "./smart-download-button";
import { LANDING } from "@/lib/constant";
import { cn } from "@/lib/utils";

export default function Header({ lang }: { lang: "en" | "ar" }) {
  const legal = LANDING[lang].legal;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full border-b backdrop-blur-md transition-all duration-300",
        scrolled
          ? "bg-background/90 shadow-md"
          : "bg-background/70 shadow-none"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}
      >
        {/* LEFT */}
        <div className="flex items-center gap-12">
          {/* BRAND */}
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 h-12 w-12 ",
                
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

            <div
              className={cn(
                "font-bold transition-all duration-300",
                scrolled ? "text-lg" : "text-xl"
              )}
            >
              Carna
            </div>
          </div>

          {/* NAV (desktop only) */}
          <nav className="hidden sm:flex gap-6 text-sm opacity-80">
            <a
              href={legal.terms + `?lang=${lang}`}
              className="hover:opacity-100 transition-opacity"
            >
              {legal.termsLabel}
            </a>
            <a
              href={legal.privacy + `?lang=${lang}`}
              className="hover:opacity-100 transition-opacity"
            >
              {legal.privacyLabel}
            </a>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="shrink-0">
          <SmartDownloadButton lang={lang} />
        </div>
      </div>
    </header>
  );
}
