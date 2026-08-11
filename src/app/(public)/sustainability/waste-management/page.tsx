import type { Metadata } from "next";
import { wasteManagementPoints } from "@/data/sustainability-content";
import { getMetricsByCategory } from "@/data/environmental-metrics";

export const metadata: Metadata = {
  title: "Waste Management — Valista Packaging",
};

export default function WasteManagementPage() {
  const metrics = getMetricsByCategory("Waste Management");

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Waste Management</h1>
      <ul className="mt-8 space-y-4">
        {wasteManagementPoints.map((point) => (
          <li key={point} className="rounded-lg border border-sand-deep bg-white p-4 text-sm text-charcoal/70">
            {point}
          </li>
        ))}
      </ul>

      {metrics.length > 0 && (
        <dl className="mt-8 grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-sand-deep bg-white p-4">
              <dt className="text-xs text-charcoal/60">{metric.label}</dt>
              <dd className="mt-1 font-mono text-lg text-green">
                {metric.value} {metric.unit}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
