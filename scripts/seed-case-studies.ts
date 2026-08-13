// Imports src/data/case-studies.ts into PostgreSQL. Idempotent — upserts on
// slug. Seeded as isVerified: false, isPublished: false, matching the exact
// state they had as static data (per docs/CLAUDE.md §9, these are
// unverified sample stories and must stay hidden from the public site).
import { prisma } from "../src/lib/prisma";
import { caseStudies } from "../src/data/case-studies";

async function main() {
  for (const cs of caseStudies) {
    const saved = await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      update: {
        title: cs.title,
        industries: cs.industries,
        summaryProblem: cs.summary.problem,
        summarySolution: cs.summary.solution,
        summaryResult: cs.summary.result,
        challenge: cs.challenge,
        solution: cs.solution,
        clientQuote: cs.clientQuote ?? null,
        clientName: cs.clientName ?? null,
        clientCompany: cs.clientCompany ?? null,
        images: cs.images,
        isVerified: cs.isVerified,
        isPublished: false,
      },
      create: {
        slug: cs.slug,
        title: cs.title,
        industries: cs.industries,
        summaryProblem: cs.summary.problem,
        summarySolution: cs.summary.solution,
        summaryResult: cs.summary.result,
        challenge: cs.challenge,
        solution: cs.solution,
        clientQuote: cs.clientQuote ?? null,
        clientName: cs.clientName ?? null,
        clientCompany: cs.clientCompany ?? null,
        images: cs.images,
        isVerified: cs.isVerified,
        isPublished: false,
      },
    });

    await prisma.caseStudyResultMetric.deleteMany({ where: { caseStudyId: saved.id } });
    if (cs.results.length > 0) {
      await prisma.caseStudyResultMetric.createMany({
        data: cs.results.map((r) => ({
          caseStudyId: saved.id,
          label: r.label,
          value: r.value,
          unit: r.unit ?? null,
        })),
      });
    }

    console.log(`Seeded: ${cs.slug}`);
  }

  console.log(`Done — ${caseStudies.length} case studies seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
