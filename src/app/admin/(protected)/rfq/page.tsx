import { prisma } from "@/lib/prisma";
import { QuoteStatusSelect } from "@/components/admin/QuoteStatusSelect";

export default async function AdminRfqPage() {
  const quotes = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal">RFQ Inbox</h1>
        <p className="mt-1 text-sm text-charcoal/60">{quotes.length} total</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Spec</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-b border-sand-deep align-top last:border-b-0">
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">
                  {q.createdAt.toISOString().slice(0, 10)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal">{q.contactName}</p>
                  <p className="text-xs text-charcoal/60">{q.companyName}</p>
                  <p className="text-xs text-charcoal/60">{q.email}</p>
                  <p className="text-xs text-charcoal/60">{q.phone}</p>
                </td>
                <td className="px-4 py-3 text-xs text-charcoal/70">
                  <p>{q.industry} &middot; {q.boxType}</p>
                  <p>
                    {q.lengthMm} &times; {q.widthMm} &times; {q.depthMm} mm
                  </p>
                  {q.artworkUrl && (
                    <a href={q.artworkUrl} className="text-steel hover:underline" target="_blank" rel="noreferrer">
                      Artwork
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 text-charcoal/70">{q.quantity}</td>
                <td className="px-4 py-3 max-w-xs text-xs text-charcoal/60">{q.notes}</td>
                <td className="px-4 py-3">
                  <QuoteStatusSelect id={q.id} status={q.status} />
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-charcoal/50">
                  No quote requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
