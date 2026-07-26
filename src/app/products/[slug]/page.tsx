import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products } from "@/data/products";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = product.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="font-mono text-xs text-steel">{product.boxType}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal">{product.name}</h1>
      <p className="mt-4 text-charcoal/70">{product.shortDescription}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {product.categories.map((category) => (
          <span key={category} className="rounded-full bg-kraft/10 px-3 py-1 text-xs text-kraft-dark">
            {category}
          </span>
        ))}
        {product.industries.map((industry) => (
          <span key={industry} className="rounded-full bg-sand-deep px-3 py-1 text-xs text-charcoal">
            {industry}
          </span>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Description</h2>
        <p className="mt-2 text-charcoal/70">{product.description}</p>
      </section>

      <section className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-charcoal">Applications</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
            {product.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-charcoal">Features</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-charcoal/70">
            {product.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Technical Specifications</h2>
        <table className="mt-4 w-full border-collapse overflow-hidden rounded-lg border border-sand-deep font-mono text-sm">
          <tbody>
            <tr className="border-b border-sand-deep bg-white">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Flute type</th>
              <td className="px-4 py-3 text-charcoal">{product.fluteType}</td>
            </tr>
            <tr className="border-b border-sand-deep bg-sand">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Wall type</th>
              <td className="px-4 py-3 text-charcoal">{product.wallType}</td>
            </tr>
            <tr className="border-b border-sand-deep bg-white">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Board grade</th>
              <td className="px-4 py-3 text-charcoal">{product.boardGrade}</td>
            </tr>
            <tr className="border-b border-sand-deep bg-sand">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">ECT rating (Edge Crush Test)</th>
              <td className="px-4 py-3 text-charcoal">{product.ectRatingKnM} kN/m</td>
            </tr>
            <tr className="border-b border-sand-deep bg-white">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Burst strength (Mullen)</th>
              <td className="px-4 py-3 text-charcoal">{product.burstStrengthKpa} kPa</td>
            </tr>
            <tr className="border-b border-sand-deep bg-sand">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Max stack load (BCT)</th>
              <td className="px-4 py-3 text-charcoal">{product.maxStackLoadKg} kg</td>
            </tr>
            <tr className="border-b border-sand-deep bg-white">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">Printing options</th>
              <td className="px-4 py-3 text-charcoal">{product.printingOptions.join(" · ")}</td>
            </tr>
            <tr className="bg-sand">
              <th className="px-4 py-3 text-left font-medium text-charcoal/60">MOQ</th>
              <td className="px-4 py-3 text-charcoal">{product.moq}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Standard sizes</h2>
        <table className="mt-4 w-full border-collapse overflow-hidden rounded-lg border border-sand-deep font-mono text-sm">
          <thead>
            <tr className="bg-sand-deep text-left text-charcoal/70">
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">L (mm)</th>
              <th className="px-4 py-2">W (mm)</th>
              <th className="px-4 py-2">D (mm)</th>
            </tr>
          </thead>
          <tbody>
            {product.standardSizes.map((size) => (
              <tr key={size.label} className="border-t border-sand-deep bg-white">
                <td className="px-4 py-2 text-charcoal">{size.label}</td>
                <td className="px-4 py-2 text-charcoal">{size.lengthMm}</td>
                <td className="px-4 py-2 text-charcoal">{size.widthMm}</td>
                <td className="px-4 py-2 text-charcoal">{size.depthMm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-10 flex gap-4">
        <Button href={`/get-a-quote?product=${product.slug}`} variant="primary">
          Get a Quote for this product
        </Button>
        {product.specSheetUrl && (
          <Button href={product.specSheetUrl} variant="secondary">
            Download spec sheet
          </Button>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-charcoal">Related products</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {relatedProducts.map((related) => (
              <Link
                key={related.slug}
                href={`/products/${related.slug}`}
                className="rounded-lg border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal transition-shadow hover:shadow-md"
              >
                {related.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
