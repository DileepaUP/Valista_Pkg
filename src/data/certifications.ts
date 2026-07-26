import type { Certification } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9, certification codes/dates below are
// illustrative only. The four certifications listed are the real, industry-
// standard ones relevant to a corrugated packaging manufacturer (per the
// competitor research in docs/CLAUDE.md §2 — Packwell publishes all four).
// Replace with real, verifiable certification records and real PDF/badge
// assets before launch.

export const certifications: Certification[] = [
  {
    name: "[SEED] ISO 9001 — Quality Management System",
    issuingBody: "PLACEHOLDER — not a real issuing certification body",
    certificationCode: "PLACEHOLDER-ISO9001-0000",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2020-01-01",
    renewalDate: "2026-01-01",
    isSeedData: true,
  },
  {
    name: "[SEED] FSC Chain of Custody (FSC-STD-40-004)",
    issuingBody: "PLACEHOLDER — not a real issuing certification body",
    certificationCode: "PLACEHOLDER-FSC-COC-0000",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2021-03-01",
    renewalDate: "2026-03-01",
    isSeedData: true,
  },
  {
    name: "[SEED] HACCP — Food-Grade Packaging Hygiene",
    issuingBody: "PLACEHOLDER — not a real issuing certification body",
    certificationCode: "PLACEHOLDER-HACCP-0000",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2022-06-01",
    renewalDate: "2026-06-01",
    isSeedData: true,
  },
  {
    name: "[SEED] GMP — Good Manufacturing Practice",
    issuingBody: "PLACEHOLDER — not a real issuing certification body",
    certificationCode: "PLACEHOLDER-GMP-0000",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2022-09-01",
    renewalDate: "2026-09-01",
    isSeedData: true,
  },
];

export function getCertificationStatus(
  renewalDate: string
): "Active" | "RenewingSoon" | "Expired" {
  const renewal = new Date(renewalDate);
  const now = new Date();
  const daysUntilRenewal = (renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (daysUntilRenewal < 0) return "Expired";
  if (daysUntilRenewal <= 60) return "RenewingSoon";
  return "Active";
}
