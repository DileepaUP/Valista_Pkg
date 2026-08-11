import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { ARTICLE_CATEGORIES } from "@/data/types";

export const metadata: Metadata = {
  title: "Resources — Valista Packaging",
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = await searchParams;
  const category = typeof resolved.category === "string" ? resolved.category : undefined;

  const filtered = articles
    .filter((a) => !category || a.category === category)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Resources</h1>
      <p className="mt-2 text-charcoal/60">Packaging guides, sustainability topics, and industry news.</p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/resources"
          className={`rounded-full px-3 py-1 text-sm ${!category ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
        >
          All
        </Link>
        {ARTICLE_CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/resources?category=${encodeURIComponent(c)}`}
            className={`rounded-full px-3 py-1 text-sm ${category === c ? "bg-kraft text-white" : "bg-sand-deep text-charcoal"}`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-10 space-y-6">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/resources/${article.slug}`}
            className="block rounded-lg border border-sand-deep bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-mono text-xs text-steel">{article.category}</p>
            <p className="mt-2 font-display text-lg font-medium text-charcoal">{article.title}</p>
            <p className="mt-2 text-sm text-charcoal/60">{article.excerpt}</p>
            <p className="mt-3 text-xs text-charcoal/40">
              {article.author} &middot; {article.publishedAt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
