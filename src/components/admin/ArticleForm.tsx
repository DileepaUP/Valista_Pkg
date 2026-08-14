"use client";

import { useActionState } from "react";
import type { ArticleFormState } from "@/app/admin/(protected)/articles/actions";

const ARTICLE_CATEGORIES = ["Packaging Guides", "Sustainability", "Industry News"] as const;

export interface ArticleFormValues {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string[];
  coverImageUrl: string | null;
  author: string;
  publishedAt: string;
  isPublished: boolean;
}

const empty: ArticleFormValues = {
  slug: "",
  title: "",
  category: "Packaging Guides",
  excerpt: "",
  body: [],
  coverImageUrl: null,
  author: "Valista Packaging Team",
  publishedAt: new Date().toISOString().slice(0, 10),
  isPublished: false,
};

const initialState: ArticleFormState = { error: null };

export function ArticleForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: ArticleFormState, formData: FormData) => Promise<ArticleFormState>;
  initialValues?: ArticleFormValues;
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
        <label className="block text-sm text-charcoal/60">
          Category
          <select
            name="category"
            defaultValue={values.category}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          >
            {ARTICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <Field label="Author" name="author" defaultValue={values.author} error={state.fieldErrors?.author} />
        <label className="block text-sm text-charcoal/60">
          Published Date
          <input
            type="date"
            name="publishedAt"
            defaultValue={values.publishedAt}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
          {state.fieldErrors?.publishedAt && (
            <span className="mt-1 block text-xs text-terracotta">{state.fieldErrors.publishedAt}</span>
          )}
        </label>
        <Field label="Cover Image URL (optional)" name="coverImageUrl" defaultValue={values.coverImageUrl ?? ""} />
      </section>

      <section className="space-y-4 rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Excerpt" name="excerpt" defaultValue={values.excerpt} error={state.fieldErrors?.excerpt} rows={2} />
        <TextArea
          label="Body — separate paragraphs with a blank line"
          name="body"
          defaultValue={values.body.join("\n\n")}
          error={state.fieldErrors?.body}
          rows={12}
        />
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
