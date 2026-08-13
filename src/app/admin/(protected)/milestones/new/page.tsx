import { MilestoneForm } from "@/components/admin/MilestoneForm";
import { createMilestone } from "../actions";

export default function NewMilestonePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Milestone</h1>
      <div className="mt-6">
        <MilestoneForm action={createMilestone} submitLabel="Create Milestone" />
      </div>
    </div>
  );
}
