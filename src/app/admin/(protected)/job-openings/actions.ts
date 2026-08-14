"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"] as const;

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const jobOpeningSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  location: z.string().min(1, "Location is required"),
  employmentType: z.enum(EMPLOYMENT_TYPES),
  summary: z.string().min(1, "Summary is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  isOpen: z.boolean(),
  postedAt: z.string().min(1, "Posted date is required"),
});

export interface JobOpeningFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  return jobOpeningSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    department: String(formData.get("department") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    employmentType: String(formData.get("employmentType") ?? ""),
    summary: String(formData.get("summary") ?? "").trim(),
    responsibilities: splitLines(formData.get("responsibilities")),
    requirements: splitLines(formData.get("requirements")),
    isOpen: formData.get("isOpen") === "on",
    postedAt: String(formData.get("postedAt") ?? "").trim(),
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

export async function createJobOpening(
  _prevState: JobOpeningFormState,
  formData: FormData
): Promise<JobOpeningFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.jobOpening.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "A job opening with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };

  const { postedAt, ...rest } = result.data;
  await prisma.jobOpening.create({ data: { ...rest, postedAt: new Date(postedAt) } });

  revalidatePath("/admin/job-openings");
  revalidatePath("/careers");
  redirect("/admin/job-openings");
}

export async function updateJobOpening(
  id: string,
  _prevState: JobOpeningFormState,
  formData: FormData
): Promise<JobOpeningFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.jobOpening.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) return { error: "Another job opening already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };

  const { postedAt, ...rest } = result.data;
  await prisma.jobOpening.update({ where: { id }, data: { ...rest, postedAt: new Date(postedAt) } });

  revalidatePath("/admin/job-openings");
  revalidatePath("/careers");
  revalidatePath(`/careers/${result.data.slug}`);
  redirect("/admin/job-openings");
}

export async function deleteJobOpening(id: string) {
  await requireAdmin();
  const job = await prisma.jobOpening.delete({ where: { id } });
  revalidatePath("/admin/job-openings");
  revalidatePath("/careers");
  revalidatePath(`/careers/${job.slug}`);
}
