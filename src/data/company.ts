import type { CompanyValue } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9/§10, these figures are illustrative
// sample values, not verified real company facts. Replace with real,
// client-approved figures before launch. Kept realistic-looking (rather than
// literal "PLACEHOLDER" text) for demo/preview purposes, per explicit
// instruction — but still not verified data.

export const companyIntro = {
  yearsInBusiness: "30+ Years",
  productionCapacity: "5M+ boxes / month",
  summary:
    "Valista Packaging designs and manufactures corrugated boxes and packaging solutions for e-commerce, food & beverage, industrial, and export customers. From standard shipping cartons to custom die-cut retail packaging, every product is built to a published technical spec — not just a photo and a price.",
};

export const missionStatement =
  "To manufacture reliable, technically-specified corrugated packaging that protects our customers' products in transit, backed by transparent data instead of guesswork.";

export const visionStatement =
  "To be the corrugated packaging supplier that engineers and procurement teams trust because we publish real specs, not marketing copy.";

export const companyValues: CompanyValue[] = [
  {
    title: "Quality without shortcuts",
    description:
      "Every production run is tested against ECT, burst strength, and BCT targets before it ships — not just visually inspected.",
  },
  {
    title: "Transparency in specs",
    description:
      "Flute type, board grade, and test ratings are published on every product page, so customers can specify with confidence before they call.",
  },
  {
    title: "Responsible sourcing",
    description:
      "We work toward FSC-traceable fiber sourcing and recycled-content board where it meets the customer's strength requirements.",
  },
];
