// middleware.js
import { NextResponse } from "next/server";
import { isLoggedIn } from "./src/app/utils/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken");

  const protectedRoutes = ["/tasks", "/home"];
  const unProtectedRoutes = ["/login", "/signup"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isUnprotectedRoute = unProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const checkLogin = await isLoggedIn(refreshToken?.value);
  
  if (isUnprotectedRoute && checkLogin) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  
  // Redirect based on login status
  if (isProtectedRoute && !checkLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(pathname === "/" && !checkLogin){
    return NextResponse.redirect(new URL("/login", request.url));
  }else if(pathname === "/" && checkLogin){
    return NextResponse.redirect(new URL("/home", request.url));
  }
  // Create the response and set an `isAuthenticated` cookie
  const response = NextResponse.next();
  response.cookies.set("isAuthenticated", checkLogin ? "true" : "false", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}

export const config = {
  matcher: "/:path*",
};
