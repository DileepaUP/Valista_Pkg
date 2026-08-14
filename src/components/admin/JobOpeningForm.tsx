"use client";

import { useActionState } from "react";
import type { JobOpeningFormState } from "@/app/admin/(protected)/job-openings/actions";

const EMPLOYMENT_TYPES = ["Full-Time", "Part-Time", "Contract", "Internship"] as const;

export interface JobOpeningFormValues {
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  isOpen: boolean;
  postedAt: string;
}

const empty: JobOpeningFormValues = {
  slug: "",
  title: "",
  department: "",
  location: "",
  employmentType: "Full-Time",
  summary: "",
  responsibilities: [],
  requirements: [],
  isOpen: true,
  postedAt: new Date().toISOString().slice(0, 10),
};

const initialState: JobOpeningFormState = { error: null };

export function JobOpeningForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: JobOpeningFormState, formData: FormData) => Promise<JobOpeningFormState>;
  initialValues?: JobOpeningFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? empty;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={values.slug} error={state.fieldErrors?.slug} />
        <Field label="Title" name="title" defaultValue={values.title} error={state.fieldErrors?.title} />
        <Field label="Department" name="department" defaultValue={values.department} error={state.fieldErrors?.department} />
        <Field label="Location" name="location" defaultValue={values.location} error={state.fieldErrors?.location} />
        <label className="block text-sm text-charcoal/60">
          Employment Type
          <select
            name="employmentType"
            defaultValue={values.employmentType}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          >
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm text-charcoal/60">
          Posted Date
          <input
            type="date"
            name="postedAt"
            defaultValue={values.postedAt}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
      </section>

      <section className="space-y-4 rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Summary" name="summary" defaultValue={values.summary} error={state.fieldErrors?.summary} rows={2} />
        <TextArea
          label="Responsibilities (one per line)"
          name="responsibilities"
          defaultValue={values.responsibilities.join("\n")}
          error={state.fieldErrors?.responsibilities}
          rows={4}
        />
        <TextArea
          label="Requirements (one per line)"
          name="requirements"
          defaultValue={values.requirements.join("\n")}
          error={state.fieldErrors?.requirements}
          rows={4}
        />
      </section>

      <section className="flex items-center gap-3 rounded-lg border border-sand-deep bg-white p-6">
        <input type="checkbox" id="isOpen" name="isOpen" defaultChecked={values.isOpen} className="h-4 w-4" />
        <label htmlFor="isOpen" className="text-sm text-charcoal">
          Open (visible and applyable on the public site)
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
