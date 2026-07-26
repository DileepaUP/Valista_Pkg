/*
  Warnings:

  - You are about to drop the column `heightMm` on the `QuoteRequest` table. All the data in the column will be lost.
  - Added the required column `depthMm` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuoteRequest" DROP COLUMN "heightMm",
ADD COLUMN     "depthMm" INTEGER NOT NULL;
