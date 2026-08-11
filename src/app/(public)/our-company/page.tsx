import Link from "next/link";
import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/types";
import { companyIntro, companyValues } from "@/data/company";

export const metadata: Metadata = {
  title: "Our Company — Valista Packaging",
};

const subpages = [
  { href: "/our-company/history", label: "Our History" },
  { href: "/our-company/mission-vision", label: "Mission & Vision" },
  { href: "/our-company/leadership", label: "Leadership Team" },
  { href: "/our-company/why-choose-us", label: "Why Choose Us" },
  { href: "/our-company/manufacturing-process", label: "Manufacturing Process" },
  { href: "/our-company/facilities", label: "Factory / Facilities" },
  { href: "/our-company/certifications", label: "Certifications & Policies" },
  { href: "/our-company/awards", label: "Awards & Recognition" },
];

export default function OurCompanyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">About Us</h1>
      <p className="mt-4 text-charcoal/70">{companyIntro.summary}</p>

      <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs text-charcoal/60">Years in business</dt>
          <dd className="mt-1 font-mono text-lg text-charcoal">{companyIntro.yearsInBusiness}</dd>
        </div>
        <div>
          <dt className="text-xs text-charcoal/60">Production capacity</dt>
          <dd className="mt-1 font-mono text-lg text-charcoal">{companyIntro.productionCapacity}</dd>
        </div>
        <div>
          <dt className="text-xs text-charcoal/60">Industries served</dt>
          <dd className="mt-1 font-mono text-sm text-charcoal">{INDUSTRIES.length} sectors</dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Industries we serve</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {INDUSTRIES.map((industry) => (
            <span key={industry} className="rounded-full bg-sand-deep px-3 py-1 text-xs text-charcoal">
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Our values</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {companyValues.map((value) => (
            <div key={value.title} className="rounded-lg border border-sand-deep bg-white p-4">
              <p className="font-display text-sm font-medium text-charcoal">{value.title}</p>
              <p className="mt-2 text-sm text-charcoal/60">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-sand-deep pt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Learn more</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {subpages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-lg border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal transition-shadow hover:shadow-md"
            >
              {page.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
