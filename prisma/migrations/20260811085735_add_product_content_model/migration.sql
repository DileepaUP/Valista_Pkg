-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categories" TEXT[],
    "industries" TEXT[],
    "boxType" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "applications" TEXT[],
    "features" TEXT[],
    "fluteType" TEXT NOT NULL,
    "wallType" TEXT NOT NULL,
    "boardGrade" TEXT NOT NULL,
    "ectRatingKnM" DOUBLE PRECISION NOT NULL,
    "burstStrengthKpa" DOUBLE PRECISION NOT NULL,
    "maxStackLoadKg" DOUBLE PRECISION NOT NULL,
    "printingOptions" TEXT[],
    "moq" TEXT NOT NULL,
    "specSheetUrl" TEXT,
    "images" TEXT[],
    "relatedProductSlugs" TEXT[],
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStandardSize" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "lengthMm" INTEGER NOT NULL,
    "widthMm" INTEGER NOT NULL,
    "depthMm" INTEGER NOT NULL,

    CONSTRAINT "ProductStandardSize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- AddForeignKey
ALTER TABLE "ProductStandardSize" ADD CONSTRAINT "ProductStandardSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
