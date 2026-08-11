// Imports src/data/products.ts into PostgreSQL (Admin_CMS_Implementation_Plan
// §5.3). Idempotent — upserts on slug — safe to re-run. Products are seeded
// as published (isPublished: true) since they're already live content on
// the public site today; the switch to reading from the DB happens in the
// next step, not this one.
import { prisma } from "../src/lib/prisma";
import { products } from "../src/data/products";

async function main() {
  for (const p of products) {
    const saved = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        categories: p.categories,
        industries: p.industries,
        boxType: p.boxType,
        shortDescription: p.shortDescription,
        description: p.description,
        applications: p.applications,
        features: p.features,
        fluteType: p.fluteType,
        wallType: p.wallType,
        boardGrade: p.boardGrade,
        ectRatingKnM: p.ectRatingKnM,
        burstStrengthKpa: p.burstStrengthKpa,
        maxStackLoadKg: p.maxStackLoadKg,
        printingOptions: p.printingOptions,
        moq: p.moq,
        specSheetUrl: p.specSheetUrl,
        images: p.images,
        relatedProductSlugs: p.relatedProductSlugs,
        isPublished: true,
      },
      create: {
        slug: p.slug,
        name: p.name,
        categories: p.categories,
        industries: p.industries,
        boxType: p.boxType,
        shortDescription: p.shortDescription,
        description: p.description,
        applications: p.applications,
        features: p.features,
        fluteType: p.fluteType,
        wallType: p.wallType,
        boardGrade: p.boardGrade,
        ectRatingKnM: p.ectRatingKnM,
        burstStrengthKpa: p.burstStrengthKpa,
        maxStackLoadKg: p.maxStackLoadKg,
        printingOptions: p.printingOptions,
        moq: p.moq,
        specSheetUrl: p.specSheetUrl,
        images: p.images,
        relatedProductSlugs: p.relatedProductSlugs,
        isPublished: true,
      },
    });

    // Replace standard sizes wholesale on each run rather than diffing.
    await prisma.productStandardSize.deleteMany({ where: { productId: saved.id } });
    if (p.standardSizes.length > 0) {
      await prisma.productStandardSize.createMany({
        data: p.standardSizes.map((s) => ({
          productId: saved.id,
          label: s.label,
          lengthMm: s.lengthMm,
          widthMm: s.widthMm,
          depthMm: s.depthMm,
        })),
      });
    }

    console.log(`Seeded: ${p.slug}`);
  }

  console.log(`Done — ${products.length} products seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
