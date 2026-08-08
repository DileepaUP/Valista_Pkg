"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/our-company", label: "Our Company" },
  { href: "/products", label: "Products" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="whitespace-nowrap font-display text-lg font-semibold">
          Valista Packaging
        </Link>

        <nav className="hidden gap-5 xl:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-body text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href="tel:+94765887576"
            className="whitespace-nowrap border-l border-white/15 pl-4 font-mono text-sm text-white/80 transition-colors hover:text-white"
          >
            076 588 75 76
          </a>
          <Button href="/contact" variant="secondary" className="whitespace-nowrap">
            Contact
          </Button>
          <Button href="/get-a-quote" variant="primary" className="whitespace-nowrap">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center rounded-md text-white/80 transition-colors hover:text-white xl:hidden"
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 px-6 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-2 py-2.5 font-body text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href="tel:+94765887576"
            className="mt-3 block px-2 py-2 font-mono text-sm text-white/80 transition-colors hover:text-white"
          >
            076 588 75 76
          </a>

          <div className="mt-3 flex gap-3 px-2">
            <Button href="/contact" variant="secondary" className="flex-1 justify-center">
              Contact
            </Button>
            <Button href="/get-a-quote" variant="primary" className="flex-1 justify-center">
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
