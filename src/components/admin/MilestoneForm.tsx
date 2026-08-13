"use client";

import { useActionState } from "react";
import type { MilestoneFormState } from "@/app/admin/(protected)/milestones/actions";

const MILESTONE_TYPES = ["Founding", "Expansion", "Certification", "Award", "Sustainability"] as const;

export interface MilestoneFormValues {
  slug: string;
  year: number;
  title: string;
  description: string;
  type: string;
  isPublished: boolean;
}

const empty: MilestoneFormValues = {
  slug: "",
  year: new Date().getFullYear(),
  title: "",
  description: "",
  type: "Founding",
  isPublished: false,
};

const initialState: MilestoneFormState = { error: null };

export function MilestoneForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: MilestoneFormState, formData: FormData) => Promise<MilestoneFormState>;
  initialValues?: MilestoneFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? empty;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={values.slug} error={state.fieldErrors?.slug} />
        <label className="block text-sm text-charcoal/60">
          Year
          <input
            type="number"
            name="year"
            defaultValue={values.year}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
        <Field label="Title" name="title" defaultValue={values.title} error={state.fieldErrors?.title} />
        <label className="block text-sm text-charcoal/60">
          Type
          <select
            name="type"
            defaultValue={values.type}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          >
            {MILESTONE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Description" name="description" defaultValue={values.description} error={state.fieldErrors?.description} rows={4} />
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
