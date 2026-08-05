import type { Article } from "./types";

// Genuine educational/industry content — not company-specific claims, so
// these aren't marked as sample/seed data the way product specs or company
// facts are. Standard long-term SEO content for a corrugated packaging site
// (docs/CLAUDE.md §3: "Resources — packaging guides, sustainability, industry
// news"). Author/publish dates are illustrative until real bylines exist.

export const articles: Article[] = [
  {
    slug: "how-to-choose-flute-type",
    title: "How to Choose the Right Flute Type for Your Shipping Boxes",
    category: "Packaging Guides",
    excerpt:
      "A-flute, B-flute, C-flute, E-flute — the flute profile you pick affects cushioning, stacking strength, and print quality. Here's how to choose.",
    body: [
      "Flute type refers to the wave-shaped inner layer of corrugated board, and it's one of the first decisions in specifying a box — it directly affects cushioning, crush resistance, and how well the surface takes print.",
      "B-flute is the most common choice for general shipping cartons: it offers good crush resistance and a flat surface for printing, at a lower material cost than A-flute.",
      "A-flute has the tallest flute profile of the common types, giving the best cushioning and stacking strength, but it takes up more space per sheet and can be less economical for high-volume runs.",
      "E-flute is thinner and denser, popular for retail packaging and die-cut boxes where a smooth, high-quality printed surface matters more than raw stacking strength.",
      "For heavy-duty or export applications, double-wall combinations like BC-flute (B-flute plus C-flute) combine cushioning and strength, at the cost of more material and box weight.",
      "The right choice usually comes down to three questions: how heavy is the product, how will it be handled in transit, and how important is print quality on the outer surface. A packaging supplier should be able to recommend a flute type against your specific product weight and handling conditions — not just sell you their default.",
    ],
    coverImageUrl: null,
    author: "Valista Packaging Team",
    publishedAt: "2026-03-04",
  },
  {
    slug: "ect-vs-burst-strength",
    title: "ECT vs. Burst Strength: What Do These Numbers Actually Mean?",
    category: "Packaging Guides",
    excerpt:
      "Two of the most common box specs — Edge Crush Test and Mullen Burst — measure different things. Confusing them can lead to the wrong box for the job.",
    body: [
      "Edge Crush Test (ECT) measures how much force a strip of corrugated board can withstand before crushing when compressed on its edge — this is what determines how much weight can be safely stacked on top of a box (its Box Compression Test, or BCT, performance is derived largely from ECT).",
      "Mullen Burst Test measures how much pressure it takes to puncture or rupture the board from a flat force applied to its face — this is more about resistance to punctures and rough handling than stacking strength.",
      "In practice, ECT is the more relevant spec for palletized, stacked shipping (e.g. warehouse storage, freight), while burst strength matters more for boxes that get dropped, thrown, or handled roughly by hand.",
      "A box with a high burst rating but a low ECT rating can still collapse under a stacked pallet load — so if your primary concern is warehouse or transit stacking, ask your supplier for the ECT rating specifically, not just a general 'strength' claim.",
    ],
    coverImageUrl: null,
    author: "Valista Packaging Team",
    publishedAt: "2026-04-18",
  },
  {
    slug: "fsc-certification-explained",
    title: "FSC Certification: What It Means for Your Packaging Supply Chain",
    category: "Sustainability",
    excerpt:
      "FSC Chain of Custody certification is increasingly requested by retailers and export customers. Here's what it actually certifies.",
    body: [
      "The Forest Stewardship Council (FSC) is an international nonprofit that certifies responsibly managed forestry. FSC Chain of Custody (CoC) certification, specifically, tracks FSC-certified fiber through every stage of production — from the paper mill to the box on a pallet — so a finished product can carry an FSC label with a verifiable paper trail.",
      "For a corrugated box manufacturer, holding FSC CoC certification means every batch of FSC-sourced board is tracked separately from non-certified board, with documentation available for audit.",
      "This matters increasingly to retail and export customers, some of whom now require FSC-certified packaging as a condition of doing business — particularly in the EU and among large e-commerce and food & beverage brands with public sustainability commitments.",
      "If FSC certification matters for your supply chain, ask your packaging supplier for their actual FSC certificate number — it can be verified directly against the FSC public database, not just taken on trust from a logo on a website.",
    ],
    coverImageUrl: null,
    author: "Valista Packaging Team",
    publishedAt: "2026-05-22",
  },
  {
    slug: "reducing-transit-damage-with-box-design",
    title: "Reducing Transit Damage Without Overpackaging",
    category: "Industry News",
    excerpt:
      "Upgrading to a stronger box isn't always the right fix for transit damage — sometimes the problem is fit, void fill, or flute direction, not raw strength.",
    body: [
      "When a customer sees damaged shipments, the instinct is often to ask for a thicker or double-wall box. That can work, but it also adds cost and material — and sometimes the actual cause of damage isn't box strength at all.",
      "A box with excess void space lets the product shift and impact the walls during transit — right-sizing the carton to the product, or adding void fill, often reduces damage more effectively than a stronger board grade.",
      "Flute direction matters too: corrugated flutes are strongest when the compressive load runs parallel to the flute direction. A box built with the wrong flute orientation for its expected load path can underperform its rated ECT/BCT numbers in practice.",
      "Before upgrading board grade, it's worth reviewing box fit, internal packing, and flute orientation against how the product is actually being palletized and shipped — a packaging engineer should be able to walk through this with you rather than defaulting straight to a heavier box.",
    ],
    coverImageUrl: null,
    author: "Valista Packaging Team",
    publishedAt: "2026-06-30",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string | undefined): Article[] {
  if (!category) return articles;
  return articles.filter((a) => a.category === category);
}
