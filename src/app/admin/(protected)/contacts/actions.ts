"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function toggleContactHandled(id: string, handled: boolean) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { handled } });
  revalidatePath("/admin/contacts");
}
