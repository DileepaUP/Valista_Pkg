import Link from "next/link";
import { Button } from "@/components/ui/Button";

const links = [
  { href: "/our-company", label: "Our Company" },
  { href: "/products", label: "Products & Solutions" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/resources", label: "Resources" },
  { href: "/careers", label: "Careers" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold">
          Valista Packaging
        </Link>

        <nav className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="secondary" className="hidden sm:inline-flex">
            Contact
          </Button>
          <Button href="/get-a-quote" variant="primary">
            Get a Quote
          </Button>
        </div>
      </div>
    </header>
  );
}
