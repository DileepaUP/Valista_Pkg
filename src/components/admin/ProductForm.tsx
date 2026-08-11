"use client";

import { useActionState } from "react";
import type { ProductFormState } from "@/app/admin/(protected)/products/actions";

export interface ProductFormValues {
  slug: string;
  name: string;
  categories: string[];
  industries: string[];
  boxType: string;
  shortDescription: string;
  description: string;
  applications: string[];
  features: string[];
  fluteType: string;
  wallType: string;
  boardGrade: string;
  ectRatingKnM: number;
  burstStrengthKpa: number;
  maxStackLoadKg: number;
  printingOptions: string[];
  moq: string;
  specSheetUrl: string | null;
  images: string[];
  relatedProductSlugs: string[];
  isPublished: boolean;
  standardSizes: { label: string; lengthMm: number; widthMm: number; depthMm: number }[];
}

const emptyProduct: ProductFormValues = {
  slug: "",
  name: "",
  categories: [],
  industries: [],
  boxType: "",
  shortDescription: "",
  description: "",
  applications: [],
  features: [],
  fluteType: "",
  wallType: "",
  boardGrade: "",
  ectRatingKnM: 0,
  burstStrengthKpa: 0,
  maxStackLoadKg: 0,
  printingOptions: [],
  moq: "",
  specSheetUrl: null,
  images: [],
  relatedProductSlugs: [],
  isPublished: false,
  standardSizes: [],
};

const initialState: ProductFormState = { error: null };

export function ProductForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  initialValues?: ProductFormValues;
  submitLabel: string;
}) {
  const values = initialValues ?? emptyProduct;
  const [state, formAction, pending] = useActionState(action, initialState);

  const standardSizesText = values.standardSizes
    .map((s) => `${s.label}, ${s.lengthMm}, ${s.widthMm}, ${s.depthMm}`)
    .join("\n");

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <p className="rounded-md bg-terracotta/10 px-4 py-3 text-sm text-terracotta">{state.error}</p>
      )}

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <Field label="Slug" name="slug" defaultValue={values.slug} error={state.fieldErrors?.slug} />
        <Field label="Name" name="name" defaultValue={values.name} error={state.fieldErrors?.name} />
        <Field label="Box Type" name="boxType" defaultValue={values.boxType} error={state.fieldErrors?.boxType} />
        <Field label="Flute Type" name="fluteType" defaultValue={values.fluteType} error={state.fieldErrors?.fluteType} />
        <Field label="Wall Type" name="wallType" defaultValue={values.wallType} error={state.fieldErrors?.wallType} />
        <Field label="Board Grade" name="boardGrade" defaultValue={values.boardGrade} error={state.fieldErrors?.boardGrade} />
        <Field label="MOQ" name="moq" defaultValue={values.moq} error={state.fieldErrors?.moq} />
        <Field
          label="Spec Sheet URL (optional)"
          name="specSheetUrl"
          defaultValue={values.specSheetUrl ?? ""}
          error={state.fieldErrors?.specSheetUrl}
        />
      </section>

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-3">
        <NumberField label="ECT Rating (kN/m)" name="ectRatingKnM" defaultValue={values.ectRatingKnM} />
        <NumberField label="Burst Strength (kPa)" name="burstStrengthKpa" defaultValue={values.burstStrengthKpa} />
        <NumberField label="Max Stack Load (kg)" name="maxStackLoadKg" defaultValue={values.maxStackLoadKg} />
      </section>

      <section className="space-y-4 rounded-lg border border-sand-deep bg-white p-6">
        <TextArea label="Short Description" name="shortDescription" defaultValue={values.shortDescription} error={state.fieldErrors?.shortDescription} rows={2} />
        <TextArea label="Full Description" name="description" defaultValue={values.description} error={state.fieldErrors?.description} rows={4} />
      </section>

      <section className="grid gap-6 rounded-lg border border-sand-deep bg-white p-6 sm:grid-cols-2">
        <TextArea label="Categories (one per line)" name="categories" defaultValue={values.categories.join("\n")} error={state.fieldErrors?.categories} rows={4} />
        <TextArea label="Industries (one per line)" name="industries" defaultValue={values.industries.join("\n")} error={state.fieldErrors?.industries} rows={4} />
        <TextArea label="Applications (one per line)" name="applications" defaultValue={values.applications.join("\n")} rows={4} />
        <TextArea label="Features (one per line)" name="features" defaultValue={values.features.join("\n")} rows={4} />
        <TextArea label="Printing Options (one per line)" name="printingOptions" defaultValue={values.printingOptions.join("\n")} rows={3} />
        <TextArea label="Images — URLs (one per line)" name="images" defaultValue={values.images.join("\n")} rows={3} />
        <TextArea label="Related Product Slugs (one per line)" name="relatedProductSlugs" defaultValue={values.relatedProductSlugs.join("\n")} rows={3} />
        <TextArea
          label="Standard Sizes — one per line: Label, Length, Width, Depth (mm)"
          name="standardSizesText"
          defaultValue={standardSizesText}
          rows={3}
        />
      </section>

      <section className="flex items-center gap-3 rounded-lg border border-sand-deep bg-white p-6">
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          defaultChecked={values.isPublished}
          className="h-4 w-4"
        />
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

function NumberField({ label, name, defaultValue }: { label: string; name: string; defaultValue: number }) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <input
        type="number"
        step="any"
        name={name}
        defaultValue={defaultValue}
        className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
      />
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
