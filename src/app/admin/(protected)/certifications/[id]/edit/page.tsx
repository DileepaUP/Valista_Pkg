import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CertificationForm } from "@/components/admin/CertificationForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateCertification, deleteCertification } from "../../actions";

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await prisma.certification.findUnique({ where: { id } });

  if (!cert) notFound();

  const boundUpdate = updateCertification.bind(null, cert.id);
  const boundDelete = deleteCertification.bind(null, cert.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Certification</h1>
        <DeleteButton action={boundDelete} label="Delete Certification" />
      </div>
      <div className="mt-6">
        <CertificationForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            name: cert.name,
            issuingBody: cert.issuingBody,
            certificationCode: cert.certificationCode,
            badgeImageUrl: cert.badgeImageUrl,
            pdfUrl: cert.pdfUrl,
            issueDate: cert.issueDate.toISOString().slice(0, 10),
            renewalDate: cert.renewalDate.toISOString().slice(0, 10),
            isPublished: cert.isPublished,
          }}
        />
      </div>
    </div>
  );
}
