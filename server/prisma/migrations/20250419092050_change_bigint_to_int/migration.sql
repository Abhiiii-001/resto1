/*
  Warnings:

  - You are about to alter the column `sold` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalEarning` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalOrders` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalQRScan` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "sold" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "totalEarning" SET DATA TYPE INTEGER,
ALTER COLUMN "totalOrders" SET DATA TYPE INTEGER,
ALTER COLUMN "totalQRScan" SET DATA TYPE INTEGER;
