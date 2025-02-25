/*
  Warnings:

  - A unique constraint covering the columns `[orderCode]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "invoice" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");
