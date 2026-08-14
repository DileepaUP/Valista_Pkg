import Link from "next/link";
import type { Metadata } from "next";
import { getOpenJobs } from "@/lib/queries/job-openings";

export const metadata: Metadata = {
  title: "Careers — Valista Packaging",
};

export default async function CareersPage() {
  const jobs = await getOpenJobs();
  const departments = Array.from(new Set(jobs.map((j) => j.department)));

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Careers</h1>
      <p className="mt-2 text-charcoal/60">
        Join the team building Valista Packaging&apos;s corrugated production, quality, and sales operations.
      </p>

      {departments.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {departments.map((d) => (
            <span key={d} className="rounded-full bg-sand-deep px-3 py-1 text-xs text-charcoal">
              {d}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 space-y-4">
        {jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/careers/${job.slug}`}
            className="block rounded-lg border border-sand-deep bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-lg font-medium text-charcoal">{job.title}</p>
              <span className="font-mono text-xs text-steel">{job.employmentType}</span>
            </div>
            <p className="mt-1 text-sm text-charcoal/50">
              {job.department} &middot; {job.location}
            </p>
            <p className="mt-3 text-sm text-charcoal/60">{job.summary}</p>
          </Link>
        ))}
        {jobs.length === 0 && (
          <p className="text-charcoal/60">No open roles right now — check back soon.</p>
        )}
      </div>
    </div>
  );
}
