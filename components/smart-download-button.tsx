"use client";

import { LANDING } from "@/lib/constant";

const detectPlatform = () => {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent || navigator.vendor || "";

  if (/huawei|honor/i.test(ua)) return "gallery";
  if (/android/i.test(ua)) return "android";
  if (/iPad|iPhone|iPod|iOS/i.test(ua)) return "ios";

  return "desktop";
};

export default function SmartDownloadButton({ lang }: { lang: "en" | "ar" }) {
  const platform = detectPlatform();
  const links = LANDING[lang].downloads.passenger;

  const open = () => {
    if (platform === "ios") window.location.href = links.ios;
    else if (platform === "android") window.location.href = links.android;
    else if (platform === "gallery") window.location.href = links.gallery;
    else window.location.href = "/download";
  };

  return (
    <button
      className="bg-primary cursor-pointer text-background pointer-coarse  px-5 py-2 rounded-md"
      onClick={open}
    >
      {lang === "ar" ? "تحميل التطبيق" : "Download App"}
    </button>
  );
}
