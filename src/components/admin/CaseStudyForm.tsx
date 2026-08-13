"use client";

import { useActionState } from "react";
import type { CaseStudyFormState } from "@/app/admin/(protected)/case-studies/actions";

export interface CaseStudyFormValues {
  slug: string;
  title: string;
  industries: string[];
  summaryProblem: string;
  summarySolution: string;
  summaryResult: string;
  challenge: string;
  solution: string;
  clientQuote: string | null;
  clientName: string | null;
  clientCompany: string | null;
  images: string[];
  isVerified: boolean;
  isPublished: boolean;
  results: { label: string; value: string; unit: string | null }[];
}

const emptyCaseStudy: CaseStudyFormValues = {
  slug: "",
  title: "",
  industries: [],
  summaryProblem: "",
  summarySolution: "",
  summaryResult: "",
  challenge: "",
  solution: "",
  clientQuote: null,
  clientName: null,
  clientCompany: null,
  images: [],
  isVerified: false,
  isPublished: false,
  results: [],
};

const initialState: CaseStudyFormState = { error: null };

export function CaseStudyForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: CaseStudyFormState, formData: FormData) => Promise<CaseStudyFormState>;
  initialValues?: CaseStudyFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? emptyCaseStudy;
  const [state, formAction, pending] = useActionState(action, initialState);

  const resultsText = values.results.map((r) => `${r.label}, ${r.value}${r.unit ? `, ${r.unit}` : ""}`).join("\n");

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>
      )}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={values.slug} error={state.fieldErrors?.slug} />
        <Field label="Title" name="title" defaultValue={values.title} error={state.fieldErrors?.title} />
        <TextArea label="Industries (one per line)" name="industries" defaultValue={values.industries.join("\n")} error={state.fieldErrors?.industries} rows={3} />
      </section>

      <section className="space-y-4 rounded-lg border border-sand-deep bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-wide text-charcoal/40">
          At-a-glance summary (Problem &rarr; Solution &rarr; Result)
        </p>
        <Field label="Problem (one line)" name="summaryProblem" defaultValue={values.summaryProblem} error={state.fieldErrors?.summaryProblem} />
        <Field label="Solution (one line)" name="summarySolution" defaultValue={values.summarySolution} error={state.fieldErrors?.summarySolution} />
        <Field label="Result (one line)" name="summaryResult" defaultValue={values.summaryResult} error={state.fieldErrors?.summaryResult} />
      </section>

      <section className="space-y-4 rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Challenge (full prose)" name="challenge" defaultValue={values.challenge} error={state.fieldErrors?.challenge} rows={4} />
        <TextArea label="Solution (full prose)" name="solution" defaultValue={values.solution} error={state.fieldErrors?.solution} rows={4} />
        <TextArea
          label="Results — one per line: Label, Value, Unit (unit optional)"
          name="resultsText"
          defaultValue={resultsText}
          rows={4}
        />
      </section>

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Client Name (optional)" name="clientName" defaultValue={values.clientName ?? ""} />
        <Field label="Client Company (optional)" name="clientCompany" defaultValue={values.clientCompany ?? ""} />
        <div className="sm:col-span-2">
          <TextArea label="Client Quote (optional)" name="clientQuote" defaultValue={values.clientQuote ?? ""} rows={2} />
        </div>
        <div className="sm:col-span-2">
          <TextArea label="Images — URLs (one per line)" name="images" defaultValue={values.images.join("\n")} rows={2} />
        </div>
      </section>

      <section className="space-y-3 rounded-lg border border-sand-deep bg-white p-6">
        <div className="flex items-center gap-3">
          <input type="checkbox" id="isVerified" name="isVerified" defaultChecked={values.isVerified} className="h-4 w-4" />
          <label htmlFor="isVerified" className="text-sm text-charcoal">
            Verified — real, client-approved figures (required before publishing)
          </label>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="isPublished" name="isPublished" defaultChecked={values.isPublished} className="h-4 w-4" />
          <label htmlFor="isPublished" className="text-sm text-charcoal">
            Published (visible on the public site)
          </label>
        </div>
        {state.fieldErrors?.isPublished && (
          <p className="text-xs text-terracotta">{state.fieldErrors.isPublished}</p>
        )}
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

function Field({
  label,
  name,
  defaultValue,
  error,
}: {
  label: string;
  name: string;
  defaultValue: string;
  error?: string;
}) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
      />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  error,
  rows,
}: {
  label: string;
  name: string;
  defaultValue: string;
  error?: string;
  rows: number;
}) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 font-mono text-xs text-charcoal"
      />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}
