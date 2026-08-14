import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">Reviews</h1>
          <p className="mt-1 text-sm text-charcoal/60">{reviews.length} total</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="rounded-md bg-kraft px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kraft-dark"
        >
          Add Review
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-sand-deep last:border-b-0">
                <td className="px-4 py-3 font-medium text-charcoal">{r.customerName}</td>
                <td className="px-4 py-3 text-charcoal/70">{r.company}</td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">{r.rating} / 5</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      r.isPublished ? "bg-green/10 text-green" : "bg-charcoal/10 text-charcoal/60"
                    }`}
                  >
                    {r.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/reviews/${r.id}/edit`} className="text-steel hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/50">
                  No reviews yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
