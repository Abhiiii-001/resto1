/*
  Warnings:

  - You are about to drop the `OrderSummary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orders` to the `SaleSummary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderSummary" DROP CONSTRAINT "OrderSummary_restaurantId_fkey";

-- AlterTable
ALTER TABLE "SaleSummary" ADD COLUMN     "orders" INTEGER NOT NULL;

-- DropTable
DROP TABLE "OrderSummary";
