import { Module } from "@nestjs/common";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { TrainingModule } from "src/training/training.module";
import { TrainingService } from "src/training/training.service";

@Module({
    imports: [TrainingModule],
    controllers: [LessonController],
    providers: [LessonService, TrainingService]
})
export class LessonModule { }