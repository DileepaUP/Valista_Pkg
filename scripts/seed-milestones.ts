import { prisma } from "../src/lib/prisma";
import { milestones } from "../src/data/milestones";

function slugify(title: string, year: number): string {
  return `${year}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

async function main() {
  for (const m of milestones) {
    const slug = slugify(m.title, m.year);
    await prisma.milestone.upsert({
      where: { slug },
      update: { year: m.year, title: m.title, description: m.description, type: m.type, isPublished: true },
      create: { slug, year: m.year, title: m.title, description: m.description, type: m.type, isPublished: true },
    });
    console.log(`Seeded: ${slug}`);
  }

  console.log(`Done — ${milestones.length} milestones seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
