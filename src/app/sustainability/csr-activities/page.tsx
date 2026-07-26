import type { Metadata } from "next";
import { csrActivities } from "@/data/csr-activities";

export const metadata: Metadata = {
  title: "CSR Activities — Valista Packaging",
};

export default function CsrActivitiesPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">CSR Activities</h1>
      <div className="mt-8 space-y-4">
        {csrActivities.map((activity) => (
          <div key={activity.slug} className="rounded-lg border border-sand-deep bg-white p-6">
            <p className="font-mono text-xs text-steel">{activity.year}</p>
            <p className="mt-1 font-display text-lg font-medium text-charcoal">{activity.title}</p>
            <p className="mt-2 text-sm text-charcoal/60">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
