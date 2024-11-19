/*
  Warnings:

  - You are about to alter the column `number` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `number` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `role` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'Restaurant';

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "number" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "number" SET DATA TYPE INTEGER;
