import { prisma } from "@/lib/prisma";

export async function getArticles() {
  return prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({ where: { slug, isPublished: true } });
}

export async function getArticlesByCategory(category: string | undefined) {
  return prisma.article.findMany({
    where: { isPublished: true, ...(category ? { category } : {}) },
    orderBy: { publishedAt: "desc" },
  });
}
