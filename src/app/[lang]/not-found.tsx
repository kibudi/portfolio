import Link from "next/link";
import { lang } from "next/root-params";
import { defaultLocale, hasLocale } from "@/i18n";
import { getDictionary } from "./dictionaries";

/** 404 page inside the site's layout, in the visitor's language. */
export default async function NotFound() {
  const value = await lang();
  const locale = hasLocale(value) ? value : defaultLocale;
  const copy = getDictionary(locale).notFound;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <p className="font-display text-7xl text-gold">404</p>
      <h1 className="font-display text-4xl font-medium md:text-5xl">{copy.title}</h1>
      <p className="text-muted">{copy.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-4 flex h-13 items-center border border-gold px-7 text-sm uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-navy"
      >
        {copy.home}
      </Link>
    </main>
  );
}
