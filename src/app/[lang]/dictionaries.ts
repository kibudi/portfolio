import "server-only";
import type { Locale } from "@/i18n";
import en from "./dictionaries/en.json";
import he from "./dictionaries/he.json";

/** Loads locale copy on the server without bundling it into client components. */
const dictionaries = { en, he };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
