import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-steel">{article.category}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal">{article.title}</h1>
      <p className="mt-3 text-sm text-charcoal/40">
        {article.author} &middot; {article.publishedAt}
      </p>

      <div className="mt-8 space-y-4">
        {article.body.map((paragraph, i) => (
          <p key={i} className="text-charcoal/80 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-sand-deep pt-10">
          <h2 className="font-display text-xl font-semibold text-charcoal">More on {article.category}</h2>
          <div className="mt-4 space-y-3">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/resources/${a.slug}`}
                className="block rounded-lg border border-sand-deep bg-white px-4 py-3 text-sm text-charcoal transition-shadow hover:shadow-md"
              >
                {a.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
