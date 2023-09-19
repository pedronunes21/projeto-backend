/*
  Warnings:

  - You are about to drop the column `trainingId` on the `TrainingCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Training` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TrainingCategory" DROP CONSTRAINT "TrainingCategory_trainingId_fkey";

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TrainingCategory" DROP COLUMN "trainingId";

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TrainingCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
