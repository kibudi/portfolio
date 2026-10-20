"use client";

import { useEffect, useRef } from "react";
import type { NavItem } from "./Header";

export function MobileMenu({
  items,
  navLabel,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const menuDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 48rem)");
    const closeMenuOnDesktop = () => desktop.matches && menuDialogRef.current?.close();
    desktop.addEventListener("change", closeMenuOnDesktop);
    return () => desktop.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  const openMenu = () => {
    menuDialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };
  const closeMenu = () => menuDialogRef.current?.close();

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-controls="mobile-menu"
        onClick={openMenu}
        className="flex size-11 items-center justify-center border border-gold text-gold"
      >
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path d="M0 1 H20 M0 7 H20 M6 13 H20" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <dialog
        id="mobile-menu"
        ref={menuDialogRef}
        aria-label={navLabel}
        onClose={() => {
          document.body.style.overflow = "";
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-navy p-0 text-ivory backdrop:bg-navy open:flex open:flex-col"
      >
        <div className="flex h-18 items-center justify-end border-b border-line px-5">
          <button
            type="button"
            aria-label={closeLabel}
            onClick={closeMenu}
            className="flex size-11 items-center justify-center border border-gold text-gold"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M1 1 L15 15 M15 1 L1 15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <nav aria-label={navLabel} className="flex flex-1 flex-col justify-center px-8">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="border-b border-line py-5 font-display text-4xl transition-colors hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
