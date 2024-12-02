import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth");
  const isAuthenticated = authCookie && authCookie.value === 'true';

  const url = request.nextUrl;

  console.log("User Authenticated:", isAuthenticated);

  // If authenticated, prevent access to /login and /signup
  if (isAuthenticated && (url.pathname === "/login" || url.pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated, restrict access to protected routes (like /about)
  if (!isAuthenticated && (url.pathname === "/about" || url.pathname === "/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Proceed normally
}

export const config = {
  matcher: ["/about", "/", "/login", "/signup"], // Keep all routes to handle them dynamically in the middleware
};
