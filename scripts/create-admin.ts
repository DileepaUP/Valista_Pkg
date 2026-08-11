// Usage: npm run create-admin -- admin@valista.lk "Admin Name" somepassword
import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/lib/auth";

async function main() {
  const [email, name, password] = process.argv.slice(2);

  if (!email || !name || !password) {
    console.error('Usage: npm run create-admin -- <email> "<name>" <password>');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.adminUser.upsert({
    where: { email: email.toLowerCase() },
    update: { name, passwordHash },
    create: { email: email.toLowerCase(), name, passwordHash },
  });

  console.log(`Admin user ready: ${user.email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
