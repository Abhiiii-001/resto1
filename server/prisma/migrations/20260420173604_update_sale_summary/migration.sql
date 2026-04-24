/*
  Warnings:

  - You are about to drop the column `cratedAt` on the `SaleSummary` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `SaleSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleSummary"
RENAME COLUMN "cratedAt" TO "createdAt";
