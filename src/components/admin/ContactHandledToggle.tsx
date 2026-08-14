"use client";

import { useTransition } from "react";
import { toggleContactHandled } from "@/app/admin/(protected)/contacts/actions";

export function ContactHandledToggle({ id, handled }: { id: string; handled: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-xs text-charcoal">
      <input
        type="checkbox"
        defaultChecked={handled}
        disabled={pending}
        onChange={(e) => startTransition(() => toggleContactHandled(id, e.target.checked))}
        className="h-4 w-4"
      />
      Handled
    </label>
  );
}
