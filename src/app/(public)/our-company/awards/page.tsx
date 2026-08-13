import type { Metadata } from "next";
import { getAwards } from "@/lib/queries/awards";

export const metadata: Metadata = {
  title: "Awards & Recognition — Valista Packaging",
};

export default async function AwardsPage() {
  const awards = await getAwards();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Awards &amp; Recognition</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {awards.map((award) => (
          <div key={award.slug} className="rounded-lg border border-sand-deep bg-white p-6">
            <p className="font-mono text-xs text-steel">{award.year}</p>
            <p className="mt-1 font-display text-lg font-medium text-charcoal">{award.name}</p>
            <p className="mt-1 text-sm text-charcoal/60">{award.issuingBody}</p>
            <p className="mt-3 text-sm text-charcoal/60">{award.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
