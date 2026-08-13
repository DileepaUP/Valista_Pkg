import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/queries/team-members";

export const metadata: Metadata = {
  title: "Leadership Team — Valista Packaging",
};

export default async function LeadershipPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Leadership Team</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {teamMembers.map((member) => (
          <div key={member.slug} className="rounded-lg border border-sand-deep bg-white p-6">
            <p className="font-display text-lg font-medium text-charcoal">{member.name}</p>
            <p className="mt-1 font-mono text-sm text-steel">{member.role}</p>
            <p className="mt-3 text-sm text-charcoal/60">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
