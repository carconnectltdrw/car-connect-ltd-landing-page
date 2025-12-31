import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value
  const path = req.nextUrl.pathname

  const isLogin = path.startsWith("/login")
  const isDashboard = path.startsWith("/dashboard")

  // NOT LOGGED IN → redirect to login
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // LOGGED IN → block login page
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/dashboard/:path*"
  ],
}
