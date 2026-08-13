// Imports src/data/certifications.ts into PostgreSQL. Idempotent — upserts
// on certificationCode. Seeded as published: true since these were already
// live content on the public site (same reasoning as products).
import { prisma } from "../src/lib/prisma";
import { certifications } from "../src/data/certifications";

async function main() {
  for (const c of certifications) {
    await prisma.certification.upsert({
      where: { certificationCode: c.certificationCode },
      update: {
        name: c.name,
        issuingBody: c.issuingBody,
        badgeImageUrl: c.badgeImageUrl || null,
        pdfUrl: c.pdfUrl || null,
        issueDate: new Date(c.issueDate),
        renewalDate: new Date(c.renewalDate),
        isPublished: true,
      },
      create: {
        name: c.name,
        issuingBody: c.issuingBody,
        certificationCode: c.certificationCode,
        badgeImageUrl: c.badgeImageUrl || null,
        pdfUrl: c.pdfUrl || null,
        issueDate: new Date(c.issueDate),
        renewalDate: new Date(c.renewalDate),
        isPublished: true,
      },
    });
    console.log(`Seeded: ${c.certificationCode}`);
  }

  console.log(`Done — ${certifications.length} certifications seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
