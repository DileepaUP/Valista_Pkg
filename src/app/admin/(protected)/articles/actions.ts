"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const ARTICLE_CATEGORIES = ["Packaging Guides", "Sustainability", "Industry News"] as const;

function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const articleSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1, "Title is required"),
  category: z.enum(ARTICLE_CATEGORIES),
  excerpt: z.string().min(1, "Excerpt is required"),
  body: z.array(z.string()).min(1, "At least one body paragraph is required"),
  coverImageUrl: z.string().nullable(),
  author: z.string().min(1, "Author is required"),
  publishedAt: z.string().min(1, "Publish date is required"),
  isPublished: z.boolean(),
});

export interface ArticleFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseForm(formData: FormData) {
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  // Body paragraphs are separated by a blank line (like normal paragraph text)
  const bodyRaw = String(formData.get("body") ?? "");
  const body = bodyRaw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return articleSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body,
    coverImageUrl: coverImageUrl || null,
    author: String(formData.get("author") ?? "").trim(),
    publishedAt: String(formData.get("publishedAt") ?? "").trim(),
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

export async function createArticle(_prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.article.findUnique({ where: { slug: result.data.slug } });
  if (existing) return { error: "An article with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };

  const { publishedAt, ...rest } = result.data;
  await prisma.article.create({ data: { ...rest, publishedAt: new Date(publishedAt) } });

  revalidatePath("/admin/articles");
  revalidatePath("/resources");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData
): Promise<ArticleFormState> {
  await requireAdmin();

  const result = parseForm(formData);
  if (!result.success) return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };

  const existing = await prisma.article.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) return { error: "Another article already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };

  const { publishedAt, ...rest } = result.data;
  await prisma.article.update({ where: { id }, data: { ...rest, publishedAt: new Date(publishedAt) } });

  revalidatePath("/admin/articles");
  revalidatePath("/resources");
  revalidatePath(`/resources/${result.data.slug}`);
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  const article = await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
  revalidatePath("/resources");
  revalidatePath(`/resources/${article.slug}`);
  revalidatePath("/");
}
