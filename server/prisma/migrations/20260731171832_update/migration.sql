-- DropIndex
DROP INDEX "Category_name_key";

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "config" JSONB;
