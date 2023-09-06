-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trainingId" TEXT NOT NULL,

    CONSTRAINT "TrainingCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingCategory" ADD CONSTRAINT "TrainingCategory_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
