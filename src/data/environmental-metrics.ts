import type { EnvironmentalMetric } from "./types";

// SAMPLE DATA — per docs/CLAUDE.md §9, replace with real, measured figures
// before launch. Metric labels use real corrugated-industry sustainability
// KPIs (recycled fiber content, production waste diverted, CO2 per ton of
// board) rather than generic "green" claims.

export const environmentalMetrics: EnvironmentalMetric[] = [
  {
    label: "Recycled fiber content in board",
    value: "65",
    unit: "%",
    year: 2026,
    target: "75",
    category: "Materials",
    isSeedData: true,
  },
  {
    label: "Production waste diverted from landfill",
    value: "92",
    unit: "%",
    year: 2026,
    target: "98",
    category: "Waste Management",
    isSeedData: true,
  },
  {
    label: "Trim/offcut waste reused as pulp feedstock",
    value: "88",
    unit: "%",
    year: 2026,
    target: null,
    category: "Waste Management",
    isSeedData: true,
  },
  {
    label: "CO2 emissions per tonne of board produced",
    value: "310",
    unit: "kg CO2e / tonne",
    year: 2026,
    target: "260",
    category: "Carbon Reduction",
    isSeedData: true,
  },
];

export function getMetricsByCategory(category: string): EnvironmentalMetric[] {
  return environmentalMetrics.filter((m) => m.category === category);
}
