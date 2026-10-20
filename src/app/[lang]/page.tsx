import { notFound } from "next/navigation";
import { Hero } from "@/components/Hero";
import { hasLocale } from "@/i18n";
import { getDictionary } from "./dictionaries";

/** The one-page site. Sections after the hero arrive in step 5. */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <main className="flex-1">
      <Hero copy={dict.hero} />
    </main>
  );
}
