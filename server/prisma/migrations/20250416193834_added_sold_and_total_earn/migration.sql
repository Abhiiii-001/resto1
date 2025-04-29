/*
  Warnings:

  - You are about to drop the column `sold` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "sold";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "sold" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "totalEarning" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "totalOrders" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "totalQRScan" BIGINT NOT NULL DEFAULT 0;
