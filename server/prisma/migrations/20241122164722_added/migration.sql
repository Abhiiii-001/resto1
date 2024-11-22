/*
  Warnings:

  - You are about to drop the column `isDone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orders` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `sold` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sold` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Ready', 'Pending', 'Cancelled', 'Completed');

-- AlterEnum
ALTER TYPE "Duration" ADD VALUE 'Day';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isDone",
DROP COLUMN "orders",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sold" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "sold";

-- CreateTable
CREATE TABLE "subOrder" (
    "id" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "subOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "subOrder" ADD CONSTRAINT "subOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subOrder" ADD CONSTRAINT "subOrder_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
