import Link from "next/link";
import { locales, type Locale } from "@/i18n";

const labels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  he: { short: "עב", full: "עברית" },
};

export function LanguageSwitch({ current, label }: { current: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex items-center text-[13px] uppercase tracking-[0.18em]">
      {locales.map((locale) => {
        const isCurrentLocale = locale === current;
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrentLocale ? "page" : undefined}
            className={`flex h-11 min-w-11 items-center justify-center underline-offset-8 transition-colors ${
              isCurrentLocale ? "text-gold underline decoration-gold" : "text-sand hover:text-gold"
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
