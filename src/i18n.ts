/** Supported locales and shared locale helpers. */
export const locales = ["en", "he"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Narrows a route segment to a supported locale. */
export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
