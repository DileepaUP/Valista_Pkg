import { prisma } from "@/lib/prisma";

export async function getOpenJobs() {
  return prisma.jobOpening.findMany({
    where: { isOpen: true },
    orderBy: { postedAt: "desc" },
  });
}

export async function getJobBySlug(slug: string) {
  return prisma.jobOpening.findFirst({ where: { slug, isOpen: true } });
}
