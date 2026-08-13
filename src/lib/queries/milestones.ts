import { prisma } from "@/lib/prisma";

export async function getMilestones() {
  return prisma.milestone.findMany({
    where: { isPublished: true },
    orderBy: { year: "asc" },
  });
}
