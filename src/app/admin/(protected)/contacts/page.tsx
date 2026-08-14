import { prisma } from "@/lib/prisma";
import { ContactHandledToggle } from "@/components/admin/ContactHandledToggle";

export default async function AdminContactsPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div>
        <h1 className="font-display text-2xl font-semibold text-charcoal">Messages</h1>
        <p className="mt-1 text-sm text-charcoal/60">{messages.length} total</p>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-b border-sand-deep align-top last:border-b-0">
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">
                  {m.createdAt.toISOString().slice(0, 10)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-charcoal">{m.name}</p>
                  <p className="text-xs text-charcoal/60">{m.email}</p>
                  {m.phone && <p className="text-xs text-charcoal/60">{m.phone}</p>}
                </td>
                <td className="px-4 py-3 text-charcoal/70">{m.subject}</td>
                <td className="px-4 py-3 max-w-sm text-xs text-charcoal/60">{m.message}</td>
                <td className="px-4 py-3">
                  <ContactHandledToggle id={m.id} handled={m.handled} />
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/50">
                  No messages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
