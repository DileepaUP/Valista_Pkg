import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { createCaseStudy } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Case Study</h1>
      <div className="mt-6">
        <CaseStudyForm action={createCaseStudy} submitLabel="Create Case Study" />
      </div>
    </div>
  );
}
