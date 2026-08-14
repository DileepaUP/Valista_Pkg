-- CreateTable
CREATE TABLE "Review" (
    "customerName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "quote" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
