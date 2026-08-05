import type { TeamMember } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, replace with real leadership team
// details (and real headshots) before launch. Names and bios below are
// illustrative sample values, not real people. Role titles reflect how a
// corrugated box manufacturer is actually organized (corrugation/production,
// quality & compliance, key accounts) rather than generic manufacturing titles.

export const teamMembers: TeamMember[] = [
  {
    slug: "sample-leader-001",
    name: "R. Wickramasinghe",
    role: "Managing Director",
    photoUrl: null,
    bio: "Sample bio — oversees overall company strategy, client relationships, and long-term capacity planning.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-002",
    name: "N. Jayawardena",
    role: "Head of Corrugation & Production",
    photoUrl: null,
    bio: "Sample bio — oversees the corrugator line, flexo printing, and die-cutting operations.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-003",
    name: "D. Silva",
    role: "Quality & Compliance Manager (ISO 9001 / FSC CoC / HACCP)",
    photoUrl: null,
    bio: "Sample bio — owns certification renewals and board/ECT testing against customer specs.",
    isSeedData: true,
  },
  {
    slug: "sample-leader-004",
    name: "K. Fernando",
    role: "Key Accounts & Export Sales Director",
    photoUrl: null,
    bio: "Sample bio — manages major accounts and export freight customers across Asia and the Middle East.",
    isSeedData: true,
  },
];
