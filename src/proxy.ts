import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/i18n";

/** Prefers the first supported language in the browser's language header. */
function preferredLocale(request: NextRequest): Locale {
  const acceptLanguageHeader = request.headers.get("accept-language") ?? "";
  for (const languagePreference of acceptLanguageHeader.split(",")) {
    const languageTag = languagePreference.split(";")[0].trim().toLowerCase();
    if (languageTag.startsWith("he") || languageTag.startsWith("iw")) return "he";
    if (languageTag.startsWith("en")) return "en";
  }
  return defaultLocale;
}

/** Redirects unlocalized paths based on Accept-Language and varies the cache. */
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
