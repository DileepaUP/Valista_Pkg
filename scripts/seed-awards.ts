import { prisma } from "../src/lib/prisma";
import { awards } from "../src/data/awards";

async function main() {
  for (const a of awards) {
    await prisma.award.upsert({
      where: { slug: a.slug },
      update: { name: a.name, issuingBody: a.issuingBody, year: a.year, description: a.description, isPublished: true },
      create: {
        slug: a.slug,
        name: a.name,
        issuingBody: a.issuingBody,
        year: a.year,
        description: a.description,
        isPublished: true,
      },
    });
    console.log(`Seeded: ${a.slug}`);
  }

  console.log(`Done — ${awards.length} awards seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
