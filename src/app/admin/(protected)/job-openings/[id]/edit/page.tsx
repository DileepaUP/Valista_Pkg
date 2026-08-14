import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { JobOpeningForm } from "@/components/admin/JobOpeningForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateJobOpening, deleteJobOpening } from "../../actions";

export default async function EditJobOpeningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobOpening.findUnique({ where: { id } });

  if (!job) notFound();

  const boundUpdate = updateJobOpening.bind(null, job.id);
  const boundDelete = deleteJobOpening.bind(null, job.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Job Opening</h1>
        <DeleteButton action={boundDelete} label="Delete Job Opening" />
      </div>
      <div className="mt-6">
        <JobOpeningForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: job.slug,
            title: job.title,
            department: job.department,
            location: job.location,
            employmentType: job.employmentType,
            summary: job.summary,
            responsibilities: job.responsibilities,
            requirements: job.requirements,
            isOpen: job.isOpen,
            postedAt: job.postedAt.toISOString().slice(0, 10),
          }}
        />
      </div>
    </div>
  );
}
