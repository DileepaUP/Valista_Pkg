import type { FacilityPhoto } from "./types";

// Real client-supplied factory photos (from imgs/, per docs/CLAUDE.md §1),
// copied into public/images/facility/. Unlike the text placeholders elsewhere
// in src/data, these are genuine photography — not fabricated content — per
// docs/CLAUDE.md §4's "real client photography ... instead of stock imagery".

export const facilityPhotos: FacilityPhoto[] = Array.from({ length: 17 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    src: `/images/facility/factory-${num}.jpeg`,
    alt: "Valista Packaging factory and delivery fleet",
  };
});
