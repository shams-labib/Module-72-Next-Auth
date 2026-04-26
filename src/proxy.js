import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/dashboard", "/private", "/secret"];
const adminRoute = ["/dashboard"];

// This function can be marked `async` if using `await` inside
export async function proxy(req) {
  //   return NextResponse.redirect(new URL("/home", req.url));

  const token = await getToken({ req });
  const reqPath = req.nextUrl.pathname;
  const isAuthenticated = Boolean(token);
  const isUser = token?.role === "user";
  const isAdmin = token?.role === "admin";
  const isPrivate = privateRoutes.some((route) => reqPath.startsWith(route));
  const isAdminRoute = adminRoute.some((route) => reqPath.startsWith(route));

  // logic for private routes only
  if (!isAuthenticated && isPrivate) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", reqPath);
    return NextResponse.redirect(loginUrl);
  }

  // Logic for admin routes only
  if (isAuthenticated && !isAdmin && isAdminRoute) {
    return NextResponse.rewrite(new URL("/forbideen", req.url));
  }

  console.log({ isAuthenticated, isUser, reqPath, isPrivate });

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/secret/:path*"],
};
