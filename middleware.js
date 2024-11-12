import { NextResponse } from 'next/server';
import { isLoggedIn } from './src/app/utils/auth';
import { pageRoutes } from '@/app/constants/endpoints';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get('refreshToken');

  const protectedRoutes = [pageRoutes.TASK_PAGE, pageRoutes.HOME_PAGE];
  const unProtectedRoutes = [pageRoutes.LOGIN_PAGE, pageRoutes.SIGNUP_PAGE];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isUnprotectedRoute = unProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const checkLogin = await isLoggedIn(refreshToken?.value);

  const response = NextResponse.next();

  // If login check fails, delete refreshToken cookie
  if (!checkLogin) {
    response.cookies.delete('refreshToken');
  }

  if (isUnprotectedRoute && checkLogin) {
    return NextResponse.redirect(new URL(pageRoutes.HOME_PAGE, request.url));
  }

  // Redirect based on login status
  if (isProtectedRoute && !checkLogin) {
    return NextResponse.redirect(new URL(pageRoutes.LOGIN_PAGE, request.url));
  }

  if (pathname === '/' && !checkLogin) {
    return NextResponse.redirect(new URL(pageRoutes.LOGIN_PAGE, request.url));
  } else if (pathname === '/' && checkLogin) {
    return NextResponse.redirect(new URL(pageRoutes.HOME_PAGE, request.url));
  }

  if (pathname === pageRoutes.TASK_PAGE) {
    return NextResponse.redirect(
      new URL(pageRoutes.TASK_LIST_PAGE, request.url)
    );
  }

  return response;
}

export const config = {
  matcher: '/:path*',
};
