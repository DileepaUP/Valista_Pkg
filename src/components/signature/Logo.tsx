// Brand mark: a two-tone diamond formed from two offset triangles (kraft +
// steel, our two brand action colors — see docs/CLAUDE.md §4), paired with a
// bold two-tone wordmark. Reads as an abstract folded box-flap/corner, tying
// back to packaging without being a literal box icon.

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 3 L35 19 L20 19 Z" fill="var(--color-kraft)" />
      <path d="M20 21 L5 21 L20 37 Z" fill="var(--color-steel)" />
    </svg>
  );
}

// Designed for dark backgrounds (Nav/Footer are both charcoal) — "VALISTA"
// is hardcoded white rather than currentColor.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="whitespace-nowrap font-display text-lg font-bold tracking-tight">
        <span className="text-white">VALISTA</span>{" "}
        <span className="text-kraft-light">PACKAGING</span>
      </span>
    </span>
  );
}
