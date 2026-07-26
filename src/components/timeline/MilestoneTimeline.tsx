"use client";

import { useState } from "react";
import type { Milestone, MilestoneType } from "@/data/types";

const TYPES: MilestoneType[] = ["Founding", "Expansion", "Certification", "Award", "Sustainability"];

export function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  const [activeType, setActiveType] = useState<MilestoneType | null>(null);

  const visible = milestones
    .filter((m) => !activeType || m.type === activeType)
    .sort((a, b) => a.year - b.year);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveType(null)}
          className={`rounded-full px-3 py-1 text-sm ${!activeType ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
        >
          All
        </button>
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`rounded-full px-3 py-1 text-sm ${activeType === type ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <ol className="mt-8 space-y-6 border-l-2 border-sand-deep pl-6">
        {visible.map((milestone) => (
          <li key={`${milestone.year}-${milestone.title}`} className="relative">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-kraft" />
            <p className="font-mono text-sm text-steel">{milestone.year}</p>
            <p className="mt-1 font-display text-lg font-medium text-charcoal">{milestone.title}</p>
            <p className="mt-1 text-sm text-charcoal/60">{milestone.description}</p>
          </li>
        ))}
        {visible.length === 0 && <p className="text-charcoal/60">No milestones of this type yet.</p>}
      </ol>
    </div>
  );
}
