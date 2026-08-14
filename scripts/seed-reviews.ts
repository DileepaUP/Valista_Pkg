import { prisma } from "../src/lib/prisma";
import { reviews } from "../src/data/reviews";

async function main() {
  for (const r of reviews) {
    const existing = await prisma.review.findFirst({ where: { customerName: r.customerName, company: r.company } });
    const data = {
      customerName: r.customerName,
      company: r.company,
      industry: r.industry,
      rating: r.rating,
      quote: r.quote,
      isPublished: true,
    };

    if (existing) {
      await prisma.review.update({ where: { id: existing.id }, data });
    } else {
      await prisma.review.create({ data });
    }
    console.log(`Seeded: ${r.customerName}`);
  }

  console.log(`Done — ${reviews.length} reviews seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
