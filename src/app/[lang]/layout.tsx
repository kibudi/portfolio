import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Frank_Ruhl_Libre, Heebo, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { hasLocale, locales } from "@/i18n";
import { site } from "@/site";
import { getDictionary } from "./dictionaries";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["500", "600"],
  variable: "--font-frank-ruhl",
  preload: false,
});

const heebo = Heebo({ subsets: ["hebrew", "latin"], variable: "--font-heebo", preload: false });

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang: locale } = await params;
  if (!hasLocale(locale)) return {};
  const dictionary = getDictionary(locale);
  return {
    metadataBase: site.url,
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", he: "/he", "x-default": "/" },
    },
    openGraph: { locale: locale === "he" ? "he_IL" : "en_US" },
  };
}

/** Sets the locale, fonts, and shared header for each language route. */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={locale === "he" ? "rtl" : "ltr"}
      className={`${cormorant.variable} ${inter.variable} ${frankRuhl.variable} ${heebo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header locale={locale} copy={dictionary.header} />
        {children}
      </body>
    </html>
  );
}
