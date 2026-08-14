import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { updateArticle, deleteArticle } from "../../actions";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) notFound();

  const boundUpdate = updateArticle.bind(null, article.id);
  const boundDelete = deleteArticle.bind(null, article.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Article</h1>
        <DeleteButton action={boundDelete} label="Delete Article" />
      </div>
      <div className="mt-6">
        <ArticleForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: article.slug,
            title: article.title,
            category: article.category,
            excerpt: article.excerpt,
            body: article.body,
            coverImageUrl: article.coverImageUrl,
            author: article.author,
            publishedAt: article.publishedAt.toISOString().slice(0, 10),
            isPublished: article.isPublished,
          }}
        />
      </div>
    </div>
  );
}
