import type { CompanyValue } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9/§10, years in business, production
// capacity, and customer/export figures are unverified and must be confirmed
// with the client before launch. "Industries served" reuses the real INDUSTRIES
// list already used for product/case-study filtering, since that's a genuine
// fact about the business rather than a fabricated number.

export const companyIntro = {
  yearsInBusiness: "PLACEHOLDER",
  productionCapacity: "PLACEHOLDER — e.g. boxes produced per month",
  summary:
    "PLACEHOLDER — a short paragraph introducing Valista Packaging: what the company makes, who it serves, and what sets it apart. Replace with real, client-approved copy.",
};

export const missionStatement =
  "PLACEHOLDER — replace with the company's real mission statement.";

export const visionStatement =
  "PLACEHOLDER — replace with the company's real vision statement.";

export const companyValues: CompanyValue[] = [
  {
    title: "PLACEHOLDER — e.g. Quality without shortcuts",
    description: "PLACEHOLDER — replace with real, specific detail, not generic corporate language.",
  },
  {
    title: "PLACEHOLDER — e.g. Transparency in specs",
    description: "PLACEHOLDER — replace with real, specific detail, not generic corporate language.",
  },
  {
    title: "PLACEHOLDER — e.g. Responsible sourcing",
    description: "PLACEHOLDER — replace with real, specific detail, not generic corporate language.",
  },
];
