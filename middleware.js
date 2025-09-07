import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import { ADMIN_DASHBOARD } from "./routes/adminPaneRoute";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "./routes/websiteRoute";

export async function middleware(req) {
  try {
    const pathName = req.nextUrl.pathname;
    const hasToken = req.cookies.has("access_token");
    if (!hasToken) {
      if (!pathName.startsWith("/auth")) {
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, req.nextUrl));
      }
      return NextResponse.next();
    }
    const access_token = req.cookies.get("access_token")?.value;
    const { payload } = await jwtVerify(
      access_token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    const role = payload?.role;
    if (pathName.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(
          role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD,
          req.nextUrl
        )
      );
    }
    if (pathName.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, req.nextUrl));
    }
    if (pathName.startsWith("/my-account") && role !== "user") {
      return NextResponse.redirect(new URL(WEBSITE_LOGIN, req.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(WEBSITE_LOGIN, req.nextUrl));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};
