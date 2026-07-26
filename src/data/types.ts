export const INDUSTRIES = [
  "Food & Beverage",
  "E-Commerce",
  "Pharma",
  "Agriculture",
  "Textile",
  "Industrial",
  "Electronics",
  "Promotional",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

export const BOX_TYPES = ["RSC", "Die-Cut", "Multiwall Sack", "Display/POS", "Custom"] as const;

export type BoxType = (typeof BOX_TYPES)[number];

// Catalog browsing categories — distinct from BoxType (a physical construction
// style) and Industry (who buys it). A product can sit in multiple categories,
// e.g. a printed die-cut retail carton is both "Printed Boxes" and
// "Retail Packaging". This is the taxonomy used for the /products navigation.
export const PRODUCT_CATEGORIES = [
  "Corrugated Boxes",
  "Printed Boxes",
  "Die-Cut Boxes",
  "Heavy Duty Boxes",
  "Retail Packaging",
  "Food Packaging",
  "Export Packaging",
  "Custom Packaging",
  "Packaging Solutions",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// L x W x D is the standard convention for quoting corrugated box dimensions
// (internal Length x Width x Depth) — "height" is not the industry term.
export interface ProductStandardSize {
  label: string;
  lengthMm: number;
  widthMm: number;
  depthMm: number;
}

export const FLUTE_TYPES = ["A-Flute", "B-Flute", "C-Flute", "E-Flute", "F-Flute", "BC-Flute", "EB-Flute"] as const;
export type FluteType = (typeof FLUTE_TYPES)[number];

export const WALL_TYPES = ["Single Wall", "Double Wall", "Triple Wall"] as const;
export type WallType = (typeof WALL_TYPES)[number];

export interface Product {
  slug: string;
  name: string;
  categories: ProductCategory[];
  industries: Industry[];
  boxType: BoxType;
  shortDescription: string;
  description: string;
  applications: string[];
  features: string[];
  fluteType: FluteType | "N/A"; // multiwall sacks (kraft paper, not fluted board) use "N/A"
  wallType: WallType | "N/A";
  boardGrade: string;
  /** Edge Crush Test rating — industry-standard unit is kN/m, not kPa. */
  ectRatingKnM: number;
  /** Mullen Burst Test rating — correctly expressed in kPa. */
  burstStrengthKpa: number;
  /** Box Compression Test (stacking strength) result. */
  maxStackLoadKg: number;
  standardSizes: ProductStandardSize[];
  printingOptions: string[];
  /** Minimum order quantity, e.g. "500 units". */
  moq: string;
  specSheetUrl: string | null;
  images: string[];
  relatedProductSlugs: string[];
  isSeedData: true;
}

export interface CaseStudyResultMetric {
  label: string;
  value: string;
  unit?: string;
}

// One-line problem/solution/result, for the at-a-glance flow shown at the top
// of a case study (e.g. "Export company needed stronger boxes" → "Designed
// double-wall corrugated packaging" → "Reduced damaged shipments by 30%").
// Kept separate from the full challenge/solution/results prose below it.
export interface CaseStudySummary {
  problem: string;
  solution: string;
  result: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industries: Industry[];
  summary: CaseStudySummary;
  challenge: string;
  solution: string;
  results: CaseStudyResultMetric[];
  clientQuote?: string;
  clientName?: string;
  clientCompany?: string;
  images: string[];
  isVerified: boolean;
  isSeedData: true;
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface ManufacturingStep {
  order: number;
  title: string;
  description: string;
}

export interface FacilityPhoto {
  src: string;
  alt: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photoUrl: string | null;
  bio: string;
  isSeedData: true;
}

export type MilestoneType = "Founding" | "Expansion" | "Certification" | "Award" | "Sustainability";

export interface Milestone {
  year: number;
  title: string;
  description: string;
  type: MilestoneType;
  isSeedData: true;
}

export interface Award {
  slug: string;
  name: string;
  issuingBody: string;
  year: number;
  description: string;
  isSeedData: true;
}

export interface Certification {
  name: string;
  issuingBody: string;
  certificationCode: string;
  badgeImageUrl: string;
  pdfUrl: string;
  issueDate: string;
  renewalDate: string;
  isSeedData: true;
}

export type EnvironmentalMetricCategory = "Waste Management" | "Carbon Reduction" | "Materials";

export interface EnvironmentalMetric {
  label: string;
  value: string;
  unit: string;
  year: number;
  target: string | null;
  category: EnvironmentalMetricCategory;
  isSeedData: true;
}

export interface CSRActivity {
  slug: string;
  title: string;
  year: number;
  description: string;
  isSeedData: true;
}
