import { prisma } from "../src/lib/prisma";
import { jobOpenings } from "../src/data/job-openings";

async function main() {
  for (const j of jobOpenings) {
    await prisma.jobOpening.upsert({
      where: { slug: j.slug },
      update: {
        title: j.title,
        department: j.department,
        location: j.location,
        employmentType: j.employmentType,
        summary: j.summary,
        responsibilities: j.responsibilities,
        requirements: j.requirements,
        isOpen: j.isOpen,
        postedAt: new Date(j.postedAt),
      },
      create: {
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        employmentType: j.employmentType,
        summary: j.summary,
        responsibilities: j.responsibilities,
        requirements: j.requirements,
        isOpen: j.isOpen,
        postedAt: new Date(j.postedAt),
      },
    });
    console.log(`Seeded: ${j.slug}`);
  }

  console.log(`Done — ${jobOpenings.length} job openings seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
