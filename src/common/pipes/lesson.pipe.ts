import { Injectable, NotFoundException, PipeTransform, BadRequestException } from "@nestjs/common";
import { LessonService } from "src/lesson/lesson.service";

@Injectable()
export class GetLessonByIdPipe implements PipeTransform<string, any> {

    constructor(private lessonService: LessonService) { }

    async transform(value: string) {

        if (!value)
            return null;

        value = String(value)
        const lessonId = value

        const lesson = await this.lessonService.lesson({
            id: lessonId
        })

        if (lesson === null)
            throw new NotFoundException("Aula não encontrada!")

        return lesson;
    }
}