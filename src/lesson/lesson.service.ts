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
            where: lessonWhereInput
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
        return this.prisma.lesson.findMany({ ...params })
    }

    async createLesson(data: Prisma.LessonCreateInput): Promise<Lesson> {
        return this.prisma.lesson.create({ data })
    }
}