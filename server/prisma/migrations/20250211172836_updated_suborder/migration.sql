/*
  Warnings:

  - Added the required column `name` to the `subOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant` to the `subOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "invoice" BYTEA,
ADD COLUMN     "subscription" TEXT;

-- AlterTable
ALTER TABLE "subOrder" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "variant" TEXT NOT NULL;
