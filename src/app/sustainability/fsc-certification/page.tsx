import type { Metadata } from "next";
import { certifications, getCertificationStatus } from "@/data/certifications";
import { circularEconomyInitiatives } from "@/data/sustainability-content";

export const metadata: Metadata = {
  title: "FSC Certification — Valista Packaging",
};

const statusClasses: Record<string, string> = {
  Active: "bg-green/10 text-green",
  RenewingSoon: "bg-terracotta/10 text-terracotta",
  Expired: "bg-charcoal/10 text-charcoal/60",
};

export default function FscCertificationPage() {
  const fsc = certifications.find((c) => c.certificationCode.includes("FSC"));

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">FSC Certification</h1>
      <p className="mt-2 text-charcoal/60">
        Forest Stewardship Council Chain of Custody — traceability for sustainably sourced fiber.
      </p>

      {fsc && (
        <div className="mt-8 rounded-lg border border-sand-deep bg-white p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg font-medium text-charcoal">{fsc.name}</p>
              <p className="mt-1 font-mono text-xs text-charcoal/60">{fsc.certificationCode}</p>
            </div>
            <span
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusClasses[getCertificationStatus(fsc.renewalDate)]}`}
            >
              {getCertificationStatus(fsc.renewalDate)}
            </span>
          </div>
          <dl className="mt-4 space-y-1 font-mono text-xs text-charcoal/60">
            <div className="flex justify-between">
              <dt>Issued</dt>
              <dd>{fsc.issueDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Renewal</dt>
              <dd>{fsc.renewalDate}</dd>
            </div>
          </dl>
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Circular economy initiatives</h2>
        <ul className="mt-4 space-y-3">
          {circularEconomyInitiatives.map((initiative) => (
            <li key={initiative} className="rounded-lg border border-sand-deep bg-white p-4 text-sm text-charcoal/70">
              {initiative}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
