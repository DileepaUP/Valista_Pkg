import type { Award } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, replace with real awards before launch.

export const awards: Award[] = [
  {
    slug: "sample-award-001",
    name: "[SEED] National Packaging Excellence Award",
    issuingBody: "Sample data — e.g. National Chamber of Exporters",
    year: 2023,
    description: "Sample data — recognized for export carton design and quality consistency.",
    isSeedData: true,
  },
];
