import { prisma } from "@/lib/prisma";

// Public-facing case study queries. Both gates matter: isPublished (the
// generic "admin approved this for the site" flag, same as Product) AND
// isVerified (the docs/CLAUDE.md §9-specific rule that a case study's
// figures must be real and client-approved before it can appear at all).
// A published-but-unverified row must never show up here.

export async function getPublishableCaseStudies() {
  return prisma.caseStudy.findMany({
    where: { isPublished: true, isVerified: true },
    include: { results: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCaseStudyBySlug(slug: string) {
  return prisma.caseStudy.findFirst({
    where: { slug, isPublished: true, isVerified: true },
    include: { results: true },
  });
}
