import type { Metadata } from "next";
import { certifications, getCertificationStatus } from "@/data/certifications";

export const metadata: Metadata = {
  title: "Certifications & Policies — Valista Packaging",
};

const statusClasses: Record<string, string> = {
  Active: "bg-green/10 text-green",
  RenewingSoon: "bg-terracotta/10 text-terracotta",
  Expired: "bg-charcoal/10 text-charcoal/60",
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">
        Certifications &amp; Policies
      </h1>
      <p className="mt-2 text-charcoal/60">
        Status is calculated from each certification&apos;s renewal date, not hardcoded.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {certifications.map((cert) => {
          const status = getCertificationStatus(cert.renewalDate);
          return (
            <div key={cert.certificationCode} className="rounded-lg border border-sand-deep bg-white p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-medium text-charcoal">{cert.name}</p>
                  <p className="mt-1 font-mono text-xs text-charcoal/60">{cert.certificationCode}</p>
                </div>
                <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${statusClasses[status]}`}>
                  {status}
                </span>
              </div>
              <dl className="mt-4 space-y-1 font-mono text-xs text-charcoal/60">
                <div className="flex justify-between">
                  <dt>Issued</dt>
                  <dd>{cert.issueDate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Renewal</dt>
                  <dd>{cert.renewalDate}</dd>
                </div>
              </dl>
              {cert.pdfUrl && (
                <a href={cert.pdfUrl} className="mt-4 inline-block text-sm text-steel hover:underline">
                  Download PDF
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
