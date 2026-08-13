import { prisma } from "@/lib/prisma";

export async function getAwards() {
  return prisma.award.findMany({
    where: { isPublished: true },
    orderBy: { year: "desc" },
  });
}
