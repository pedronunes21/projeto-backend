import { IsString } from "class-validator";

export class CreateAppointmentDto {
    @IsString({
        message: "Você deve informar uma aula"
    })
    lessonId: string;
}

export class DeleteAppointmentDto {
    @IsString({
        message: "Você deve informar uma aula"
    })
    lessonId: string;
}

export class GetAppointmentByLessonDto {
    @IsString({
        message: "Você deve informar uma aula"
    })
    lessonId: string;
}