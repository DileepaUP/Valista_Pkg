"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const awardSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1, "Name is required"),
  issuingBody: z.string().min(1, "Issuing body is required"),
  year: z.number().int(),
  description: z.string().min(1, "Description is required"),
  isPublished: z.boolean(),
});

export interface AwardFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  return awardSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    issuingBody: String(formData.get("issuingBody") ?? "").trim(),
    year: Number(formData.get("year") ?? 0),
    description: String(formData.get("description") ?? "").trim(),
    isPublished: formData.get("isPublished") === "on",
  });
}

function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export async function createAward(_prevState: AwardFormState, formData: FormData): Promise<AwardFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.award.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "An award with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.award.create({ data: result.data });

  revalidatePath("/admin/awards");
  revalidatePath("/our-company/awards");
  redirect("/admin/awards");
}

export async function updateAward(
  id: string,
  _prevState: AwardFormState,
  formData: FormData
): Promise<AwardFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.award.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) return { error: "Another award already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.award.update({ where: { id }, data: result.data });

  revalidatePath("/admin/awards");
  revalidatePath("/our-company/awards");
  redirect("/admin/awards");
}

export async function deleteAward(id: string) {
  await requireAdmin();
  await prisma.award.delete({ where: { id } });
  revalidatePath("/admin/awards");
  revalidatePath("/our-company/awards");
}
