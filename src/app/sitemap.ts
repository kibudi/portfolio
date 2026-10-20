import type { MetadataRoute } from "next";
import { site } from "@/site";

/** Both language versions of the one page, each pointing at the other. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/en`, he: `${site.url}/he` };
  return [
    { url: languages.en, alternates: { languages } },
    { url: languages.he, alternates: { languages } },
  ];
}
