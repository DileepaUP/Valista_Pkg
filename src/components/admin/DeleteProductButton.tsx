"use client";

export function DeleteProductButton({ action }: { action: () => Promise<void> }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this product? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-md border border-terracotta px-4 py-2 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta/10"
      >
        Delete Product
      </button>
    </form>
  );
}
