import { CertificationForm } from "@/components/admin/CertificationForm";
import { createCertification } from "../actions";

export default function NewCertificationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Certification</h1>
      <div className="mt-6">
        <CertificationForm action={createCertification} submitLabel="Create Certification" />
      </div>
    </div>
  );
}
