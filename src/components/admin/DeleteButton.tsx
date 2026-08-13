"use client";

export function DeleteButton({ action, label }: { action: () => Promise<void>; label: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${label}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-terracotta px-4 py-2 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/10"
      >
        {label}
      </button>
    </form>
  );
}
