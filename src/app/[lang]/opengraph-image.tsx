import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n";
import { getDictionary } from "./dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shahar Kibudi · I build what you design";

const fonts = join(process.cwd(), "node_modules/@fontsource");
const cormorant = await readFile(join(fonts, "cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff"));
const cormorantItalic = await readFile(join(fonts, "cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff"));
const frankRuhl = await readFile(join(fonts, "frank-ruhl-libre/files/frank-ruhl-libre-hebrew-500-normal.woff"));

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/**
 * Lays Hebrew out right to left for the image renderer, which draws text
 * left to right only. The copy lines are all Hebrew, so reversing the
 * characters is enough.
 */
function visual(text: string, rtl: boolean): string {
  return rtl ? [...text].reverse().join("") : text;
}

/**
 * The preview card shown when the link is shared: the hero title, the gold
 * sun and arch, and the name, in the page's language.
 */
export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = hasLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const rtl = locale === "he";
  const display = rtl ? "Frank Ruhl Libre" : "Cormorant Garamond";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: rtl ? "row-reverse" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "#0B1220",
          color: "#F3EEE3",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: rtl ? "flex-end" : "flex-start",
            gap: 28,
          }}
        >
          <div style={{ fontFamily: display, fontSize: 92, lineHeight: 1, display: "flex" }}>
            {visual(dict.hero.titleLead, rtl)}
          </div>
          <div
            style={{
              fontFamily: display,
              fontStyle: rtl ? "normal" : "italic",
              fontSize: 92,
              lineHeight: 1,
              color: "#C9A45C",
              display: "flex",
            }}
          >
            {visual(dict.hero.titleAccent, rtl)}
          </div>
          <div style={{ fontFamily: display, fontSize: 34, color: "#B9B2A3", marginTop: 24, display: "flex" }}>
            {visual(dict.header.name, rtl)}
          </div>
        </div>
        <svg width="380" height="420" viewBox="0 0 560 600">
          <circle cx="280" cy="250" r="215" fill="rgba(201,164,92,0.10)" stroke="#C9A45C" strokeWidth="2" />
          <g fill="none" stroke="#C9A45C" strokeWidth="3">
            <path d="M110 270 A170 170 0 0 1 450 270" />
            <path d="M160 270 A120 120 0 0 1 400 270" />
            <path d="M260 96 L300 96 L292 134 L268 134 Z" />
            <rect x="110" y="274" width="50" height="270" />
            <rect x="400" y="274" width="50" height="270" />
            <rect x="86" y="544" width="388" height="16" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant Garamond", data: cormorant, style: "normal", weight: 500 },
        { name: "Cormorant Garamond", data: cormorantItalic, style: "italic", weight: 500 },
        { name: "Frank Ruhl Libre", data: frankRuhl, style: "normal", weight: 500 },
      ],
    },
  );
}
