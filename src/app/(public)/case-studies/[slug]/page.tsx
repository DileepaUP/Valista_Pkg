import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getPublishableCaseStudies } from "@/lib/queries/case-studies";

export async function generateStaticParams() {
  const caseStudies = await getPublishableCaseStudies();
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  // Unverified/unpublished case studies are never rendered publicly — the
  // query already filters both, this is a defensive backstop (see
  // docs/CLAUDE.md §9, "real, verified figures only").
  if (!caseStudy) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">{caseStudy.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {caseStudy.industries.map((industry) => (
          <span key={industry} className="rounded-full bg-sand-deep px-3 py-1 text-xs text-charcoal">
            {industry}
          </span>
        ))}
      </div>

      {/* At-a-glance Problem → Solution → Result chain */}
      <div className="mt-8 flex flex-col gap-3 rounded-lg border border-sand-deep bg-sand p-6 sm:flex-row sm:items-center">
        <FlowStep label="Problem" text={caseStudy.summaryProblem} />
        <FlowArrow />
        <FlowStep label="Solution" text={caseStudy.summarySolution} />
        <FlowArrow />
        <FlowStep label="Result" text={caseStudy.summaryResult} accent />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Problem</h2>
        <p className="mt-2 text-charcoal/70">{caseStudy.challenge}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-charcoal">Solution</h2>
        <p className="mt-2 text-charcoal/70">{caseStudy.solution}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-charcoal">Results</h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {caseStudy.results.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-sand-deep bg-white p-4">
              <dt className="text-xs text-charcoal/60">{metric.label}</dt>
              <dd className="mt-1 font-mono text-lg text-charcoal">
                {metric.value}
                {metric.unit ?? ""}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {caseStudy.images.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold text-charcoal">Gallery</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {caseStudy.images.map((src) => (
              <div key={src} className="relative aspect-4/3 overflow-hidden rounded-lg bg-sand-deep">
                <Image src={src} alt={caseStudy.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {caseStudy.clientQuote && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-semibold text-charcoal">Testimonial</h2>
          <blockquote className="mt-4 border-l-4 border-kraft pl-4 italic text-charcoal/70">
            &ldquo;{caseStudy.clientQuote}&rdquo;
            {caseStudy.clientName && (
              <footer className="mt-2 text-sm not-italic text-charcoal/50">
                — {caseStudy.clientName}
                {caseStudy.clientCompany ? `, ${caseStudy.clientCompany}` : ""}
              </footer>
            )}
          </blockquote>
        </section>
      )}
    </div>
  );
}

function FlowStep({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className="flex-1">
      <p className="text-xs font-medium uppercase tracking-wide text-charcoal/40">{label}</p>
      <p className={`mt-1 text-sm ${accent ? "font-medium text-green" : "text-charcoal"}`}>{text}</p>
    </div>
  );
}

function FlowArrow() {
  return <span className="hidden font-mono text-charcoal/30 sm:inline">&rarr;</span>;
}
