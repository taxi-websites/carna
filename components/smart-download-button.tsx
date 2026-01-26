"use client";

import { LANDING } from "@/lib/constant";

type Platform = "ios" | "android" | "gallery" | "desktop";

const detectPlatform = (): Platform => {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent || navigator.vendor || "";

  if (/huawei|honor/i.test(ua)) return "gallery";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod|iOS/i.test(ua)) return "ios";

  return "desktop";
};

export default function SmartDownloadButton({ lang }: { lang: "en" | "ar" }) {
  const links = LANDING[lang].downloads.passenger;

  const open = () => {
    const platform = detectPlatform();

    switch (platform) {
      case "ios":
        window.location.href = links.ios;
        break;

      case "android":
        window.location.href = links.android;
        break;

      case "gallery":
        window.location.href = links.gallery;
        break;

      default:
        window.location.href = "/download";
    }
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
