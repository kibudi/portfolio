import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ScrollMotion } from "@/components/ScrollMotion";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { hasLocale } from "@/i18n";
import { getDictionary } from "./dictionaries";

/** The one-page site, top to bottom. */
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <main className="flex-1">
        <Hero copy={dict.hero} />
        <ScrollMotion>
          <About copy={dict.about} />
          <Services copy={dict.services} />
          <Work copy={dict.work} />
          <Contact copy={dict.contact} />
        </ScrollMotion>
      </main>
      <Footer name={dict.header.name} copy={dict.footer} />
    </>
  );
}
