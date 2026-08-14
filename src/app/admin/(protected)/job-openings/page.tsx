import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminJobOpeningsPage() {
  const jobOpenings = await prisma.jobOpening.findMany({ orderBy: { postedAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">Job Openings</h1>
          <p className="mt-1 text-sm text-charcoal/60">{jobOpenings.length} total</p>
        </div>
        <Link
          href="/admin/job-openings/new"
          className="rounded-md bg-kraft px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kraft-dark"
        >
          Add Job Opening
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobOpenings.map((j) => (
              <tr key={j.id} className="border-b border-sand-deep last:border-b-0">
                <td className="px-4 py-3 font-medium text-charcoal">{j.title}</td>
                <td className="px-4 py-3 text-charcoal/70">{j.department}</td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">{j.employmentType}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      j.isOpen ? "bg-green/10 text-green" : "bg-charcoal/10 text-charcoal/60"
                    }`}
                  >
                    {j.isOpen ? "Open" : "Closed"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/job-openings/${j.id}/edit`} className="text-steel hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {jobOpenings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/50">
                  No job openings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
