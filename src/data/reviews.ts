import type { Review } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, these are illustrative sample reviews,
// not real customer statements. Replace with real, permissioned customer
// reviews (e.g. pulled from Google Business Profile) before launch — never
// substitute these for real testimonials without the customer's consent.

export const reviews: Review[] = [
  {
    customerName: "K. Ranasinghe",
    company: "Ceylon Fresh Foods",
    industry: "Food & Beverage",
    rating: 5,
    quote:
      "We switched to Valista for our export cartons after damage claims from our old supplier. The spec sheet they sent with the quote had actual ECT numbers — first time a supplier gave us test data instead of just a price.",
    isSeedData: true,
  },
  {
    customerName: "S. Perera",
    company: "Island Organics",
    industry: "Agriculture",
    rating: 5,
    quote:
      "Fast turnaround on a custom die-cut box for our retail launch. Good communication throughout and the print quality matched the proof.",
    isSeedData: true,
  },
  {
    customerName: "M. Fernando",
    company: "Lanka Electro Components",
    industry: "Electronics",
    rating: 4,
    quote:
      "Solid heavy-duty cartons for our export shipments. Lead time was a bit longer than quoted during a busy month, but the boxes held up well in transit.",
    isSeedData: true,
  },
];
