import type { Product } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, these are illustrative sample products
// and specs, not verified real SKUs. Replace with real, client-verified data
// before launch. Names are deliberately marked so they can never be
// mistaken for production content. Spec numbers are realistic-looking sample
// values for demo purposes (per explicit instruction) — not lab-tested figures.

export const products: Product[] = [
  {
    slug: "sample-rsc-box-001",
    name: "Standard RSC Shipping Box — Sample SKU 001",
    categories: ["Corrugated Boxes", "Export Packaging"],
    industries: ["E-Commerce", "Industrial"],
    boxType: "RSC",
    shortDescription: "Regular Slotted Container (FEFCO 0201) for general parcel shipping.",
    description:
      "A standard single-wall RSC used for general-purpose parcel and carton shipping, closed with tape or stitching at the top and bottom flaps. Our most-ordered box style for e-commerce fulfillment.",
    applications: ["E-commerce parcel shipping", "General warehouse and industrial goods movement"],
    features: ["Tape or stitch closure", "Stackable for palletization", "Available pre-printed or plain kraft"],
    fluteType: "B-Flute",
    wallType: "Single Wall",
    boardGrade: "150 GSM Kraft Liner / 125 GSM Fluting Medium",
    ectRatingKnM: 6.2,
    burstStrengthKpa: 800,
    maxStackLoadKg: 200,
    standardSizes: [
      { label: "Small", lengthMm: 300, widthMm: 200, depthMm: 200 },
      { label: "Medium", lengthMm: 400, widthMm: 300, depthMm: 300 },
    ],
    printingOptions: ["1-color flexographic overprint", "Plain kraft (unprinted)"],
    moq: "500 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-die-cut-box-001", "sample-heavy-duty-export-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-die-cut-box-001",
    name: "Die-Cut Retail Display Box — Sample SKU 002",
    categories: ["Die-Cut Boxes", "Printed Boxes", "Retail Packaging", "Food Packaging"],
    industries: ["Food & Beverage", "Promotional"],
    boxType: "Die-Cut",
    shortDescription: "Custom die-cut, litho-laminated carton for retail shelf display.",
    description:
      "A custom-shaped, printed retail display carton designed to be shelf-ready with brand graphics litho-laminated onto the board face. Commonly used for food and promotional product launches.",
    applications: ["Retail shelf-ready packaging", "Food-grade product display cartons"],
    features: ["Litho-laminated print for photo-quality graphics", "Custom die-line shapes beyond standard RSC"],
    fluteType: "E-Flute",
    wallType: "Single Wall",
    boardGrade: "200 GSM White Top Liner",
    ectRatingKnM: 4.1,
    burstStrengthKpa: 600,
    maxStackLoadKg: 100,
    standardSizes: [{ label: "Standard", lengthMm: 250, widthMm: 150, depthMm: 100 }],
    printingOptions: ["Litho-lamination, up to 4-color process", "Direct flexographic print (lower cost, fewer colors)"],
    moq: "1,000 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-rsc-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-heavy-duty-export-box-001",
    name: "Heavy-Duty Export Carton — Sample SKU 003",
    categories: ["Heavy Duty Boxes", "Export Packaging", "Corrugated Boxes"],
    industries: ["Industrial", "Electronics"],
    boxType: "RSC",
    shortDescription: "Double-wall export carton for machinery parts / palletized freight.",
    description:
      "A double-wall carton built for high stacking strength and rough-handling resistance, suited to export freight and palletized machinery or electronics components.",
    applications: ["Export freight (sea and air cargo)", "Machinery and electronics components"],
    features: ["High BCT stacking strength for long transit and storage", "Reinforced corners available on request"],
    fluteType: "BC-Flute",
    wallType: "Double Wall",
    boardGrade: "250 GSM Kraft Liner (both faces) / 150 GSM Fluting Medium",
    ectRatingKnM: 10.5,
    burstStrengthKpa: 1400,
    maxStackLoadKg: 450,
    standardSizes: [{ label: "Standard", lengthMm: 600, widthMm: 400, depthMm: 400 }],
    printingOptions: ["1-color handling marks (fragile, this-way-up)"],
    moq: "250 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-rsc-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-multiwall-sack-001",
    name: "Multiwall Paper Sack — Sample SKU 004",
    categories: ["Packaging Solutions", "Custom Packaging"],
    industries: ["Agriculture", "Industrial"],
    boxType: "Multiwall Sack",
    shortDescription: "Multiwall kraft paper sack (not corrugated board) for bulk agricultural goods.",
    description:
      "A multi-ply kraft paper sack, not fluted board, for bulk-filled agricultural or industrial dry goods such as grain, animal feed, or fertilizer.",
    applications: ["Bulk agricultural produce (grain, feed)", "Bulk industrial dry goods"],
    features: ["3-ply construction for puncture resistance", "Valve or open-mouth fill options"],
    fluteType: "N/A",
    wallType: "N/A",
    boardGrade: "3-Ply 80 GSM Kraft",
    ectRatingKnM: 0,
    burstStrengthKpa: 350,
    maxStackLoadKg: 1000,
    standardSizes: [{ label: "25kg Sack", lengthMm: 600, widthMm: 400, depthMm: 100 }],
    printingOptions: ["1–2 color flexographic print"],
    moq: "2,000 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: [],
    isSeedData: true,
  },
  {
    slug: "sample-corrugated-partition-001",
    name: "Corrugated Bottle Partition — Sample SKU 005",
    categories: ["Custom Packaging", "Packaging Solutions"],
    industries: ["Food & Beverage", "Personal Care & Beauty"],
    boxType: "Partition",
    shortDescription: "Slotted corrugated partition insert for glass bottles and jars.",
    description:
      "A slotted grid insert that divides an outer carton into individual cells, keeping glass bottles or jars separated to prevent contact damage during transit.",
    applications: ["Glass bottle shipping (beverage, sauces)", "Cosmetic and personal care jars/bottles"],
    features: ["Slotted grid construction, no glue required", "Sized to fit standard bottle/jar diameters"],
    fluteType: "B-Flute",
    wallType: "Single Wall",
    boardGrade: "125 GSM Kraft Liner / 125 GSM Fluting Medium",
    ectRatingKnM: 5.0,
    burstStrengthKpa: 650,
    maxStackLoadKg: 150,
    standardSizes: [{ label: "4x4 cell grid", lengthMm: 300, widthMm: 300, depthMm: 200 }],
    printingOptions: ["Plain kraft (unprinted)"],
    moq: "1,000 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-rsc-box-001"],
    isSeedData: true,
  },
  {
    slug: "sample-corrugated-tray-001",
    name: "Corrugated Retail Tray — Sample SKU 006",
    categories: ["Retail Packaging", "Printed Boxes", "Food Packaging"],
    industries: ["Food & Beverage", "Personal Care & Beauty", "Promotional"],
    boxType: "Tray",
    shortDescription: "Open-top display tray for retail shelf and point-of-sale presentation.",
    description:
      "An open-top corrugated tray used for shelf-ready product display — commonly shipped flat-packed and erected in-store, showing multiple retail units at once.",
    applications: ["Point-of-sale retail display", "Shelf-ready product bundling"],
    features: ["Flat-packed for efficient freight, erects in seconds", "Printable outer face for shelf branding"],
    fluteType: "E-Flute",
    wallType: "Single Wall",
    boardGrade: "200 GSM White Top Liner",
    ectRatingKnM: 3.8,
    burstStrengthKpa: 550,
    maxStackLoadKg: 80,
    standardSizes: [{ label: "Standard", lengthMm: 400, widthMm: 300, depthMm: 120 }],
    printingOptions: ["Litho-lamination, up to 4-color process", "Direct flexographic print"],
    moq: "500 units",
    specSheetUrl: null,
    images: [],
    relatedProductSlugs: ["sample-die-cut-box-001"],
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
