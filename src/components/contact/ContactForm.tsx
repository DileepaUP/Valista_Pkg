"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
        <p className="font-display text-xl font-semibold text-charcoal">Message sent</p>
        <p className="mt-2 text-charcoal/60">We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-sand-deep bg-white p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-charcoal/60">
          Name
          <input
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
        <label className="block text-sm text-charcoal/60">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
        <label className="block text-sm text-charcoal/60">
          Phone (optional)
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
        <label className="block text-sm text-charcoal/60">
          Subject
          <input
            required
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
          />
        </label>
      </div>
      <label className="mt-4 block text-sm text-charcoal/60">
        Message
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="mt-1 block w-full rounded-md border border-sand-deep px-3 py-2 text-sm text-charcoal"
        />
      </label>

      {status === "error" && (
        <p className="mt-4 text-sm text-terracotta">Something went wrong. Please try again.</p>
      )}

      <div className="mt-6">
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
