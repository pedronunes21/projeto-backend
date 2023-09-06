-- DropForeignKey
ALTER TABLE "TrainingCategory" DROP CONSTRAINT "TrainingCategory_trainingId_fkey";

-- AlterTable
ALTER TABLE "TrainingCategory" ALTER COLUMN "trainingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TrainingCategory" ADD CONSTRAINT "TrainingCategory_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE SET NULL ON UPDATE CASCADE;
