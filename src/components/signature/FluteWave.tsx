// The one deliberate signature visual for the site — an SVG repeating wave
// pattern shaped like a cross-section of corrugated board. Used as the
// hero-to-content divider and, sparingly, as a small underline accent.
// See docs/CLAUDE.md §4 "Signature element".

export function FluteWave({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 6 C 5 0, 10 12, 15 6 S 25 0, 30 6 S 40 12, 45 6 S 55 0, 60 6 S 70 12, 75 6 S 85 0, 90 6 S 100 12, 105 6 S 115 0, 120 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
