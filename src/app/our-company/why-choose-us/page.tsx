import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Choose Us — Valista Packaging",
};

// Real differentiators from docs/CLAUDE.md §5 — the strategic positioning
// this whole site is built around, not generic marketing copy. Neither
// competitor analyzed in docs/CLAUDE.md §2 publishes real spec data or offers
// a structured quote tool, which is why these lead the list.
const reasons = [
  {
    title: "We publish real technical specs",
    description:
      "Flute type, board grade, ECT rating, burst strength, and standard sizes on every product page — not just a photo and a title. Most corrugated suppliers make you call to find this out.",
  },
  {
    title: "Structured quote tool, not a contact form",
    description:
      "Tell us industry, box type, dimensions, and quantity in a guided flow — you get a relevant quote faster than a generic \"send us a message\" form.",
  },
  {
    title: "Certifications you can verify",
    description:
      "ISO 9001, FSC Chain of Custody, HACCP, and GMP — with visible issue and renewal dates, not just a logo on the page.",
  },
  {
    title: "Case studies with real, verified results",
    description:
      "When we publish a case study, the results in it are checked against real client-approved figures — we don't publish placeholder numbers as if they were real.",
  },
  {
    title: "Filterable catalog by industry and box type",
    description: "Find the right box style for your industry and use case without scrolling through everything.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Why Choose Us</h1>
      <div className="mt-10 space-y-6">
        {reasons.map((reason) => (
          <div key={reason.title} className="rounded-lg border border-sand-deep bg-white p-6">
            <p className="font-display text-lg font-medium text-charcoal">{reason.title}</p>
            <p className="mt-2 text-sm text-charcoal/60">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
