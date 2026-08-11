import { prisma } from "@/lib/prisma";

// Public-facing product queries — DB-backed replacement for src/data/products.ts.
// Both functions here only return isPublished: true rows, mirroring the old
// static file's behavior of only ever containing content meant to be live.
// Draft products created in the admin stay invisible until published.

export async function getProducts() {
  return prisma.product.findMany({
    where: { isPublished: true },
    include: { standardSizes: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findFirst({
    where: { slug, isPublished: true },
    include: { standardSizes: true },
  });
}
