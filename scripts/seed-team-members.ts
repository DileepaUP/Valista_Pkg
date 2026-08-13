import { prisma } from "../src/lib/prisma";
import { teamMembers } from "../src/data/team-members";

async function main() {
  for (let i = 0; i < teamMembers.length; i++) {
    const m = teamMembers[i];
    await prisma.teamMember.upsert({
      where: { slug: m.slug },
      update: { name: m.name, role: m.role, photoUrl: m.photoUrl, bio: m.bio, sortOrder: i, isPublished: true },
      create: {
        slug: m.slug,
        name: m.name,
        role: m.role,
        photoUrl: m.photoUrl,
        bio: m.bio,
        sortOrder: i,
        isPublished: true,
      },
    });
    console.log(`Seeded: ${m.slug}`);
  }

  console.log(`Done — ${teamMembers.length} team members seeded.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
