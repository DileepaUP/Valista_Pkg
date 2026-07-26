import type { Metadata } from "next";
import { missionStatement, visionStatement, companyValues } from "@/data/company";

export const metadata: Metadata = {
  title: "Mission & Vision — Valista Packaging",
};

export default function MissionVisionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Mission &amp; Vision</h1>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Mission</h2>
        <p className="mt-2 text-charcoal/70">{missionStatement}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-charcoal">Vision</h2>
        <p className="mt-2 text-charcoal/70">{visionStatement}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-charcoal">Values</h2>
        <ul className="mt-4 space-y-3">
          {companyValues.map((value) => (
            <li key={value.title} className="rounded-lg border border-sand-deep bg-white p-4">
              <p className="font-display text-sm font-medium text-charcoal">{value.title}</p>
              <p className="mt-1 text-sm text-charcoal/60">{value.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
