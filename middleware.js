import { NextResponse } from "next/server";
export function middleware(request) {
  const authToken = request.cookies.get("token")?.value;
  const publicRoutes = ["/sign-in"];
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);

  if (isPublicRoute && authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!isPublicRoute && !authToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/movies/:path*", "/sign-in", "/"],
};
