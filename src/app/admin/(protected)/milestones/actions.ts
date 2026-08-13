"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const MILESTONE_TYPES = ["Founding", "Expansion", "Certification", "Award", "Sustainability"] as const;

const milestoneSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  year: z.number().int(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(MILESTONE_TYPES),
  isPublished: z.boolean(),
});

export interface MilestoneFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  return milestoneSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    year: Number(formData.get("year") ?? 0),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    type: String(formData.get("type") ?? ""),
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

export async function createMilestone(
  _prevState: MilestoneFormState,
  formData: FormData
): Promise<MilestoneFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.milestone.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "A milestone with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.milestone.create({ data: result.data });

  revalidatePath("/admin/milestones");
  revalidatePath("/our-company/history");
  redirect("/admin/milestones");
}

export async function updateMilestone(
  id: string,
  _prevState: MilestoneFormState,
  formData: FormData
): Promise<MilestoneFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.milestone.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) return { error: "Another milestone already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.milestone.update({ where: { id }, data: result.data });

  revalidatePath("/admin/milestones");
  revalidatePath("/our-company/history");
  redirect("/admin/milestones");
}

export async function deleteMilestone(id: string) {
  await requireAdmin();
  await prisma.milestone.delete({ where: { id } });
  revalidatePath("/admin/milestones");
  revalidatePath("/our-company/history");
}
