import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">New Article</h1>
      <div className="mt-6">
        <ArticleForm action={createArticle} submitLabel="Create Article" />
      </div>
    </div>
  );
}
