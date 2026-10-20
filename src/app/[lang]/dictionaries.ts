import "server-only";
import type { Locale } from "@/i18n";
import en from "./dictionaries/en.json";
import he from "./dictionaries/he.json";

/** Each language's copy. Server-only, so neither file ships to the browser. */
const dictionaries = { en, he };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
