"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/team-members", label: "Team Members" },
  { href: "/admin/milestones", label: "Milestones" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/rfq", label: "RFQ Inbox" },
  { href: "/admin/contacts", label: "Messages" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-charcoal-deep text-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="font-display text-lg font-semibold">Valista Admin</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-kraft text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={logoutAction} className="border-t border-white/10 px-3 py-4">
        <button
          type="submit"
          className="block w-full rounded-md px-3 py-2 text-left text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
        >
          Logout
        </button>
      </form>
    </aside>
  );
}
