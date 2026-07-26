import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Valista Packaging",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Contact Us</h1>
      <p className="mt-2 text-charcoal/60">
        076 588 75 76 &middot; 011 240 0838 &middot; info@valista.lk
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
