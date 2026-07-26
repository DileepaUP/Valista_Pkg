import type { Metadata } from "next";
import { environmentalPolicySummary, environmentalPolicyPdfUrl } from "@/data/sustainability-content";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Environmental Policy — Valista Packaging",
};

export default function EnvironmentalPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Environmental Policy</h1>
      <p className="mt-6 text-charcoal/70">{environmentalPolicySummary}</p>
      {environmentalPolicyPdfUrl && (
        <div className="mt-8">
          <Button href={environmentalPolicyPdfUrl} variant="secondary">
            Download full policy (PDF)
          </Button>
        </div>
      )}
    </div>
  );
}
