import { AwardForm } from "@/components/admin/AwardForm";
import { createAward } from "../actions";

export default function NewAwardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Award</h1>
      <div className="mt-6">
        <AwardForm action={createAward} submitLabel="Create Award" />
      </div>
    </div>
  );
}
