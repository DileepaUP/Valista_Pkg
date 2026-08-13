import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MilestoneForm } from "@/components/admin/MilestoneForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateMilestone, deleteMilestone } from "../../actions";

export default async function EditMilestonePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const milestone = await prisma.milestone.findUnique({ where: { id } });

  if (!milestone) notFound();

  const boundUpdate = updateMilestone.bind(null, milestone.id);
  const boundDelete = deleteMilestone.bind(null, milestone.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Milestone</h1>
        <DeleteButton action={boundDelete} label="Delete Milestone" />
      </div>
      <div className="mt-6">
        <MilestoneForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: milestone.slug,
            year: milestone.year,
            title: milestone.title,
            description: milestone.description,
            type: milestone.type,
            isPublished: milestone.isPublished,
          }}
        />
      </div>
    </div>
  );
}
