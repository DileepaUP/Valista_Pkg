"use client";

import { useEffect, useRef, useState } from "react";

// Animates the leading numeric portion of a stat value (e.g. "5M+" → counts
// 0→5 then appends "M+") when it scrolls into view. Falls back to showing
// the final value immediately if IntersectionObserver is unavailable, and
// naturally respects prefers-reduced-motion since the animation just runs
// via requestAnimationFrame over a short duration — reduced-motion users
// still get a fast, non-distracting count rather than a frozen 0.
export function CountUpStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState<string>("0");

  const match = value.match(/^(\d+)(.*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  useEffect(() => {
    const node = ref.current;
    if (!node || numericTarget === null) {
      setDisplay(value);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? 1 : 1200;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const current = Math.round(progress * (numericTarget ?? 0));
          setDisplay(`${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numericTarget, suffix, value]);

  return (
    <div className="text-center">
      <p ref={ref} className="font-mono text-3xl font-semibold text-charcoal sm:text-4xl">
        {display}
      </p>
      <p className="mt-1 text-sm text-charcoal/60">{label}</p>
    </div>
  );
}
