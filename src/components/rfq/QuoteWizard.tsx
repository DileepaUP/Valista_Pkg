"use client";

import { useState } from "react";
import { INDUSTRIES, BOX_TYPES } from "@/data/types";
import { Button } from "@/components/ui/Button";

type Step = "industry" | "boxType" | "dimensions" | "contact" | "confirm";

const steps: Step[] = ["industry", "boxType", "dimensions", "contact", "confirm"];

export function QuoteWizard({ initialProductSlug }: { initialProductSlug?: string }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  const [form, setForm] = useState({
    industry: "",
    boxType: "",
    lengthMm: "",
    widthMm: "",
    depthMm: "",
    quantity: "",
    artworkFileName: "",
    contactName: "",
    companyName: "",
    email: "",
    phone: "",
    notes: initialProductSlug ? `Interested in product: ${initialProductSlug}` : "",
  });

  const step = steps[stepIndex];

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }

  function back() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: form.industry,
          boxType: form.boxType,
          lengthMm: Number(form.lengthMm),
          widthMm: Number(form.widthMm),
          depthMm: Number(form.depthMm),
          quantity: Number(form.quantity),
          artworkUrl: null,
          contactName: form.contactName,
          companyName: form.companyName,
          email: form.email,
          phone: form.phone,
          notes: form.artworkFileName
            ? `${form.notes}\n\nArtwork file (not yet uploaded — send separately): ${form.artworkFileName}`
            : form.notes,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-lg border border-sand-deep bg-white p-8 text-center">
        <p className="font-display text-xl font-semibold text-charcoal">Quote request received</p>
        <p className="mt-2 text-charcoal/60">
          We&apos;ll get back to you shortly at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-sand-deep bg-white p-8">
      <div className="mb-8 flex gap-2">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full ${i <= stepIndex ? "bg-kraft" : "bg-sand-deep"}`}
          />
        ))}
      </div>

      {step === "industry" && (
        <fieldset>
          <legend className="font-display text-lg font-medium text-charcoal">
            Which industry is this for?
          </legend>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry}
                type="button"
                onClick={() => update("industry", industry)}
                className={`rounded-md border px-3 py-2 text-sm ${form.industry === industry ? "border-kraft bg-kraft text-white" : "border-sand-deep text-charcoal"}`}
              >
                {industry}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === "boxType" && (
        <fieldset>
          <legend className="font-display text-lg font-medium text-charcoal">
            What box type do you need?
          </legend>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {BOX_TYPES.map((boxType) => (
              <button
                key={boxType}
                type="button"
                onClick={() => update("boxType", boxType)}
                className={`rounded-md border px-3 py-2 text-sm ${form.boxType === boxType ? "border-kraft bg-kraft text-white" : "border-sand-deep text-charcoal"}`}
              >
                {boxType}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === "dimensions" && (
        <fieldset>
          <legend className="font-display text-lg font-medium text-charcoal">
            Dimensions, quantity &amp; artwork
          </legend>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Field label="Length (mm)" value={form.lengthMm} onChange={(v) => update("lengthMm", v)} />
            <Field label="Width (mm)" value={form.widthMm} onChange={(v) => update("widthMm", v)} />
            <Field label="Depth (mm)" value={form.depthMm} onChange={(v) => update("depthMm", v)} />
          </div>
          <div className="mt-4">
            <Field label="Quantity" value={form.quantity} onChange={(v) => update("quantity", v)} />
          </div>
          <div className="mt-4">
            <label className="text-sm text-charcoal/60">Artwork (optional)</label>
            <input
              type="file"
              onChange={(e) => update("artworkFileName", e.target.files?.[0]?.name ?? "")}
              className="mt-1 block w-full text-sm text-charcoal"
            />
            <p className="mt-1 text-xs text-charcoal/40">
              File upload isn&apos;t wired up yet — we&apos;ll note the filename and follow up by email.
            </p>
          </div>
        </fieldset>
      )}

      {step === "contact" && (
        <fieldset>
          <legend className="font-display text-lg font-medium text-charcoal">Your details</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label="Contact name" value={form.contactName} onChange={(v) => update("contactName", v)} />
            <Field label="Company name" value={form.companyName} onChange={(v) => update("companyName", v)} />
            <Field label="Email" value={form.email} onChange={(v) => update("email", v)} type="email" />
            <Field label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
          </div>
          <div className="mt-4">
            <label className="text-sm text-charcoal/60">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="mt-1 w-full rounded-md border border-sand-deep px-3 py-2 text-sm"
              rows={3}
            />
          </div>
        </fieldset>
      )}

      {step === "confirm" && (
        <div>
          <p className="font-display text-lg font-medium text-charcoal">Review your request</p>
          <dl className="mt-4 space-y-2 text-sm text-charcoal">
            <Summary label="Industry" value={form.industry} />
            <Summary label="Box type" value={form.boxType} />
            <Summary
              label="Dimensions"
              value={`${form.lengthMm} x ${form.widthMm} x ${form.depthMm} mm (L x W x D)`}
            />
            <Summary label="Quantity" value={form.quantity} />
            <Summary label="Contact" value={`${form.contactName}, ${form.companyName}`} />
            <Summary label="Email" value={form.email} />
            <Summary label="Phone" value={form.phone} />
          </dl>
          {status === "error" && (
            <p className="mt-4 text-sm text-terracotta">
              Something went wrong submitting your request. Please try again.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="secondary"
          onClick={back}
          disabled={stepIndex === 0}
          className={stepIndex === 0 ? "invisible" : ""}
        >
          Back
        </Button>
        {step === "confirm" ? (
          <Button type="button" variant="primary" onClick={submit} disabled={status === "submitting"}>
            {status === "submitting" ? "Submitting..." : "Submit request"}
          </Button>
        ) : (
          <Button type="button" variant="primary" onClick={next}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm text-charcoal/60">
      {label}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
      />
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-sand-deep pb-2">
      <dt className="text-charcoal/60">{label}</dt>
      <dd className="font-mono">{value || "—"}</dd>
    </div>
  );
}
