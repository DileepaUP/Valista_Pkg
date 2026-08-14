"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { QuoteStatus } from "@/generated/prisma/client";

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  await requireAdmin();
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/rfq");
}
