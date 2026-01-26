"use client";

import { LANDING } from "@/lib/constant";

type Platform = "ios" | "android" | "gallery" | "desktop";

const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent.toLowerCase();

  if (/huawei|honor/.test(ua)) return "gallery";
  if (/android/.test(ua)) return "android";
  if (/iphone|ipad|ipod|ios/.test(ua)) return "ios";

  return "desktop";
};

export default function SmartDownloadButton({ lang }: { lang: "en" | "ar" }) {
  const links = LANDING[lang].downloads.passenger;

  const open = () => {
    const platform = detectPlatform();

    const target =
      platform === "ios"
        ? links.ios
        : platform === "gallery"
        ? links.gallery
        : links.android; // android + desktop fallback

    window.location.href = target;
  };

  return (
    <button
      onClick={open}
      className="bg-primary text-background px-5 py-2 rounded-md"
    >
      {lang === "ar" ? "تحميل التطبيق" : "Download App"}
    </button>
  );
}
