import Link from "next/link";
import { locales, type Locale } from "@/i18n";

const labels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  he: { short: "עב", full: "עברית" },
};

/**
 * EN / עב links to the other language's home page (the site is one page).
 * The current language is outlined in gold. Screen readers hear the short
 * label plus the full language name.
 */
export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex gap-1 text-[13px]">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 min-w-11 items-center justify-center border px-2 transition-colors ${
              active ? "border-gold text-gold" : "border-transparent text-sand hover:text-gold"
            }`}
          >
            {labels[locale].short}
            <span className="sr-only"> {labels[locale].full}</span>
          </Link>
        );
      })}
    </nav>
  );
}
