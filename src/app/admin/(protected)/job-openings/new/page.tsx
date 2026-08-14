import { JobOpeningForm } from "@/components/admin/JobOpeningForm";
import { createJobOpening } from "../actions";

export default function NewJobOpeningPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Job Opening</h1>
      <div className="mt-6">
        <JobOpeningForm action={createJobOpening} submitLabel="Create Job Opening" />
      </div>
    </div>
  );
}
