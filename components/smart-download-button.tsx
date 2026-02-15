"use client";

import Link from "next/link";

export default function SmartDownloadButton({ lang }: { lang: "en" | "ar" }) {
  return (
    <Link
      href={`/${lang}/download`}
      className="bg-primary text-background px-5 py-2 rounded-md inline-block hover:opacity-90 transition-opacity"
    >
      {lang === "ar" ? "تحميل التطبيق" : "Download App"}
    </Link>
  );
}