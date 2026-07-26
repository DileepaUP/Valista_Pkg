import type { ManufacturingStep } from "./types";

// These steps describe the standard corrugated box manufacturing process
// (industry-general knowledge, not a fabricated claim about this specific
// factory's equipment). Confirm against Valista's actual production line
// before publishing — e.g. exact machinery, in-house vs. outsourced steps,
// and which of these (if any) don't apply to this factory.

export const manufacturingSteps: ManufacturingStep[] = [
  {
    order: 1,
    title: "Corrugating",
    description:
      "Kraft linerboard and fluting medium are fed through a corrugator, which heats, flutes, and glues the layers into single-wall, double-wall, or triple-wall corrugated board.",
  },
  {
    order: 2,
    title: "Printing",
    description:
      "Flexographic printing applies branding, product information, and handling marks directly onto the board (pre-print or post-print, depending on order).",
  },
  {
    order: 3,
    title: "Slotting & die-cutting",
    description:
      "Board is slotted and creased for standard RSC-style boxes, or run through a die-cutter for custom retail/display shapes.",
  },
  {
    order: 4,
    title: "Stitching or gluing",
    description: "Box blanks are joined at the manufacturer's joint by stitching or gluing, then flattened for shipping.",
  },
  {
    order: 5,
    title: "Quality inspection & testing",
    description:
      "Sample boxes are tested for Edge Crush Test (ECT), burst strength (Mullen), and Box Compression Test (BCT) performance against the customer's spec.",
  },
  {
    order: 6,
    title: "Bundling & dispatch",
    description: "Finished boxes are bundled, palletized, and dispatched to the customer or held in inventory.",
  },
];
