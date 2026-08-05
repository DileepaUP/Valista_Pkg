import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { href: "/our-company", label: "About Us" },
      { href: "/our-company/leadership", label: "Leadership Team" },
      { href: "/our-company/certifications", label: "Certifications & Policies" },
      { href: "/our-company/awards", label: "Awards & Recognition" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/products", label: "Browse Products" },
      { href: "/case-studies", label: "Case Studies" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Sustainability",
    links: [
      { href: "/sustainability", label: "Overview" },
      { href: "/sustainability/fsc-certification", label: "FSC Certification" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { href: "/get-a-quote", label: "Get a Quote" },
      { href: "/contact", label: "Contact Us" },
      { href: "/careers", label: "Careers" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-charcoal-deep text-white/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-semibold text-white">{column.title}</h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs">
          <p>&copy; {year} Valista Packaging. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
