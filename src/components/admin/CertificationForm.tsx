"use client";

import { useActionState } from "react";
import type { CertificationFormState } from "@/app/admin/(protected)/certifications/actions";

export interface CertificationFormValues {
  name: string;
  issuingBody: string;
  certificationCode: string;
  badgeImageUrl: string | null;
  pdfUrl: string | null;
  issueDate: string;
  renewalDate: string;
  isPublished: boolean;
}

const emptyCertification: CertificationFormValues = {
  name: "",
  issuingBody: "",
  certificationCode: "",
  badgeImageUrl: null,
  pdfUrl: null,
  issueDate: "",
  renewalDate: "",
  isPublished: false,
};

const initialState: CertificationFormState = { error: null };

export function CertificationForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: CertificationFormState, formData: FormData) => Promise<CertificationFormState>;
  initialValues?: CertificationFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? emptyCertification;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>
      )}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={values.name} error={state.fieldErrors?.name} />
        <Field label="Issuing Body" name="issuingBody" defaultValue={values.issuingBody} error={state.fieldErrors?.issuingBody} />
        <Field
          label="Certification Code"
          name="certificationCode"
          defaultValue={values.certificationCode}
          error={state.fieldErrors?.certificationCode}
        />
        <Field label="Badge Image URL (optional)" name="badgeImageUrl" defaultValue={values.badgeImageUrl ?? ""} />
        <Field label="PDF URL (optional)" name="pdfUrl" defaultValue={values.pdfUrl ?? ""} />
      </section>

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <DateField label="Issue Date" name="issueDate" defaultValue={values.issueDate} error={state.fieldErrors?.issueDate} />
        <DateField label="Renewal Date" name="renewalDate" defaultValue={values.renewalDate} error={state.fieldErrors?.renewalDate} />
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

function DateField({
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
        type="date"
        name={name}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
      />
      {error && <span className="mt-1 block text-xs text-terracotta">{error}</span>}
    </label>
  );
}
