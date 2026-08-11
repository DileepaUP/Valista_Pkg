import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalRfq, newRfq, totalContacts, unhandledContacts] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { handled: false } }),
  ]);

  const cards = [
    { label: "New RFQ Requests", value: newRfq, sub: `${totalRfq} total` },
    { label: "Unhandled Messages", value: unhandledContacts, sub: `${totalContacts} total` },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Dashboard</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Product and Case Study management arrive in the next phase.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-sand-deep bg-white p-6">
            <p className="font-mono text-3xl font-semibold text-charcoal">{card.value}</p>
            <p className="mt-1 text-sm text-charcoal/60">{card.label}</p>
            <p className="mt-1 text-xs text-charcoal/40">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
