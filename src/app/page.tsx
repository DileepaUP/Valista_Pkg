import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FluteWave } from "@/components/signature/FluteWave";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { reviews } from "@/data/reviews";
import { INDUSTRIES, PRODUCT_CATEGORIES } from "@/data/types";

const latestArticles = [...articles]
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .slice(0, 3);

// Featured on the homepage spec-sheet teaser (§ below) to make the "we
// publish real data" claim visible immediately, not just via a CTA —
// neither competitor referenced in docs/CLAUDE.md §2 surfaces spec data
// this prominently.
const teaserProduct = products[0];

// SAMPLE DATA — per docs/CLAUDE.md §9, these stats are illustrative sample
// values, not verified figures, and must be replaced with real,
// client-verified data before launch.
const stats = [
  { label: "Founded", value: "1994" },
  { label: "Boxes / month", value: "5M+" },
  { label: "Customers", value: "500+" },
  { label: "Export countries", value: "12" },
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

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold text-charcoal">
                Every spec, published — not just claimed.
              </h2>
              <p className="mt-3 text-charcoal/60">
                Here&apos;s the actual technical spec table from one of our products. This is
                what you get on every product page — not a photo and a price.
              </p>
              <Link
                href={`/products/${teaserProduct.slug}`}
                className="mt-6 inline-block text-sm font-medium text-steel hover:underline"
              >
                See the full spec sheet &rarr;
              </Link>
            </div>

            <table className="w-full border-collapse overflow-hidden rounded-lg border border-sand-deep font-mono text-sm">
              <tbody>
                <tr className="border-b border-sand-deep bg-white">
                  <th className="px-4 py-3 text-left font-medium text-charcoal/60">Flute type</th>
                  <td className="px-4 py-3 text-charcoal">{teaserProduct.fluteType}</td>
                </tr>
                <tr className="border-b border-sand-deep bg-sand-deep/40">
                  <th className="px-4 py-3 text-left font-medium text-charcoal/60">Wall type</th>
                  <td className="px-4 py-3 text-charcoal">{teaserProduct.wallType}</td>
                </tr>
                <tr className="border-b border-sand-deep bg-white">
                  <th className="px-4 py-3 text-left font-medium text-charcoal/60">Board grade</th>
                  <td className="px-4 py-3 text-charcoal">{teaserProduct.boardGrade}</td>
                </tr>
                <tr className="border-b border-sand-deep bg-sand-deep/40">
                  <th className="px-4 py-3 text-left font-medium text-charcoal/60">ECT rating</th>
                  <td className="px-4 py-3 text-charcoal">{teaserProduct.ectRatingKnM} kN/m</td>
                </tr>
                <tr className="bg-white">
                  <th className="px-4 py-3 text-left font-medium text-charcoal/60">Burst strength</th>
                  <td className="px-4 py-3 text-charcoal">{teaserProduct.burstStrengthKpa} kPa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-charcoal">Shop by industry</h2>
        <p className="mt-2 text-charcoal/60">Find the right box style for your sector.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry}
              href={`/products?industry=${encodeURIComponent(industry)}`}
              className="rounded-lg border border-sand-deep bg-white px-4 py-5 text-center text-sm font-medium text-charcoal transition-shadow hover:shadow-md"
            >
              {industry}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-charcoal">Browse by category</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="rounded-lg border border-sand-deep bg-sand px-4 py-5 text-center text-sm font-medium text-charcoal transition-shadow hover:shadow-md"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-sand-deep bg-white p-8">
            <h2 className="font-display text-xl font-semibold text-charcoal">One site, start to finish</h2>
            <p className="mt-3 text-sm text-charcoal/60">
              Design, corrugating, printing, die-cutting, and dispatch all happen on one
              production line — not outsourced across multiple subcontractors.
            </p>
            <Link
              href="/our-company/manufacturing-process"
              className="mt-4 inline-block text-sm font-medium text-steel hover:underline"
            >
              See the manufacturing process &rarr;
            </Link>
          </div>
          <div className="rounded-lg border border-sand-deep bg-white p-8">
            <h2 className="font-display text-xl font-semibold text-charcoal">Our own delivery fleet</h2>
            <p className="mt-3 text-sm text-charcoal/60">
              A dedicated fleet means delivery schedules aren&apos;t held hostage by a
              third-party courier — see real photos from our factory floor and yard.
            </p>
            <Link
              href="/our-company/facilities"
              className="mt-4 inline-block text-sm font-medium text-steel hover:underline"
            >
              View factory &amp; facilities &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-charcoal">What customers say</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.customerName} className="rounded-lg border border-sand-deep bg-white p-6">
                <div className="flex gap-0.5 text-kraft" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden="true">
                      {i < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-charcoal/70">&ldquo;{review.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-charcoal">{review.customerName}</p>
                <p className="text-xs text-charcoal/50">
                  {review.company} &middot; {review.industry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div>
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
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold text-charcoal">From the Resources hub</h2>
            <Link href="/resources" className="text-sm font-medium text-steel hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="rounded-lg border border-sand-deep bg-sand p-6 transition-shadow hover:shadow-md"
              >
                <p className="font-mono text-xs text-steel">{article.category}</p>
                <p className="mt-2 font-display text-base font-medium text-charcoal">{article.title}</p>
                <p className="mt-2 text-sm text-charcoal/60">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
