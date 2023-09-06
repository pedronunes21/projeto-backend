-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "weekday" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "max_users" INTEGER NOT NULL,
    "trainingId" TEXT NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
