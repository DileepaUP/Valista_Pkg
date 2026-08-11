import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">Products</h1>
          <p className="mt-1 text-sm text-charcoal/60">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-md bg-kraft px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-kraft-dark"
        >
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-sand-deep bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand-deep bg-sand text-left text-xs uppercase tracking-wide text-charcoal/50">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Box Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-sand-deep last:border-b-0">
                <td className="px-4 py-3 font-medium text-charcoal">{product.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-charcoal/60">{product.slug}</td>
                <td className="px-4 py-3 text-charcoal/70">{product.boxType}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      product.isPublished ? "bg-green/10 text-green" : "bg-charcoal/10 text-charcoal/60"
                    }`}
                  >
                    {product.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-steel hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal/50">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
