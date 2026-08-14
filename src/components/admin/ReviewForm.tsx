"use client";

import { useActionState } from "react";
import type { ReviewFormState } from "@/app/admin/(protected)/reviews/actions";
import { INDUSTRIES } from "@/data/types";

export interface ReviewFormValues {
  customerName: string;
  company: string;
  industry: string;
  rating: number;
  quote: string;
  isPublished: boolean;
}

const empty: ReviewFormValues = {
  customerName: "",
  company: "",
  industry: INDUSTRIES[0],
  rating: 5,
  quote: "",
  isPublished: false,
};

const initialState: ReviewFormState = { error: null };

export function ReviewForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: ReviewFormState, formData: FormData) => Promise<ReviewFormState>;
  initialValues?: ReviewFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? empty;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Customer Name" name="customerName" defaultValue={values.customerName} error={state.fieldErrors?.customerName} />
        <Field label="Company" name="company" defaultValue={values.company} error={state.fieldErrors?.company} />

        <label className="block text-sm text-charcoal/60">
          Industry
          <select
            name="industry"
            defaultValue={values.industry}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          {state.fieldErrors?.industry && <span className="mt-1 block text-xs text-terracotta">{state.fieldErrors.industry}</span>}
        </label>

        <label className="block text-sm text-charcoal/60">
          Rating
          <select
            name="rating"
            defaultValue={values.rating}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Quote" name="quote" defaultValue={values.quote} error={state.fieldErrors?.quote} rows={4} />
      </section>

      <section className="flex items-center gap-3 rounded-lg border border-sand-deep bg-white p-6">
        <input type="checkbox" id="isPublished" name="isPublished" defaultChecked={values.isPublished} className="h-4 w-4" />
        <label htmlFor="isPublished" className="text-sm text-charcoal">
          Published (visible on the public site)
        </label>
      </section>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-kraft px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-kraft-dark disabled:opacity-60"
        >
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, error }: { label: string; name: string; defaultValue: string; error?: string }) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <input type="text" name={name} defaultValue={defaultValue} className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal" />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}

function TextArea({ label, name, defaultValue, error, rows }: { label: string; name: string; defaultValue: string; error?: string; rows: number }) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <textarea name={name} defaultValue={defaultValue} rows={rows} className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal" />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}
