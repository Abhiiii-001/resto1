/*
  Warnings:

  - A unique constraint covering the columns `[verificationToken]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `verificationToken` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "autoAcceptOrder" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_verificationToken_key" ON "Restaurant"("verificationToken");
