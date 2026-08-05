import type { Milestone } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9/§10, the real founding year and company
// history are still open questions to confirm with the client; the timeline
// below uses illustrative sample values, not verified events. Event
// descriptions reflect real corrugated-industry milestones (corrugator line
// installation, flexo printing capability, certifications) rather than
// generic manufacturing language.

export const milestones: Milestone[] = [
  {
    year: 1994,
    title: "Company Founded",
    description: "Sample data — company founded with a single-facer corrugator line.",
    type: "Founding",
    isSeedData: true,
  },
  {
    year: 2005,
    title: "Corrugator Line Expansion",
    description:
      "Sample data — installed a double-wall (BC-flute) capable corrugator to serve heavy-duty export cartons.",
    type: "Expansion",
    isSeedData: true,
  },
  {
    year: 2012,
    title: "Flexographic Printing Added",
    description:
      "Sample data — added in-line flexographic printing for pre-print retail and food-grade cartons.",
    type: "Expansion",
    isSeedData: true,
  },
  {
    year: 2015,
    title: "ISO 9001 Certification",
    description: "Sample data — achieved ISO 9001 Quality Management System certification.",
    type: "Certification",
    isSeedData: true,
  },
  {
    year: 2019,
    title: "FSC Chain of Custody Certification",
    description:
      "Sample data — achieved FSC Chain of Custody certification for sustainably sourced kraft liner.",
    type: "Sustainability",
    isSeedData: true,
  },
];

export function getMilestonesByType(type: string | undefined): Milestone[] {
  if (!type) return milestones;
  return milestones.filter((m) => m.type === type);
}
