import { notFound } from "next/navigation";
import { getJobBySlug, getOpenJobs } from "@/lib/queries/job-openings";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const jobs = await getOpenJobs();
  return jobs.map((j) => ({ slug: j.slug }));
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const mailtoHref = `mailto:careers@valista.lk?subject=${encodeURIComponent(`Application: ${job.title}`)}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-steel">{job.department}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal">{job.title}</h1>
      <p className="mt-2 text-sm text-charcoal/50">
        {job.location} &middot; {job.employmentType} &middot; Posted {job.postedAt.toISOString().slice(0, 10)}
      </p>

      <p className="mt-6 text-charcoal/70">{job.summary}</p>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Responsibilities</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
          {job.responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-charcoal">Requirements</h2>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
          {job.requirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <Button href={mailtoHref} variant="primary">
          Apply for this role
        </Button>
      </div>
    </div>
  );
}
