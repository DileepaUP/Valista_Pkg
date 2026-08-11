import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { updateProduct, deleteProduct } from "../../actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { standardSizes: true },
  });

  if (!product) notFound();

  const boundUpdate = updateProduct.bind(null, product.id);
  const boundDelete = deleteProduct.bind(null, product.id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Edit Product</h1>
        <DeleteProductButton action={boundDelete} />
      </div>
      <div className="mt-6">
        <ProductForm
          action={boundUpdate}
          submitLabel="Save Changes"
          initialValues={{
            slug: product.slug,
            name: product.name,
            categories: product.categories,
            industries: product.industries,
            boxType: product.boxType,
            shortDescription: product.shortDescription,
            description: product.description,
            applications: product.applications,
            features: product.features,
            fluteType: product.fluteType,
            wallType: product.wallType,
            boardGrade: product.boardGrade,
            ectRatingKnM: product.ectRatingKnM,
            burstStrengthKpa: product.burstStrengthKpa,
            maxStackLoadKg: product.maxStackLoadKg,
            printingOptions: product.printingOptions,
            moq: product.moq,
            specSheetUrl: product.specSheetUrl,
            images: product.images,
            relatedProductSlugs: product.relatedProductSlugs,
            isPublished: product.isPublished,
            standardSizes: product.standardSizes.map((s) => ({
              label: s.label,
              lengthMm: s.lengthMm,
              widthMm: s.widthMm,
              depthMm: s.depthMm,
            })),
          }}
        />
      </div>
    </div>
  );
}
