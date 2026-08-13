"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const teamMemberSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  photoUrl: z.string().nullable(),
  bio: z.string().min(1, "Bio is required"),
  sortOrder: z.number().int(),
  isPublished: z.boolean(),
});

export interface TeamMemberFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const photoUrl = String(formData.get("photoUrl") ?? "").trim();
  return teamMemberSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    photoUrl: photoUrl || null,
    bio: String(formData.get("bio") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
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

export async function createTeamMember(
  _prevState: TeamMemberFormState,
  formData: FormData
): Promise<TeamMemberFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.teamMember.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "A team member with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.teamMember.create({ data: result.data });

  revalidatePath("/admin/team-members");
  revalidatePath("/our-company/leadership");
  redirect("/admin/team-members");
}

export async function updateTeamMember(
  id: string,
  _prevState: TeamMemberFormState,
  formData: FormData
): Promise<TeamMemberFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.teamMember.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) return { error: "Another team member already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };

  await prisma.teamMember.update({ where: { id }, data: result.data });

  revalidatePath("/admin/team-members");
  revalidatePath("/our-company/leadership");
  redirect("/admin/team-members");
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team-members");
  revalidatePath("/our-company/leadership");
}
