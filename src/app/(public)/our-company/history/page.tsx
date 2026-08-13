import type { Metadata } from "next";
import { getMilestones } from "@/lib/queries/milestones";
import { MilestoneTimeline } from "@/components/timeline/MilestoneTimeline";

export const metadata: Metadata = {
  title: "Our History — Valista Packaging",
};

export default async function HistoryPage() {
  const milestones = await getMilestones();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Our History</h1>
      <p className="mt-2 text-charcoal/60">Our story, year by year. Filter by milestone type below.</p>
      <div className="mt-10">
        <MilestoneTimeline milestones={milestones} />
      </div>
    </div>
  );
}
