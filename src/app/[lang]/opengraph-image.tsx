import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/i18n";
import { getDictionary } from "./dictionaries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Shahar Kibudi · I build what you design";

const fontPackageDirectory = join(process.cwd(), "node_modules/@fontsource");
const cormorant = await readFile(join(fontPackageDirectory, "cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff"));
const cormorantItalic = await readFile(join(fontPackageDirectory, "cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff"));
const frankRuhl = await readFile(join(fontPackageDirectory, "frank-ruhl-libre/files/frank-ruhl-libre-hebrew-500-normal.woff"));

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

/** Reverses Hebrew text for the left-to-right image renderer. */
function getVisualText(text: string, isRightToLeft: boolean): string {
  return isRightToLeft ? [...text].reverse().join("") : text;
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: routeLocale } = await params;
  const locale = hasLocale(routeLocale) ? routeLocale : "en";
  const dictionary = getDictionary(locale);
  const isRightToLeft = locale === "he";
  const displayFont = isRightToLeft ? "Frank Ruhl Libre" : "Cormorant Garamond";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: isRightToLeft ? "row-reverse" : "row",
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
            alignItems: isRightToLeft ? "flex-end" : "flex-start",
            gap: 28,
          }}
        >
          <div style={{ fontFamily: displayFont, fontSize: 92, lineHeight: 1, display: "flex" }}>
            {getVisualText(dictionary.hero.titleLead, isRightToLeft)}
          </div>
          <div
            style={{
              fontFamily: displayFont,
              fontStyle: isRightToLeft ? "normal" : "italic",
              fontSize: 92,
              lineHeight: 1,
              color: "#C9A45C",
              display: "flex",
            }}
          >
            {getVisualText(dictionary.hero.titleAccent, isRightToLeft)}
          </div>
          <div style={{ fontFamily: displayFont, fontSize: 34, color: "#B9B2A3", marginTop: 24, display: "flex" }}>
            {getVisualText(dictionary.header.name, isRightToLeft)}
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
