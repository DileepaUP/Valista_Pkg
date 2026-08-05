import type { CaseStudy } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, never fabricate a client story or
// outcome metric as if it were real. isVerified stays false (deliberately,
// even with realistic-looking sample numbers below) until a real,
// client-approved story replaces this content — unverified case studies are
// never rendered publicly (see the isVerified gate in the detail/listing
// pages). Metric labels use real corrugated-packaging KPIs (transit damage
// rate, cube utilization, BCT performance, packaging cost per unit).

export const caseStudies: CaseStudy[] = [
  {
    slug: "sample-case-study-001",
    title: "Export Carton Damage Reduction — Sample Case Study",
    industries: ["Industrial", "Electronics"],
    summary: {
      problem: "Export company needed stronger boxes for overseas freight.",
      solution: "Designed double-wall corrugated packaging with a higher ECT rating.",
      result: "Reduced damaged shipments by 30%.",
    },
    challenge:
      "Sample data — a client was seeing a high rate of carton damage in export freight (sea/air transit), driving returns, re-shipment costs, and customer complaints.",
    solution:
      "Sample data — Valista redesigned the carton to double-wall BC-flute board with a higher ECT rating and optimized flute orientation against the expected load path.",
    results: [
      { label: "Transit damage rate", value: "-30", unit: "%" },
      { label: "Box Compression Test (BCT) improvement", value: "+45", unit: "%" },
      { label: "Packaging cost per unit", value: "+12", unit: "%" },
    ],
    images: [],
    isVerified: false,
    isSeedData: true,
  },
  {
    slug: "sample-case-study-002",
    title: "Pallet Cube Utilization — Sample Case Study",
    industries: ["Food & Beverage"],
    summary: {
      problem: "Carton size wasted pallet space, inflating freight cost.",
      solution: "Re-engineered carton dimensions to a pallet-optimized modular size.",
      result: "Cut freight cost per unit shipped by 18%.",
    },
    challenge:
      "Sample data — a client's existing carton size wasted pallet space, inflating freight cost per unit shipped.",
    solution:
      "Sample data — Valista re-engineered carton dimensions to a modular size that tessellates against standard pallet footprints.",
    results: [
      { label: "Cube utilization (pallet efficiency)", value: "+22", unit: "%" },
      { label: "Freight cost per unit shipped", value: "-18", unit: "%" },
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
