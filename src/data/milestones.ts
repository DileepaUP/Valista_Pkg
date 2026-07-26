import type { Milestone } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9/§10, the real founding year and
// company history are still open questions to confirm with the client. Event
// descriptions below reflect real corrugated-industry milestones (corrugator
// line installation, flexo printing capability, certifications) rather than
// generic manufacturing language.

export const milestones: Milestone[] = [
  {
    year: 1994,
    title: "[SEED] Placeholder Founding Year",
    description: "PLACEHOLDER — e.g. company founded with a single-facer corrugator line.",
    type: "Founding",
    isSeedData: true,
  },
  {
    year: 2005,
    title: "[SEED] Placeholder Corrugator Line Expansion",
    description:
      "PLACEHOLDER — e.g. installed a double-wall (BC-flute) capable corrugator to serve heavy-duty export cartons.",
    type: "Expansion",
    isSeedData: true,
  },
  {
    year: 2012,
    title: "[SEED] Placeholder Flexographic Printing Added",
    description:
      "PLACEHOLDER — e.g. added in-line flexographic printing for pre-print retail and food-grade cartons.",
    type: "Expansion",
    isSeedData: true,
  },
  {
    year: 2015,
    title: "[SEED] Placeholder ISO 9001 Certification",
    description: "PLACEHOLDER — replace with the real ISO 9001 certification milestone.",
    type: "Certification",
    isSeedData: true,
  },
  {
    year: 2019,
    title: "[SEED] Placeholder FSC Chain of Custody Certification",
    description:
      "PLACEHOLDER — e.g. achieved FSC Chain of Custody certification for sustainably sourced kraft liner.",
    type: "Sustainability",
    isSeedData: true,
  },
];

export function getMilestonesByType(type: string | undefined): Milestone[] {
  if (!type) return milestones;
  return milestones.filter((m) => m.type === type);
}
