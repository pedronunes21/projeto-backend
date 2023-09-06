import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { CreateLessonDto } from "./dto/lesson.dto";
import { Role } from "src/role/role.enum";
import { Roles } from "src/role/role.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/role.guard";
import { GetTrainingByIdPipe } from "src/common/pipes/training.pipe";
import { Lesson, Training } from "@prisma/client";
import { GetLessonByIdPipe } from "src/common/pipes/lesson.pipe";

@Controller("lesson")
export class LessonController {
    constructor(
        private readonly lessonService: LessonService,
    ) { }

    @Get(":id")
    async getLessonById(@Param("id", GetLessonByIdPipe) lesson: Lesson) {
        return this.lessonService.lesson({
            id: lesson.id
        })
    }

    @Get()
    async getLessons(): Promise<Lesson[]> {
        return this.lessonService.lessons({})
    }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createLesson(
        @Body("trainingId", GetTrainingByIdPipe) training: Training,
        @Body() createLessonDto: CreateLessonDto
    ) {
        return this.lessonService.createLesson({
            ...createLessonDto,
            training: {
                connect: { id: training.id }
            }
        })
    }
}