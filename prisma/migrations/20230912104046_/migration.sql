-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_trainingId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingCategory" DROP CONSTRAINT "TrainingCategory_trainingId_fkey";

-- AddForeignKey
ALTER TABLE "TrainingCategory" ADD CONSTRAINT "TrainingCategory_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
