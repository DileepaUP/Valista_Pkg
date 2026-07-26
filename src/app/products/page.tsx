import Link from "next/link";
import { products } from "@/data/products";
import { PRODUCT_CATEGORIES } from "@/data/types";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const category =
    typeof resolvedSearchParams.category === "string" ? resolvedSearchParams.category : undefined;
  const industry =
    typeof resolvedSearchParams.industry === "string" ? resolvedSearchParams.industry : undefined;
  const boxType =
    typeof resolvedSearchParams.boxType === "string" ? resolvedSearchParams.boxType : undefined;

  const industries = Array.from(new Set(products.flatMap((p) => p.industries)));
  const boxTypes = Array.from(new Set(products.map((p) => p.boxType)));

  const filtered = products.filter(
    (p) =>
      (!category || p.categories.includes(category as (typeof p.categories)[number])) &&
      (!industry || p.industries.includes(industry as (typeof p.industries)[number])) &&
      (!boxType || p.boxType === boxType)
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Products & Solutions</h1>
      <p className="mt-2 text-charcoal/60">
        Browse by category, industry, or box type. Every product page includes full technical specs.
      </p>

      <div className="mt-8 space-y-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-charcoal/40">Category</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full px-3 py-1 text-sm ${!category ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
            >
              All
            </Link>
            {PRODUCT_CATEGORIES.map((c) => (
              <Link
                key={c}
                href={`/products?category=${encodeURIComponent(c)}`}
                className={`rounded-full px-3 py-1 text-sm ${category === c ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-charcoal/40">Industry</p>
          <div className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <Link
                key={i}
                href={`/products?industry=${encodeURIComponent(i)}`}
                className={`rounded-full px-3 py-1 text-sm ${industry === i ? "bg-steel text-white" : "bg-steel-tint text-steel-dark"}`}
              >
                {i}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-charcoal/40">Box Type</p>
          <div className="flex flex-wrap gap-2">
            {boxTypes.map((b) => (
              <Link
                key={b}
                href={`/products?boxType=${encodeURIComponent(b)}`}
                className={`rounded-full px-3 py-1 text-sm ${boxType === b ? "bg-charcoal text-white" : "bg-sand-deep text-charcoal"}`}
              >
                {b}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {filtered.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="rounded-lg border border-sand-deep bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-display text-lg font-medium text-charcoal">{product.name}</p>
            <p className="mt-2 text-sm text-charcoal/60">{product.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-1">
              {product.categories.map((c) => (
                <span key={c} className="font-mono text-xs text-steel">
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-charcoal/60">No products match this filter.</p>
        )}
      </div>
    </div>
  );
}
