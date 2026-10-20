import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Frank_Ruhl_Libre, Heebo, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { hasLocale, locales } from "@/i18n";
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

/**
 * Public address used to make metadata links absolute. Vercel sets the
 * production domain; locally it falls back to the dev server.
 */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    metadataBase: siteUrl,
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", he: "/he", "x-default": "/" },
    },
    openGraph: { locale: lang === "he" ? "he_IL" : "en_US" },
  };
}

/**
 * Root layout for both languages: sets `lang` and `dir` on <html>, loads the
 * font families as CSS variables, and renders the shared header. Only the
 * English fonts are preloaded; Hebrew ones load on demand with `swap`.
 */
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      dir={lang === "he" ? "rtl" : "ltr"}
      className={`${cormorant.variable} ${inter.variable} ${frankRuhl.variable} ${heebo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header locale={lang} copy={dict.header} />
        {children}
      </body>
    </html>
  );
}
