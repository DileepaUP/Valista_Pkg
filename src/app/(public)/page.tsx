import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FluteWave } from "@/components/signature/FluteWave";
import { Reveal } from "@/components/ui/Reveal";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { getProducts } from "@/lib/queries/products";
import { getArticles } from "@/lib/queries/articles";
import { getReviews } from "@/lib/queries/reviews";
import { INDUSTRIES, PRODUCT_CATEGORIES } from "@/data/types";

// SAMPLE DATA — per docs/CLAUDE.md §9, these stats are illustrative sample
// values, not verified figures, and must be replaced with real,
// client-verified data before launch.
const stats = [
  { label: "Founded", value: "1994" },
  { label: "Boxes / month", value: "5M+" },
  { label: "Customers", value: "500+" },
  { label: "Export countries", value: "12" },
];

export default async function Home() {
  const products = await getProducts();
  // Featured on the homepage spec-sheet teaser to make the "we publish real
  // data" claim visible immediately, not just via a CTA — neither competitor
  // referenced in docs/CLAUDE.md §2 surfaces spec data this prominently.
  const teaserProduct = products[0];

  const allArticles = await getArticles();
  const latestArticles = allArticles.slice(0, 3);

  const reviews = await getReviews();

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-charcoal text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-kraft/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-steel/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[3fr_2fr] lg:items-center">
          <div>
            <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight opacity-0 animate-[fade-in-up_0.7s_ease-out_forwards] sm:text-5xl">
              Corrugated packaging, engineered with real specs — not guesswork.
            </h1>
            <p className="mt-6 max-w-xl text-white/70 opacity-0 animate-[fade-in-up_0.7s_ease-out_0.15s_forwards]">
              Flute type, board grade, ECT rating, and burst strength published on every
              product — the data our competitors don&apos;t show you.
            </p>
            <div className="mt-8 flex gap-4 opacity-0 animate-[fade-in-up_0.7s_ease-out_0.3s_forwards]">
              <Button href="/get-a-quote" variant="primary">
                Get a Quote
              </Button>
              <Button href="/products" variant="secondary">
                View Products
              </Button>
            </div>
          </div>

          <div className="hidden opacity-0 animate-[fade-in-up_0.7s_ease-out_0.45s_forwards] lg:block">
            <div className="rotate-2 rounded-xl border border-white/10 bg-white/5 p-6 font-mono text-sm shadow-2xl backdrop-blur transition-transform duration-500 hover:rotate-0">
              <p className="text-xs uppercase tracking-wide text-white/40">Live spec example</p>
              <dl className="mt-4 space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/50">Flute type</dt>
                  <dd className="text-kraft-light">B-Flute</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <dt className="text-white/50">ECT rating</dt>
                  <dd className="text-kraft-light">6.2 kN/m</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/50">Burst strength</dt>
                  <dd className="text-kraft-light">800 kPa</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center pb-4">
          <a
            href="#below-fold"
            aria-label="Scroll to explore"
            className="animate-[bounce-subtle_2.4s_ease-in-out_infinite] text-white/40 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <FluteWave className="h-3 w-full text-sand" />
      </section>

      <section id="below-fold" className="bg-sand">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-12 gap-y-8 px-6 py-16 sm:divide-x sm:divide-sand-deep">
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
              <CountUpStat value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
                </span>
                Lab-tested, not marketing copy
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold text-charcoal">
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
            </Reveal>

            <Reveal delayMs={150}>
              <table className="w-full border-collapse overflow-hidden rounded-lg border border-sand-deep font-mono text-sm shadow-sm">
                <tbody>
                  {[
                    ["Flute type", teaserProduct.fluteType],
                    ["Wall type", teaserProduct.wallType],
                    ["Board grade", teaserProduct.boardGrade],
                    ["ECT rating", `${teaserProduct.ectRatingKnM} kN/m`],
                    ["Burst strength", `${teaserProduct.burstStrengthKpa} kPa`],
                  ].map(([label, value], i) => (
                    <tr
                      key={label}
                      className={`border-b border-sand-deep last:border-b-0 transition-colors hover:bg-steel-tint ${i % 2 === 0 ? "bg-white" : "bg-sand-deep/40"}`}
                    >
                      <th className="px-4 py-3 text-left font-medium text-charcoal/60">{label}</th>
                      <td className="px-4 py-3 text-charcoal">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl py-16">
        <div className="px-6">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Shop by industry</h2>
            <p className="mt-2 text-charcoal/60">Find the right box style for your sector — scroll for more.</p>
          </Reveal>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry}
              href={`/products?industry=${encodeURIComponent(industry)}`}
              className="flex w-40 shrink-0 snap-start flex-col justify-between rounded-lg border border-sand-deep bg-white px-5 py-6 text-sm font-medium text-charcoal transition-all duration-300 hover:-translate-y-1 hover:border-kraft hover:shadow-lg"
            >
              <span className="font-mono text-xs text-steel">0{INDUSTRIES.indexOf(industry) + 1}</span>
              <span className="mt-4">{industry}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Browse by category</h2>
          </Reveal>
          <div className="mt-8 grid auto-rows-[minmax(96px,auto)] grid-cols-2 gap-3 sm:grid-cols-4">
            {PRODUCT_CATEGORIES.map((category, i) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className={`group flex items-end rounded-lg px-5 py-5 text-sm font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  i === 0
                    ? "col-span-2 row-span-2 bg-charcoal text-white hover:shadow-charcoal/30"
                    : "border border-sand-deep bg-sand text-charcoal hover:border-kraft"
                }`}
              >
                <span className={i === 0 ? "font-display text-xl" : ""}>
                  {category}
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2">
        <div className="group relative overflow-hidden bg-charcoal px-8 py-16 text-white transition-colors duration-500 hover:bg-charcoal-deep sm:px-12">
          <svg
            className="h-10 w-10 text-kraft-light transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M3 12h18M3 12l4-4m-4 4l4 4M21 12l-4-4m4 4l-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="mt-6 font-display text-xl font-semibold">One site, start to finish</h2>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Design, corrugating, printing, die-cutting, and dispatch all happen on one
            production line — not outsourced across multiple subcontractors.
          </p>
          <Link
            href="/our-company/manufacturing-process"
            className="mt-6 inline-block text-sm font-medium text-kraft-light transition-transform hover:translate-x-1"
          >
            See the manufacturing process &rarr;
          </Link>
        </div>

        <div className="group relative overflow-hidden bg-sand-deep px-8 py-16 text-charcoal transition-colors duration-500 hover:bg-sand sm:px-12">
          <svg
            className="h-10 w-10 text-steel-dark transition-transform duration-500 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M3 16V7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9M3 16h11M3 16v1a1 1 0 0 0 1 1h1m9-2h6l-2-5h-4v5Zm0 0v1a1 1 0 0 0 1 1h1m-9-1a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="mt-6 font-display text-xl font-semibold">Our own delivery fleet</h2>
          <p className="mt-3 max-w-sm text-sm text-charcoal/60">
            A dedicated fleet means delivery schedules aren&apos;t held hostage by a
            third-party courier — see real photos from our factory floor and yard.
          </p>
          <Link
            href="/our-company/facilities"
            className="mt-6 inline-block text-sm font-medium text-steel-dark transition-transform hover:translate-x-1"
          >
            View factory &amp; facilities &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto w-full max-w-6xl py-16">
          <div className="px-6">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-charcoal">What customers say</h2>
            </Reveal>
          </div>
          <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide">
            {reviews.map((review) => (
              <div
                key={review.customerName}
                className="relative w-80 shrink-0 snap-start rounded-lg border border-sand-deep bg-white p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-2 font-display text-6xl text-sand-deep"
                >
                  &rdquo;
                </span>
                <div className="relative flex gap-0.5 text-kraft" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} aria-hidden="true">
                      {i < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <p className="relative mt-3 text-sm text-charcoal/70">&ldquo;{review.quote}&rdquo;</p>
                <p className="relative mt-4 text-sm font-medium text-charcoal">{review.customerName}</p>
                <p className="relative text-xs text-charcoal/50">
                  {review.company} &middot; {review.industry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-charcoal">Featured products</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={i * 80}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block overflow-hidden rounded-lg border border-sand-deep bg-white transition-all duration-300 hover:-translate-y-1 hover:border-kraft hover:shadow-xl"
                >
                  <div className="relative flex h-28 items-center justify-center overflow-hidden bg-charcoal">
                    <FluteWave className="absolute inset-x-0 bottom-0 h-4 w-full text-white/10" />
                    <span className="font-mono text-xs uppercase tracking-wide text-white/70 transition-transform duration-300 group-hover:scale-105">
                      {product.boxType}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="font-display text-lg font-medium text-charcoal">{product.name}</p>
                    <p className="mt-2 text-sm text-charcoal/60">{product.shortDescription}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-steel">
                      View spec sheet
                      <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-4xl px-6 py-16">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-2xl font-semibold text-charcoal">From the Resources hub</h2>
              <Link href="/resources" className="text-sm font-medium text-steel hover:underline">
                View all &rarr;
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 divide-y divide-sand-deep border-t border-sand-deep">
            {latestArticles.map((article, i) => (
              <Reveal key={article.slug} delayMs={i * 80}>
                <Link href={`/resources/${article.slug}`} className="group flex items-stretch gap-4 py-6">
                  <span className="w-1 shrink-0 rounded-full bg-transparent transition-colors duration-300 group-hover:bg-kraft" />
                  <div className="flex-1">
                    <p className="font-mono text-xs text-steel">{article.category}</p>
                    <p className="mt-1 font-display text-lg font-medium text-charcoal transition-colors group-hover:text-kraft-dark">
                      {article.title}
                    </p>
                    <p className="mt-1 text-sm text-charcoal/60">{article.excerpt}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-charcoal/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-kraft"
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
