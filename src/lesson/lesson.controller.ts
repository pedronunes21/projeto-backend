import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { CreateLessonDto, DeleteLessonDto, UpdateLessonDto } from "./dto/lesson.dto";
import { Role } from "src/role/role.enum";
import { Roles } from "src/role/role.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/role.guard";
import { GetTrainingByIdPipe } from "src/common/pipes/training.pipe";
import { Lesson, Training } from "@prisma/client";
import { GetLessonByIdPipe } from "src/common/pipes/lesson.pipe";
import { ParseStringPipe } from "src/common/pipes/string.pipe";

@Controller()
export class LessonController {
    constructor(
        private readonly lessonService: LessonService,
    ) { }

    @Get("lesson/:id")
    @UseGuards(AuthGuard)
    async getLessonById(@Param("id", GetLessonByIdPipe) lesson: Lesson) {
        return this.lessonService.lesson({
            id: lesson.id
        })
    }

    @Get("lesson")
    @UseGuards(AuthGuard)
    async getLessons(): Promise<Lesson[]> {
        return this.lessonService.lessons({
            orderBy: {
                time: "asc",
            },
        })
    }

    @Get("today/lesson")
    @UseGuards(AuthGuard)
    async getTodayLessonsOrderedByTime(): Promise<Lesson[]> {
        return this.lessonService.getTodayLessonsOrderedByTime();
    }

    @Post("lesson")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async createLesson(
        @Body("trainingId", ParseStringPipe, GetTrainingByIdPipe) training: Training,
        @Body() createLessonDto: CreateLessonDto
    ) {
        const { max_users, time, title, trainingId, weekday } = createLessonDto
        return this.lessonService.createLesson({
            max_users,
            time,
            title,
            weekday,
            training: {
                connect: { id: trainingId }
            }
        })
    }

    @Delete("lesson/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async deleteLesson(
        @Param("id", GetLessonByIdPipe) lesson: Lesson,
        @Param() deleteLessonDto: DeleteLessonDto
    ) {
        return this.lessonService.deleteLesson(lesson.id)
    }

    @Put("lesson/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async updateLesson(
        @Param("id", GetLessonByIdPipe) lesson: Lesson,
        @Body("trainingId", GetTrainingByIdPipe) _: Training,
        @Body() updateLessonDto: UpdateLessonDto
    ) {
        return this.lessonService.updateLesson(lesson.id, { ...updateLessonDto })
    }
}