import type { CaseStudy } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9, never fabricate a client story or
// outcome metric. isVerified stays false until real, client-approved figures
// replace this content; unverified case studies must not be published.
// Metric labels use real corrugated-packaging KPIs (transit damage rate, cube
// utilization, BCT performance, packaging cost per unit) so the shape of a
// real case study is accurate even though the numbers are not. Gallery images
// are deliberately left empty rather than attaching real factory photos to a
// fabricated narrative — pairing real photography with a placeholder story
// would falsely imply the photos are evidence for it. Add real per-case-study
// photos once the story itself is real and client-approved.

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-case-study-001",
    title: "[SEED] Placeholder Case Study — Export Carton Damage Reduction",
    industries: ["Industrial", "Electronics"],
    summary: {
      problem: "PLACEHOLDER — e.g. export company needed stronger boxes for overseas freight.",
      solution: "PLACEHOLDER — e.g. designed double-wall corrugated packaging with a higher ECT rating.",
      result: "PLACEHOLDER — e.g. reduced damaged shipments by [X]%.",
    },
    challenge:
      "PLACEHOLDER — e.g. a client was seeing a high rate of carton damage in export freight (sea/air transit), driving returns, re-shipment costs, and customer complaints.",
    solution:
      "PLACEHOLDER — e.g. Valista redesigned the carton to double-wall BC-flute board with a higher ECT rating and optimized flute orientation against the expected load path.",
    results: [
      { label: "Transit damage rate", value: "PLACEHOLDER", unit: "%" },
      { label: "Box Compression Test (BCT) improvement", value: "PLACEHOLDER", unit: "%" },
      { label: "Packaging cost per unit", value: "PLACEHOLDER", unit: "%" },
    ],
    images: [],
    isVerified: false,
    isSeedData: true,
  },
  {
    slug: "sample-case-study-002",
    title: "[SEED] Placeholder Case Study — Pallet Cube Utilization",
    industries: ["Food & Beverage"],
    summary: {
      problem: "PLACEHOLDER — e.g. client's carton size wasted pallet space, inflating freight cost.",
      solution: "PLACEHOLDER — e.g. re-engineered carton dimensions to a pallet-optimized modular size.",
      result: "PLACEHOLDER — e.g. cut freight cost per unit shipped by [X]%.",
    },
    challenge:
      "PLACEHOLDER — e.g. a client's existing carton size wasted pallet space, inflating freight cost per unit shipped.",
    solution:
      "PLACEHOLDER — e.g. Valista re-engineered carton dimensions to a modular size that tessellates against standard pallet footprints.",
    results: [
      { label: "Cube utilization (pallet efficiency)", value: "PLACEHOLDER", unit: "%" },
      { label: "Freight cost per unit shipped", value: "PLACEHOLDER", unit: "%" },
    ],
    images: [],
    isVerified: false,
    isSeedData: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getPublishableCaseStudies(): CaseStudy[] {
  return caseStudies.filter((c) => c.isVerified);
}
