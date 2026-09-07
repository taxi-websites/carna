import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect(
    "https://github.com/taxi-websites/carna/releases/latest/download/carna-driver.apk",
    {
      status: 307,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  )
}
