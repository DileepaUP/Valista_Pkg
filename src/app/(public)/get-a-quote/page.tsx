import type { Metadata } from "next";
import { QuoteWizard } from "@/components/rfq/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Quote — Valista Packaging",
};

export default async function GetAQuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const product = typeof resolved.product === "string" ? resolved.product : undefined;

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Get a Quote</h1>
      <p className="mt-2 text-charcoal/60">
        Tell us what you need and we&apos;ll follow up with a quote — no generic contact form.
      </p>
      <div className="mt-8">
        <QuoteWizard initialProductSlug={product} />
      </div>
    </div>
  );
}
