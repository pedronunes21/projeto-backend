import { Training } from "@prisma/client";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateLessonDto {
    @IsInt({
        message: "Dia da semana deve ser um inteiro"
    })
    weekday: number;
    @IsInt({
        message: "Você deve informar um horário como um inteiro"
    })
    time: number;
    @IsString({
        message: "Você deve informar um título"
    })
    title: string;
    @IsInt({
        message: "Máximo de usuários deve ser um inteiro"
    })
    max_users: number;
}