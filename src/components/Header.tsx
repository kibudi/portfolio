import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/i18n";
import { ArchMark } from "./ArchMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";

export type NavItem = { href: string; label: string };

export function Header({ locale, copy }: { locale: Locale; copy: Dictionary["header"] }) {
  const navigationItems: NavItem[] = [
    { href: "#about", label: copy.nav.about },
    { href: "#services", label: copy.nav.services },
    { href: "#work", label: copy.nav.work },
    { href: "#contact", label: copy.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/90 backdrop-blur">
      <div className="page-x flex h-18 items-center justify-between md:h-22">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-gold">
          <ArchMark />
          <span className="font-display text-xl font-semibold tracking-wide text-ivory md:text-2xl">
            {copy.name}
          </span>
        </Link>

        <nav aria-label={copy.navLabel} className="hidden md:block">
          <ul className="flex gap-10 text-[13px] uppercase tracking-[0.18em]">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sand transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitch current={locale} label={copy.languageLabel} />
          <MobileMenu
            items={navigationItems}
            navLabel={copy.navLabel}
            openLabel={copy.openMenu}
            closeLabel={copy.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
