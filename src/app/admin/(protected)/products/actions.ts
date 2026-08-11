"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// Multi-value fields are entered one-per-line in a textarea rather than a
// full multi-select widget — keeps the form usable without a client-side
// tag-input dependency. Splits on newline, trims, drops blank lines.
function splitLines(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const standardSizeSchema = z.object({
  label: z.string().min(1),
  lengthMm: z.number().int().positive(),
  widthMm: z.number().int().positive(),
  depthMm: z.number().int().positive(),
});

const productSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only"),
  name: z.string().min(1, "Name is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  industries: z.array(z.string()).min(1, "At least one industry is required"),
  boxType: z.string().min(1, "Box type is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  applications: z.array(z.string()),
  features: z.array(z.string()),
  fluteType: z.string().min(1),
  wallType: z.string().min(1),
  boardGrade: z.string().min(1),
  ectRatingKnM: z.number().nonnegative(),
  burstStrengthKpa: z.number().nonnegative(),
  maxStackLoadKg: z.number().nonnegative(),
  printingOptions: z.array(z.string()),
  moq: z.string().min(1),
  specSheetUrl: z.string().url().nullable().or(z.literal("")),
  images: z.array(z.string()),
  relatedProductSlugs: z.array(z.string()),
  isPublished: z.boolean(),
  standardSizes: z.array(standardSizeSchema),
});

export interface ProductFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseStandardSizes(formData: FormData) {
  // Each line: "Label, Length, Width, Depth" — parsed into structured rows.
  const raw = splitLines(formData.get("standardSizesText"));
  const sizes: z.infer<typeof standardSizeSchema>[] = [];

  for (const line of raw) {
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length !== 4) continue;
    const [label, lengthMm, widthMm, depthMm] = parts;
    const parsed = {
      label,
      lengthMm: Number(lengthMm),
      widthMm: Number(widthMm),
      depthMm: Number(depthMm),
    };
    if (Number.isFinite(parsed.lengthMm) && Number.isFinite(parsed.widthMm) && Number.isFinite(parsed.depthMm)) {
      sizes.push(parsed);
    }
  }

  return sizes;
}

function parseProductForm(formData: FormData) {
  const specSheetUrl = String(formData.get("specSheetUrl") ?? "").trim();

  return productSchema.safeParse({
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    categories: splitLines(formData.get("categories")),
    industries: splitLines(formData.get("industries")),
    boxType: String(formData.get("boxType") ?? "").trim(),
    shortDescription: String(formData.get("shortDescription") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    applications: splitLines(formData.get("applications")),
    features: splitLines(formData.get("features")),
    fluteType: String(formData.get("fluteType") ?? "").trim(),
    wallType: String(formData.get("wallType") ?? "").trim(),
    boardGrade: String(formData.get("boardGrade") ?? "").trim(),
    ectRatingKnM: Number(formData.get("ectRatingKnM") ?? 0),
    burstStrengthKpa: Number(formData.get("burstStrengthKpa") ?? 0),
    maxStackLoadKg: Number(formData.get("maxStackLoadKg") ?? 0),
    printingOptions: splitLines(formData.get("printingOptions")),
    moq: String(formData.get("moq") ?? "").trim(),
    specSheetUrl: specSheetUrl || null,
    images: splitLines(formData.get("images")),
    relatedProductSlugs: splitLines(formData.get("relatedProductSlugs")),
    isPublished: formData.get("isPublished") === "on",
    standardSizes: parseStandardSizes(formData),
  });
}

export async function createProduct(_prevState: ProductFormState, formData: FormData): Promise<ProductFormState> {
  await requireAdmin();

  const result = parseProductForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.product.findUnique({ where: { slug: result.data.slug } });
  if (existing) {
    return { error: "A product with this slug already exists.", fieldErrors: { slug: "Slug must be unique" } };
  }

  const { standardSizes, ...data } = result.data;
  await prisma.product.create({
    data: { ...data, standardSizes: { create: standardSizes } },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();

  const result = parseProductForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.product.findFirst({ where: { slug: result.data.slug, NOT: { id } } });
  if (existing) {
    return { error: "Another product already uses this slug.", fieldErrors: { slug: "Slug must be unique" } };
  }

  const { standardSizes, ...data } = result.data;
  await prisma.product.update({
    where: { id },
    data: {
      ...data,
      standardSizes: { deleteMany: {}, create: standardSizes },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${result.data.slug}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const product = await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
}

function flattenZodErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
