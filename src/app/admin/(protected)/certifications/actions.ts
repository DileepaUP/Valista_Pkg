"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const certificationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  issuingBody: z.string().min(1, "Issuing body is required"),
  certificationCode: z.string().min(1, "Certification code is required"),
  badgeImageUrl: z.string().nullable(),
  pdfUrl: z.string().nullable(),
  issueDate: z.string().min(1, "Issue date is required"),
  renewalDate: z.string().min(1, "Renewal date is required"),
  isPublished: z.boolean(),
});

export interface CertificationFormState {
  error: string | null;
  fieldErrors?: Record<string, string>;
}

function parseCertificationForm(formData: FormData) {
  const badgeImageUrl = String(formData.get("badgeImageUrl") ?? "").trim();
  const pdfUrl = String(formData.get("pdfUrl") ?? "").trim();

  return certificationSchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    issuingBody: String(formData.get("issuingBody") ?? "").trim(),
    certificationCode: String(formData.get("certificationCode") ?? "").trim(),
    badgeImageUrl: badgeImageUrl || null,
    pdfUrl: pdfUrl || null,
    issueDate: String(formData.get("issueDate") ?? "").trim(),
    renewalDate: String(formData.get("renewalDate") ?? "").trim(),
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

export async function createCertification(
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  await requireAdmin();

  const result = parseCertificationForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.certification.findUnique({
    where: { certificationCode: result.data.certificationCode },
  });
  if (existing) {
    return {
      error: "A certification with this code already exists.",
      fieldErrors: { certificationCode: "Code must be unique" },
    };
  }

  const { issueDate, renewalDate, ...rest } = result.data;
  await prisma.certification.create({
    data: { ...rest, issueDate: new Date(issueDate), renewalDate: new Date(renewalDate) },
  });

  revalidatePath("/admin/certifications");
  revalidatePath("/our-company/certifications");
  revalidatePath("/sustainability");
  revalidatePath("/sustainability/fsc-certification");
  redirect("/admin/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  await requireAdmin();

  const result = parseCertificationForm(formData);
  if (!result.success) {
    return { error: "Please fix the errors below.", fieldErrors: flattenZodErrors(result.error) };
  }

  const existing = await prisma.certification.findFirst({
    where: { certificationCode: result.data.certificationCode, NOT: { id } },
  });
  if (existing) {
    return {
      error: "Another certification already uses this code.",
      fieldErrors: { certificationCode: "Code must be unique" },
    };
  }

  const { issueDate, renewalDate, ...rest } = result.data;
  await prisma.certification.update({
    where: { id },
    data: { ...rest, issueDate: new Date(issueDate), renewalDate: new Date(renewalDate) },
  });

  revalidatePath("/admin/certifications");
  revalidatePath("/our-company/certifications");
  revalidatePath("/sustainability");
  revalidatePath("/sustainability/fsc-certification");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await requireAdmin();
  await prisma.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
  revalidatePath("/our-company/certifications");
  revalidatePath("/sustainability");
  revalidatePath("/sustainability/fsc-certification");
}
