import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">Case Studies</h1>
          <p className="mt-1 text-sm text-charcoal/60">{caseStudies.length} total</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="rounded-md bg-kraft px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kraft-dark"
        >
          Add Case Study
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseStudies.map((cs) => (
              <tr key={cs.id} className="border-b border-sand-deep last:border-b-0">
                <td className="px-4 py-3 font-medium text-charcoal">{cs.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">{cs.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      cs.isVerified ? "bg-green/10 text-green" : "bg-terracotta/10 text-terracotta"
                    }`}
                  >
                    {cs.isVerified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      cs.isPublished ? "bg-green/10 text-green" : "bg-charcoal/10 text-charcoal/60"
                    }`}
                  >
                    {cs.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/case-studies/${cs.id}/edit`} className="text-steel hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {caseStudies.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/50">
                  No case studies yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
