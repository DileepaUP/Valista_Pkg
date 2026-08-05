import type { JobOpening } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, replace with real open roles before
// launch. isSeedData stays true internally even though these read as
// realistic listings (same convention as products/team-members/certifications).

export const jobOpenings: JobOpening[] = [
  {
    slug: "corrugator-line-operator",
    title: "Corrugator Line Operator",
    department: "Production",
    location: "Colombo, Sri Lanka",
    employmentType: "Full-Time",
    summary: "Operate and monitor the corrugator line to produce single, double, and triple-wall board to spec.",
    responsibilities: [
      "Set up and run the corrugator for different flute/board combinations",
      "Monitor board quality against ECT and moisture targets during production",
      "Perform routine maintenance checks and report equipment issues",
    ],
    requirements: [
      "2+ years experience in corrugated board or paper manufacturing",
      "Familiarity with flute types and board grade specifications",
      "Ability to work rotating shifts",
    ],
    isOpen: true,
    postedAt: "2026-06-10",
    isSeedData: true,
  },
  {
    slug: "quality-assurance-technician",
    title: "Quality Assurance Technician",
    department: "Quality & Compliance",
    location: "Colombo, Sri Lanka",
    employmentType: "Full-Time",
    summary: "Conduct ECT, burst strength, and BCT testing on production samples against customer specs.",
    responsibilities: [
      "Run edge crush, burst, and compression tests on sample boxes",
      "Log and report test results against customer specifications",
      "Support ISO 9001 and FSC Chain of Custody audit documentation",
    ],
    requirements: [
      "Diploma or degree in a relevant technical field",
      "Attention to detail and comfort with lab testing equipment",
      "Prior QA experience in manufacturing preferred",
    ],
    isOpen: true,
    postedAt: "2026-07-01",
    isSeedData: true,
  },
  {
    slug: "export-sales-executive",
    title: "Export Sales Executive",
    department: "Sales",
    location: "Colombo, Sri Lanka (hybrid)",
    employmentType: "Full-Time",
    summary: "Manage and grow relationships with export freight and industrial packaging customers.",
    responsibilities: [
      "Respond to RFQ submissions and prepare customer quotations",
      "Build relationships with export and industrial accounts",
      "Coordinate with production on lead times and custom box specifications",
    ],
    requirements: [
      "2+ years in B2B sales, packaging or manufacturing industry preferred",
      "Comfortable discussing technical specs (flute type, ECT, MOQ) with customers",
      "Strong written and spoken English",
    ],
    isOpen: true,
    postedAt: "2026-07-15",
    isSeedData: true,
  },
];

export function getJobBySlug(slug: string): JobOpening | undefined {
  return jobOpenings.find((j) => j.slug === slug);
}

export function getOpenJobs(): JobOpening[] {
  return jobOpenings.filter((j) => j.isOpen);
}
