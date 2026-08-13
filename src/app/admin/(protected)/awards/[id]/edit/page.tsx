import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AwardForm } from "@/components/admin/AwardForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateAward, deleteAward } from "../../actions";

export default async function EditAwardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const award = await prisma.award.findUnique({ where: { id } });

  if (!award) notFound();

  const boundUpdate = updateAward.bind(null, award.id);
  const boundDelete = deleteAward.bind(null, award.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Award</h1>
        <DeleteButton action={boundDelete} label="Delete Award" />
      </div>
      <div className="mt-6">
        <AwardForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: award.slug,
            name: award.name,
            issuingBody: award.issuingBody,
            year: award.year,
            description: award.description,
            isPublished: award.isPublished,
          }}
        />
      </div>
    </div>
  );
}
