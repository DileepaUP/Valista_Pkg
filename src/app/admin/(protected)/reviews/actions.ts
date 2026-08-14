"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const reviewSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  company: z.string().min(1, "Company is required"),
  industry: z.string().min(1, "Industry is required"),
  rating: z.number().int().min(1).max(5),
  quote: z.string().min(1, "Quote is required"),
  isPublished: z.boolean(),
});

export interface ReviewFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  return reviewSchema.safeParse({
    customerName: String(formData.get("customerName") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    industry: String(formData.get("industry") ?? "").trim(),
    rating: Number(formData.get("rating") ?? 0),
    quote: String(formData.get("quote") ?? "").trim(),
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

export async function createReview(_prevState: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  await prisma.review.create({ data: result.data });

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  redirect("/admin/reviews");
}

export async function updateReview(
  id: string,
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  await prisma.review.update({ where: { id }, data: result.data });

  revalidatePath("/admin/reviews");
  revalidatePath("/");
  redirect("/admin/reviews");
}

export async function deleteReview(id: string) {
  await requireAdmin();
  await prisma.review.delete({ where: { id } });
  revalidatePath("/admin/reviews");
  revalidatePath("/");
}
