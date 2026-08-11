import type { Metadata } from "next";
import { ecoFriendlyMaterialsPoints } from "@/data/sustainability-content";

export const metadata: Metadata = {
  title: "Eco-Friendly Materials — Valista Packaging",
};

export default function EcoFriendlyMaterialsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Eco-Friendly Materials</h1>
      <ul className="mt-8 space-y-4">
        {ecoFriendlyMaterialsPoints.map((point) => (
          <li key={point} className="rounded-lg border border-sand-deep bg-white p-4 text-sm text-charcoal/70">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
