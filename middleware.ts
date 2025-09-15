import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

// Only run on the root path; avoids touching /api, /_next, assets, etc.
export const config = {
  matcher: ["/"],
};
