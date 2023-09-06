import { IsNotEmpty, } from "class-validator";

export class CreateTrainingDto {
    @IsNotEmpty({
        message: "Você deve informar uma categoria"
    })
    categoryId: string;
    @IsNotEmpty({
        message: "Você deve informar uma descrição"
    })
    description: string;
}