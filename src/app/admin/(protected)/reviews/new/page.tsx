import { ReviewForm } from "@/components/admin/ReviewForm";
import { createReview } from "../actions";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Review</h1>
      <div className="mt-6">
        <ReviewForm action={createReview} submitLabel="Create Review" />
      </div>
    </div>
  );
}
