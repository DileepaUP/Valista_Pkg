import type { CSRActivity } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, replace with real CSR activities
// before launch. Never fabricate a community/CSR claim as if it were real.

export const csrActivities: CSRActivity[] = [
  {
    slug: "sample-csr-activity-001",
    title: "School Recycling Awareness Program",
    year: 2025,
    description: "Sample data — a school outreach program on paper recycling and waste sorting, run with local partners.",
    isSeedData: true,
  },
  {
    slug: "sample-csr-activity-002",
    title: "Local Community Tree Planting Drive",
    year: 2024,
    description: "Sample data — an annual tree planting initiative supporting fiber sourcing regions.",
    isSeedData: true,
  },
];
