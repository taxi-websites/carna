import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { LANDING } from "@/lib/constant"
import type { Language } from "@/lib/constant"

type Platform = "ios" | "android" | "gallery" | "desktop"

function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase()

  if (/huawei|honor/.test(ua)) return "gallery"
  if (/android/.test(ua)) return "android"
  if (/iphone|ipad|ipod|ios/.test(ua)) return "ios"

  return "desktop"
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const language = lang as Language

  const headersList = await headers()
  const userAgent = headersList.get("user-agent") ?? ""

  const platform = detectPlatform(userAgent)

  const links = LANDING[language].downloads.passenger

  const target =
    platform === "ios"
      ? links.ios
      : platform === "gallery"
      ? links.gallery
      : links.android // android + desktop fallback

  redirect(target)
}
