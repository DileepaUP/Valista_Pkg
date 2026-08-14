import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/queries/articles";

export async function generateStaticParams() {
  const articles = await getArticlesByCategory(undefined);
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const relatedAll = await getArticlesByCategory(article.category);
  const related = relatedAll.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <p className="font-mono text-xs text-steel">{article.category}</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-charcoal">{article.title}</h1>
      <p className="mt-3 text-sm text-charcoal/40">
        {article.author} &middot; {article.publishedAt.toISOString().slice(0, 10)}
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
