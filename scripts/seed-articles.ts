import { prisma } from "../src/lib/prisma";
import { articles } from "../src/data/articles";

async function main() {
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        category: a.category,
        excerpt: a.excerpt,
        body: a.body,
        coverImageUrl: a.coverImageUrl,
        author: a.author,
        publishedAt: new Date(a.publishedAt),
        isPublished: true,
      },
      create: {
        slug: a.slug,
        title: a.title,
        category: a.category,
        excerpt: a.excerpt,
        body: a.body,
        coverImageUrl: a.coverImageUrl,
        author: a.author,
        publishedAt: new Date(a.publishedAt),
        isPublished: true,
      },
    });
    console.log(`Seeded: ${a.slug}`);
  }

  console.log(`Done — ${articles.length} articles seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
