import type { TeamMember } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9, replace with real leadership team
// details (and real headshots) before launch. Role titles reflect how a
// corrugated box manufacturer is actually organized (corrugation/production,
// quality & compliance, key accounts) rather than generic manufacturing titles.

export const teamMembers: TeamMember[] = [
  {
    slug: "sample-leader-001",
    name: "[SEED] Placeholder Name",
    role: "PLACEHOLDER — e.g. Managing Director",
    photoUrl: null,
    bio: "PLACEHOLDER — not a real bio.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-002",
    name: "[SEED] Placeholder Name 2",
    role: "PLACEHOLDER — e.g. Head of Corrugation & Production",
    photoUrl: null,
    bio: "PLACEHOLDER — not a real bio. Oversees the corrugator line, flexo printing, and die-cutting operations.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-003",
    name: "[SEED] Placeholder Name 3",
    role: "PLACEHOLDER — e.g. Quality & Compliance Manager (ISO 9001 / FSC CoC / HACCP)",
    photoUrl: null,
    bio: "PLACEHOLDER — not a real bio. Owns certification renewals and board/ECT testing.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-004",
    name: "[SEED] Placeholder Name 4",
    role: "PLACEHOLDER — e.g. Key Accounts & Export Sales Director",
    photoUrl: null,
    bio: "PLACEHOLDER — not a real bio.",
    isSeedData: true,
  },
];
