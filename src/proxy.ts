import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/i18n";

/**
 * Picks Hebrew when the browser lists it (`he`, or the legacy `iw`) before
 * English, otherwise the default locale.
 */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase();
    if (tag.startsWith("he") || tag.startsWith("iw")) return "he";
    if (tag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

/**
 * Sends any path without a language prefix to the visitor's preferred
 * language, so `/` becomes `/en` or `/he`. The answer depends on the
 * Accept-Language header, so the redirect says so in `Vary`.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (hasLocale(pathname.split("/")[1] ?? "")) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(request.nextUrl);
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|.*\\..*).*)"],
};
