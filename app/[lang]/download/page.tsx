"use client";

import { useEffect } from "react";
import { LANDING } from "@/lib/constant";

export default function DownloadPage({ params }: { params: { lang: "en" | "ar" } }) {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || "";

    const links = LANDING[params.lang].downloads.passenger;

    if (/huawei|honor/i.test(ua)) window.location.replace(links.gallery);
    else if (/android/i.test(ua)) window.location.replace(links.android);
    else if (/iPad|iPhone|iPod|iOS/i.test(ua)) window.location.replace(links.ios);
  }, [params.lang]);

  return (
    <div className="flex min-h-screen items-center justify-center text-center">
      <p>Redirecting to store…</p>
    </div>
  );
}
