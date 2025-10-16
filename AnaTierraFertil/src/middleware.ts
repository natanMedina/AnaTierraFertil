import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("ATF_ADMIN_TOKEN")?.value;
    // valida el token (p.ej. firma/verifica Vercel JWT secret)
    if (!token || token !== process.env.ADMIN_TOKEN) {
      // redirige a login
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
