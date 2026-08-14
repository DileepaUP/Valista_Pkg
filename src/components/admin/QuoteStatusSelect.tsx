"use client";

import { useTransition } from "react";
import { updateQuoteStatus } from "@/app/admin/(protected)/rfq/actions";
import type { QuoteStatus } from "@/generated/prisma/client";

const statuses: QuoteStatus[] = ["NEW", "CONTACTED", "QUOTED", "CLOSED"];

export function QuoteStatusSelect({ id, status }: { id: string; status: QuoteStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => startTransition(() => updateQuoteStatus(id, e.target.value as QuoteStatus))}
      className="rounded-md border border-sand-deep px-2 py-1 text-xs text-charcoal disabled:opacity-60"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
