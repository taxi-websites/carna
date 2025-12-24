import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["en", "ar"]
const defaultLocale = "en"

function getLocale(request: NextRequest): string {
  // Check for explicit locale in cookie
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Detect from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || ""

  // Simple locale matching for ar and en
  if (acceptLanguage.includes("ar")) {
    return "ar"
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, API routes, and internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes("/images/") ||
    pathname.includes(".") // Skip files with extensions
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Redirect to locale-prefixed pathname
  const locale = getLocale(request)
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = `/${locale}${pathname}`

  const response = NextResponse.redirect(newUrl)

  // Set cookie for future visits
  response.cookies.set("NEXT_LOCALE", locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  })

  return response
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
}
