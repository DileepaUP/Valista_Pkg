import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateCaseStudy, deleteCaseStudy } from "../../actions";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: { results: true },
  });

  if (!caseStudy) notFound();

  const boundUpdate = updateCaseStudy.bind(null, caseStudy.id);
  const boundDelete = deleteCaseStudy.bind(null, caseStudy.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Case Study</h1>
        <DeleteButton action={boundDelete} label="Delete Case Study" />
      </div>
      <div className="mt-6">
        <CaseStudyForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: caseStudy.slug,
            title: caseStudy.title,
            industries: caseStudy.industries,
            summaryProblem: caseStudy.summaryProblem,
            summarySolution: caseStudy.summarySolution,
            summaryResult: caseStudy.summaryResult,
            challenge: caseStudy.challenge,
            solution: caseStudy.solution,
            clientQuote: caseStudy.clientQuote,
            clientName: caseStudy.clientName,
            clientCompany: caseStudy.clientCompany,
            images: caseStudy.images,
            isVerified: caseStudy.isVerified,
            isPublished: caseStudy.isPublished,
            results: caseStudy.results.map((r) => ({ label: r.label, value: r.value, unit: r.unit })),
          }}
        />
      </div>
    </div>
  );
}
