import { Button } from "@/components/ui/Button";
import { FluteWave } from "@/components/signature/FluteWave";
import { products } from "@/data/products";

// PLACEHOLDER — per docs/CLAUDE.md §9, these stats are illustrative only and
// must be replaced with real, client-verified figures before launch.
const stats = [
  { label: "Founded", value: "PLACEHOLDER" },
  { label: "Boxes / month", value: "PLACEHOLDER" },
  { label: "Customers", value: "PLACEHOLDER" },
  { label: "Export countries", value: "PLACEHOLDER" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Corrugated packaging, engineered with real specs — not guesswork.
          </h1>
          <p className="mt-6 max-w-xl text-white/70">
            Flute type, board grade, ECT rating, and burst strength published on every
            product — the data our competitors don&apos;t show you.
          </p>
          <div className="mt-8 flex gap-4">
            <Button href="/get-a-quote" variant="primary">
              Get a Quote
            </Button>
            <Button href="/products" variant="secondary">
              View Products
            </Button>
          </div>
        </div>
        <FluteWave className="h-3 w-full text-sand" />
      </section>

      <section className="bg-sand">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-2xl font-semibold text-charcoal">{stat.value}</p>
              <p className="mt-1 text-sm text-charcoal/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-charcoal">Featured products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <a
              key={product.slug}
              href={`/products/${product.slug}`}
              className="rounded-lg border border-sand-deep bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="font-display text-lg font-medium text-charcoal">{product.name}</p>
              <p className="mt-2 text-sm text-charcoal/60">{product.shortDescription}</p>
              <p className="mt-4 font-mono text-xs text-steel">{product.boxType}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
