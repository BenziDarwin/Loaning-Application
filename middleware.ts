import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get the access token from cookies (since sessionStorage is not accessible on the server)
  const accessToken = req.cookies.get("access-token")?.value;

  // If no token, redirect to the login page
  if (!accessToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*"], // Protect these routes
};
