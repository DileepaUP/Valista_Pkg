import type { Metadata } from "next";
import { recyclablePackagingPoints } from "@/data/sustainability-content";

export const metadata: Metadata = {
  title: "Recyclable Packaging — Valista Packaging",
};

export default function RecyclablePackagingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Recyclable Packaging</h1>
      <ul className="mt-8 space-y-4">
        {recyclablePackagingPoints.map((point) => (
          <li key={point} className="rounded-lg border border-sand-deep bg-white p-4 text-sm text-charcoal/70">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
