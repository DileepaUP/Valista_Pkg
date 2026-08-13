"use client";

import { useActionState } from "react";
import type { TeamMemberFormState } from "@/app/admin/(protected)/team-members/actions";

export interface TeamMemberFormValues {
  slug: string;
  name: string;
  role: string;
  photoUrl: string | null;
  bio: string;
  sortOrder: number;
  isPublished: boolean;
}

const empty: TeamMemberFormValues = {
  slug: "",
  name: "",
  role: "",
  photoUrl: null,
  bio: "",
  sortOrder: 0,
  isPublished: false,
};

const initialState: TeamMemberFormState = { error: null };

export function TeamMemberForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: TeamMemberFormState, formData: FormData) => Promise<TeamMemberFormState>;
  initialValues?: TeamMemberFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? empty;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-8">
      {state.error && <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={values.slug} error={state.fieldErrors?.slug} />
        <Field label="Name" name="name" defaultValue={values.name} error={state.fieldErrors?.name} />
        <Field label="Role" name="role" defaultValue={values.role} error={state.fieldErrors?.role} />
        <Field label="Photo URL (optional)" name="photoUrl" defaultValue={values.photoUrl ?? ""} />
        <NumberField label="Sort Order" name="sortOrder" defaultValue={values.sortOrder} />
      </section>

      <section className="rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Bio" name="bio" defaultValue={values.bio} error={state.fieldErrors?.bio} rows={4} />
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

function NumberField({ label, name, defaultValue }: { label: string; name: string; defaultValue: number }) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <input type="number" name={name} defaultValue={defaultValue} className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal" />
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
