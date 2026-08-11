import type { Metadata } from "next";
import { manufacturingSteps } from "@/data/manufacturing-process";

export const metadata: Metadata = {
  title: "Manufacturing Process — Valista Packaging",
};

export default function ManufacturingProcessPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Manufacturing Process</h1>
      <p className="mt-2 text-charcoal/60">
        From board to finished carton — the standard steps in corrugated box production.
      </p>

      <ol className="mt-10 space-y-6 border-l-2 border-sand-deep pl-6">
        {manufacturingSteps.map((step) => (
          <li key={step.order} className="relative">
            <span className="absolute -left-[31px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-kraft font-mono text-xs text-white">
              {step.order}
            </span>
            <p className="font-display text-lg font-medium text-charcoal">{step.title}</p>
            <p className="mt-1 text-sm text-charcoal/60">{step.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
