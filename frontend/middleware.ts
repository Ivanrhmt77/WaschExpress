import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const LOGIN_PAGE = "/login";

    const isProtectedRoute = request.nextUrl.pathname.startsWith("/admin");

    const isLoginPage = request.nextUrl.pathname.includes(LOGIN_PAGE);

    if (isProtectedRoute) {
      if (!user) {
        const redirectUrl = new URL(LOGIN_PAGE, request.url);

        return NextResponse.redirect(redirectUrl);
      }

      return response;
    }

    if (user && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    return response;
  } catch (e) {
    console.error("Middleware Error:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: ["/admin/:path*", "/(auth)/login"],
};
