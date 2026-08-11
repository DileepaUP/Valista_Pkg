import type { Metadata } from "next";
import Image from "next/image";
import { facilityPhotos } from "@/data/facility-photos";

export const metadata: Metadata = {
  title: "Factory & Facilities — Valista Packaging",
};

export default function FacilitiesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Factory &amp; Facilities</h1>
      <p className="mt-2 text-charcoal/60">Real photos from our factory and delivery fleet.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {facilityPhotos.map((photo) => (
          <div key={photo.src} className="relative aspect-4/3 overflow-hidden rounded-lg bg-sand-deep">
            <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
