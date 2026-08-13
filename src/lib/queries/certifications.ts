import { prisma } from "@/lib/prisma";

export async function getCertifications() {
  return prisma.certification.findMany({
    where: { isPublished: true },
    orderBy: { renewalDate: "asc" },
  });
}

export async function getFscCertification() {
  return prisma.certification.findFirst({
    where: { isPublished: true, certificationCode: { contains: "FSC" } },
  });
}

// Status is computed at read time from renewalDate, never stored — matches
// the original static-data behavior (see the model comment in schema.prisma).
export function getCertificationStatus(renewalDate: Date): "Active" | "RenewingSoon" | "Expired" {
  const now = new Date();
  const daysUntilRenewal = (renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (daysUntilRenewal < 0) return "Expired";
  if (daysUntilRenewal <= 60) return "RenewingSoon";
  return "Active";
}
