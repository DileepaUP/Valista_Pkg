import { prisma } from "@/lib/prisma";

export async function getTeamMembers() {
  return prisma.teamMember.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
  });
}
