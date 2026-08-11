import Link from "next/link";
import type { Metadata } from "next";
import { getPublishableCaseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies — Valista Packaging",
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const industry = typeof resolved.industry === "string" ? resolved.industry : undefined;

  const published = getPublishableCaseStudies();
  const industries = Array.from(new Set(published.flatMap((c) => c.industries)));
  const filtered = published.filter((c) => !industry || c.industries.includes(industry as (typeof c.industries)[number]));

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Case Studies</h1>
      <p className="mt-2 text-charcoal/60">
        Real challenges, real solutions, verified results only.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/case-studies"
          className={`rounded-full px-3 py-1 text-sm ${!industry ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
        >
          All
        </Link>
        {industries.map((i) => (
          <Link
            key={i}
            href={`/case-studies?industry=${encodeURIComponent(i)}`}
            className={`rounded-full px-3 py-1 text-sm ${industry === i ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
          >
            {i}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {filtered.map((cs) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="rounded-lg border border-sand-deep bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-display text-lg font-medium text-charcoal">{cs.title}</p>
            <p className="mt-3 text-sm text-charcoal/70">{cs.summary.problem}</p>
            <p className="mt-1 text-sm text-charcoal/50">&rarr; {cs.summary.solution}</p>
            <p className="mt-1 text-sm font-medium text-green">&rarr; {cs.summary.result}</p>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-charcoal/60">
            No verified case studies published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
