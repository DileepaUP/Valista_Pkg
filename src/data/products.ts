import type { Product } from "./types";

// PLACEHOLDER DATA — per docs/CLAUDE.md §9, none of these specs are verified real
// product specifications. Every field must be replaced with real, client-verified
// data before launch. Names are deliberately marked so they can never be mistaken
// for production content. Categorical fields (flute type, wall type, board grade,
// categories) use real corrugated-industry designations — only the numeric spec
// VALUES and MOQ are fabricated placeholders (zeroed / marked) pending real data.

export const products: Product[] = [
  {
    slug: "sample-rsc-box-001",
    name: "[SEED] Sample RSC Shipping Box — Placeholder SKU 001",
    categories: ["Corrugated Boxes", "Export Packaging"],
    industries: ["E-Commerce", "Industrial"],
    boxType: "RSC",
    shortDescription:
      "PLACEHOLDER — not a real product. Regular Slotted Container (FEFCO 0201) for general parcel shipping.",
    description:
      "PLACEHOLDER — not a real product. A standard single-wall RSC used for general-purpose parcel and carton shipping where the box is closed with tape or stitching at top and bottom flaps.",
    applications: [
      "PLACEHOLDER — e.g. e-commerce parcel shipping",
      "PLACEHOLDER — e.g. general warehouse/industrial goods movement",
    ],
    features: [
      "PLACEHOLDER — e.g. tape or stitch closure",
      "PLACEHOLDER — e.g. stackable for palletization",
    ],
    fluteType: "B-Flute",
    wallType: "Single Wall",
    boardGrade: "PLACEHOLDER 150 GSM Kraft Liner / 125 GSM Fluting",
    ectRatingKnM: 0,
    burstStrengthKpa: 0,
    maxStackLoadKg: 0,
    standardSizes: [
      { label: "Small (placeholder)", lengthMm: 300, widthMm: 200, depthMm: 200 },
      { label: "Medium (placeholder)", lengthMm: 400, widthMm: 300, depthMm: 300 },
    ],
    printingOptions: ["PLACEHOLDER — e.g. 1-color flexographic overprint available"],
    moq: "PLACEHOLDER — e.g. 500 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-die-cut-box-001", "sample-heavy-duty-export-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-die-cut-box-001",
    name: "[SEED] Sample Die-Cut Retail Display Box — Placeholder SKU 002",
    categories: ["Die-Cut Boxes", "Printed Boxes", "Retail Packaging", "Food Packaging"],
    industries: ["Food & Beverage", "Promotional"],
    boxType: "Die-Cut",
    shortDescription:
      "PLACEHOLDER — not a real product. Custom die-cut, litho-laminated carton for retail shelf display.",
    description:
      "PLACEHOLDER — not a real product. A custom-shaped, printed retail display carton designed to be shelf-ready with brand graphics litho-laminated onto the board face.",
    applications: [
      "PLACEHOLDER — e.g. retail shelf-ready packaging",
      "PLACEHOLDER — e.g. food-grade product display cartons",
    ],
    features: [
      "PLACEHOLDER — e.g. litho-laminated print for photo-quality graphics",
      "PLACEHOLDER — e.g. custom die-line shapes beyond standard RSC",
    ],
    fluteType: "E-Flute",
    wallType: "Single Wall",
    boardGrade: "PLACEHOLDER 200 GSM White Top Liner",
    ectRatingKnM: 0,
    burstStrengthKpa: 0,
    maxStackLoadKg: 0,
    standardSizes: [{ label: "Standard (placeholder)", lengthMm: 250, widthMm: 150, depthMm: 100 }],
    printingOptions: [
      "PLACEHOLDER — e.g. litho-lamination, up to 4-color process",
      "PLACEHOLDER — e.g. direct flexographic print (lower cost, fewer colors)",
    ],
    moq: "PLACEHOLDER — e.g. 1,000 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-rsc-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-heavy-duty-export-box-001",
    name: "[SEED] Sample Heavy-Duty Export Carton — Placeholder SKU 003",
    categories: ["Heavy Duty Boxes", "Export Packaging", "Corrugated Boxes"],
    industries: ["Industrial", "Electronics"],
    boxType: "RSC",
    shortDescription:
      "PLACEHOLDER — not a real product. Double-wall export carton for machinery parts / palletized freight.",
    description:
      "PLACEHOLDER — not a real product. A double-wall carton built for high stacking strength and rough-handling resistance, suited to export freight and palletized machinery parts.",
    applications: [
      "PLACEHOLDER — e.g. export freight / sea and air cargo",
      "PLACEHOLDER — e.g. machinery and electronics components",
    ],
    features: [
      "PLACEHOLDER — e.g. high BCT stacking strength for long transit/storage",
      "PLACEHOLDER — e.g. reinforced corners available on request",
    ],
    fluteType: "BC-Flute",
    wallType: "Double Wall",
    boardGrade: "PLACEHOLDER 250 GSM Kraft Liner (both faces) / 150 GSM Fluting",
    ectRatingKnM: 0,
    burstStrengthKpa: 0,
    maxStackLoadKg: 0,
    standardSizes: [{ label: "Standard (placeholder)", lengthMm: 600, widthMm: 400, depthMm: 400 }],
    printingOptions: ["PLACEHOLDER — e.g. 1-color handling marks only (fragile, this-way-up)"],
    moq: "PLACEHOLDER — e.g. 250 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-rsc-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-multiwall-sack-001",
    name: "[SEED] Sample Multiwall Paper Sack — Placeholder SKU 004",
    categories: ["Packaging Solutions", "Custom Packaging"],
    industries: ["Agriculture", "Industrial"],
    boxType: "Multiwall Sack",
    shortDescription:
      "PLACEHOLDER — not a real product. Multiwall kraft paper sack (not corrugated board) for bulk agricultural goods.",
    description:
      "PLACEHOLDER — not a real product. A multi-ply kraft paper sack, not fluted board, for bulk-filled agricultural or industrial goods (e.g. grain, fertilizer, cement-adjacent dry goods).",
    applications: [
      "PLACEHOLDER — e.g. bulk agricultural produce (grain, feed)",
      "PLACEHOLDER — e.g. bulk industrial dry goods",
    ],
    features: [
      "PLACEHOLDER — e.g. multi-ply construction for puncture resistance",
      "PLACEHOLDER — e.g. valve or open-mouth fill options",
    ],
    fluteType: "N/A",
    wallType: "N/A",
    boardGrade: "PLACEHOLDER 3-Ply 80 GSM Kraft",
    ectRatingKnM: 0,
    burstStrengthKpa: 0,
    maxStackLoadKg: 0,
    standardSizes: [{ label: "25kg sack (placeholder)", lengthMm: 600, widthMm: 400, depthMm: 100 }],
    printingOptions: ["PLACEHOLDER — e.g. 1-2 color flexographic print"],
    moq: "PLACEHOLDER — e.g. 2,000 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: [],
    isSeedData: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByIndustry(industry: string): Product[] {
  return products.filter((p) => p.industries.includes(industry as Product["industries"][number]));
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.categories.includes(category as Product["categories"][number]));
}
