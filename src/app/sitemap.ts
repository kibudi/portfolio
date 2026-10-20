import type { MetadataRoute } from "next";
import { site } from "@/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${site.url}/en`, he: `${site.url}/he` };
  return [
    { url: languages.en, alternates: { languages } },
    { url: languages.he, alternates: { languages } },
  ];
}
