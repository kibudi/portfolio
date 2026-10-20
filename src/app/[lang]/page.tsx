import { notFound } from "next/navigation";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ScrollMotion } from "@/components/ScrollMotion";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { hasLocale } from "@/i18n";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <>
      <main className="flex-1">
        <Hero copy={dictionary.hero} />
        <ScrollMotion>
          <About copy={dictionary.about} />
          <Services copy={dictionary.services} />
          <Process copy={dictionary.process} />
          <Work copy={dictionary.work} />
          <Contact copy={dictionary.contact} />
        </ScrollMotion>
      </main>
      <Footer name={dictionary.header.name} copy={dictionary.footer} />
    </>
  );
}
