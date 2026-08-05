import type { Certification } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, certification codes/dates below are
// illustrative sample values, not verified real certificates. The four
// certifications listed are the real, industry-standard ones relevant to a
// corrugated packaging manufacturer (per the competitor research in
// docs/CLAUDE.md §2 — Packwell publishes all four). Replace with real,
// verifiable certification records and real PDF/badge assets before launch.

export const certifications: Certification[] = [
  {
    name: "ISO 9001:2015 — Quality Management System",
    issuingBody: "SGS Lanka (Pvt) Ltd",
    certificationCode: "SAMPLE-QMS-LK-2024-0417",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2024-04-17",
    renewalDate: "2027-04-17",
    isSeedData: true,
  },
  {
    name: "FSC Chain of Custody (FSC-STD-40-004)",
    issuingBody: "Forest Stewardship Council",
    certificationCode: "SAMPLE-FSC-C0-2023-1108",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2023-11-08",
    renewalDate: "2028-11-08",
    isSeedData: true,
  },
  {
    name: "HACCP — Food-Grade Packaging Hygiene",
    issuingBody: "Bureau Veritas Lanka",
    certificationCode: "SAMPLE-HACCP-LK-2023-0901",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2023-09-01",
    renewalDate: "2026-09-01",
    isSeedData: true,
  },
  {
    name: "GMP — Good Manufacturing Practice",
    issuingBody: "SGS Lanka (Pvt) Ltd",
    certificationCode: "SAMPLE-GMP-LK-2024-0915",
    badgeImageUrl: "",
    pdfUrl: "",
    issueDate: "2024-09-15",
    renewalDate: "2027-09-15",
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
