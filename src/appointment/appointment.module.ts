import { Module } from "@nestjs/common";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { LessonModule } from "src/lesson/lesson.module";
import { LessonService } from "src/lesson/lesson.service";

@Module({
    imports: [LessonModule],
    controllers: [AppointmentController],
    providers: [AppointmentService, LessonService]
})
export class AppointmentModule { }