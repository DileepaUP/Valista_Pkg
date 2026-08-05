import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Valista Packaging",
};

// Address per docs/CLAUDE.md §1/§9 — pulled from client truck signage, still
// unverified. Keep this note until confirmed real before launch.
const ADDRESS = "No. 89/K, Samanthi Mawatha, Sri Lanka";

const workingHours = [
  { day: "Monday – Friday", hours: "8:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Contact Us</h1>
      <p className="mt-2 text-charcoal/60">
        076 588 75 76 &middot; 011 240 0838 &middot; info@valista.lk
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-display text-lg font-medium text-charcoal">Working Hours</h2>
            <dl className="mt-3 space-y-1 text-sm text-charcoal/70">
              {workingHours.map((row) => (
                <div key={row.day} className="flex justify-between border-b border-sand-deep pb-1">
                  <dt>{row.day}</dt>
                  <dd className="font-mono">{row.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-lg font-medium text-charcoal">Find Us</h2>
            <p className="mt-1 text-sm text-charcoal/50">
              {ADDRESS}{" "}
              <span className="text-charcoal/40">(address pending client verification)</span>
            </p>
            <div className="mt-3 aspect-4/3 overflow-hidden rounded-lg border border-sand-deep">
              <iframe
                title="Valista Packaging location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
