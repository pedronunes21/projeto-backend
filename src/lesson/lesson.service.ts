import { Injectable } from "@nestjs/common";
import { Lesson, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class LessonService {
    constructor(private prisma: PrismaService) { }

    async lesson(
        lessonWhereInput: Prisma.LessonWhereInput
    ): Promise<Lesson | null> {
        return this.prisma.lesson.findFirst({
            where: lessonWhereInput,
            include: {
                training: true,
                appointment: {
                    include: {
                        user: true
                    }
                }
            }
        })
    }

    async lessons(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.LessonWhereUniqueInput;
        where?: Prisma.LessonWhereInput;
        orderBy?: Prisma.LessonOrderByWithRelationInput;
        select?: Prisma.LessonSelect,
        include?: Prisma.LessonInclude
    }): Promise<Lesson[]> {
        return this.prisma.lesson.findMany({
            ...params, include: {
                training: true,
            }
        })
    }

    async getTodayLessonsOrderedByTime(): Promise<Lesson[]> {
        return this.lessons({
            where: {
                weekday: new Date().getDay(),
                time: {
                    gt: new Date().getHours() * 60 + new Date().getMinutes()
                }
            },
            orderBy: {
                time: "asc"
            }
        })
    }

    async createLesson(data: Prisma.LessonCreateInput): Promise<Lesson> {
        return this.prisma.lesson.create({ data })
    }

    async deleteLesson(id: string) {
        return this.prisma.lesson.delete({
            where: { id }
        })
    }

    async updateLesson(id: string, data: Prisma.LessonUpdateInput) {
        return this.prisma.lesson.update({
            where: { id },
            data
        })
    }

}