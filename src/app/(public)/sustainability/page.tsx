import Link from "next/link";
import type { Metadata } from "next";
import { getFscCertification, getCertificationStatus } from "@/lib/queries/certifications";
import { environmentalMetrics } from "@/data/environmental-metrics";

export const metadata: Metadata = {
  title: "Sustainability — Valista Packaging",
};

const subpages = [
  { href: "/sustainability/eco-friendly-materials", label: "Eco-Friendly Materials" },
  { href: "/sustainability/recyclable-packaging", label: "Recyclable Packaging" },
  { href: "/sustainability/waste-management", label: "Waste Management" },
  { href: "/sustainability/carbon-reduction", label: "Carbon Reduction" },
  { href: "/sustainability/fsc-certification", label: "FSC Certification" },
  { href: "/sustainability/environmental-policy", label: "Environmental Policy" },
  { href: "/sustainability/csr-activities", label: "CSR Activities" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-green/10 text-green",
  RenewingSoon: "bg-terracotta/10 text-terracotta",
  Expired: "bg-charcoal/10 text-charcoal/60",
};

export default async function SustainabilityPage() {
  const fsc = await getFscCertification();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Sustainability</h1>
      <p className="mt-2 text-charcoal/60">
        Corrugated board is inherently one of the most recyclable packaging materials —
        here&apos;s how that plays out in our sourcing, waste handling, and certifications.
      </p>

      {fsc && (
        <div className="mt-8 flex items-center justify-between rounded-lg border border-sand-deep bg-white p-4">
          <div>
            <p className="font-display text-sm font-medium text-charcoal">{fsc.name}</p>
            <p className="font-mono text-xs text-charcoal/50">{fsc.certificationCode}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusClasses[getCertificationStatus(fsc.renewalDate)]}`}
          >
            {getCertificationStatus(fsc.renewalDate)}
          </span>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Environmental metrics</h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {environmentalMetrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-sand-deep bg-white p-4">
              <dt className="text-xs text-charcoal/60">{metric.label}</dt>
              <dd className="mt-1 font-mono text-lg text-green">
                {metric.value} {metric.unit}
              </dd>
              {metric.target && (
                <p className="mt-1 text-xs text-charcoal/40">Target: {metric.target}{metric.unit}</p>
              )}
            </div>
          ))}
        </dl>
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
