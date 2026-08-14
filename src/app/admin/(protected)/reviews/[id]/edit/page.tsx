import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateReview, deleteReview } from "../../actions";

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await prisma.review.findUnique({ where: { id } });

  if (!review) notFound();

  const boundUpdate = updateReview.bind(null, review.id);
  const boundDelete = deleteReview.bind(null, review.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Review</h1>
        <DeleteButton action={boundDelete} label="Delete Review" />
      </div>
      <div className="mt-6">
        <ReviewForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            customerName: review.customerName,
            company: review.company,
            industry: review.industry,
            rating: review.rating,
            quote: review.quote,
            isPublished: review.isPublished,
          }}
        />
      </div>
    </div>
  );
}
