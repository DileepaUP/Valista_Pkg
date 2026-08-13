"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const resultMetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().nullable(),
});

const caseStudySchema = z
  .object({
    slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
    title: z.string().min(1, "Title is required"),
    industries: z.array(z.string()).min(1, "At least one industry is required"),
    summaryProblem: z.string().min(1, "Required"),
    summarySolution: z.string().min(1, "Required"),
    summaryResult: z.string().min(1, "Required"),
    challenge: z.string().min(1, "Required"),
    solution: z.string().min(1, "Required"),
    clientQuote: z.string().nullable(),
    clientName: z.string().nullable(),
    clientCompany: z.string().nullable(),
    images: z.array(z.string()),
    isVerified: z.boolean(),
    isPublished: z.boolean(),
    results: z.array(resultMetricSchema),
  })
  // The core CLAUDE.md §9 rule, enforced here rather than only in the UI:
  // an unverified case study can never be marked published.
  .refine((data) => !data.isPublished || data.isVerified, {
    message: "A case study must be marked Verified before it can be Published.",
    path: ["isPublished"],
  });

export interface CaseStudyFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseResults(formData: FormData) {
  // Each line: "Label, Value, Unit" — unit is optional (2 parts is OK too).
  const raw = splitLines(formData.get("resultsText"));
  const results: z.infer<typeof resultMetricSchema>[] = [];

  for (const line of raw) {
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 2) continue;
    const [label, value, unit] = parts;
    results.push({ label, value, unit: unit || null });
  }

  return results;
}

function parseCaseStudyForm(formData: FormData) {
  const clientQuote = String(formData.get("clientQuote") ?? "").trim();
  const clientName = String(formData.get("clientName") ?? "").trim();
  const clientCompany = String(formData.get("clientCompany") ?? "").trim();

  return caseStudySchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    industries: splitLines(formData.get("industries")),
    summaryProblem: String(formData.get("summaryProblem") ?? "").trim(),
    summarySolution: String(formData.get("summarySolution") ?? "").trim(),
    summaryResult: String(formData.get("summaryResult") ?? "").trim(),
    challenge: String(formData.get("challenge") ?? "").trim(),
    solution: String(formData.get("solution") ?? "").trim(),
    clientQuote: clientQuote || null,
    clientName: clientName || null,
    clientCompany: clientCompany || null,
    images: splitLines(formData.get("images")),
    isVerified: formData.get("isVerified") === "on",
    isPublished: formData.get("isPublished") === "on",
    results: parseResults(formData),
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

export async function createCaseStudy(
  _prevState: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  await requireAdmin();

  const result = parseCaseStudyForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.caseStudy.findUnique({ where: { slug: result.data.slug } });
  if (existing) {
    return { error: "A case study with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };
  }

  const { results, ...data } = result.data;
  await prisma.caseStudy.create({ data: { ...data, results: { create: results } } });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(
  id: string,
  _prevState: CaseStudyFormState,
  formData: FormData
): Promise<CaseStudyFormState> {
  await requireAdmin();

  const result = parseCaseStudyForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.caseStudy.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) {
    return { error: "Another case study already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };
  }

  const { results, ...data } = result.data;
  await prisma.caseStudy.update({
    where: { id },
    data: { ...data, results: { deleteMany: {}, create: results } },
  });

  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${result.data.slug}`);
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();
  const caseStudy = await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${caseStudy.slug}`);
}
